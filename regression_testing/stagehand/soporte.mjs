// Soporte de las pruebas con Stagehand: navegador, modelo, datos y evidencias.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import 'dotenv/config';
import { localBrowser, Stagehand } from '@browserbasehq/stagehand';
import { MongoClient } from 'mongodb';

const AQUI = path.dirname(fileURLToPath(import.meta.url));
export const EVIDENCIAS = path.join(AQUI, 'evidencias');

export const FRONT_URL = process.env.FRONT_URL || 'http://localhost:5173';
export const API_URL = process.env.API_URL || 'http://localhost:8000/api';
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const MONGO_DB = process.env.MONGO_DB || 'gym_udem';

// Proveedor y modelo, en el formato de Stagehand: openai/…, anthropic/… o google/….
const MODELO = process.env.MODELO || 'google/gemini-2.5-flash';
const LLM_API_KEY = process.env.LLM_API_KEY;

// Las mismas cuentas que las pruebas de Cypress y de Serenity/JS.
export const CUENTAS = {
  admin: { name: 'Ana Administradora', email: 'ana.admin@udemedellin.edu.co', documento: '1000000001' },
  entrenador: { name: 'Tomás Entrenador', email: 'tomas.coach@udem.edu.co', documento: '1000000002' },
  estudiante: { name: 'Laura Estudiante', email: 'laura.est@soyudemedellin.edu.co', documento: '1000000003' },
};

export const hoyBogota = () => new Date().toLocaleDateString('en-CA', { timeZone: 'America/Bogota' });

// ── Base de datos ────────────────────────────────────────────────────────────
async function conDb(fn) {
  const cliente = new MongoClient(MONGO_URI);
  await cliente.connect();
  try {
    return await fn(cliente.db(MONGO_DB));
  } finally {
    await cliente.close();
  }
}

/** Base limpia y las tres cuentas registradas por la API (RF01). */
export async function prepararBase() {
  await conDb((db) => Promise.all(['users', 'reservations', 'suggestions', 'disponibilidad', 'login_intentos']
    .map((c) => db.collection(c).deleteMany({}))));
  for (const cuenta of Object.values(CUENTAS)) {
    const r = await fetch(`${API_URL}/auth/register/`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(cuenta),
    });
    if (r.status !== 201) throw new Error(`No se registró ${cuenta.email}: ${r.status}`);
  }
}

/** La API solo deja reservar para mañana: la reserva de hoy se siembra en la base. */
export const sembrarReservaDeHoy = (email) => conDb((db) => db.collection('reservations').insertOne({
  email, slotId: 1, hour: '06:00', reserva_date: hoyBogota(), date: hoyBogota(),
  estado: 'ACTIVA', created_by: email, created_at: new Date(),
}));

export const leerReserva = (email) => conDb((db) => db.collection('reservations').findOne({ email }));
export const leerUsuario = (email) => conDb((db) => db.collection('users').findOne({ email }));
export const contarSugerencias = () => conDb((db) => db.collection('suggestions').countDocuments({}));

export async function dejarMensaje(cuenta, mensaje) {
  const login = await fetch(`${API_URL}/auth/login/`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: cuenta.email, documento: cuenta.documento }),
  });
  const { token } = await login.json();
  await fetch(`${API_URL}/suggestions/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ email: cuenta.email, mensaje }),
  });
}

// ── Navegador y Stagehand ────────────────────────────────────────────────────
export async function abrirNavegador() {
  if (!LLM_API_KEY) {
    throw new Error('Falta LLM_API_KEY en regression_testing/stagehand/.env (ver .env.example).');
  }
  const browser = await localBrowser.launch({
    headless: process.env.HEADLESS !== 'false',
    viewport: { width: 1280, height: 1100 },
  });
  const stagehand = await Stagehand.create({ browser, model: { modelName: MODELO, apiKey: LLM_API_KEY } });
  const [page] = await browser.context.pages();
  return {
    stagehand,
    page,
    async cerrar() {
      await stagehand.close();
      await browser.close();
    },
  };
}

/**
 * Inicia sesión. observe() localiza los campos y devuelve sus selectores; el
 * correo y el documento se escriben con el selector, así que las credenciales
 * NUNCA se envían al modelo de lenguaje. act() pulsa el botón.
 */
export async function iniciarSesion({ stagehand, page }, cuenta) {
  await page.goto(FRONT_URL);
  const { data: correo } = await stagehand.observe('find the institutional email input of the login form');
  const { data: documento } = await stagehand.observe('find the identity document (password) input of the login form');
  await page.locator(correo[0].selector).fill(cuenta.email);
  await page.locator(documento[0].selector).fill(cuenta.documento);
  await stagehand.act('click the "Ingresar" button to log in');
  await page.waitForSelector('[data-cy="nav-perfil"]', { timeout: 15000 });
}

/**
 * La interfaz pide confirmación con window.confirm (cerrar la jornada, borrar un
 * mensaje). Stagehand no maneja diálogos nativos: se acepta desde la página y se
 * guarda el texto para verificarlo. Es lo único que la prueba toca del navegador.
 */
export const aceptarConfirmaciones = (page) => page.evaluate(() => {
  window.__confirmaciones = [];
  window.confirm = (texto) => { window.__confirmaciones.push(texto); return true; };
});

export const confirmacionesMostradas = (page) => page.evaluate(() => window.__confirmaciones || []);

// ── Evidencias ───────────────────────────────────────────────────────────────
export async function evidencia(page, nombre) {
  fs.mkdirSync(EVIDENCIAS, { recursive: true });
  fs.writeFileSync(path.join(EVIDENCIAS, `${nombre}.png`), await page.screenshot());
}

/** Guarda lo que devolvieron observe() y extract(), para el informe. */
export function registrarResultado(caso, datos) {
  fs.mkdirSync(EVIDENCIAS, { recursive: true });
  const archivo = path.join(EVIDENCIAS, 'resultados.json');
  const previos = fs.existsSync(archivo) ? JSON.parse(fs.readFileSync(archivo, 'utf8')) : {};
  previos[caso] = { ...datos, modelo: MODELO, fecha: new Date().toISOString() };
  fs.writeFileSync(archivo, JSON.stringify(previos, null, 2));
}

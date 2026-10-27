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
const MODELO = process.env.MODELO || 'google/gemini-3-flash-preview';
const LLM_API_KEY = process.env.LLM_API_KEY;

// La capa gratuita de Gemini admite 5 peticiones por minuto: se deja al menos
// este tiempo entre dos llamadas al modelo. Con un plan de pago se puede bajar a 0.
const INTERVALO_MS = Number(process.env.LLM_INTERVALO_MS ?? 13000);

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
  conRitmo(stagehand);
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

/** Espacia observe(), act() y extract() para no superar la cuota del modelo. */
let ultimaLlamada = 0;
function conRitmo(stagehand) {
  for (const metodo of ['observe', 'act', 'extract']) {
    const original = stagehand[metodo].bind(stagehand);
    stagehand[metodo] = async (...args) => {
      const espera = ultimaLlamada + INTERVALO_MS - Date.now();
      if (espera > 0) await new Promise((r) => setTimeout(r, espera));
      try {
        return await original(...args);
      } finally {
        ultimaLlamada = Date.now();
      }
    };
  }
}

/**
 * Inicia sesión. El correo y el documento se escriben con sus selectores
 * data-cy, así que las credenciales NUNCA se envían al modelo de lenguaje, y el
 * login no depende de que el modelo encuentre los campos. act() pulsa el botón.
 */
export async function iniciarSesion({ stagehand, page }, cuenta) {
  // Cada caso empieza sin la sesión del anterior (la app la guarda en el navegador).
  await page.goto(FRONT_URL);
  await page.evaluate(() => { localStorage.clear(); sessionStorage.clear(); });
  await page.goto(FRONT_URL);
  // React dibuja el formulario después de cargar la página: hay que esperarlo.
  await page.waitForSelector('[data-cy="login-email"]', { timeout: 15000 });
  await page.locator('[data-cy="login-email"]').fill(cuenta.email);
  await page.locator('[data-cy="login-documento"]').fill(cuenta.documento);
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

/**
 * Lee el aviso emergente. Dura 5 s en pantalla y las llamadas al modelo van
 * espaciadas por la cuota, así que extract() llegaría tarde: se lee directamente.
 */
export async function leerAviso(page) {
  await page.waitForSelector('[data-cy="toast-mensaje"]', { timeout: 10000 });
  return { mensaje: await page.evaluate(() => document.querySelector('[data-cy="toast-mensaje"]')?.textContent ?? '') };
}

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

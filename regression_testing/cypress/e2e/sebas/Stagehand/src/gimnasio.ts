// Apoyo común para las pruebas Stagehand de la app del gimnasio.
// Prepara los datos igual que los comandos de Cypress (cy.escenarioBase,
// cy.api) para que cada caso parta de un estado conocido, y guarda como
// evidencia lo que hizo la IA en cada paso.
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import type { z } from 'zod';
import { MongoClient } from 'mongodb';
import { assertIncludes } from './assert.js';
import { selectedProvider } from './config.js';
import { closeTestSession, createTestSession, type TestSession } from './stagehand.js';

export const APP_URL = process.env.GIMNASIO_URL ?? 'http://localhost:5173';
export const API_URL = process.env.GIMNASIO_API_URL ?? 'http://localhost:8000/api';
const MONGO_URI = process.env.MONGO_URI ?? 'mongodb://localhost:27017';
const MONGO_DB = process.env.MONGO_DB ?? 'gym_udem';

// Los mismos usuarios que usa Cypress. La carpeta puede estar en
// regression_testing/stagehand/ o en regression_testing/cypress/e2e/sebas/Stagehand/.
const CANDIDATOS = ['../../cypress/fixtures/usuarios.json', '../../../../fixtures/usuarios.json']
  .map((ruta) => new URL(ruta, import.meta.url));
const FIXTURES = CANDIDATOS.find((ruta) => existsSync(ruta));
if (!FIXTURES) throw new Error('No se encontró regression_testing/cypress/fixtures/usuarios.json.');
const EVIDENCIAS = new URL('../evidencias/', import.meta.url);

export type Usuario = { name: string; email: string; documento: string };
type ClaveUsuario = 'admin' | 'entrenador' | 'estudiante' | 'estudiante2';

export const usuarios = JSON.parse(readFileSync(FIXTURES, 'utf8')) as Record<ClaveUsuario, Usuario>;

// ── Datos de prueba ─────────────────────────────────────────────────────────

async function api(method: string, ruta: string, body?: unknown): Promise<Response> {
  return fetch(`${API_URL}${ruta}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
}

// Equivale a cy.escenarioBase(): base vacía y los cuatro usuarios del fixture.
// El catálogo de bloques horarios (slots) se conserva.
export async function escenarioBase(): Promise<void> {
  const cliente = new MongoClient(MONGO_URI);
  await cliente.connect();
  try {
    const db = cliente.db(MONGO_DB);
    await Promise.all(
      ['users', 'reservations', 'suggestions', 'disponibilidad'].map((c) => db.collection(c).deleteMany({})),
    );
  } finally {
    await cliente.close();
  }
  for (const clave of ['admin', 'entrenador', 'estudiante', 'estudiante2'] as const) {
    const respuesta = await api('POST', '/auth/register/', usuarios[clave]);
    if (respuesta.status !== 201) {
      throw new Error(`No se pudo registrar a ${clave}: ${respuesta.status} ${await respuesta.text()}`);
    }
  }
}

// Reserva para mañana por la API, como cy.api('POST', '/reservations/', ...).
export async function reservarPorApi(email: string, slotId = 1): Promise<void> {
  const respuesta = await api('POST', '/reservations/', { email, slotId });
  if (respuesta.status !== 201) {
    throw new Error(`No se pudo crear la reserva: ${respuesta.status} ${await respuesta.text()}`);
  }
}

// ── Evidencias ──────────────────────────────────────────────────────────────

type Paso = { tipo: 'act' | 'observe' | 'extract'; instruccion: string; resultado: unknown };
let pasos: Paso[] = [];

// ── Navegador e IA ──────────────────────────────────────────────────────────

// El login no es el requisito que se prueba: se hace con selectores para no
// gastar peticiones al modelo. Las acciones del caso sí las hace la IA.
export async function iniciarSesion(session: TestSession, clave: ClaveUsuario): Promise<void> {
  const usuario = usuarios[clave];
  await session.page.goto(APP_URL);
  await esperarVisible(session, '[data-cy="login-email"]');
  await session.page.locator('[data-cy="login-email"]').fill(usuario.email);
  await session.page.locator('[data-cy="login-documento"]').fill(usuario.documento);
  await session.page.locator('[data-cy="login-submit"]').click();
  await esperarVisible(session, '[data-cy="nav-principal"]');
}

export async function act(session: TestSession, instruccion: string, variables?: Record<string, string>) {
  const resultado = await session.stagehand.act(instruccion, {
    page: session.page,
    ...(variables ? { variables } : {}),
  });
  pasos.push({ tipo: 'act', instruccion, resultado });
  return resultado;
}

export async function observe(session: TestSession, instruccion: string) {
  const resultado = await session.stagehand.observe(instruccion, { page: session.page });
  pasos.push({ tipo: 'observe', instruccion, resultado: resultado.data });
  return resultado.data;
}

export async function extract<S extends z.ZodType>(session: TestSession, instruccion: string, schema: S) {
  const resultado = await session.stagehand.extract(instruccion, schema, { page: session.page });
  pasos.push({ tipo: 'extract', instruccion, resultado: resultado.data });
  return resultado.data;
}

// Devuelve el data-cy del elemento al que apunta un selector de observe
// (XPath o CSS), para comprobar que la IA encontró el elemento correcto.
export async function dataCyDe(session: TestSession, selector: string): Promise<string | null> {
  return session.page.evaluate((sel: string) => {
    const nodo = sel.startsWith('xpath=') || sel.startsWith('/')
      ? document.evaluate(sel.replace(/^xpath=/, ''), document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
          .singleNodeValue
      : document.querySelector(sel);
    return nodo instanceof Element ? nodo.getAttribute('data-cy') : null;
  }, selector);
}

export async function esperarVisible(session: TestSession, selector: string): Promise<void> {
  await session.page.waitForSelector(selector, { state: 'visible', timeout: 15_000 });
}

export async function textoDe(session: TestSession, selector: string): Promise<string> {
  await esperarVisible(session, selector);
  return (await session.page.locator(selector).first().innerText()).trim();
}

export async function cantidad(session: TestSession, selector: string): Promise<number> {
  return session.page.locator(selector).count();
}

// ── Aserciones ──────────────────────────────────────────────────────────────

// Los textos de la app pueden llevar el prefijo "⚠ " o "● ".
export function limpiar(texto: string): string {
  return texto.replace(/^[⚠●]\s*/, '').trim();
}

export function assertEquals(actual: string, esperado: string, mensaje: string): void {
  if (limpiar(actual) !== esperado) {
    throw new Error(`${mensaje}\nEsperado: ${esperado}\nActual: ${limpiar(actual)}`);
  }
}

// Reintenta la aserción hasta 15 s, como hace Cypress: la interfaz puede
// tardar en pintar el dato nuevo después de una acción.
async function conReintentos(verificar: () => Promise<void>, limiteMs = 15_000): Promise<void> {
  const fin = Date.now() + limiteMs;
  for (;;) {
    try {
      return await verificar();
    } catch (error) {
      if (Date.now() >= fin) throw error;
      await new Promise((r) => setTimeout(r, 250));
    }
  }
}

export async function assertTexto(session: TestSession, selector: string, esperado: string): Promise<void> {
  await conReintentos(async () =>
    assertEquals(await textoDe(session, selector), esperado, `Texto inesperado en ${selector}.`));
}

export async function assertContiene(session: TestSession, selector: string, esperado: string): Promise<void> {
  await conReintentos(async () =>
    assertIncludes(await textoDe(session, selector), esperado, `Texto inesperado en ${selector}.`));
}

// ── Ejecución ───────────────────────────────────────────────────────────────

export type Caso = {
  id: string;
  nombre: string;
  // Lo que hay que dejar en la base antes de abrir el navegador.
  preparar?: () => Promise<void>;
  probar: (session: TestSession) => Promise<void>;
};

// Guarda en evidencias/<id>.json los pasos de la IA, el resultado y las
// métricas, y en evidencias/<id>.png la pantalla al terminar.
async function guardarEvidencia(session: TestSession, caso: Caso, proveedor: string, error?: unknown) {
  mkdirSync(EVIDENCIAS, { recursive: true });
  writeFileSync(new URL(`${caso.id}.png`, EVIDENCIAS), await session.page.screenshot());
  const registro = {
    caso: `${caso.id} — ${caso.nombre}`,
    proveedor,
    fecha: new Date().toISOString(),
    resultado: error ? 'FALLÓ' : 'PASÓ',
    ...(error ? { error: String(error instanceof Error ? error.message : error) } : {}),
    pasos,
    metricas: await session.stagehand.metrics(),
  };
  writeFileSync(new URL(`${caso.id}.json`, EVIDENCIAS), JSON.stringify(registro, null, 2));
}

// Cada caso corre con base limpia y navegador nuevo. La ejecución termina con
// código de error si algún caso falla.
export async function ejecutarCasos(casos: Caso[]): Promise<void> {
  const proveedor = selectedProvider();
  const fallos: string[] = [];

  for (const caso of casos) {
    pasos = [];
    try {
      await escenarioBase();
      await caso.preparar?.();
      const session = await createTestSession(proveedor);
      try {
        console.log(`[${caso.id}] ${caso.nombre}: iniciando con ${proveedor}`);
        try {
          await caso.probar(session);
        } catch (error) {
          await guardarEvidencia(session, caso, proveedor, error);
          throw error;
        }
        await guardarEvidencia(session, caso, proveedor);
        console.log(`[${caso.id}] PASÓ. Evidencia en evidencias/${caso.id}.json y .png`);
      } finally {
        await closeTestSession(session);
      }
    } catch (error) {
      console.error(`[${caso.id}] FALLÓ`, error);
      fallos.push(caso.id);
    }
  }

  if (fallos.length > 0) throw new Error(`Casos fallidos: ${fallos.join(', ')}`);
  console.log(casos.length === 1 ? 'El caso pasó.' : `Los ${casos.length} casos pasaron.`);
}

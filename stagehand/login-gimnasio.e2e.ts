import 'dotenv/config';
import { readFileSync } from 'node:fs';
import { run } from '../src/run.js';
import { closeTestSession, createTestSession, type TestSession } from '../src/stagehand.js';

const APP_URL = process.env.GIMNASIO_URL ?? 'http://localhost:5173';
const FIXTURES_PATH =
  process.env.GIMNASIO_FIXTURES ??
  'C:\\Users\\acer\\dev\\workspace\\reservas_gimnasio_udem\\regression_testing\\cypress\\fixtures\\usuarios.json';
const EDGE_PATH = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

// La prueba usa Gemini y Edge; CHROME_PATH del entorno tiene prioridad.
process.env.CHROME_PATH ||= EDGE_PATH;

type Usuario = { name: string; email: string; documento: string };
const usuarios = JSON.parse(readFileSync(FIXTURES_PATH, 'utf8')) as Record<string, Usuario>;
const estudiante = usuarios.estudiante;
if (!estudiante) throw new Error(`No existe "estudiante" en ${FIXTURES_PATH}`);

// Los mensajes de la app llevan el prefijo "⚠ "; la comparación es sobre el texto exacto restante.
function assertEquals(actual: string, expected: string, message: string): void {
  const limpio = actual.replace(/^⚠\s*/, '').trim();
  if (limpio !== expected) {
    throw new Error(`${message}\nEsperado: ${expected}\nActual: ${limpio}`);
  }
}

async function textoDe(session: TestSession, selector: string): Promise<string> {
  await session.page.waitForSelector(selector, { state: 'visible', timeout: 15_000 });
  return session.page.locator(selector).innerText();
}

async function conSesion(nombre: string, escenario: (session: TestSession) => Promise<void>): Promise<void> {
  const session = await createTestSession('gemini');
  try {
    console.log(`[gimnasio] ${nombre}: abriendo ${APP_URL}`);
    await session.page.goto(APP_URL);
    await escenario(session);
    console.log(`[gimnasio] ${nombre}: superada`);
  } finally {
    await closeTestSession(session);
  }
}

async function loginCorrecto(session: TestSession): Promise<void> {
  await session.stagehand.act('Escribe %correo% en el campo Correo institucional', {
    page: session.page,
    variables: { correo: estudiante!.email },
  });
  await session.stagehand.act('Escribe %documento% en el campo Documento de identidad', {
    page: session.page,
    variables: { documento: estudiante!.documento },
  });
  await session.stagehand.act('Haz clic en el botón Ingresar para iniciar sesión', {
    page: session.page,
  });

  const boton = await textoDe(session, '[data-cy="nav-reservar"]');
  assertEquals(boton, 'Reservar', 'No apareció el botón "Reservar" tras iniciar sesión.');
}

async function documentoIncorrecto(session: TestSession): Promise<void> {
  await session.stagehand.act('Escribe %correo% en el campo Correo institucional', {
    page: session.page,
    variables: { correo: estudiante!.email },
  });
  await session.stagehand.act('Escribe %documento% en el campo Documento de identidad', {
    page: session.page,
    variables: { documento: '9999999999' },
  });
  await session.stagehand.act('Haz clic en el botón Ingresar para iniciar sesión', {
    page: session.page,
  });

  const mensaje = await textoDe(session, '[data-cy="login-error"]');
  assertEquals(
    mensaje,
    'Correo o documento de identidad incorrectos.',
    'El mensaje de credenciales incorrectas no es el esperado.',
  );
}

async function registroConGmail(session: TestSession): Promise<void> {
  await session.stagehand.act('Haz clic en la pestaña Registrarse', { page: session.page });
  await session.stagehand.act('Escribe %correo% en el campo Correo institucional', {
    page: session.page,
    variables: { correo: 'persona.prueba@gmail.com' },
  });

  const aviso = await textoDe(session, '[data-cy="registro-aviso-dominio"]');
  assertEquals(aviso, 'Ese dominio no es institucional', 'El aviso de dominio no institucional no es el esperado.');
}

async function main(): Promise<void> {
  const casos: Array<[string, (session: TestSession) => Promise<void>]> = [
    ['a) login correcto del estudiante', loginCorrecto],
    ['b) documento incorrecto', documentoIncorrecto],
    ['c) correo gmail en el registro', registroConGmail],
  ];

  // Cada caso corre aparte para que un fallo no oculte a los demás.
  const fallos: string[] = [];
  for (const [nombre, escenario] of casos) {
    try {
      await conSesion(nombre, escenario);
    } catch (error) {
      console.error(`[gimnasio] ${nombre}: FALLÓ`, error);
      fallos.push(nombre);
    }
  }

  if (fallos.length > 0) throw new Error(`Casos fallidos: ${fallos.join('; ')}`);
  console.log('[gimnasio] Los 3 casos pasaron.');
}

run(main);

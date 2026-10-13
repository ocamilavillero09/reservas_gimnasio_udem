import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';
import { defineConfig } from 'cypress';
import react from '@vitejs/plugin-react';
import { MongoClient, ObjectId } from 'mongodb';
import mochawesome from 'cypress-mochawesome-reporter/plugin.js';

// Las pruebas de Cypress viven con las demás, en regression_testing/cypress/.
// La configuración está aquí porque Cypress necesita el node_modules de frontend/.
const RAIZ = '../regression_testing/cypress';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const MONGO_DB = process.env.MONGO_DB || 'gym_udem';

const modulo = (nombre) => fileURLToPath(new URL(`./node_modules/${nombre}`, import.meta.url));

// Acceso directo a la base de datos para preparar cada escenario. Hace las
// pruebas reproducibles: cada caso parte de un estado conocido y no depende de
// lo que hayan dejado los casos anteriores ni de la hora en que se ejecuten.
async function conDb(fn) {
  const cliente = new MongoClient(MONGO_URI);
  await cliente.connect();
  try {
    return await fn(cliente.db(MONGO_DB));
  } finally {
    await cliente.close();
  }
}

const plano = (doc) => (doc ? JSON.parse(JSON.stringify({ ...doc, _id: String(doc._id) })) : null);

const tareasBd = {
  // Deja la base como recién instalada: sin usuarios, reservas ni mensajes.
  // El catálogo de bloques horarios (slots) se conserva.
  'db:limpiar': () => conDb(async (db) => {
    await Promise.all(['users', 'reservations', 'suggestions', 'disponibilidad']
      .map((c) => db.collection(c).deleteMany({})));
    return null;
  }),
  // Inserta una reserva con la fecha y el estado que necesite el caso. La API
  // solo deja reservar para mañana, así que las de hoy o de ayer se siembran aquí.
  'db:insertarReserva': ({ email, slotId = 1, hour = '06:00', reserva_date, estado = 'ACTIVA' }) =>
    conDb(async (db) => {
      const r = await db.collection('reservations').insertOne({
        email, slotId, hour, reserva_date, date: reserva_date, estado,
        created_by: email, created_at: new Date(),
      });
      return String(r.insertedId);
    }),
  'db:leerReserva': (id) => conDb(async (db) =>
    plano(await db.collection('reservations').findOne({ _id: new ObjectId(id) }))),
  'db:leerUsuario': (email) => conDb(async (db) =>
    plano(await db.collection('users').findOne({ email }))),
  'db:fijarInasistencias': ({ email, cantidad }) => conDb(async (db) => {
    await db.collection('users').updateOne({ email }, { $set: { no_show_count: cantidad } });
    return null;
  }),
  'db:actualizarUsuario': ({ email, campos }) => conDb(async (db) => {
    await db.collection('users').updateOne({ email }, { $set: campos });
    return null;
  }),
  // Guarda resultados (por ejemplo las violaciones de accesibilidad) junto a
  // las evidencias de la ejecución.
  'guardarJson': ({ ruta, datos }) => {
    const destino = path.resolve(RAIZ, ruta);
    fs.mkdirSync(path.dirname(destino), { recursive: true });
    fs.writeFileSync(destino, JSON.stringify(datos, null, 2));
    return null;
  },
  'db:contarSugerencias': () => conDb((db) => db.collection('suggestions').countDocuments({})),
};

// Cada ejecución (api, ui, componentes, defectos...) guarda su informe y sus
// evidencias en su propia carpeta, para que una no sobrescriba a la otra. El
// nombre llega con --env informe=<nombre> desde los scripts de package.json.
function carpetaDeInforme(config) {
  const nombre = config.env.informe || config.testingType;
  config.reporterOptions = { ...config.reporterOptions, reportDir: `${RAIZ}/reports/${nombre}` };
  config.screenshotsFolder = `${RAIZ}/evidencias/${nombre}/capturas`;
  config.videosFolder = `${RAIZ}/evidencias/${nombre}/videos`;
  return config;
}

const reporter = {
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: `${RAIZ}/reports`,
    reportPageTitle: 'Reservas Gimnasio UdeM — Pruebas Cypress',
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },
};

export default defineConfig({
  ...reporter,
  video: true,
  videosFolder: `${RAIZ}/evidencias/videos`,
  screenshotsFolder: `${RAIZ}/evidencias/capturas`,
  fixturesFolder: `${RAIZ}/fixtures`,
  viewportWidth: 1280,
  viewportHeight: 900,
  defaultCommandTimeout: 8000,
  retries: { runMode: 1, openMode: 0 },
  env: {
    apiUrl: process.env.CYPRESS_API_URL || 'http://localhost:8000/api',
  },

  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || 'http://localhost:5173',
    specPattern: `${RAIZ}/e2e/**/*.cy.js`,
    supportFile: `${RAIZ}/support/e2e.js`,
    setupNodeEvents(on, config) {
      carpetaDeInforme(config);
      mochawesome(on);
      on('task', tareasBd);
      return config;
    },
  },

  component: {
    specPattern: `${RAIZ}/component/**/*.cy.jsx`,
    supportFile: `${RAIZ}/support/component.js`,
    indexHtmlFile: `${RAIZ}/support/component-index.html`,
    devServer: {
      framework: 'react',
      bundler: 'vite',
      // Las pruebas de componentes están fuera de frontend/: se apuntan a mano
      // las librerías al node_modules de frontend/, igual que hace Vitest.
      viteConfig: {
        plugins: [react()],
        resolve: {
          alias: [
            { find: /^react$/, replacement: modulo('react') },
            { find: /^react\/(.*)$/, replacement: modulo('react/$1') },
            { find: /^react-dom$/, replacement: modulo('react-dom') },
            { find: /^react-dom\/(.*)$/, replacement: modulo('react-dom/$1') },
            { find: /^cypress\/(.*)$/, replacement: modulo('cypress/$1') },
            {
              find: /^cypress-mochawesome-reporter\/(.*)$/,
              replacement: modulo('cypress-mochawesome-reporter/$1'),
            },
          ],
        },
        // El registro del reporte es CommonJS: Vite debe pre-empaquetarlo.
        optimizeDeps: { include: ['cypress-mochawesome-reporter/register'] },
        server: { fs: { allow: ['..'] } },
      },
    },
    setupNodeEvents(on, config) {
      carpetaDeInforme(config);
      mochawesome(on);
      return config;
    },
  },
});

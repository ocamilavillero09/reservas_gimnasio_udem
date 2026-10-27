// Proyecto aparte para las pruebas con IA de Cypress Cloud. cy.prompt necesita
// Cypress 15 y una cuenta de Cypress Cloud; el resto del equipo sigue con la
// configuración de frontend/ (Cypress 13), que no se toca.
const { defineConfig } = require('cypress');
const { MongoClient } = require('mongodb');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const MONGO_DB = process.env.MONGO_DB || 'gym_udem';

async function conDb(fn) {
  const cliente = new MongoClient(MONGO_URI);
  await cliente.connect();
  try {
    return await fn(cliente.db(MONGO_DB));
  } finally {
    await cliente.close();
  }
}

// Las mismas tareas que usa cy.escenarioBase() en frontend/cypress.config.js.
const tareasBd = {
  'db:limpiar': () => conDb(async (db) => {
    await Promise.all(['users', 'reservations', 'suggestions', 'disponibilidad']
      .map((c) => db.collection(c).deleteMany({})));
    return null;
  }),
  'db:insertarReserva': ({ email, slotId = 1, hour = '06:00', reserva_date, estado = 'ACTIVA' }) =>
    conDb(async (db) => {
      const r = await db.collection('reservations').insertOne({
        email, slotId, hour, reserva_date, date: reserva_date, estado,
        created_by: email, created_at: new Date(),
      });
      return String(r.insertedId);
    }),
};

module.exports = defineConfig({
  projectId: 'qsm9br',
  fixturesFolder: '../../../fixtures',
  screenshotsFolder: 'Evidencia/capturas',
  videosFolder: 'Evidencia/videos',
  video: true,
  viewportWidth: 1280,
  viewportHeight: 900,
  defaultCommandTimeout: 8000,
  env: {
    apiUrl: process.env.CYPRESS_API_URL || 'http://localhost:8000/api',
  },
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || 'http://localhost:5173',
    specPattern: 'Pruebas/**/*.cy.js',
    supportFile: 'support/e2e.js',
    setupNodeEvents(on, config) {
      on('task', tareasBd);
      return config;
    },
  },
});

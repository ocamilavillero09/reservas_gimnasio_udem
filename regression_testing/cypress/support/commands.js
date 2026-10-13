// Comandos compartidos por las pruebas E2E y de API.

const API = () => Cypress.env('apiUrl');

// Fecha en la zona horaria del gimnasio (America/Bogota), en formato ISO.
// El backend decide "hoy" con esa zona, así que las pruebas también.
export function fechaBogota(desplazamientoDias = 0) {
  const ahora = new Date(Date.now() + desplazamientoDias * 86400000);
  return ahora.toLocaleDateString('en-CA', { timeZone: 'America/Bogota' });
}

export const HOY = () => fechaBogota(0);
export const AYER = () => fechaBogota(-1);
export const MANANA = () => fechaBogota(1);

// Petición a la API que devuelve la respuesta aunque sea un error, para poder
// verificar los casos negativos (400, 403, 404, 409).
Cypress.Commands.add('api', (method, ruta, body) =>
  cy.request({ method, url: `${API()}${ruta}`, body, failOnStatusCode: false }));

Cypress.Commands.add('limpiarBd', () => cy.task('db:limpiar'));

// Registra por la API a los usuarios del fixture que se pidan. El primero con
// rol ADMIN queda como administrador principal.
Cypress.Commands.add('crearUsuarios', (...claves) => {
  cy.fixture('usuarios').then((usuarios) => {
    claves.forEach((clave) => {
      cy.api('POST', '/auth/register/', usuarios[clave]).its('status').should('eq', 201);
    });
  });
});

// Escenario base: administrador, entrenador y dos estudiantes.
Cypress.Commands.add('escenarioBase', () => {
  cy.limpiarBd();
  cy.crearUsuarios('admin', 'entrenador', 'estudiante', 'estudiante2');
});

Cypress.Commands.add('sembrarReserva', (email, opciones = {}) =>
  cy.task('db:insertarReserva', { email, reserva_date: HOY(), ...opciones }));

// Inicio de sesión por la interfaz, guardado con cy.session para no repetirlo
// en cada caso. Se valida que la sesión siga viva antes de reutilizarla.
Cypress.Commands.add('iniciarSesion', (clave) => {
  cy.fixture('usuarios').then((usuarios) => {
    const u = usuarios[clave];
    cy.session([clave, u.email], () => {
      cy.visit('/');
      cy.get('input[placeholder*="@"]').type(u.email);
      cy.get('input[placeholder="Ej: 1001234567"]').type(u.documento);
      cy.contains('button', 'Ingresar').click();
      cy.contains('button', 'Perfil').should('be.visible');
    }, {
      validate() {
        cy.window().its('localStorage').invoke('getItem', 'gym_udem_session').should('contain', u.email);
      },
    });
    cy.visitarYEsperar(() => cy.visit('/'));
  });
});

// Espera a que la app termine de rehidratar la sesión (sesión + horarios +
// reservas) antes de seguir. Sin esta espera, recargar con una petición en
// vuelo dispara el defecto DEF-03: la app cierra la sesión del usuario.
Cypress.Commands.add('visitarYEsperar', (navegar) => {
  cy.intercept('GET', '**/api/auth/session/*').as('rehidratarSesion');
  cy.intercept('GET', '**/api/reservations/?*').as('rehidratarReservas');
  navegar();
  cy.wait(['@rehidratarSesion', '@rehidratarReservas']);
});

// Recarga el panel y espera a que vuelva a estar pintado y con datos.
Cypress.Commands.add('recargarPanel', () => {
  cy.visitarYEsperar(() => cy.reload());
  cy.contains('h2', 'Panel del gimnasio').should('be.visible');
});

// Cuadro de evidencia: deja una captura con nombre del caso para el informe.
Cypress.Commands.add('evidencia', (nombre) => cy.screenshot(nombre, { capture: 'viewport', overwrite: true }));

// Defectos encontrados durante la regresión.
//
// Cada prueba afirma el comportamiento CORRECTO esperado. Mientras el defecto
// siga en el código, la prueba FALLA: ese fallo es la evidencia del defecto.
// Cuando el equipo lo corrija, la prueba pasa a verde y queda como regresión.
// Se ejecutan aparte (npm run cy:defectos) para no mezclar defectos conocidos
// con la suite de regresión, que debe estar en verde.
import { MANANA } from '../../support/commands';

describe('Defectos conocidos', () => {
  let u;

  before(() => cy.fixture('usuarios').then((f) => { u = f; }));
  beforeEach(() => cy.escenarioBase());

  it('DEF-01 (RF13) · Cerrar la jornada con una fecha futura NO debe penalizar reservas de mañana', () => {
    // El backend acepta "fecha" del cliente sin validarla y procesa todo lo
    // que tenga reserva_date <= fecha, incluidas las reservas de mañana.
    cy.sembrarReserva(u.estudiante.email, { reserva_date: MANANA() }).as('manana');
    cy.api('POST', '/attendance/process/', { actor_email: u.entrenador.email, fecha: MANANA() }).as('respuesta');
    // Primero la consecuencia: la reserva de mañana debe seguir ACTIVA...
    cy.get('@manana').then((id) => cy.task('db:leerReserva', id).its('estado').should('eq', 'ACTIVA'));
    cy.task('db:leerUsuario', u.estudiante.email).its('no_show_count').should('eq', 0);
    // ...y la API debería rechazar una fecha futura.
    cy.get('@respuesta').its('status').should('eq', 400);
  });

  it('DEF-02 (seguridad, RF11–RF21) · Sin credenciales, conocer el correo del administrador no debe dar acceso al buzón', () => {
    // La API no autentica: la identidad es el actor_email que manda el cliente.
    cy.api('POST', '/suggestions/', { email: u.estudiante.email, mensaje: 'Mensaje privado' });
    cy.request({
      url: `${Cypress.env('apiUrl')}/suggestions/inbox/?actor_email=${u.admin.email}`,
      headers: {},            // sin token ni cookie de sesión
      failOnStatusCode: false,
    }).its('status').should('be.oneOf', [401, 403]);
  });

  it('DEF-02b (seguridad, RF20) · Un tercero no debe poder enviar mensajes a nombre de un estudiante', () => {
    cy.request({
      method: 'POST',
      url: `${Cypress.env('apiUrl')}/suggestions/`,
      body: { email: u.estudiante.email, mensaje: 'Mensaje que Laura nunca escribió' },
      failOnStatusCode: false,
    }).its('status').should('be.oneOf', [401, 403]);
  });

  it('DEF-03 (sesión) · Recargar la página (F5) mientras la app carga datos NO debe cerrar la sesión', () => {
    // App.jsx envuelve sesión + datos en un solo try/catch: si una petición se
    // interrumpe (por ejemplo al recargar), cae en el catch, hace
    // saveSession(null) y borra la sesión guardada. Al volver a cargar, el
    // usuario aparece en la pantalla de inicio de sesión.
    cy.iniciarSesion('entrenador');
    // Se hace lenta la carga de reservas para poder recargar en medio de ella.
    let enVuelo = false;
    cy.intercept({ method: 'GET', pathname: '/api/reservations/', times: 1 }, (req) => {
      enVuelo = true;
      req.reply({ delay: 4000, body: [] });
    });
    cy.reload();
    cy.wrap(null).should(() => expect(enVuelo, 'petición de reservas en vuelo').to.eq(true));
    cy.reload();                          // F5 con la petición todavía en vuelo
    cy.contains('Bienvenido de nuevo').should('not.exist');
    cy.contains('h2', 'Panel del gimnasio').should('be.visible');
    cy.evidencia('DEF-03-recarga');
  });

  it('DEF-04 (RF21) · La hora del mensaje en el buzón debe mostrarse en hora de Colombia', () => {
    // El backend guarda la fecha en UTC. Antes, la interfaz cortaba el texto
    // ISO sin convertirlo: un mensaje de las 3:00 p. m. aparecía como 20:00.
    cy.api('POST', '/suggestions/', { email: u.estudiante.email, mensaje: 'Revisar la hora' });
    cy.api('GET', `/suggestions/inbox/?actor_email=${u.admin.email}`).its('body.mensajes.0.fecha').then((fecha) => {
      const esperada = new Date(fecha).toLocaleString('sv-SE', { timeZone: 'America/Bogota' }).slice(0, 16);
      cy.iniciarSesion('admin');
      cy.contains('button', 'Usuarios').click();
      cy.contains('Revisar la hora').parent().within(() => {
        cy.contains(esperada).should('exist');
      });
    });
    cy.evidencia('DEF-04-hora-buzon');
  });
});

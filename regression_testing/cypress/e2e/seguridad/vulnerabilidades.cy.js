// Pruebas de seguridad — vulnerabilidades.
//
// Cada prueba afirma el comportamiento SEGURO. Mientras la vulnerabilidad
// exista, la prueba FALLA y su error es la evidencia. Cuando se corrige, pasa a
// verde y queda como prueba de regresión de seguridad.
// Referencia: OWASP Top 10 (2021).
import { MANANA } from '../../support/commands';

const API = () => Cypress.env('apiUrl');

describe('Seguridad — vulnerabilidades', () => {
  let u;

  before(() => cy.fixture('usuarios').then((f) => { u = f; }));
  beforeEach(() => cy.escenarioBase());

  context('A01 — Control de acceso roto (requiere autenticación)', () => {
    it('VUL-01 · Sin credenciales, conocer el correo del administrador NO debe dar acceso al buzón', () => {
      cy.api('POST', '/suggestions/', { email: u.estudiante.email, mensaje: 'Mensaje privado' });
      cy.api('GET', `/suggestions/inbox/?actor_email=${u.admin.email}`)
        .its('status').should('be.oneOf', [401, 403]);
    });

    it('VUL-02 · La sesión de un usuario NO debe consultarse sin credenciales (expone su documento, que es su contraseña)', () => {
      cy.api('GET', `/auth/session/?email=${u.admin.email}`).then((r) => {
        expect(r.body, 'la respuesta no debe traer el documento').not.to.have.property('documento');
        expect(r.status).to.be.oneOf([401, 403]);
      });
    });

    it('VUL-03 · Nadie debe poder enviar mensajes al buzón a nombre de otro estudiante', () => {
      cy.api('POST', '/suggestions/', { email: u.estudiante.email, mensaje: 'Mensaje que Laura nunca escribió' })
        .its('status').should('be.oneOf', [401, 403]);
    });

    it('VUL-04 · Un estudiante NO debe poder cancelar la reserva de otro (IDOR)', () => {
      cy.sembrarReserva(u.estudiante.email, { reserva_date: MANANA() }).then((idAjena) => {
        // Mateo conoce el id de la reserva de Laura y la cancela.
        cy.api('DELETE', `/reservations/${idAjena}/?email=${u.estudiante2.email}`)
          .its('status').should('be.oneOf', [401, 403]);
        cy.task('db:leerReserva', idAjena).its('estado').should('eq', 'ACTIVA');
      });
    });
  });

  context('A04 — Diseño inseguro', () => {
    it('VUL-05 · Cerrar la jornada con una fecha futura debe rechazarse y no penalizar reservas de mañana', () => {
      cy.sembrarReserva(u.estudiante.email, { reserva_date: MANANA() }).as('manana');
      cy.api('POST', '/attendance/process/', { actor_email: u.entrenador.email, fecha: MANANA() }).as('r');
      cy.get('@manana').then((id) => cy.task('db:leerReserva', id).its('estado').should('eq', 'ACTIVA'));
      cy.task('db:leerUsuario', u.estudiante.email).its('no_show_count').should('eq', 0);
      cy.get('@r').its('status').should('eq', 400);
    });
  });

  context('A07 — Fallas de identificación y autenticación', () => {
    it('VUL-06 · Tras varios intentos fallidos el login debe bloquearse temporalmente (fuerza bruta)', () => {
      const intentos = Array.from({ length: 12 }, (_, i) => `${9000000000 + i}`);
      const estados = [];
      cy.wrap(intentos).each((doc) =>
        cy.api('POST', '/auth/login/', { email: u.estudiante.email, documento: doc })
          .then((r) => estados.push(r.status)));
      cy.wrap(estados).should('include', 429);
      // Durante el bloqueo, ni siquiera la contraseña correcta entra.
      cy.api('POST', '/auth/login/', { email: u.estudiante.email, documento: u.estudiante.documento })
        .its('status').should('eq', 429);
    });
  });

  context('A03 — Inyección y validación de entradas', () => {
    it('VUL-07 · Un operador de MongoDB en el login debe responder 400, no un error 500', () => {
      cy.api('POST', '/auth/login/', { email: { $ne: '' }, documento: { $ne: '' } }).then((r) => {
        expect(r.status).to.eq(400);
        expect(r.headers['content-type']).to.contain('application/json');
      });
    });

    it('VUL-08 · Un dato que la base de datos rechaza debe responder 400 con un mensaje, no 500', () => {
      cy.api('POST', '/auth/register/', { name: 'X', email: 'x.y@soyudemedellin.edu.co', documento: '1000000098' })
        .then((r) => {
          expect(r.status).to.eq(400);
          expect(r.body).to.have.property('error');
        });
    });
  });

  context('A05 — Configuración de seguridad incorrecta', () => {
    it('VUL-09 · Los errores no deben mostrar trazas ni la configuración interna (DEBUG apagado)', () => {
      cy.request({ url: `${API()}/ruta-que-no-existe/`, failOnStatusCode: false }).then((r) => {
        expect(r.status).to.eq(404);
        const texto = typeof r.body === 'string' ? r.body : JSON.stringify(r.body);
        expect(texto.includes('URLconf'), 'la página 404 lista las rutas internas (URLconf)').to.eq(false);
        expect(texto.includes('DEBUG = True'), 'la página anuncia DEBUG = True').to.eq(false);
      });
      cy.api('POST', '/auth/login/', { email: ['lista'], documento: 'x' }).then((r) => {
        expect(JSON.stringify(r.body)).not.to.contain('Traceback');
      });
    });

    it('VUL-10 · La API debe enviar cabeceras de seguridad', () => {
      cy.request(`${API()}/config/`).its('headers').should((h) => {
        expect(h, 'X-Content-Type-Options').to.have.property('x-content-type-options', 'nosniff');
        expect(h, 'X-Frame-Options').to.have.property('x-frame-options');
        expect(h, 'Referrer-Policy').to.have.property('referrer-policy');
      });
    });

    it('VUL-11 · CORS no debe aceptar cualquier origen', () => {
      cy.request({ url: `${API()}/config/`, headers: { Origin: 'https://sitio-malicioso.example' } })
        .its('headers').should((h) => {
          expect(h['access-control-allow-origin']).not.to.eq('*');
          expect(h['access-control-allow-origin']).not.to.eq('https://sitio-malicioso.example');
        });
    });
  });
});

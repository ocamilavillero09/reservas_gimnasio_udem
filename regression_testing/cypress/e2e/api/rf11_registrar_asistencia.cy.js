// RF11 — Registrar la asistencia de un estudiante.
// Endpoints: GET /students/lookup/ (buscar por documento) y POST /attendance/register/.
// Regla RN12: solo el mismo día de la reserva y desde la hora en que empieza el bloque.
// Las reservas de hoy se siembran en el bloque de las 06:00, que ya empezó en
// cualquier ejecución después de esa hora.
import { AYER, MANANA } from '../../support/commands';

describe('RF11 — Registrar asistencia (API)', () => {
  let u;

  before(() => cy.fixture('usuarios').then((f) => { u = f; }));
  beforeEach(() => cy.escenarioBase());

  context('Buscar al estudiante por documento', () => {
    it('API-RF11-01 · El entrenador encuentra la reserva de hoy marcada como HOY', () => {
      cy.sembrarReserva(u.estudiante.email);
      cy.api('GET', `/students/lookup/?documento=${u.estudiante.documento}&actor_email=${u.entrenador.email}`)
        .then((r) => {
          expect(r.status).to.eq(200);
          expect(r.body.tiene_reserva).to.eq(true);
          expect(r.body.estudiante.email).to.eq(u.estudiante.email);
          expect(r.body.reservas).to.have.length(1);
          expect(r.body.reservas[0].es_de_hoy).to.eq(true);
        });
    });

    it('API-RF11-02 · Estudiante sin reservas: tiene_reserva = false', () => {
      cy.api('GET', `/students/lookup/?documento=${u.estudiante.documento}&actor_email=${u.entrenador.email}`)
        .then((r) => {
          expect(r.status).to.eq(200);
          expect(r.body.tiene_reserva).to.eq(false);
          expect(r.body.reservas).to.be.empty;
        });
    });

    it('API-RF11-03 · Documento que no existe → 404', () => {
      cy.api('GET', `/students/lookup/?documento=9999999999&actor_email=${u.entrenador.email}`)
        .then((r) => {
          expect(r.status).to.eq(404);
          expect(r.body.error).to.contain('9999999999');
        });
    });

    it('API-RF11-04 · Un estudiante no puede buscar reservas de otros → 403', () => {
      cy.api('GET', `/students/lookup/?documento=${u.estudiante2.documento}&actor_email=${u.estudiante.email}`)
        .its('status').should('eq', 403);
    });

    it('API-RF11-05 · Sin documento → 400', () => {
      cy.api('GET', `/students/lookup/?actor_email=${u.entrenador.email}`).its('status').should('eq', 400);
    });
  });

  context('Registrar la asistencia', () => {
    it('API-RF11-06 · Entrenador registra por id de reserva → 200 y la reserva queda COMPLETADA', () => {
      cy.sembrarReserva(u.estudiante.email).then((id) => {
        cy.api('POST', '/attendance/register/', { actor_email: u.entrenador.email, reservation_id: id })
          .then((r) => {
            expect(r.status).to.eq(200);
            expect(r.body.message).to.eq('Asistencia registrada.');
            expect(r.body.notificacion).to.contain('06:00');
          });
        cy.task('db:leerReserva', id).then((reserva) => {
          expect(reserva.estado).to.eq('COMPLETADA');
          expect(reserva.registrada_por).to.eq(u.entrenador.email);
        });
      });
    });

    it('API-RF11-07 · Entrenador registra por documento → 200', () => {
      cy.sembrarReserva(u.estudiante.email);
      cy.api('POST', '/attendance/register/', { actor_email: u.entrenador.email, documento: u.estudiante.documento })
        .its('status').should('eq', 200);
    });

    it('API-RF11-08 · El administrador también puede registrar → 200', () => {
      cy.sembrarReserva(u.estudiante.email).then((id) => {
        cy.api('POST', '/attendance/register/', { actor_email: u.admin.email, reservation_id: id })
          .its('status').should('eq', 200);
      });
    });

    it('API-RF11-09 · Un estudiante no puede registrar asistencias → 403 y la reserva no cambia', () => {
      cy.sembrarReserva(u.estudiante2.email).then((id) => {
        cy.api('POST', '/attendance/register/', { actor_email: u.estudiante.email, reservation_id: id })
          .its('status').should('eq', 403);
        cy.task('db:leerReserva', id).its('estado').should('eq', 'ACTIVA');
      });
    });

    it('API-RF11-10 · Actor que no existe → 403', () => {
      cy.api('POST', '/attendance/register/', { actor_email: 'nadie@udem.edu.co', documento: u.estudiante.documento })
        .its('status').should('eq', 403);
    });

    it('API-RF11-11 · Id de reserva con formato inválido → 400', () => {
      cy.api('POST', '/attendance/register/', { actor_email: u.entrenador.email, reservation_id: 'abc' })
        .its('status').should('eq', 400);
    });

    it('API-RF11-12 · Sin documento ni id → 400', () => {
      cy.api('POST', '/attendance/register/', { actor_email: u.entrenador.email })
        .its('status').should('eq', 400);
    });

    it('API-RF11-13 · Estudiante sin reserva activa hoy → 404', () => {
      cy.api('POST', '/attendance/register/', { actor_email: u.entrenador.email, documento: u.estudiante.documento })
        .then((r) => {
          expect(r.status).to.eq(404);
          expect(r.body.error).to.contain('no tiene una reserva activa');
        });
    });

    it('API-RF11-14 · Reserva de mañana → 409 (la jornada todavía no llega)', () => {
      cy.sembrarReserva(u.estudiante.email, { reserva_date: MANANA() }).then((id) => {
        cy.api('POST', '/attendance/register/', { actor_email: u.entrenador.email, reservation_id: id })
          .then((r) => {
            expect(r.status).to.eq(409);
            expect(r.body.error).to.contain('todavía no llega');
          });
        cy.task('db:leerReserva', id).its('estado').should('eq', 'ACTIVA');
      });
    });

    it('API-RF11-15 · Reserva de ayer → 409 (la jornada ya pasó)', () => {
      cy.sembrarReserva(u.estudiante.email, { reserva_date: AYER() }).then((id) => {
        cy.api('POST', '/attendance/register/', { actor_email: u.entrenador.email, reservation_id: id })
          .then((r) => {
            expect(r.status).to.eq(409);
            expect(r.body.error).to.contain('ya pasó');
          });
      });
    });

    it('API-RF11-16 · Registrar dos veces la misma reserva → el segundo intento se rechaza', () => {
      cy.sembrarReserva(u.estudiante.email).then((id) => {
        const cuerpo = { actor_email: u.entrenador.email, reservation_id: id };
        cy.api('POST', '/attendance/register/', cuerpo).its('status').should('eq', 200);
        cy.api('POST', '/attendance/register/', cuerpo).its('status').should('be.oneOf', [404, 409]);
      });
    });
  });
});

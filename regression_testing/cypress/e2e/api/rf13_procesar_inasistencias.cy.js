// RF13 — Procesar las inasistencias al cerrar la jornada.
// Endpoint: POST /attendance/process/  { actor_email, fecha? }
// Solo el ENTRENADOR cierra la jornada. Cada reserva ACTIVA hasta hoy pasa a
// NO_SHOW, suma una inasistencia y al llegar a 5 el estudiante queda PENALIZADO.
import { AYER, MANANA } from '../../support/commands';

describe('RF13 — Procesar inasistencias (API)', () => {
  let u;

  before(() => cy.fixture('usuarios').then((f) => { u = f; }));
  beforeEach(() => cy.escenarioBase());

  const cerrarJornada = (actor) => cy.api('POST', '/attendance/process/', { actor_email: actor });

  it('API-RF13-01 · Sin pendientes: no procesa nada y lo informa', () => {
    cerrarJornada(u.entrenador.email).then((r) => {
      expect(r.status).to.eq(200);
      expect(r.body.total_procesadas).to.eq(0);
      expect(r.body.message).to.contain('No había inasistencias pendientes');
    });
  });

  it('API-RF13-02 · Marca como NO_SHOW la de hoy y la de ayer, y suma una inasistencia a cada estudiante', () => {
    cy.sembrarReserva(u.estudiante.email).as('hoy');
    cy.sembrarReserva(u.estudiante2.email, { reserva_date: AYER() }).as('ayer');

    cerrarJornada(u.entrenador.email).then((r) => {
      expect(r.status).to.eq(200);
      expect(r.body.total_procesadas).to.eq(2);
      expect(r.body.total_penalizados).to.eq(0);
    });
    cy.get('@hoy').then((id) => cy.task('db:leerReserva', id).its('estado').should('eq', 'NO_SHOW'));
    cy.get('@ayer').then((id) => cy.task('db:leerReserva', id).its('estado').should('eq', 'NO_SHOW'));
    cy.task('db:leerUsuario', u.estudiante.email).its('no_show_count').should('eq', 1);
    cy.task('db:leerUsuario', u.estudiante2.email).its('no_show_count').should('eq', 1);
  });

  it('API-RF13-03 · Con la quinta inasistencia el estudiante queda PENALIZADO', () => {
    cy.task('db:fijarInasistencias', { email: u.estudiante.email, cantidad: 4 });
    cy.sembrarReserva(u.estudiante.email);

    cerrarJornada(u.entrenador.email).then((r) => {
      expect(r.body.total_penalizados).to.eq(1);
      expect(r.body.message).to.contain(u.estudiante.name);
      expect(r.body.procesados[0].penalizado).to.eq(true);
    });
    cy.task('db:leerUsuario', u.estudiante.email).should((est) => {
      expect(est.no_show_count).to.eq(5);
      expect(est.estado).to.eq('PENALIZADO');
      expect(est.penalizado_hasta).to.be.a('string');
    });
  });

  it('API-RF13-04 · Con cuatro inasistencias o menos no se penaliza', () => {
    cy.task('db:fijarInasistencias', { email: u.estudiante.email, cantidad: 3 });
    cy.sembrarReserva(u.estudiante.email);
    cerrarJornada(u.entrenador.email).its('body.total_penalizados').should('eq', 0);
    cy.task('db:leerUsuario', u.estudiante.email).its('estado').should('eq', 'ACTIVO');
  });

  it('API-RF13-05 · No toca las reservas de mañana ni las COMPLETADAS', () => {
    cy.sembrarReserva(u.estudiante.email, { reserva_date: MANANA() }).as('manana');
    cy.sembrarReserva(u.estudiante2.email, { estado: 'COMPLETADA' }).as('completada');

    cerrarJornada(u.entrenador.email).its('body.total_procesadas').should('eq', 0);
    cy.get('@manana').then((id) => cy.task('db:leerReserva', id).its('estado').should('eq', 'ACTIVA'));
    cy.get('@completada').then((id) => cy.task('db:leerReserva', id).its('estado').should('eq', 'COMPLETADA'));
  });

  it('API-RF13-06 · Cerrar la jornada dos veces no cuenta doble la inasistencia', () => {
    cy.sembrarReserva(u.estudiante.email);
    cerrarJornada(u.entrenador.email).its('body.total_procesadas').should('eq', 1);
    cerrarJornada(u.entrenador.email).its('body.total_procesadas').should('eq', 0);
    cy.task('db:leerUsuario', u.estudiante.email).its('no_show_count').should('eq', 1);
  });

  it('API-RF13-07 · El administrador no puede cerrar la jornada → 403', () => {
    cy.sembrarReserva(u.estudiante.email).then((id) => {
      cerrarJornada(u.admin.email).its('status').should('eq', 403);
      cy.task('db:leerReserva', id).its('estado').should('eq', 'ACTIVA');
    });
  });

  it('API-RF13-08 · Un estudiante no puede cerrar la jornada → 403', () => {
    cerrarJornada(u.estudiante.email).its('status').should('eq', 403);
  });
});

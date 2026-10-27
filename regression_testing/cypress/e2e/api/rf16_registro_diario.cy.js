// RF16 — Ver el registro diario del gimnasio (entrenador).
// Endpoint: GET /reports/daily/entrenador/?actor_email=...&fecha=...
// Incluye también el PDF que se descarga desde la misma tarjeta del panel.
import { AYER, HOY } from '../../support/commands';

describe('RF16 — Registro diario del entrenador (API)', () => {
  let u;

  before(() => cy.fixture('usuarios').then((f) => { u = f; }));
  beforeEach(() => cy.escenarioBase());

  const registro = (actor, fecha = '') =>
    cy.api('GET', `/reports/daily/entrenador/?actor_email=${actor}&fecha=${fecha}`);

  it('API-RF16-01 · Día sin actividad: todos los totales en cero y seis bloques', () => {
    registro(u.entrenador.email).then((r) => {
      expect(r.status).to.eq(200);
      expect(r.body.fecha).to.eq(HOY());
      expect(r.body.totales).to.include({
        reservas: 0, asistencias: 0, cancelaciones: 0, inasistencias: 0, pendientes: 0,
      });
      expect(r.body.bloques).to.have.length(6);
    });
  });

  it('API-RF16-02 · Cuenta asistencias, cancelaciones, inasistencias y pendientes del día', () => {
    cy.sembrarReserva(u.estudiante.email, { estado: 'COMPLETADA', slotId: 1, hour: '06:00' });
    cy.sembrarReserva(u.estudiante2.email, { estado: 'CANCELADA', slotId: 2, hour: '08:00' });
    cy.sembrarReserva(u.estudiante2.email, { estado: 'NO_SHOW', slotId: 3, hour: '10:00' });
    cy.sembrarReserva(u.estudiante.email, { estado: 'ACTIVA', slotId: 4, hour: '12:00' });

    registro(u.entrenador.email).then((r) => {
      expect(r.body.totales).to.include({
        reservas: 4, asistencias: 1, cancelaciones: 1, inasistencias: 1, pendientes: 1,
      });
      expect(r.body.asistencias[0]).to.include({ email: u.estudiante.email, hour: '06:00' });
      const bloque1 = r.body.bloques.find((b) => b.slotId === 1);
      expect(bloque1).to.include({ reservados: 1, asistencias: 1 });
    });
  });

  it('API-RF16-03 · Lista a los estudiantes penalizados', () => {
    cy.task('db:fijarInasistencias', { email: u.estudiante.email, cantidad: 4 });
    cy.sembrarReserva(u.estudiante.email);
    cy.api('POST', '/attendance/process/', { actor_email: u.entrenador.email });

    registro(u.entrenador.email).then((r) => {
      expect(r.body.totales.estudiantes_penalizados).to.eq(1);
      expect(r.body.penalizados[0]).to.include({ email: u.estudiante.email, no_show_count: 5 });
    });
  });

  it('API-RF16-04 · Consultar otro día con ?fecha devuelve solo la actividad de ese día', () => {
    cy.sembrarReserva(u.estudiante.email, { estado: 'COMPLETADA', reserva_date: AYER() });
    registro(u.entrenador.email, AYER()).its('body.totales.asistencias').should('eq', 1);
    registro(u.entrenador.email).its('body.totales.asistencias').should('eq', 0);
  });

  it('API-RF16-05 · El administrador usa su propio registro (RF17): aquí recibe 403', () => {
    registro(u.admin.email).its('status').should('eq', 403);
  });

  it('API-RF16-06 · Un estudiante no puede ver el registro → 403', () => {
    registro(u.estudiante.email).its('status').should('eq', 403);
  });

  it('API-RF16-07 · El PDF del registro se genera para el entrenador', () => {
    cy.tokenDe(u.entrenador.email).then((token) => cy.request({
      url: `${Cypress.env('apiUrl')}/reports/daily/entrenador.pdf?actor_email=${u.entrenador.email}`,
      headers: { Authorization: `Bearer ${token}` },
      encoding: 'binary',
    })).then((r) => {
      expect(r.status).to.eq(200);
      expect(r.headers['content-type']).to.contain('application/pdf');
      expect(r.body.slice(0, 4)).to.eq('%PDF');
    });
  });
});

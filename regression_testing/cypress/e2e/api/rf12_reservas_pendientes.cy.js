// RF12 — Consultar las reservas sin asistencia registrada.
// Endpoint: GET /attendance/pending/?actor_email=...&fecha=...
// Deben aparecer las reservas ACTIVAS de hoy y de días anteriores sin procesar,
// pero no las de días futuros.
import { AYER, MANANA } from '../../support/commands';

describe('RF12 — Reservas sin asistencia registrada (API)', () => {
  let u;

  before(() => cy.fixture('usuarios').then((f) => { u = f; }));
  beforeEach(() => cy.escenarioBase());

  const pendientes = (actor) => cy.api('GET', `/attendance/pending/?actor_email=${actor}`);

  it('API-RF12-01 · Sin reservas pendientes: total 0 y lista vacía', () => {
    pendientes(u.entrenador.email).then((r) => {
      expect(r.status).to.eq(200);
      expect(r.body.total).to.eq(0);
      expect(r.body.pendientes).to.be.empty;
      expect(r.body.no_show_limite).to.eq(5);
    });
  });

  it('API-RF12-02 · Incluye las de hoy y las de ayer sin procesar; excluye las de mañana', () => {
    cy.sembrarReserva(u.estudiante.email);
    cy.sembrarReserva(u.estudiante2.email, { reserva_date: AYER() });
    cy.sembrarReserva(u.estudiante.email, { reserva_date: MANANA() });

    pendientes(u.entrenador.email).then((r) => {
      expect(r.status).to.eq(200);
      expect(r.body.total).to.eq(2);
      const correos = r.body.pendientes.map((p) => p.email);
      expect(correos).to.have.members([u.estudiante.email, u.estudiante2.email]);
      // Ordenadas de la más antigua a la más reciente.
      expect(r.body.pendientes[0].reserva_date).to.eq(AYER());
    });
  });

  it('API-RF12-03 · Cada fila trae documento, inasistencias y cuántas le faltan para la penalización', () => {
    cy.task('db:fijarInasistencias', { email: u.estudiante.email, cantidad: 3 });
    cy.sembrarReserva(u.estudiante.email);
    pendientes(u.entrenador.email).its('body.pendientes.0').should((p) => {
      expect(p.name).to.eq(u.estudiante.name);
      expect(p.documento).to.eq(u.estudiante.documento);
      expect(p.no_show_count).to.eq(3);
      expect(p.inasistencias_restantes).to.eq(2);
    });
  });

  it('API-RF12-04 · Las reservas COMPLETADAS o CANCELADAS no aparecen', () => {
    cy.sembrarReserva(u.estudiante.email, { estado: 'COMPLETADA' });
    cy.sembrarReserva(u.estudiante2.email, { estado: 'CANCELADA' });
    pendientes(u.entrenador.email).its('body.total').should('eq', 0);
  });

  it('API-RF12-05 · Al registrar la asistencia, la reserva sale de pendientes', () => {
    cy.sembrarReserva(u.estudiante.email).then((id) => {
      pendientes(u.entrenador.email).its('body.total').should('eq', 1);
      cy.api('POST', '/attendance/register/', { actor_email: u.entrenador.email, reservation_id: id });
      pendientes(u.entrenador.email).its('body.total').should('eq', 0);
    });
  });

  it('API-RF12-06 · El administrador también puede consultar → 200', () => {
    pendientes(u.admin.email).its('status').should('eq', 200);
  });

  it('API-RF12-07 · Un estudiante no puede consultar → 403', () => {
    pendientes(u.estudiante.email).its('status').should('eq', 403);
  });

  it('API-RF12-08 · Sin actor → 403', () => {
    cy.api('GET', '/attendance/pending/').its('status').should('eq', 403);
  });
});


import { HOY } from '../../support/commands';

describe('RF14 - Historial de reservas (API)', () => {
  let usuarios;
  const ruta = '/reservations/history/';

  before(() => {
    cy.fixture('usuarios').then((datos) => {
      usuarios = datos;
    });
  });

  beforeEach(() => {
    cy.escenarioBase();
  });

  it('RF14_C1 - Email faltante responde 400', () => {
    // Con autenticación por token (VUL-01) la petición va con la sesión de la estudiante.
    cy.api('GET', ruta, undefined, { como: usuarios.estudiante.email }).then((r) => {
      expect(r.status).to.eq(400);
      expect(r.body.error).to.contain('email');
    });
  });

  it('RF14_C2 - Consulta el historial completo', () => {
    cy.sembrarReserva(usuarios.estudiante.email, {
      reserva_date: HOY(),
      slotId: 1,
      estado: 'ACTIVA',
    });

    cy.api(
      'GET',
      `${ruta}?email=${encodeURIComponent(usuarios.estudiante.email)}`
    ).then((r) => {
      expect(r.status).to.eq(200);
      expect(r.body).to.have.length(1);
      expect(r.body[0].estado).to.eq('ACTIVA');
    });
  });

  it('RF14_C3 - Solo pasadas excluye las reservas activas', () => {
    cy.sembrarReserva(usuarios.estudiante.email, {
      reserva_date: HOY(),
      slotId: 1,
      estado: 'CANCELADA',
    });

    cy.api(
      'GET',
      `${ruta}?email=${encodeURIComponent(usuarios.estudiante.email)}&solo=pasadas`
    ).then((r) => {
      expect(r.status).to.eq(200);
      expect(r.body).to.have.length(1);
      expect(r.body[0].estado).to.eq('CANCELADA');
    });
  });
});

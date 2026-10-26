
import { MANANA } from '../../support/commands';

describe('RF08 - Consultar reservas (API)', () => {
  let usuarios;
  const ruta = '/reservations/';

  before(() => {
    cy.fixture('usuarios').then((datos) => {
      usuarios = datos;
    });
  });

  beforeEach(() => {
    cy.escenarioBase();
  });

  it('RF08_C1 - Sin correo responde 400', () => {
    cy.api('GET', ruta).then((r) => {
      expect(r.status).to.eq(400);
      expect(r.body.error).to.contain('email');
    });
  });

  it('RF08_C2 - Email válido devuelve las reservas activas', () => {
    cy.sembrarReserva(usuarios.estudiante.email, {
      reserva_date: MANANA(),
      slotId: 1,
      estado: 'ACTIVA',
    });

    cy.api(
      'GET',
      `${ruta}?email=${encodeURIComponent(usuarios.estudiante.email)}`
    ).then((r) => {
      expect(r.status).to.eq(200);
      expect(r.body).to.be.an('array').with.length(1);
      expect(r.body[0].email).to.eq(usuarios.estudiante.email);
      expect(r.body[0].estado).to.eq('ACTIVA');
    });
  });
});

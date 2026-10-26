
import { HOY } from '../../support/commands';

describe('RF10 - Buscar estudiante/reserva (API)', () => {
  let usuarios;

  const ruta = '/students/lookup/';

  before(() => {
    cy.fixture('usuarios').then((datos) => {
      usuarios = datos;
    });
  });

  beforeEach(() => {
    cy.escenarioBase();
  });

  it('RF10_C1 - Una cuenta de estudiante no está autorizada', () => {
    cy.api('GET',
      `${ruta}?documento=1001234567&actor_email=${encodeURIComponent(usuarios.estudiante.email)}`
    ).then((r) => {
      expect(r.status).to.eq(403);
    });
  });

  it('RF10_C2 - Un documento vacío responde 400', () => {
    cy.api('GET',
      `${ruta}?documento=&actor_email=${encodeURIComponent(usuarios.entrenador.email)}`
    ).then((r) => {
      expect(r.status).to.eq(400);
      expect(r.body.error.toLowerCase()).to.contain('documento');
    });
  });

  it('RF10_C3 - Un estudiante inexistente responde 404', () => {
    cy.api('GET',
      `${ruta}?documento=9999999999&actor_email=${encodeURIComponent(usuarios.entrenador.email)}`
    ).then((r) => {
      expect(r.status).to.eq(404);
      expect(r.body.error).to.contain('No hay ningún estudiante');
    });
  });

  it('RF10_C4 - Un estudiante encontrado devuelve su reserva', () => {
    cy.sembrarReserva(usuarios.estudiante.email, {
      reserva_date: HOY(),
      slotId: 1,
      estado: 'ACTIVA',
    }).then(() => {
      cy.api('GET',
        `${ruta}?documento=${encodeURIComponent(usuarios.estudiante.documento)}&actor_email=${encodeURIComponent(usuarios.entrenador.email)}`
      ).then((r) => {
        expect(r.status).to.eq(200);
        expect(r.body.tiene_reserva).to.eq(true);
        expect(r.body.reservas).to.have.length(1);
        expect(r.body.reservas[0].slotId).to.eq(1);
      });
    });
  });
});

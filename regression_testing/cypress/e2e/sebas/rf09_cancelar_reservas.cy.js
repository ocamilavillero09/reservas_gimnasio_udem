import { MANANA } from '../../support/commands';

describe('RF09 - Cancelar reservas (API)', () => {
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

  // Con autenticación por token (VUL-04) solo la dueña cancela su reserva: las
  // peticiones van con la sesión de la estudiante.

  it('RF09_C1 - Un ID inválido responde 400', () => {
    cy.api('DELETE', `${ruta}id-invalido/`, undefined, { como: usuarios.estudiante.email }).then((r) => {
      expect(r.status).to.eq(400);
      expect(r.body.error).to.contain('inválido');
    });
  });

  it('RF09_C2 - Una reserva inexistente responde 404', () => {
    cy.api('DELETE', `${ruta}000000000000000000000000/`, undefined, { como: usuarios.estudiante.email }).then((r) => {
      expect(r.status).to.eq(404);
      expect(r.body.error).to.contain('no encontrada');
    });
  });

  it('RF09_C3 - Una reserva ya cancelada responde 409', () => {
    cy.task('db:insertarReserva', {
      email: usuarios.estudiante.email,
      reserva_date: MANANA(),
      slotId: 1,
      estado: 'CANCELADA',
    }).then((id) => {
      return cy.api('DELETE', `${ruta}${id}/`, undefined, { como: usuarios.estudiante.email });
    }).then((r) => {
      expect(r.status).to.eq(409);
      expect(r.body.error).to.contain('ya no está activa');
    });
  });

  it('RF09_C4 - Una reserva activa se cancela y confirma la liberación del cupo', () => {
    cy.task('db:insertarReserva', {
      email: usuarios.estudiante.email,
      reserva_date: MANANA(),
      slotId: 1,
      estado: 'ACTIVA',
    }).then((id) => {
      return cy.api('DELETE', `${ruta}${id}/`, undefined, { como: usuarios.estudiante.email }).then((r) => {
        expect(r.status).to.eq(200);
        expect(r.body.tipo).to.eq('RESERVA_CANCELADA');
        expect(r.body.message).to.contain('Cupo liberado');

        return cy.task('db:leerReserva', id);
      });
    }).then((reserva) => {
      expect(reserva.estado).to.eq('CANCELADA');
      expect(reserva.cancelled_at).to.exist;
    });
  });
});

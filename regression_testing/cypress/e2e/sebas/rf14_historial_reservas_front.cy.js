
import { HOY } from '../../support/commands';

describe('RF14 - Historial de reservas (Frontend)', () => {
  beforeEach(() => {
    cy.escenarioBase();
  });

  it('RF14_FRONT_C1 - Consulta el historial de reservas', () => {
    cy.fixture('usuarios').then(({ estudiante }) => {
      cy.sembrarReserva(estudiante.email, {
        reserva_date: HOY(),
        slotId: 1,
        estado: 'CANCELADA',
      });

      cy.visit('/');
      cy.get('[data-cy="login-email"]')
        .should('be.visible')
        .type(estudiante.email);

      cy.get('[data-cy="login-documento"]')
        .should('be.visible')
        .type(estudiante.documento);

      cy.get('[data-cy="login-submit"]').click();
      cy.get('[data-cy="dashboard-contenedor"]').should('be.visible');

      // Abrir la sección de historial desde la navegación.
      cy.contains('button, a', /historial/i).click();

      cy.get('[data-cy="historial-contenedor"]').should('be.visible');
      cy.get('[data-cy="historial-titulo"]')
        .should('contain.text', 'Mi historial');

      cy.get('[data-cy="historial-lista"]').should('be.visible');
      cy.get('[data-cy^="historial-fila-"]')
        .filter('[data-cy$="-estado"]')
        .should('contain.text', 'Cancelada');
    });
  });

  it('RF14_FRONT_C2 - Muestra el estado vacío cuando no hay historial', () => {
    cy.fixture('usuarios').then(({ estudiante }) => {
      cy.visit('/');
      cy.get('[data-cy="login-email"]')
        .should('be.visible')
        .type(estudiante.email);

      cy.get('[data-cy="login-documento"]')
        .should('be.visible')
        .type(estudiante.documento);

      cy.get('[data-cy="login-submit"]').click();
      cy.get('[data-cy="dashboard-contenedor"]').should('be.visible');

      cy.contains('button, a', /historial/i).click();

      cy.get('[data-cy="historial-contenedor"]').should('be.visible');
      cy.get('[data-cy="historial-vacio"]').should('be.visible');
      cy.get('[data-cy="historial-lista"]').should('not.exist');
    });
  });
});

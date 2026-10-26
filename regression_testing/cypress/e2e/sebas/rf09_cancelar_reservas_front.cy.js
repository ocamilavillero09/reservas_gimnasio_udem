
describe('RF09 - Cancelar reservas (Frontend)', () => {
  beforeEach(() => {
    cy.escenarioBase();

    cy.fixture('usuarios').then(({ estudiante }) => {
      // Crear una reserva activa para el estudiante.
      cy.api('POST', '/reservations/', {
        email: estudiante.email,
        slotId: 1,
      }).then((respuesta) => {
        expect(respuesta.status).to.eq(201);
      });

      // Iniciar sesión y consultar las reservas.
      cy.visit('/');

      cy.get('[data-cy="login-email"]')
        .should('be.visible')
        .type(estudiante.email);

      cy.get('[data-cy="login-documento"]')
        .should('be.visible')
        .type(estudiante.documento);

      cy.get('[data-cy="login-submit"]').click();

      cy.get('[data-cy="dashboard-contenedor"]')
        .should('be.visible');

      cy.get('[data-cy="nav-mis-reservas"]').click();

      cy.get('[data-cy="mis-reservas-lista"]')
        .should('be.visible');

      cy.get('[data-cy^="mis-reservas-reserva-"][data-cy$="-estado"]')
        .should('contain.text', 'Activa');
    });
  });

  it('RF09_FRONT_C1 - Confirma la cancelación de una reserva activa', () => {
    cy.get('[data-cy^="mis-reservas-reserva-"][data-cy$="-cancelar"]')
      .first()
      .click();

    cy.get('[data-cy="mis-reservas-cancelar-modal"]')
      .should('be.visible');

    cy.get('[data-cy="mis-reservas-cancelar-titulo"]')
      .should('contain.text', 'Cancelar reserva');

    cy.get('[data-cy="mis-reservas-cancelar-confirmar"]')
      .click();

    cy.get('[data-cy="mis-reservas-vacio"]')
      .should('be.visible');

    cy.get('[data-cy="mis-reservas-vacio-titulo"]')
      .should('contain.text', 'Sin reservas activas');

    cy.get('[data-cy="mis-reservas-lista"]')
      .should('not.exist');
  });

  it('RF09_FRONT_C2 - Mantiene la reserva si se cancela el diálogo', () => {
    cy.get('[data-cy^="mis-reservas-reserva-"][data-cy$="-cancelar"]')
      .first()
      .click();

    cy.get('[data-cy="mis-reservas-cancelar-modal"]')
      .should('be.visible');

    cy.get('[data-cy="mis-reservas-cancelar-mantener"]')
      .click();

    cy.get('[data-cy="mis-reservas-cancelar-modal"]')
      .should('not.exist');

    cy.get('[data-cy="mis-reservas-lista"]')
      .should('be.visible');

    cy.get('[data-cy^="mis-reservas-reserva-"][data-cy$="-estado"]')
      .should('contain.text', 'Activa');
  });
});

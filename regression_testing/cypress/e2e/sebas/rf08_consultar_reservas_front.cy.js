
describe('RF08 - Consultar mis reservas (Frontend)', () => {
  beforeEach(() => {
    cy.escenarioBase();
  });

  it('RF08_FRONT_C1 - Muestra el estado vacío cuando no hay reservas', () => {
    cy.visit('/');

    cy.fixture('usuarios').then(({ estudiante }) => {
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

      cy.get('[data-cy="mis-reservas-contenedor"]')
        .should('be.visible');

      cy.get('[data-cy="mis-reservas-vacio"]')
        .should('be.visible');

      cy.get('[data-cy="mis-reservas-vacio-titulo"]')
        .should('contain.text', 'Sin reservas activas');

      cy.get('[data-cy="mis-reservas-lista"]')
        .should('not.exist');
    });
  });

  it('RF08_FRONT_C2 - Muestra los detalles de una reserva activa', () => {
    // Crear la reserva antes de iniciar sesión.
    cy.fixture('usuarios').then(({ estudiante }) => {
      cy.api('POST', '/reservations/', {
        email: estudiante.email,
        slotId: 1,
      }).then((respuesta) => {
        expect(respuesta.status).to.eq(201);
      });

      // Iniciar sesión una sola vez.
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

      // Consultar las reservas desde la interfaz.
      cy.get('[data-cy="nav-mis-reservas"]').click();

      cy.get('[data-cy="mis-reservas-lista"]')
        .should('be.visible');

      cy.get('[data-cy^="mis-reservas-reserva-"][data-cy$="-estado"]')
        .should('contain.text', 'Activa');

      cy.get('[data-cy="mis-reservas-recordatorio"]')
        .should('be.visible');
    });
  });
});

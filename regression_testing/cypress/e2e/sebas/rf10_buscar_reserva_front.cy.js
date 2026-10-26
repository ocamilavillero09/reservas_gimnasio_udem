
describe('RF10 - Buscar estudiante/reserva (Frontend)', () => {
  beforeEach(() => {
    cy.escenarioBase();
  });

  it('RF10_FRONT_C1 - Busca un estudiante y muestra su reserva activa', () => {
    cy.fixture('usuarios').then(({ estudiante, entrenador }) => {
      // Crear una reserva para el estudiante.
      cy.api('POST', '/reservations/', {
        email: estudiante.email,
        slotId: 1,
      }).then((respuesta) => {
        expect(respuesta.status).to.eq(201);
      });

      // Iniciar sesión como entrenador.
      cy.visit('/');

      cy.get('[data-cy="login-email"]')
        .should('be.visible')
        .type(entrenador.email);

      cy.get('[data-cy="login-documento"]')
        .should('be.visible')
        .type(entrenador.documento);

      cy.get('[data-cy="login-submit"]').click();

      // Verificar el panel del entrenador.
      cy.get('[data-cy="buscar-contenedor"]')
        .should('be.visible');

      cy.get('[data-cy="buscar-documento"]')
        .should('be.visible')
        .type(estudiante.documento);

      cy.get('[data-cy="buscar-submit"]').click();

      // Verificar los datos encontrados.
      cy.get('[data-cy="buscar-resultado"]')
        .should('be.visible');

      cy.get('[data-cy="buscar-resultado-nombre"]')
        .should('contain.text', estudiante.name);

      cy.get('[data-cy="buscar-resultado-contacto"]')
        .should('contain.text', estudiante.documento)
        .and('contain.text', estudiante.email);

      cy.get('[data-cy="buscar-resultado-estado"]')
        .should('contain.text', 'ACTIVO');

      cy.get('[data-cy="buscar-resultado-reserva"]')
        .should('have.length', 1);
    });
  });

  it('RF10_FRONT_C2 - Valida un documento con formato incorrecto', () => {
    cy.fixture('usuarios').then(({ entrenador }) => {
      cy.visit('/');

      cy.get('[data-cy="login-email"]')
        .should('be.visible')
        .type(entrenador.email);

      cy.get('[data-cy="login-documento"]')
        .should('be.visible')
        .type(entrenador.documento);

      cy.get('[data-cy="login-submit"]').click();

      cy.get('[data-cy="buscar-contenedor"]')
        .should('be.visible');

      cy.get('[data-cy="buscar-documento"]')
        .should('be.visible')
        .type('abc');

      cy.get('[data-cy="buscar-submit"]').click();

      cy.get('[data-cy="buscar-error"]')
        .should('be.visible')
        .and('contain.text', 'documento');

      cy.get('[data-cy="buscar-resultado"]')
        .should('not.exist');
    });
  });
});

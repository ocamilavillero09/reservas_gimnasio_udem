
describe('RF06 - Consultar horarios (Frontend)', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('RF06_FRONT_C1 - El inicio de sesión permite ver los horarios', () => {
    cy.fixture('usuarios').then((usuarios) => {
      const estudiante = usuarios.estudiante;

      cy.get('input[placeholder*="@"]')
        .should('be.visible')
        .type(estudiante.email);

      cy.get('input[placeholder="Ej: 1001234567"]')
        .should('be.visible')
        .type(estudiante.documento);

      cy.contains('button', 'Ingresar').click();

      cy.get('[data-cy="dashboard-contenedor"]')
        .should('be.visible');

      cy.get('[data-cy="dashboard-titulo-disponibilidad"]')
        .should('contain.text', 'Disponibilidad en tiempo real');

      cy.get('[data-cy="dashboard-horarios"]')
        .should('be.visible')
        .children()
        .should('have.length.greaterThan', 0);
    });
  });

  it('RF06_FRONT_C2 - Los horarios muestran sus cupos y estado', () => {
    cy.fixture('usuarios').then((usuarios) => {
      const estudiante = usuarios.estudiante;

      cy.get('input[placeholder*="@"]')
        .should('be.visible')
        .type(estudiante.email);

      cy.get('input[placeholder="Ej: 1001234567"]')
        .should('be.visible')
        .type(estudiante.documento);

      cy.contains('button', 'Ingresar').click();

      cy.get('[data-cy="dashboard-horarios"]')
        .should('be.visible')
        .children()
        .first()
        .within(() => {
          cy.get('[data-cy$="-hora"]')
            .should('be.visible')
            .and('not.be.empty');

          cy.get('[data-cy$="-disponibles"]')
            .should('be.visible')
            .invoke('text')
            .then((texto) => {
              expect(Number(texto)).to.be.at.least(0);
            });

          cy.get('[data-cy$="-estado"]')
            .should('be.visible')
            .and('not.be.empty');
        });
    });
  });
});

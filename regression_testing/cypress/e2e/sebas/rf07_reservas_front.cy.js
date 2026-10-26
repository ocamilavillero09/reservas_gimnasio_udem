describe('RF07 - Crear reservas (Frontend)', () => {
  beforeEach(() => {
    // Preparar una base de datos limpia para cada prueba.
    cy.escenarioBase();

    // Iniciar sesión como estudiante.
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
    });
  });

  it('RF07_FRONT_C1 - Confirma una reserva desde el modal', () => {
    // Buscar un horario que permita reservar.
    cy.get('[data-cy="dashboard-horarios"]')
      .children()
      .then(($horarios) => {
        let horarioDisponible = null;

        $horarios.each((_, horario) => {
          const boton = horario.querySelector(
            '[data-cy$="-reservar"]'
          );

          if (boton && !boton.disabled && !horarioDisponible) {
            horarioDisponible = boton;
          }
        });

        expect(
          horarioDisponible,
          'horario con cupos disponibles'
        ).to.not.be.null;

        cy.wrap(horarioDisponible).click();
      });

    // Verificar el modal y confirmar la reserva.
    cy.get('[data-cy="dashboard-reserva-modal"]')
      .should('be.visible');

    cy.get('[data-cy="dashboard-reserva-titulo"]')
      .should('contain.text', 'Confirmar reserva');

    cy.get('[data-cy="dashboard-reserva-confirmar"]').click();

    // Comprobar que la reserva quedó registrada en la interfaz.
    cy.get('[data-cy="dashboard-contenedor"]')
      .should('be.visible');

    cy.get('[data-cy="dashboard-mi-reserva-valor"]')
      .should('contain.text', '1/1');

    cy.get('[data-cy="dashboard-horarios"]')
      .find('[data-cy$="-reservado"]')
      .should('exist');
  });

  it('RF07_FRONT_C2 - Cierra la confirmación sin crear una reserva', () => {
    // Buscar un horario disponible.
    cy.get('[data-cy="dashboard-horarios"]')
      .children()
      .then(($horarios) => {
        let horarioDisponible = null;

        $horarios.each((_, horario) => {
          const boton = horario.querySelector(
            '[data-cy$="-reservar"]'
          );

          if (boton && !boton.disabled && !horarioDisponible) {
            horarioDisponible = boton;
          }
        });

        expect(
          horarioDisponible,
          'horario con cupos disponibles'
        ).to.not.be.null;

        cy.wrap(horarioDisponible).click();
      });

    // Abrir el modal y cancelar antes de confirmar.
    cy.get('[data-cy="dashboard-reserva-modal"]')
      .should('be.visible');

    cy.get('[data-cy="dashboard-reserva-cancelar"]').click();

    // Verificar que se cerró el modal y no se creó una reserva.
    cy.get('[data-cy="dashboard-reserva-modal"]')
      .should('not.exist');

    cy.get('[data-cy="dashboard-mi-reserva-valor"]')
      .should('contain.text', '0/1');

    cy.get('[data-cy="dashboard-horarios"]')
      .find('[data-cy$="-reservado"]')
      .should('not.exist');
  });
});

describe('Pruebas grabadas con Cypress Studio IA', () => {
  beforeEach(() => {
    cy.escenarioBase();
    cy.visit('/');
  });

  it('RF06_STUDIO_C1 - Estudiante consulta los horarios', () => {
    cy.get('[data-cy="login-email"]').click();
    cy.get('[data-cy="login-email"]').type('laura.est@soyudemedellin.edu.co');
    cy.get('[data-cy="login-documento"]').click();
    cy.get('[data-cy="login-documento"]').type('1000000003');
    cy.get('[data-cy="login-submit"]').click();
    // The dashboard displays a personalized greeting for the user.
    cy.get('[data-cy="dashboard-saludo"]')
      .should('contain.text', 'Hola, Laura 👋')
    // The first time slot (06:00) is visible in the dashboard.
    cy.get('[data-cy="dashboard-horario-1-hora"]')
      .should('contain.text', '06:00')
    
  });

  it('RF07_STUDIO_C1 - Estudiante crea una reserva', () => {
    cy.get('[data-cy="login-email"]').click();
    cy.get('[data-cy="login-email"]').type('laura.est@soyudemedellin.edu.co');
    cy.get('[data-cy="login-documento"]').click();
    cy.get('[data-cy="login-documento"]').type('1000000003');
    cy.get('[data-cy="login-submit"]').click();
    cy.get('[data-cy="dashboard-horario-1-reservar"]').click();
    cy.get('[data-cy="dashboard-reserva-confirmar"]').click();
    // A success message appears confirming the reservation.
    cy.get('[data-cy="toast-mensaje"]')
      .should(($el) => {
        expect($el).to.be.visible
        expect($el).to.contain.text('Reserva confirmada para las 06:00 del martes 27 de octubre de 2026. Si no vas a asistir, cancélala para liberar el cupo.')
      })
    // The reservation counter updated from 0/1 to 1/1.
    cy.get('[data-cy="dashboard-mi-reserva-valor"]')
      .should('contain.text', '1/1')
    // The reservation button for the selected slot is now disabled and shows a success status.
    cy.get('[data-cy="dashboard-horario-1-reservar"]')
      .should(($el) => {
        expect($el).to.contain.text('✓ Ya reservado')
        expect($el).to.have.attr('style', 'width: 100%; padding: 13px 0px; border-width: medium; border-style: none; border-color: currentcolor; border-image: none; border-radius: 12px; cursor: not-allowed; background-color: rgb(245, 245, 245); color: rgb(153, 153, 153); font-weight: 700; font-size: 14px; box-shadow: none;')
        expect($el).to.have.attr('disabled')
      })
    
  });

  it('RF10_STUDIO_C1 - Entrenador busca a un estudiante', () => {
    cy.get('[data-cy="login-email"]').click();
    cy.get('[data-cy="login-email"]').type('tomas.coach@udem.edu.co');
    cy.get('[data-cy="login-documento"]').click();
    cy.get('[data-cy="login-documento"]').type('1000000002');
    cy.get('[data-cy="login-submit"]').click();
    cy.get('[data-cy="buscar-documento"]').click();
    cy.get('[data-cy="buscar-documento"]').type('1000000003');
    cy.get('[data-cy="buscar-submit"]').click();
    // The student's name 'Laura Estudiante' is displayed.
    cy.get('[data-cy="buscar-resultado-nombre"]')
      .should('contain.text', 'Laura Estudiante')
    // The student's document number and email are displayed.
    cy.get('[data-cy="buscar-resultado-contacto"]')
      .should('contain.text', 'Doc. 1000000003 · laura.est@soyudemedellin.edu.co')
    // The student's status 'ACTIVO' is displayed.
    cy.get('[data-cy="buscar-resultado-estado"]')
      .should('contain.text', 'ACTIVO')
    
  });
});
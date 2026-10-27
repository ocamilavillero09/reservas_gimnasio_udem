// Pruebas con cy.prompt (Cypress Cloud). La IA convierte cada paso escrito en
// español en comandos de Cypress; las verificaciones finales se hacen con los
// selectores data-cy, para no depender solo de lo que interprete la IA.

describe('RF06 - Consultar horarios con cy.prompt()', () => {
  beforeEach(() => cy.escenarioBase());

  it('RF06_PROMPT_C1 - Inicia sesión y verifica los horarios', () => {
    cy.fixture('usuarios').then(({ estudiante }) => {
      cy.visit('/');
      cy.prompt([
        `escribe "${estudiante.email}" en el campo Correo institucional`,
        `escribe "${estudiante.documento}" en el campo Documento de identidad`,
        'haz clic en el botón Ingresar',
        'verifica que se vea el título "Disponibilidad en tiempo real"',
      ]);

      cy.get('[data-cy="dashboard-titulo-disponibilidad"]').should('have.text', 'Disponibilidad en tiempo real');
      cy.get('[data-cy="dashboard-horarios"]').children().should('have.length', 6);
      cy.get('[data-cy^="dashboard-horario-"][data-cy$="-disponibles"]').each(($cupos) => {
        expect(Number($cupos.text())).to.be.at.least(0);
      });
    });
  });
});

describe('RF07 - Crear reservas con cy.prompt()', () => {
  beforeEach(() => cy.escenarioBase());

  it('RF07_PROMPT_C1 - Crea y confirma una reserva', () => {
    cy.fixture('usuarios').then(({ estudiante }) => {
      cy.visit('/');
      cy.prompt([
        `escribe "${estudiante.email}" en el campo Correo institucional`,
        `escribe "${estudiante.documento}" en el campo Documento de identidad`,
        'haz clic en el botón Ingresar',
        'haz clic en el botón "Reservar cupo" del bloque de las 06:00',
        'en la ventana "Confirmar reserva", haz clic en el botón para confirmar',
      ]);

      cy.get('[data-cy="dashboard-reserva-modal"]').should('not.exist');
      cy.get('[data-cy="dashboard-mi-reserva-valor"]').should('have.text', '1/1');
      cy.get('[data-cy="dashboard-horario-1-reservado"]').should('be.visible');
    });
  });
});

describe('RF10 - Buscar estudiante sin reserva con cy.prompt()', () => {
  beforeEach(() => cy.escenarioBase());

  it('RF10_PROMPT_C1 - Busca a Laura y verifica que no tenga reserva activa', () => {
    cy.fixture('usuarios').then(({ entrenador, estudiante }) => {
      cy.visit('/');
      cy.prompt([
        `escribe "${entrenador.email}" en el campo Correo institucional`,
        `escribe "${entrenador.documento}" en el campo Documento de identidad`,
        'haz clic en el botón Ingresar',
        `escribe "${estudiante.documento}" en el campo de documento de "Registrar asistencia"`,
        'haz clic en el botón Buscar',
      ]);

      cy.get('[data-cy="buscar-resultado-nombre"]').should('contain.text', estudiante.name);
      cy.get('[data-cy="buscar-resultado-sin-reserva"]')
        .should('contain.text', 'Este estudiante no tiene ninguna reserva activa.');
      cy.get('[data-cy="buscar-resultado-reserva"]').should('not.exist');
    });
  });
});

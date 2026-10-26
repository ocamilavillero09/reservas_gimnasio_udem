// Accesibilidad (axe-core, WCAG 2.2 A/AA) de las pantallas de Violeta:
// login (RF02) y perfil de estudiante, entrenador y administradora (RF03 a RF05).
// Las violaciones quedan en evidencias/violeta/accesibilidad/<pantalla>.json;
// la prueba falla si hay alguna crítica o seria.
import '../../../../frontend/node_modules/@percy/cypress';
describe('Accesibilidad Violeta — WCAG 2.2 A/AA (axe-core)', () => {
    beforeEach(() => {
        // dado
        cy.escenarioBase();
    });

    it('A11Y-RF02-01 · La pantalla de login no tiene violaciones críticas ni serias', () => {
        // cuando
        cy.clearAllLocalStorage();
        cy.visit('/');
        cy.get('[data-cy="login-formulario"]').should('be.visible');

        // entonces
        cy.auditarAccesibilidad('violeta-login');
    });

    it('A11Y-RF03-01 · El perfil de la estudiante no tiene violaciones críticas ni serias', () => {
        // cuando
        cy.iniciarSesion('estudiante');
        cy.get('[data-cy="nav-perfil"]').click();
        cy.get('[data-cy="perfil-contenedor"]').should('be.visible');

        // entonces
        cy.auditarAccesibilidad('violeta-perfil-estudiante');
    });

    it('A11Y-RF04-01 · El perfil del entrenador no tiene violaciones críticas ni serias', () => {
        // cuando
        cy.iniciarSesion('entrenador');
        cy.get('[data-cy="nav-perfil"]').click();
        cy.get('[data-cy="perfil-contenedor"]').should('be.visible');

        // entonces
        cy.auditarAccesibilidad('violeta-perfil-entrenador');
    });

    it('A11Y-RF05-01 · El perfil de la administradora no tiene violaciones críticas ni serias', () => {
        // cuando
        cy.iniciarSesion('admin');
        cy.get('[data-cy="nav-perfil"]').click();
        cy.get('[data-cy="perfil-contenedor"]').should('be.visible');

        // entonces
        cy.auditarAccesibilidad('violeta-perfil-administradora');
    });
});

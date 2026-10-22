import '@percy/cypress';

describe('RF05 - Perfil del administrador', () => {
    it('E2E-RF05-01 · La administradora ve su rol con "Administrador principal" y su documento', () => {
        cy.escenarioBase();
        cy.iniciarSesion('admin');

        cy.get('[data-cy="nav-perfil"]').click();

        cy.get('[data-cy="perfil-titulo"]').should('have.text', 'Mi perfil');
        cy.get('[data-cy="perfil-rol"]').should('contain.text', 'Administrador');
        cy.get('[data-cy="perfil-principal"]').should('have.text', 'Administrador principal');
        cy.get('[data-cy="perfil-documento"]').should('have.text', '1000000001');
    });

    it('E2E-RF05-02 · La administradora no ve el campo de edad y sí ve el botón de usuarios', () => {
        cy.escenarioBase();
        cy.iniciarSesion('admin');

        cy.get('[data-cy="nav-perfil"]').click();

        cy.get('[data-cy="perfil-edad"]').should('not.exist');
        cy.get('[data-cy="perfil-guardar"]').should('not.exist');
        cy.get('[data-cy="perfil-nota-solo-lectura"]').should('be.visible');
        cy.get('[data-cy="nav-usuarios"]').should('be.visible');
    });
});

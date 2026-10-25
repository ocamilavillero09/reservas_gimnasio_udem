describe('RF04 - Perfil del entrenador', () => {
    it('E2E-RF04-01 · El entrenador ve su título de perfil, su rol "Entrenador" y su documento', () => {
        cy.escenarioBase();
        cy.iniciarSesion('entrenador');

        cy.get('[data-cy="nav-perfil"]').click();

        // entonces
        cy.get('[data-cy="perfil-titulo"]').should('have.text', 'Mi perfil');
        cy.get('[data-cy="perfil-rol"]').should('have.text', 'Entrenador');
        cy.get('[data-cy="perfil-documento"]').should('have.text', '1000000002');

    });

    it('E2E-RF04-02 · El entrenador no ve el campo de edad ni el botón de guardar perfil', () => {
        cy.escenarioBase();
        cy.iniciarSesion('entrenador');

        // cuando
        // - Entra a la pantalla de perfil y revisa los campos y botones disponibles.
        cy.get('[data-cy="nav-perfil"]').click();

        // entonces
        // - El campo de edad no existe.
        cy.get('[data-cy="perfil-edad"]').should('not.exist');

        // - El botón de guardar perfil no existe.
        cy.get('[data-cy="perfil-guardar"]').should('not.exist')

    });
});

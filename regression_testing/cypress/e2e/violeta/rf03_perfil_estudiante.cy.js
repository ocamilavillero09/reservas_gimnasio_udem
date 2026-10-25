describe('RF03 - Perfil del estudiante', () => {
    it('E2E-RF03-01 · El estudiante actualiza edad, peso, altura y objetivo y ve "Perfil actualizado."', () => {
        // dado que un estudiante con sesión iniciada
        cy.escenarioBase();
        cy.iniciarSesion('estudiante');
        

        // - Esta en la pantalla de perfil.
        cy.get('[data-cy="nav-perfil"]').click();

        // cuando
        // - Escribe una edad, un peso, una altura y elige un objetivo.
        cy.get('[data-cy="perfil-edad"]').clear().type('22');
        cy.get('[data-cy="perfil-peso"]').clear().type('77');
        cy.get('[data-cy="perfil-altura"]').clear().type('175');
        cy.get('[data-cy="perfil-meta"]').clear().type('masa muscular');

        // - Pulsa el botón de guardar perfil
        cy.get('[data-cy="perfil-guardar"]').click();

        // entonces
        // - Aparece el mensaje "Perfil actualizado."
        cy.get('[data-cy="toast-mensaje"]').should('contain', 'Perfil actualizado.');

        // - Los datos quedaron guardados: al salir y volver a Perfil se conservan.
        cy.get('[data-cy="nav-reservar"]').click();
        cy.get('[data-cy="nav-perfil"]').click();
        cy.get('[data-cy="perfil-edad"]').should('have.value', '22');
        cy.get('[data-cy="perfil-peso"]').should('have.value', '77');
        cy.get('[data-cy="perfil-altura"]').should('have.value', '175');
        cy.get('[data-cy="perfil-meta"]').should('have.value', 'masa muscular');
    });

    it('E2E-RF03-02 · Una edad fuera de rango (5) es rechazada con un aviso que menciona "edad"', () => {
        // dado
        cy.escenarioBase();
        cy.iniciarSesion('estudiante');
        cy.get('[data-cy="nav-perfil"]').click();

        // cuando
        // - Escribe 5 en el campo de edad.
        cy.get('[data-cy="perfil-edad"]').clear().type('5');
        cy.get('[data-cy="perfil-peso"]').clear().type('77');
        cy.get('[data-cy="perfil-altura"]').clear().type('175');
        cy.get('[data-cy="perfil-meta"]').clear().type('masa muscular');

        cy.get('[data-cy="perfil-guardar"]').click();

        // entonces
        // - Se muestra un aviso de error que menciona la palabra "edad".
        cy.get('[data-cy="toast-mensaje"]').invoke('text').should('match', /edad/i);
    });
});

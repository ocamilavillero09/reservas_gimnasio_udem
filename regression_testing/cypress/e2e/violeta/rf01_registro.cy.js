describe('RF01 - Registro', () => {
    beforeEach(() => {
        // dado
        cy.escenarioBase();
        cy.visit('/');
        cy.get('[data-cy="login-tab-registro"]').click();
    });

    // Esquema del escenario: un caso por cada dominio no institucional.
    ['gmail.com', 'hotmail.com', 'outlook.com'].forEach((dominio, i) => {
        it(`E2E-RF01-0${i + 1} · Rechaza el registro con dominio @${dominio}`, () => {
            // cuando
            cy.get('[data-cy="registro-nombre"]').type('julian');
            cy.get('[data-cy="registro-email"]').type(`julian@${dominio}`);
            cy.get('[data-cy="registro-documento"]').type('9076543210');
            cy.get('[data-cy="registro-submit"]').click();

            // entonces
            cy.get('[data-cy="registro-aviso-dominio"]').should('contain', 'no es institucional');
            cy.get('[data-cy="registro-error"]').should('be.visible');
            cy.get('[data-cy="registro-exitoso-titulo"]').should('not.exist');
        });
    });

    it('E2E-RF01-04 · Registra a un estudiante con correo institucional único', () => {
        // dado
        // - Correo irrepetible para que la prueba pueda correr varias veces.
        const unico = Date.now();
        const email = `nuevo.${unico}@soyudemedellin.edu.co`;

        // cuando
        cy.get('[data-cy="registro-nombre"]').type('Nuevo Estudiante');
        cy.get('[data-cy="registro-email"]').type(email);
        cy.get('[data-cy="registro-documento"]').type(String(unico).slice(-10));
        cy.get('[data-cy="registro-submit"]').click();

        // entonces
        cy.get('[data-cy="registro-exitoso-titulo"]').should('contain.text', 'Registro exitoso');

        // - El usuario quedó guardado en la base con rol de estudiante.
        cy.task('db:leerUsuario', email).should((usuario) => {
            expect(usuario).to.not.equal(null);
            expect(usuario.role).to.equal('ESTUDIANTE');
        });
    });
});

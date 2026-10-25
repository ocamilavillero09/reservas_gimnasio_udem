describe('RF15 - Inasistencias', () => {
    it('E2E-RF15-01 · Una estudiante sin penalización ve el reporte de inasistencias con contador 0 y sin aviso de penalización', () => {
        // dado
        cy.escenarioBase();
        cy.iniciarSesion('estudiante');

        // cuando
        cy.get('[data-cy="nav-perfil"]').click();
        cy.get('[data-cy="perfil-inasistencias-contenedor"]').should('be.visible');

        // entonces
        // - El contador muestra 0.
        cy.get('[data-cy="perfil-inasistencias-contador"]').should('have.text', '0');

        // - No aparece el aviso de penalización.
        cy.get('[data-cy="perfil-inasistencias-penalizada"]').should('not.exist');
    });

    it('E2E-RF15-02 · Una estudiante penalizada (con 5 inasistencias) ve contador 5 y aviso PENALIZADA', () => {
        // dado
        cy.escenarioBase();
        cy.fixture('usuarios').then(({ estudiante }) => {
            cy.task('db:fijarInasistencias', { email: estudiante.email, cantidad: 5 });
            cy.task('db:actualizarUsuario', { email: estudiante.email, campos: { estado: 'PENALIZADO' } });
        });
        cy.iniciarSesion('estudiante');

        // cuando
        cy.get('[data-cy="nav-perfil"]').click();
        cy.get('[data-cy="perfil-inasistencias-contenedor"]').should('be.visible');

        // entonces
        cy.get('[data-cy="perfil-inasistencias-contador"]').should('have.text', '5');
        cy.get('[data-cy="perfil-inasistencias-penalizada"]').should('be.visible').and('contain.text', 'PENALIZADA');
    });

    it('E2E-RF15-03 · El entrenador busca por documento a una estudiante penalizada y ve su nombre y estado PENALIZADO', () => {
        // dado
        cy.escenarioBase();
        cy.fixture('usuarios').then(({ estudiante }) => {
            cy.task('db:fijarInasistencias', { email: estudiante.email, cantidad: 5 });
            cy.task('db:actualizarUsuario', { email: estudiante.email, campos: { estado: 'PENALIZADO' } });

            // - Sesión iniciada como entrenador (fixtures/usuarios.json).
            cy.iniciarSesion('entrenador');

            // cuando
            cy.get('[data-cy="nav-panel"]').click();

            // - Escribe el documento de la estudiante y busca.
            cy.get('[data-cy="buscar-documento"]').type(estudiante.documento);
            cy.get('[data-cy="buscar-submit"]').click();

            // entonces
            // - Se ve el nombre de la estudiante.
            cy.get('[data-cy="buscar-resultado-nombre"]').should('have.text', estudiante.name);

            // - Se ve el estado PENALIZADO.
            cy.get('[data-cy="buscar-resultado-estado"]').should('contain.text', 'PENALIZADO');
        });
    });

    it('E2E-RF15-04 · Una estudiante con 3 inasistencias ve el aviso de alerta con contador 3 y no el de penalización', () => {
        // dado
        cy.escenarioBase();
        cy.iniciarSesion('estudiante');
        cy.fixture('usuarios').then(({ estudiante }) => {
            cy.task('db:fijarInasistencias', { email: estudiante.email, cantidad: 3 });
        });

        // - Se recarga para que el perfil lea el contador nuevo.
        cy.visitarYEsperar(() => cy.reload());

        // cuando
        cy.get('[data-cy="nav-perfil"]').click();
        cy.get('[data-cy="perfil-inasistencias-contenedor"]').should('be.visible');

        // entonces
        // - El contador muestra 3.
        cy.get('[data-cy="perfil-inasistencias-contador"]').should('have.text', '3');

        // - Aparece la alerta, pero no la penalización.
        cy.get('[data-cy="perfil-inasistencias-alerta"]').should('be.visible');
        cy.get('[data-cy="perfil-inasistencias-penalizada"]').should('not.exist');
    });

    it('E2E-RF15-05 · Caso límite: con 2 inasistencias no aparece ni la alerta ni la penalización', () => {
        // dado
        cy.escenarioBase();
        cy.iniciarSesion('estudiante');
        cy.fixture('usuarios').then(({ estudiante }) => {
            cy.task('db:fijarInasistencias', { email: estudiante.email, cantidad: 2 });
        });

        // - Se recarga para que el perfil lea el contador nuevo.
        cy.visitarYEsperar(() => cy.reload());

        // cuando
        cy.get('[data-cy="nav-perfil"]').click();
        cy.get('[data-cy="perfil-inasistencias-contenedor"]').should('be.visible');

        // entonces
        // - El contador muestra 2 (confirma que el perfil leyó el valor nuevo).
        cy.get('[data-cy="perfil-inasistencias-contador"]').should('have.text', '2');

        // - Todavía le quedan más de 2, así que no hay alerta ni penalización.
        cy.get('[data-cy="perfil-inasistencias-alerta"]').should('not.exist');
        cy.get('[data-cy="perfil-inasistencias-penalizada"]').should('not.exist');
    });
});

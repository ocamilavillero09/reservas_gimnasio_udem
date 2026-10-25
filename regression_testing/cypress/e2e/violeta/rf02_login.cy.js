describe('RF02 - inicio de sesion', () => {
    beforeEach(() => {
        // dado
        cy.escenarioBase();
        cy.visit('/');
    });
    

    // Comprobaciones comunes a todo rechazo: mensaje exacto y sin entrar a la app.
    const verificarRechazo = () => {
        cy.get('[data-cy="login-error"]')
            .should('be.visible')
            .and('contain.text', 'Correo o documento de identidad incorrectos.');
        cy.get('[data-cy="login-formulario"]').should('be.visible');
        cy.get('[data-cy="nav-perfil"]').should('not.exist');
    };

    it('E2E-RF02-01 · Rechaza el correo real de Laura con un documento incorrecto', () => {
        cy.fixture('usuarios').then(({ estudiante }) => {
            // cuando
            cy.get('[data-cy="login-email"]').type(estudiante.email);
            cy.get('[data-cy="login-documento"]').type('9876543210');
            cy.get('[data-cy="login-submit"]').click();

            // entonces
            verificarRechazo();
        });
    });

    it('E2E-RF02-02 · Rechaza el correo de Laura con el documento de otra persona', () => {
        cy.fixture('usuarios').then(({ estudiante, estudiante2 }) => {
            // cuando
            // - El documento es válido, pero pertenece a Mateo.
            cy.get('[data-cy="login-email"]').type(estudiante.email);
            cy.get('[data-cy="login-documento"]').type(estudiante2.documento);
            cy.get('[data-cy="login-submit"]').click();

            // entonces
            verificarRechazo();
        });
    });

    it('E2E-RF02-03 · Rechaza un correo que no está registrado (otro caso: el correo no existe)', () => {
        cy.fixture('usuarios').then(({ estudiante }) => {
            // cuando
            // - Correo distinto en cada ejecución: el sistema bloquea un correo tras 5
            //   intentos fallidos en 15 minutos y ese contador no lo borra la limpieza
            //   de la base (solo se borra al registrar la cuenta, y esta no existe).
            cy.get('[data-cy="login-email"]').type(`nadie.registrado.${Date.now()}@soyudemedellin.edu.co`);
            cy.get('[data-cy="login-documento"]').type(estudiante.documento);
            cy.get('[data-cy="login-submit"]').click();

            // entonces
            verificarRechazo();
        });
    });

    it('E2E-RF02-04 · Laura entra con su correo y su documento correctos', () => {
        cy.fixture('usuarios').then(({ estudiante }) => {
            // cuando
            cy.get('[data-cy="login-email"]').type(estudiante.email);
            cy.get('[data-cy="login-documento"]').type(estudiante.documento);
            cy.get('[data-cy="login-submit"]').click();

            // entonces
            cy.get('[data-cy="nav-perfil"]').should('be.visible');
            cy.get('[data-cy="nav-usuario-nombre"]').should('contain.text', estudiante.name);
            cy.get('[data-cy="login-formulario"]').should('not.exist');
        });
    });
});

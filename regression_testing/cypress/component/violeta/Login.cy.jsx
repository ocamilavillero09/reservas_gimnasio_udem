// Prueba de componente del formulario de login (RF02).
// El componente se monta aislado: no hay backend ni base de datos, y la
// respuesta de la API se simula con cy.intercept.
import Login from '../../../../frontend/src/components/Login';

const MENSAJE = 'Correo o documento de identidad incorrectos.';

describe('<Login /> — componente', () => {
    it('COMP-RF02-01 · Muestra el error cuando la API responde 401 y envía el correo y el documento escritos', () => {
        // dado
        // - La API responde 401 con el mensaje de credenciales incorrectas.
        cy.simularApi('GET', '/config/', { dominios: [], documento_longitud: null });
        cy.intercept('POST', '/api/auth/login/', {
            statusCode: 401,
            body: { error: MENSAJE },
        }).as('login');
        const onLogin = cy.stub().as('onLogin');
        cy.mount(<Login onLogin={onLogin} />);

        // cuando
        cy.get('[data-cy="login-email"]').type('laura.est@soyudemedellin.edu.co');
        cy.get('[data-cy="login-documento"]').type('9876543210');
        cy.get('[data-cy="login-submit"]').click();

        // entonces
        // - La petición llevó exactamente lo que se escribió.
        cy.wait('@login').its('request.body').should('deep.equal', {
            email: 'laura.est@soyudemedellin.edu.co',
            documento: '9876543210',
        });

        // - El componente muestra el mensaje y no avisa de un inicio de sesión.
        cy.get('[data-cy="login-error"]').should('be.visible').and('contain.text', MENSAJE);
        cy.get('@onLogin').should('not.have.been.called');
    });
});

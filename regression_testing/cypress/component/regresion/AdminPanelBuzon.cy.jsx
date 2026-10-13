// Pruebas de componente del buzón de sugerencias dentro de AdminPanel (RF21).
import AdminPanel from '../../../../frontend/src/components/AdminPanel';

const ADMIN = { name: 'Ana Admin', email: 'ana.admin@udemedellin.edu.co', role: 'ADMIN', es_principal: true };

const CONFIG = {
  dominios: [
    { dominio: '@soyudemedellin.edu.co', rol: 'ESTUDIANTE', etiqueta: 'Estudiante' },
    { dominio: '@udem.edu.co', rol: 'ENTRENADOR', etiqueta: 'Entrenador' },
    { dominio: '@udemedellin.edu.co', rol: 'ADMIN', etiqueta: 'Administrador' },
  ],
  documento_longitud: 10,
};

const MENSAJES = {
  total: 2,
  mensajes: [
    { id: 'm2', autor_nombre: 'Mateo Estudiante', autor_email: 'mateo@soyudemedellin.edu.co',
      mensaje: 'Segundo mensaje', fecha: '2026-10-10T20:15:00+00:00' },
    { id: 'm1', autor_nombre: 'Laura Estudiante', autor_email: 'laura@soyudemedellin.edu.co',
      mensaje: 'Primer mensaje\ncon dos líneas', fecha: '2026-10-09T14:00:00+00:00' },
  ],
};

function montar(buzon = MENSAJES) {
  cy.simularApi('GET', '/config/', CONFIG);
  cy.simularApi('GET', '/admin/users/', []);
  cy.simularApi('GET', '/suggestions/inbox/', buzon).as('buzon');
  const showToast = cy.stub().as('toast');
  cy.mount(<AdminPanel user={ADMIN} showToast={showToast} />);
  cy.wait('@buzon');
}

const tarjetaBuzon = () => cy.contains('h3', 'Buzón de sugerencias').parent();

describe('<AdminPanel /> — buzón RF21', () => {
  it('COMP-RF21-01 · Muestra el contador y cada mensaje con autor, correo y texto', () => {
    montar();
    tarjetaBuzon().within(() => {
      cy.contains('h3', 'Buzón de sugerencias').find('span:not([aria-hidden])').should('have.text', '2');
      cy.contains('Mateo Estudiante').should('be.visible');
      cy.contains('laura@soyudemedellin.edu.co').should('be.visible');
      cy.get('button').filter(':contains("Borrar")').should('have.length', 2);
    });
  });

  it('COMP-RF21-02 · Respeta los saltos de línea del mensaje', () => {
    montar();
    cy.contains('p', 'Primer mensaje').should('have.css', 'white-space', 'pre-wrap');
  });

  it('COMP-RF21-03 · Bandeja vacía: sin contador y con el mensaje de estado vacío', () => {
    montar({ total: 0, mensajes: [] });
    tarjetaBuzon().within(() => {
      cy.contains('Todavía no hay mensajes.').should('be.visible');
      cy.contains('h3', 'Buzón de sugerencias').find('span:not([aria-hidden])').should('not.exist');
    });
  });

  it('COMP-RF21-04 · Borrar pide confirmación nombrando al autor; si se cancela no llama a la API', () => {
    montar();
    cy.simularApi('DELETE', '/suggestions/m2/', {}, 'borrar');
    cy.on('window:confirm', (texto) => {
      expect(texto).to.contain('Mateo Estudiante').and.contain('No se puede deshacer');
      return false;
    });
    tarjetaBuzon().find('button').filter(':contains("Borrar")').first().click();
    cy.get('@borrar.all').should('have.length', 0);
  });

  it('COMP-RF21-05 · Confirmado: borra el mensaje correcto, avisa y recarga la bandeja', () => {
    montar();
    cy.simularApi('DELETE', '/suggestions/m2/', { message: 'Mensaje borrado del buzón.', total: 1 }, 'borrar');
    cy.on('window:confirm', () => true);
    cy.simularApi('GET', '/suggestions/inbox/', { total: 1, mensajes: [MENSAJES.mensajes[1]] }).as('recarga');
    tarjetaBuzon().find('button').filter(':contains("Borrar")').first().click();
    cy.wait('@borrar').its('request.url').should('contain', `actor_email=${encodeURIComponent(ADMIN.email)}`);
    cy.get('@toast').should('have.been.calledWith', 'Mensaje borrado del buzón.', 'success');
    cy.wait('@recarga');
    cy.contains('Segundo mensaje').should('not.exist');
    tarjetaBuzon().find('h3 span:not([aria-hidden])').should('have.text', '1');
  });

  it('COMP-RF21-06 · Si el borrado falla, avisa el error y el mensaje sigue en la bandeja', () => {
    montar();
    cy.simularApi('DELETE', '/suggestions/m2/', { statusCode: 404, body: { error: 'Mensaje no encontrado.' } });
    cy.on('window:confirm', () => true);
    tarjetaBuzon().find('button').filter(':contains("Borrar")').first().click();
    cy.get('@toast').should('have.been.calledWith', 'Mensaje no encontrado.', 'error');
    cy.contains('Segundo mensaje').should('be.visible');
  });
});

// Regresión E2E del buzón de sugerencias contra el sistema completo:
// RF20 (el estudiante envía) y RF21 (el administrador lee y borra).

describe('Buzón de sugerencias — RF20 y RF21 (E2E)', () => {
  let u;

  before(() => cy.fixture('usuarios').then((f) => { u = f; }));
  beforeEach(() => cy.escenarioBase());

  const campoMensaje = () => cy.get('textarea[placeholder="Cuéntanos qué pasó o qué mejorarías"]');
  const botonEnviar = () => cy.contains('button', 'Enviar al administrador');

  context('RF20 — El estudiante reporta una falla', () => {
    beforeEach(() => {
      cy.iniciarSesion('estudiante');
      cy.contains('button', 'Historial').click();
    });

    it('E2E-RF20-01 · El botón está deshabilitado con el campo vacío o solo con espacios', () => {
      botonEnviar().should('be.disabled');
      campoMensaje().type('    ');
      botonEnviar().should('be.disabled');
      cy.evidencia('E2E-RF20-01');
    });

    it('E2E-RF20-02 · Envía el mensaje, confirma y limpia el campo', () => {
      campoMensaje().type('La hora del bloque no se ve bien en el celular.');
      botonEnviar().should('be.enabled').click();
      cy.contains('Tu reporte llegó al administrador').should('be.visible');
      campoMensaje().should('have.value', '');
      cy.task('db:contarSugerencias').should('eq', 1);
      cy.evidencia('E2E-RF20-02');
    });

    it('E2E-RF20-03 · El campo no deja escribir más de 2000 caracteres', () => {
      campoMensaje().invoke('val', 'x'.repeat(1999)).type('yz');
      campoMensaje().invoke('val').its('length').should('eq', 2000);
    });

    it('E2E-RF20-04 · El estudiante no ve el buzón (sin opción "Usuarios")', () => {
      cy.contains('button', 'Usuarios').should('not.exist');
    });
  });

  context('RF21 — El administrador gestiona el buzón', () => {
    beforeEach(() => {
      cy.api('POST', '/suggestions/', { email: u.estudiante.email, mensaje: 'No carga el historial.' });
      cy.iniciarSesion('admin');
      cy.contains('button', 'Usuarios').click();
    });

    const tarjetaBuzon = () => cy.contains('h3', 'Buzón de sugerencias').parent();

    it('E2E-RF21-01 · Muestra el mensaje con su autor y el contador', () => {
      tarjetaBuzon().within(() => {
        // El contador es el span visible del título (el emoji va oculto para lectores de pantalla).
        cy.contains('h3', 'Buzón de sugerencias').find('span:not([aria-hidden])').should('have.text', '1');
        cy.contains(u.estudiante.name).should('be.visible');
        cy.contains(u.estudiante.email).should('be.visible');
        cy.contains('No carga el historial.').should('be.visible');
      });
      cy.evidencia('E2E-RF21-01');
    });

    it('E2E-RF21-02 · Cancelar el borrado conserva el mensaje', () => {
      cy.on('window:confirm', (texto) => {
        expect(texto).to.contain(u.estudiante.name).and.contain('No se puede deshacer');
        return false;
      });
      tarjetaBuzon().contains('button', 'Borrar').click();
      tarjetaBuzon().should('contain', 'No carga el historial.');
      cy.task('db:contarSugerencias').should('eq', 1);
    });

    it('E2E-RF21-03 · Confirmar el borrado lo elimina y deja la bandeja vacía', () => {
      cy.on('window:confirm', () => true);
      tarjetaBuzon().contains('button', 'Borrar').click();
      cy.contains('Mensaje borrado del buzón').should('be.visible');
      tarjetaBuzon().should('contain', 'Todavía no hay mensajes');
      cy.task('db:contarSugerencias').should('eq', 0);
      cy.evidencia('E2E-RF21-03');
    });
  });

  it('E2E-RF20-RF21 · Recorrido completo: el estudiante envía y el administrador lo recibe', () => {
    cy.iniciarSesion('estudiante');
    cy.contains('button', 'Historial').click();
    campoMensaje().type('Sugiero agregar un bloque a las 18:00.');
    botonEnviar().click();
    cy.contains('Tu reporte llegó al administrador').should('be.visible');

    cy.iniciarSesion('admin');
    cy.contains('button', 'Usuarios').click();
    cy.contains('Sugiero agregar un bloque a las 18:00.').should('be.visible');
    cy.evidencia('E2E-RF20-RF21-recorrido');
  });
});

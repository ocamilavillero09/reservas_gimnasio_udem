// RF20 — Reportar una falla o enviar una sugerencia (estudiante).
//   POST /suggestions/  { email, mensaje }
// RF21 — Consultar y borrar mensajes del buzón (administrador).
//   GET /suggestions/inbox/?actor_email=...   DELETE /suggestions/<id>/?actor_email=...

describe('RF20 — Enviar falla o sugerencia (API)', () => {
  let u;

  before(() => cy.fixture('usuarios').then((f) => { u = f; }));
  beforeEach(() => cy.escenarioBase());

  const enviar = (body) => cy.api('POST', '/suggestions/', body);

  it('API-RF20-01 · El estudiante envía un mensaje → 201 y queda guardado con su nombre', () => {
    enviar({ email: u.estudiante.email, mensaje: 'El botón de cancelar no responde.' }).then((r) => {
      expect(r.status).to.eq(201);
      expect(r.body.tipo).to.eq('SUGERENCIA_ENVIADA');
      expect(r.body.notificacion).to.contain('llegó al administrador');
    });
    cy.task('db:contarSugerencias').should('eq', 1);
  });

  it('API-RF20-02 · Mensaje de exactamente 2000 caracteres → 201 (límite)', () => {
    enviar({ email: u.estudiante.email, mensaje: 'a'.repeat(2000) }).its('status').should('eq', 201);
  });

  it('API-RF20-03 · Mensaje de 2001 caracteres → 400', () => {
    enviar({ email: u.estudiante.email, mensaje: 'a'.repeat(2001) }).then((r) => {
      expect(r.status).to.eq(400);
      expect(r.body.error).to.contain('2000');
    });
    cy.task('db:contarSugerencias').should('eq', 0);
  });

  it('API-RF20-04 · Mensaje vacío o solo con espacios → 400', () => {
    enviar({ email: u.estudiante.email, mensaje: '' }).its('status').should('eq', 400);
    enviar({ email: u.estudiante.email, mensaje: '     ' }).its('status').should('eq', 400);
  });

  it('API-RF20-05 · Sin correo → 400', () => {
    enviar({ mensaje: 'Hola' }).its('status').should('eq', 400);
  });

  it('API-RF20-06 · Correo que no está registrado → 404', () => {
    enviar({ email: 'fantasma@soyudemedellin.edu.co', mensaje: 'Hola' }).its('status').should('eq', 404);
  });

  it('API-RF20-07 · Un entrenador no usa el buzón → 403', () => {
    enviar({ email: u.entrenador.email, mensaje: 'Hola' }).its('status').should('eq', 403);
  });
});

describe('RF21 — Buzón de sugerencias (API)', () => {
  let u;

  before(() => cy.fixture('usuarios').then((f) => { u = f; }));
  beforeEach(() => {
    cy.escenarioBase();
    cy.api('POST', '/suggestions/', { email: u.estudiante.email, mensaje: 'Primer mensaje' });
    cy.api('POST', '/suggestions/', { email: u.estudiante2.email, mensaje: 'Segundo mensaje' });
  });

  const buzon = (actor) => cy.api('GET', `/suggestions/inbox/?actor_email=${actor}`);

  it('API-RF21-01 · El administrador ve los mensajes, del más reciente al más antiguo', () => {
    buzon(u.admin.email).then((r) => {
      expect(r.status).to.eq(200);
      expect(r.body.total).to.eq(2);
      expect(r.body.mensajes.map((m) => m.mensaje)).to.deep.eq(['Segundo mensaje', 'Primer mensaje']);
      expect(r.body.mensajes[0]).to.include({ autor_nombre: u.estudiante2.name, autor_email: u.estudiante2.email });
      expect(r.body.mensajes[0].id).to.match(/^[a-f0-9]{24}$/);
    });
  });

  it('API-RF21-02 · El entrenador no puede leer el buzón → 403', () => {
    buzon(u.entrenador.email).its('status').should('eq', 403);
  });

  it('API-RF21-03 · Un estudiante no puede leer el buzón → 403', () => {
    buzon(u.estudiante.email).its('status').should('eq', 403);
  });

  it('API-RF21-04 · El administrador borra un mensaje → 200 y el total baja', () => {
    buzon(u.admin.email).its('body.mensajes.0.id').then((id) => {
      cy.api('DELETE', `/suggestions/${id}/?actor_email=${u.admin.email}`).then((r) => {
        expect(r.status).to.eq(200);
        expect(r.body.total).to.eq(1);
      });
      buzon(u.admin.email).its('body.mensajes').should('have.length', 1)
        .and((m) => expect(m[0].id).not.to.eq(id));
    });
  });

  it('API-RF21-05 · Borrar el mismo mensaje dos veces → el segundo intento da 404', () => {
    buzon(u.admin.email).its('body.mensajes.0.id').then((id) => {
      const ruta = `/suggestions/${id}/?actor_email=${u.admin.email}`;
      cy.api('DELETE', ruta).its('status').should('eq', 200);
      cy.api('DELETE', ruta).its('status').should('eq', 404);
    });
  });

  it('API-RF21-06 · Id con formato inválido → 404', () => {
    cy.api('DELETE', `/suggestions/no-es-un-id/?actor_email=${u.admin.email}`).its('status').should('eq', 404);
  });

  it('API-RF21-07 · Un entrenador o estudiante no puede borrar → 403 y el mensaje sigue', () => {
    buzon(u.admin.email).its('body.mensajes.0.id').then((id) => {
      cy.api('DELETE', `/suggestions/${id}/?actor_email=${u.entrenador.email}`).its('status').should('eq', 403);
      cy.api('DELETE', `/suggestions/${id}/?actor_email=${u.estudiante.email}`).its('status').should('eq', 403);
    });
    cy.task('db:contarSugerencias').should('eq', 2);
  });
});

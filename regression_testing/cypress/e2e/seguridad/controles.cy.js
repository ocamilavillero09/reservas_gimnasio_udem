// Pruebas de seguridad — controles que el sistema SÍ implementa.
// Deben pasar siempre: si alguno falla, se perdió un control de seguridad.
// Referencia: OWASP Top 10 (2021) y OWASP ASVS 4.0.

describe('Seguridad — controles presentes', () => {
  let u;

  before(() => cy.fixture('usuarios').then((f) => { u = f; }));
  beforeEach(() => cy.escenarioBase());

  it('SEG-01 (A02 Fallas criptográficas) · La contraseña se guarda con hash PBKDF2 y sal, nunca en claro', () => {
    cy.task('db:leerUsuario', u.estudiante.email).then((est) => {
      expect(est.password, 'no es el documento en claro').not.to.eq(u.estudiante.documento);
      expect(est.password, 'formato sal:hash de 64 hex cada uno').to.match(/^[0-9a-f]{64}:[0-9a-f]{64}$/);
    });
    // Dos cuentas nunca comparten hash, porque cada una tiene su propia sal.
    cy.task('db:leerUsuario', u.estudiante2.email).then((otro) => {
      cy.task('db:leerUsuario', u.estudiante.email).its('password').should('not.eq', otro.password);
    });
  });

  it('SEG-02 (A07 Autenticación) · El login no revela si el correo existe (sin enumeración de usuarios)', () => {
    cy.api('POST', '/auth/login/', { email: u.estudiante.email, documento: '9999999999' }).then((existente) => {
      cy.api('POST', '/auth/login/', { email: 'nadie@soyudemedellin.edu.co', documento: '9999999999' })
        .then((inexistente) => {
          expect(existente.status).to.eq(401);
          expect(inexistente.status).to.eq(401);
          expect(existente.body.error).to.eq(inexistente.body.error);
        });
    });
  });

  it('SEG-03 (A07 Autenticación) · Credenciales correctas inician sesión; una cuenta desactivada no entra', () => {
    cy.api('POST', '/auth/login/', { email: u.estudiante.email, documento: u.estudiante.documento })
      .its('status').should('eq', 200);
    cy.task('db:actualizarUsuario', { email: u.estudiante.email, campos: { estado: 'INACTIVO' } });
    cy.api('POST', '/auth/login/', { email: u.estudiante.email, documento: u.estudiante.documento })
      .its('status').should('eq', 403);
  });

  it('SEG-04 (A01 Control de acceso) · Solo se aceptan correos institucionales', () => {
    cy.api('POST', '/auth/register/', { name: 'Externo', email: 'externo@gmail.com', documento: '1000000099' })
      .then((r) => {
        expect(r.status).to.eq(400);
        expect(r.body.error).to.contain('correo institucional');
      });
  });

  it('SEG-05 (A04 Diseño inseguro / asignación masiva) · El rol no se puede elegir en el registro', () => {
    // Se intenta registrar con dominio de estudiante pidiendo rol ADMIN y cuenta principal.
    cy.api('POST', '/auth/register/', {
      name: 'Colado', email: 'colado@soyudemedellin.edu.co', documento: '1000000098',
      role: 'ADMIN', es_principal: true, estado: 'ACTIVO',
    }).its('status').should('eq', 201);
    cy.task('db:leerUsuario', 'colado@soyudemedellin.edu.co').should((c) => {
      expect(c.role).to.eq('ESTUDIANTE');
      expect(c.es_principal).to.eq(false);
    });
  });

  it('SEG-06 (A01 Control de acceso) · Las acciones de personal rechazan a un estudiante', () => {
    const intentos = [
      ['GET', `/suggestions/inbox/?actor_email=${u.estudiante.email}`],
      ['GET', `/attendance/pending/?actor_email=${u.estudiante.email}`],
      ['GET', `/reports/daily/entrenador/?actor_email=${u.estudiante.email}`],
      ['POST', '/attendance/process/', { actor_email: u.estudiante.email }],
      ['POST', '/attendance/register/', { actor_email: u.estudiante.email, documento: u.estudiante2.documento }],
    ];
    intentos.forEach(([m, ruta, body]) => cy.api(m, ruta, body).its('status').should('eq', 403));
  });

  it('SEG-07 (A03 Inyección / XSS almacenado) · Un mensaje con código no se ejecuta en el buzón del administrador', () => {
    const carga = '<img src=x onerror="window.__xss=1"><script>window.__xss=2</script>';
    cy.api('POST', '/suggestions/', { email: u.estudiante.email, mensaje: carga }).its('status').should('eq', 201);
    cy.iniciarSesion('admin');
    cy.contains('button', 'Usuarios').click();
    // React escapa el texto: se ve literal y no crea elementos.
    cy.contains(carga).should('be.visible');
    cy.contains('h3', 'Buzón de sugerencias').parent().find('img[src="x"], script').should('not.exist');
    cy.window().its('__xss').should('be.undefined');
    cy.evidencia('SEG-07-xss-escapado');
  });

  it('SEG-08 (A04 Diseño inseguro) · El registro de asistencia es atómico: dos peticiones simultáneas no cuentan dos veces', () => {
    cy.sembrarReserva(u.estudiante.email).then((id) => {
      const cuerpo = { actor_email: u.entrenador.email, reservation_id: id };
      const url = `${Cypress.env('apiUrl')}/attendance/register/`;
      // Se lanzan a la vez desde el navegador, con la sesión del entrenador.
      cy.tokenDe(u.entrenador.email).then((token) => cy.window().then((w) => Promise.all([1, 2, 3].map(() =>
        w.fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
          body: JSON.stringify(cuerpo),
        }).then((r) => r.status)))))
        .then((estados) => {
          expect(estados.filter((s) => s === 200), 'exactamente un éxito').to.have.length(1);
        });
    });
  });
});

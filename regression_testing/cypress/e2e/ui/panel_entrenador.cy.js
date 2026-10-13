// Regresión E2E del panel del entrenador contra el sistema completo
// (frontend + backend + MongoDB): RF11, RF12, RF13 y RF16.

describe('Panel del entrenador — RF11, RF12, RF13, RF16 (E2E)', () => {
  let u;

  before(() => cy.fixture('usuarios').then((f) => { u = f; }));

  beforeEach(() => {
    cy.escenarioBase();
    cy.iniciarSesion('entrenador');
    cy.contains('h2', 'Panel del gimnasio').should('be.visible');
  });

  const tarjeta = (titulo) => cy.contains('h3', titulo).closest('div[style*="border-radius: 18px"]');

  context('RF12 — Reservas sin asistencia registrada', () => {
    it('E2E-RF12-01 · Sin pendientes muestra el mensaje de jornada procesada', () => {
      tarjeta('Sin asistencia registrada')
        .should('contain', 'No hay estudiantes pendientes');
      cy.evidencia('E2E-RF12-01');
    });

    it('E2E-RF12-02 · Lista al estudiante con reserva de hoy, su documento y sus inasistencias', () => {
      cy.task('db:fijarInasistencias', { email: u.estudiante.email, cantidad: 2 });
      cy.sembrarReserva(u.estudiante.email);
      cy.recargarPanel();
      tarjeta('Sin asistencia registrada').within(() => {
        cy.get('tbody tr').should('have.length', 1).first().within(() => {
          cy.contains(u.estudiante.name);
          cy.contains(u.estudiante.documento);
          cy.contains('06:00');
          cy.contains('faltan 3');
        });
      });
      cy.evidencia('E2E-RF12-02');
    });
  });

  context('RF11 — Registrar asistencia', () => {
    it('E2E-RF11-01 · Busca por documento y registra la asistencia de la reserva de hoy', () => {
      cy.sembrarReserva(u.estudiante.email);
      cy.recargarPanel();
      cy.get('input[placeholder="Documento de identidad del estudiante"]').type(u.estudiante.documento);
      cy.contains('button', 'Buscar').click();

      cy.contains(u.estudiante.name).should('be.visible');
      cy.contains('HOY').should('be.visible');
      cy.contains('ACTIVO').should('be.visible');
      cy.evidencia('E2E-RF11-01-busqueda');

      cy.contains('button', 'Registrar asistencia').click();
      cy.contains('Asistencia registrada para las 06:00').should('be.visible');
      // La reserva sale de pendientes y el registro diario la cuenta (RF12 + RF16).
      tarjeta('Sin asistencia registrada').should('contain', 'No hay estudiantes pendientes');
      tarjeta('Reporte general diario').contains('p', 'Asistencias').prev().should('have.text', '1');
      cy.evidencia('E2E-RF11-01-registrada');
    });

    it('E2E-RF11-02 · Registra desde la tabla de pendientes con su botón "Registrar asistencia"', () => {
      cy.sembrarReserva(u.estudiante.email);
      cy.recargarPanel();
      cy.contains('tr', u.estudiante.name).contains('button', 'Registrar asistencia').click();
      cy.contains('Asistencia registrada').should('be.visible');
      cy.contains('tr', u.estudiante.name).should('not.exist');
    });

    it('E2E-RF11-03 · Documento inexistente muestra el error del servidor', () => {
      cy.get('input[placeholder="Documento de identidad del estudiante"]').type('9999999999');
      cy.contains('button', 'Buscar').click();
      cy.contains('No hay ningún estudiante registrado con el documento 9999999999').should('be.visible');
      cy.evidencia('E2E-RF11-03');
    });

    it('E2E-RF11-04 · Estudiante sin reserva activa muestra la advertencia y ningún botón de registro', () => {
      cy.get('input[placeholder="Documento de identidad del estudiante"]').type(u.estudiante.documento);
      cy.contains('button', 'Buscar').click();
      cy.contains('Este estudiante no tiene ninguna reserva activa').should('be.visible');
      cy.contains('button', 'Registrar asistencia').should('not.exist');
    });

    it('E2E-RF11-05 · Reserva de mañana: no se ofrece registrarla y la reserva sigue activa', () => {
      // Antes de la corrección H-02 el botón se podía pulsar y el servidor lo
      // rechazaba (409); ese rechazo lo sigue cubriendo API-RF11-14.
      const manana = new Date(Date.now() + 86400000).toLocaleDateString('en-CA', { timeZone: 'America/Bogota' });
      cy.sembrarReserva(u.estudiante.email, { reserva_date: manana }).as('id');
      cy.get('input[placeholder="Documento de identidad del estudiante"]').type(u.estudiante.documento);
      cy.contains('button', 'Buscar').click();
      cy.contains('HOY').should('not.exist');
      cy.contains('button', 'Registrar asistencia').should('be.disabled');
      cy.contains('Se registra el día de la reserva').should('be.visible');
      cy.get('@id').then((id) => cy.task('db:leerReserva', id).its('estado').should('eq', 'ACTIVA'));
      cy.evidencia('E2E-RF11-05');
    });
  });

  context('RF13 — Cerrar la jornada', () => {
    it('E2E-RF13-01 · Al confirmar, procesa la inasistencia y actualiza el registro diario', () => {
      cy.sembrarReserva(u.estudiante.email);
      cy.recargarPanel();
      cy.on('window:confirm', (texto) => {
        expect(texto).to.contain('Se marcarán 1 inasistencias');
        return true;
      });
      cy.contains('button', 'Cerrar jornada').click();
      cy.contains('Se procesaron 1 inasistencias').should('be.visible');
      tarjeta('Sin asistencia registrada').should('contain', 'No hay estudiantes pendientes');
      tarjeta('Reporte general diario').contains('p', 'Inasistencias').prev().should('have.text', '1');
      cy.task('db:leerUsuario', u.estudiante.email).its('no_show_count').should('eq', 1);
      cy.evidencia('E2E-RF13-01');
    });

    it('E2E-RF13-02 · Al cancelar la confirmación no se procesa nada', () => {
      cy.sembrarReserva(u.estudiante.email);
      cy.recargarPanel();
      cy.on('window:confirm', () => false);
      cy.contains('tr', u.estudiante.name).should('be.visible');
      cy.contains('button', 'Cerrar jornada').click();
      cy.contains('tr', u.estudiante.name).should('be.visible');
      cy.task('db:leerUsuario', u.estudiante.email).its('no_show_count').should('eq', 0);
    });

    it('E2E-RF13-03 · Sin pendientes avisa y no pide confirmación', () => {
      const confirmar = cy.stub().as('confirm');
      cy.on('window:confirm', confirmar);
      cy.contains('button', 'Cerrar jornada').click();
      cy.contains('No hay inasistencias pendientes por procesar').should('be.visible');
      cy.get('@confirm').should('not.have.been.called');
    });

    it('E2E-RF13-04 · Quinta inasistencia: el estudiante aparece como penalizado en el registro', () => {
      cy.task('db:fijarInasistencias', { email: u.estudiante.email, cantidad: 4 });
      cy.sembrarReserva(u.estudiante.email);
      cy.recargarPanel();
      cy.on('window:confirm', () => true);
      cy.contains('button', 'Cerrar jornada').click();
      cy.contains(`Estudiantes penalizados: ${u.estudiante.name}`).should('be.visible');
      tarjeta('Reporte general diario').within(() => {
        cy.contains('Estudiantes penalizados').should('be.visible');
        cy.contains('5 inasistencias').should('be.visible');
      });
      cy.evidencia('E2E-RF13-04');
    });
  });

  context('RF16 — Registro diario', () => {
    it('E2E-RF16-01 · Muestra los cuatro totales y el botón para generar el PDF', () => {
      tarjeta('Reporte general diario').within(() => {
        ['Asistencias', 'Cancelaciones', 'Inasistencias', 'Estudiantes penalizados']
          .forEach((t) => cy.contains('p', t).should('be.visible'));
        cy.contains('a', 'Generar PDF')
          .should('have.attr', 'href').and('contain', '/reports/daily/entrenador.pdf');
      });
      cy.evidencia('E2E-RF16-01');
    });
  });
});

describe('Panel visto por el administrador — RF12 y RF13 (E2E)', () => {
  let u;
  before(() => cy.fixture('usuarios').then((f) => { u = f; }));

  it('E2E-RF13-05 · El administrador ve los pendientes pero no puede cerrar la jornada', () => {
    cy.escenarioBase();
    cy.sembrarReserva(u.estudiante.email);
    cy.iniciarSesion('admin');
    cy.contains('button', 'Panel').click();
    cy.contains('tr', u.estudiante.name).should('be.visible');
    cy.contains('Solo el entrenador cierra la jornada').should('be.visible');
    cy.contains('button', 'Cerrar jornada').should('not.exist');
    cy.evidencia('E2E-RF13-05');
  });
});

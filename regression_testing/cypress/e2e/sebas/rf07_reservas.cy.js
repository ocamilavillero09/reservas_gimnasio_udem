
import { MANANA } from '../../support/commands';

describe('RF07 - Crear reservas (API)', () => {
  let u;
  const ruta = '/reservations/';

  before(() => {
    cy.fixture('usuarios').then((usuarios) => {
      u = usuarios;
    });
  });

  beforeEach(() => {
    cy.escenarioBase();
  });

  it('RF07_C1 - Sin campos obligatorios responde 400', () => {
    cy.api('POST', ruta, {}).then((r) => {
      expect(r.status).to.eq(400);
      expect(r.body.error).to.contain('obligatorios');
    });
  });

  it('RF07_C2 - Usuario inexistente responde 404', () => {
    cy.api('POST', ruta, {
      email: 'inexistente@soyudemedellin.edu.co',
      slotId: 1,
    }).then((r) => {
      expect(r.status).to.eq(404);
      expect(r.body.error).to.contain('no existe');
    });
  });

  it('RF07_C3 - Un usuario que no es estudiante responde 403', () => {
    cy.api('POST', ruta, {
      email: u.entrenador.email,
      slotId: 1,
    }).then((r) => {
      expect(r.status).to.eq(403);
      expect(r.body.error).to.contain('no reservan cupos');
    });
  });

  it('RF07_C4 - Un estudiante penalizado con penalización vigente responde 403', () => {
    cy.task('db:actualizarUsuario', {
      email: u.estudiante.email,
      campos: {
        estado: 'PENALIZADO',
        penalizado_hasta: new Date(Date.now() + 86400000),
      },
    }).then(() => {
      return cy.api('POST', ruta, {
        email: u.estudiante.email,
        slotId: 1,
      });
    }).then((r) => {
      expect(r.status).to.eq(403);
      expect(r.body.error).to.contain('penalizada');
    });
  });

  it('RF07_C5 - Una penalización vencida permite continuar con la reserva', () => {
    cy.task('db:actualizarUsuario', {
      email: u.estudiante.email,
      campos: {
        estado: 'PENALIZADO',
        penalizado_hasta: new Date(Date.now() - 86400000),
        no_show_count: Math.trunc(2),
      },
    }).then(() => {
      return cy.api('POST', ruta, {
        email: u.estudiante.email,
        slotId: 1,
      });
    }).then((r) => {
      expect(r.status).to.eq(201);
      expect(r.body.email).to.eq(u.estudiante.email);
      expect(Number(r.body.slotId)).to.eq(1);

      return cy.task('db:leerUsuario', u.estudiante.email);
    }).then((usuario) => {
      expect(usuario.estado).to.eq('ACTIVO');
      expect(usuario.no_show_count).to.eq(0);
      expect(usuario.penalizado_hasta).to.be.null;
    });
  });

  it('RF07_C6 - Un horario inexistente responde 404', () => {
    cy.api('POST', ruta, {
      email: u.estudiante.email,
      slotId: 999999,
    }).then((r) => {
      expect(r.status).to.eq(404);
      expect(r.body.error).to.contain('Horario no encontrado');
    });
  });

  it('RF07_C7 - Una reserva activa duplicada responde 409', () => {
    cy.sembrarReserva(u.estudiante.email, {
      reserva_date: MANANA(),
      slotId: 1,
    }).then(() => {
      return cy.api('POST', ruta, {
        email: u.estudiante.email,
        slotId: 2,
      });
    }).then((r) => {
      expect(r.status).to.eq(409);
      expect(r.body.tipo).to.eq('RESERVA_DUPLICADA');
    });
  });

  it('RF07_C8 - Un horario sin cupos responde 409 SIN_CUPOS', () => {
    const fecha = MANANA();

    // Primero se crea una reserva para inicializar la disponibilidad.
    cy.api('POST', ruta, {
      email: u.estudiante.email,
      slotId: 1,
    }).then((r) => {
      expect(r.status).to.eq(201);

      // Después se agotan los cupos de ese bloque para mañana.
      return cy.task('db:fijarCupos', {
        fecha,
        slotId: 1,
        cantidad: 0,
      });
    }).then(() => {
      // El segundo estudiante debe recibir el rechazo por falta de cupos.
      return cy.api('POST', ruta, {
        email: u.estudiante2.email,
        slotId: 1,
      });
    }).then((r) => {
      expect(r.status).to.eq(409);
      expect(r.body.tipo).to.eq('SIN_CUPOS');
      expect(r.body.error).to.contain('sin cupos');
    });
  });

  it('RF07_C9 - Una reserva válida se crea para mañana', () => {
    cy.api('POST', ruta, {
      email: u.estudiante.email,
      slotId: 1,
    }).then((r) => {
      expect(r.status).to.eq(201);
      expect(r.body.email).to.eq(u.estudiante.email);
      expect(Number(r.body.slotId)).to.eq(1);
      expect(r.body.estado).to.eq('ACTIVA');
      expect(r.body.reserva_date).to.eq(MANANA());
      expect(r.body.notificacion).to.contain('Reserva confirmada');
    });
  });
});

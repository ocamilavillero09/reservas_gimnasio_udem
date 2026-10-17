// Pruebas de componente de TrainerPanel (RF11, RF12, RF13, RF16).
// El componente se monta aislado y la API se simula con cy.intercept, así se
// controla exactamente qué datos recibe y se verifica qué peticiones envía.
import TrainerPanel from '../../../../frontend/src/components/TrainerPanel';

const ENTRENADOR = { name: 'Tomás Entrenador', email: 'tomas.coach@udem.edu.co', role: 'ENTRENADOR' };
const ADMIN = { name: 'Ana Admin', email: 'ana.admin@udemedellin.edu.co', role: 'ADMIN' };

const SLOTS = {
  fecha: '2026-10-11',
  slots: [
    { id: 1, hour: '06:00', available: 4, total: 20 },
    { id: 2, hour: '08:00', available: 20, total: 20 },
  ],
};
const SIN_PENDIENTES = { total: 0, pendientes: [], no_show_limite: 5, fecha_label: 'sábado 10 de octubre' };
const UN_PENDIENTE = {
  total: 1, no_show_limite: 5, fecha_label: 'sábado 10 de octubre',
  pendientes: [{
    id: 'r1', name: 'Laura Estudiante', email: 'laura@soyudemedellin.edu.co', documento: '1000000003',
    hour: '06:00', date: '2026-10-10', no_show_count: 2, inasistencias_restantes: 3,
  }],
};
const REGISTRO = {
  fecha_label: 'sábado 10 de octubre de 2026',
  totales: { asistencias: 3, cancelaciones: 1, inasistencias: 2, estudiantes_penalizados: 1 },
  penalizados: [{ name: 'Mateo Estudiante', email: 'mateo@soyudemedellin.edu.co', documento: '1000000004', no_show_count: 5 }],
};
const BUSQUEDA = (extra = {}) => ({
  estudiante: {
    name: 'Laura Estudiante', documento: '1000000003', email: 'laura@soyudemedellin.edu.co',
    estado: 'ACTIVO', no_show_count: 2, no_show_limite: 5,
  },
  tiene_reserva: true,
  reservas: [{ id: 'r1', hour: '06:00', date: '2026-10-10', es_de_hoy: true }],
  ...extra,
});

function montar({ user = ENTRENADOR, pendientes = SIN_PENDIENTES } = {}) {
  cy.simularApi('GET', '/slots/', SLOTS);
  cy.simularApi('GET', '/attendance/pending/', pendientes).as('pendientes');
  cy.simularApi('GET', '/reports/daily/entrenador/', REGISTRO);
  cy.simularApi('GET', '/reports/daily/administrador/', REGISTRO);
  const showToast = cy.stub().as('toast');
  const onChanged = cy.stub().as('onChanged');
  cy.mount(<TrainerPanel user={user} reservaFecha={{ label: 'domingo 11 de octubre' }}
    showToast={showToast} onChanged={onChanged} />);
  // Se espera a que lleguen las pendientes: "Cerrar jornada" decide según su total.
  cy.wait('@pendientes');
}

describe('<TrainerPanel /> — componente', () => {
  it('COMP-PANEL-01 · Muestra la ocupación de los bloques y el total de cupos', () => {
    montar();
    cy.contains('16 ocupados / 40 cupos').should('be.visible');
    cy.contains('16 ocupados · 4 libres').should('be.visible');
    cy.contains('80% de aforo').should('be.visible');
  });

  it('COMP-RF16-01 · Pinta los cuatro totales del registro diario y la lista de penalizados', () => {
    montar();
    [['Asistencias', '3'], ['Cancelaciones', '1'], ['Inasistencias', '2'], ['Estudiantes penalizados', '1']]
      .forEach(([etiqueta, valor]) => cy.contains('p', etiqueta).prev().should('have.text', valor));
    cy.contains('Mateo Estudiante').should('be.visible');
    cy.contains('5 inasistencias').should('be.visible');
  });

  it('COMP-RF11-01 · Buscar envía el documento sin espacios y el correo del entrenador', () => {
    montar();
    cy.simularApi('GET', '/students/lookup/', BUSQUEDA(), 'buscar');
    cy.get('input[placeholder="Documento de identidad del estudiante"]').type('  1000000003  ');
    cy.contains('button', 'Buscar').click();
    cy.wait('@buscar').its('request.url').should('contain', 'documento=1000000003')
      .and('contain', `actor_email=${encodeURIComponent(ENTRENADOR.email)}`);
    cy.contains('Laura Estudiante').should('be.visible');
    cy.contains('Inasistencias: 2 de 5').should('be.visible');
    cy.contains('HOY').should('be.visible');
  });

  it('COMP-RF11-02 · Estado PENALIZADO se muestra en rojo', () => {
    montar();
    cy.simularApi('GET', '/students/lookup/',
      BUSQUEDA({ estudiante: { ...BUSQUEDA().estudiante, estado: 'PENALIZADO' } }));
    cy.get('input[placeholder="Documento de identidad del estudiante"]').type('1000000003{enter}');
    cy.contains('span', 'PENALIZADO').should('have.css', 'color', 'rgb(153, 27, 27)');
  });

  it('COMP-RF11-03 · Registrar asistencia envía el id de la reserva, avisa y limpia la búsqueda', () => {
    montar();
    cy.simularApi('GET', '/students/lookup/', BUSQUEDA());
    cy.simularApi('POST', '/attendance/register/',
      { notificacion: 'Asistencia registrada para las 06:00 del 2026-10-10.' }, 'registrar');
    cy.get('input[placeholder="Documento de identidad del estudiante"]').type('1000000003{enter}');
    cy.contains('button', 'Registrar asistencia').click();
    cy.wait('@registrar').its('request.body')
      .should('deep.eq', { actor_email: ENTRENADOR.email, reservation_id: 'r1' });
    cy.get('@toast').should('have.been.calledWith', 'Asistencia registrada para las 06:00 del 2026-10-10.', 'success');
    cy.get('@onChanged').should('have.been.calledOnce');
    cy.get('input[placeholder="Documento de identidad del estudiante"]').should('have.value', '');
    cy.contains('Laura Estudiante').should('not.exist');
  });

  it('COMP-RF11-04 · Si la búsqueda falla, muestra el error del servidor como aviso de error', () => {
    montar();
    cy.simularApi('GET', '/students/lookup/', { statusCode: 404, body: { error: 'No hay ningún estudiante registrado con el documento 123.' } });
    cy.get('input[placeholder="Documento de identidad del estudiante"]').type('123{enter}');
    cy.get('@toast').should('have.been.calledWith', 'No hay ningún estudiante registrado con el documento 123.', 'error');
  });

  it('COMP-RF11-05 · Sin reserva activa: advertencia y ningún botón para registrar', () => {
    montar();
    cy.simularApi('GET', '/students/lookup/', BUSQUEDA({ tiene_reserva: false, reservas: [] }));
    cy.get('input[placeholder="Documento de identidad del estudiante"]').type('1000000003{enter}');
    cy.contains('no tiene ninguna reserva activa').should('be.visible');
    cy.contains('button', 'Registrar asistencia').should('not.exist');
  });

  it('COMP-RF11-06 · El campo de documento es obligatorio: sin texto no se busca', () => {
    montar();
    cy.simularApi('GET', '/students/lookup/', BUSQUEDA(), 'buscar');
    cy.contains('button', 'Buscar').click();
    cy.get('input[placeholder="Documento de identidad del estudiante"]')
      .then(($i) => expect($i[0].validity.valueMissing).to.eq(true));
    cy.get('@buscar.all').should('have.length', 0);
  });

  it('COMP-RF12-01 · Pinta la tabla de pendientes con documento, bloque e inasistencias restantes', () => {
    montar({ pendientes: UN_PENDIENTE });
    cy.get('tbody tr').should('have.length', 1).first().within(() => {
      cy.contains('Laura Estudiante');
      cy.contains('1000000003');
      cy.contains('06:00');
      cy.contains('faltan 3');
    });
    cy.contains('se penaliza a quien llegue a 5 inasistencias').should('be.visible');
  });

  it('COMP-RF12-02 · El botón de la fila registra la reserva de esa fila', () => {
    montar({ pendientes: UN_PENDIENTE });
    cy.simularApi('POST', '/attendance/register/', { notificacion: 'ok' }, 'registrar');
    cy.get('tbody').contains('button', 'Registrar asistencia').click();
    cy.wait('@registrar').its('request.body.reservation_id').should('eq', 'r1');
  });

  it('COMP-RF13-01 · Cerrar jornada sin pendientes avisa y no llama a la API', () => {
    montar();
    cy.simularApi('POST', '/attendance/process/', {}, 'procesar');
    cy.contains('button', 'Cerrar jornada').click();
    cy.get('@toast').should('have.been.calledWith', 'No hay inasistencias pendientes por procesar.', 'info');
    cy.get('@procesar.all').should('have.length', 0);
  });

  it('COMP-RF13-02 · Con pendientes pide confirmación; si se cancela no procesa', () => {
    montar({ pendientes: UN_PENDIENTE });
    cy.simularApi('POST', '/attendance/process/', {}, 'procesar');
    cy.on('window:confirm', () => false);
    cy.contains('button', 'Cerrar jornada').click();
    cy.get('@procesar.all').should('have.length', 0);
  });

  it('COMP-RF13-03 · Confirmado: muestra "Procesando..." y avisa con advertencia si hubo penalizados', () => {
    montar({ pendientes: UN_PENDIENTE });
    cy.simularApi('POST', '/attendance/process/', {
      delay: 500, body: { message: 'Se procesaron 1 inasistencias. Estudiantes penalizados: Laura.', total_penalizados: 1 },
    }, 'procesar');
    cy.on('window:confirm', () => true);
    cy.contains('button', 'Cerrar jornada').click();
    cy.contains('button', 'Procesando...').should('be.disabled');
    cy.wait('@procesar').its('request.body.actor_email').should('eq', ENTRENADOR.email);
    cy.get('@toast').should('have.been.calledWithMatch', /Estudiantes penalizados/, 'warning');
    cy.contains('button', 'Cerrar jornada').should('be.enabled');
  });

  it('COMP-RF13-04 · El administrador no ve el botón de cerrar jornada', () => {
    montar({ user: ADMIN, pendientes: UN_PENDIENTE });
    cy.contains('button', 'Cerrar jornada').should('not.exist');
    cy.contains('Solo el entrenador cierra la jornada').should('be.visible');
  });

  it('COMP-RF16-02 · El botón de PDF apunta al registro del rol correspondiente', () => {
    montar();
    cy.contains('a', 'Generar PDF').should('have.attr', 'href')
      .and('contain', '/reports/daily/entrenador.pdf');
    montar({ user: ADMIN });
    cy.contains('a', 'Generar PDF').should('have.attr', 'href')
      .and('contain', '/reports/daily/administrador.pdf');
  });
});

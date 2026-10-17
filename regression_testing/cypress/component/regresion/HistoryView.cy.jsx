// Pruebas de componente de HistoryView: formulario de RF20 (reportar una falla
// o sugerencia) y la lista del historial donde vive ese formulario.
import HistoryView from '../../../../frontend/src/components/HistoryView';

const ESTUDIANTE = { name: 'Laura Estudiante', email: 'laura@soyudemedellin.edu.co', role: 'ESTUDIANTE' };

function montar(historial = []) {
  cy.simularApi('GET', '/reservations/history/', historial);
  const showToast = cy.stub().as('toast');
  cy.mount(<HistoryView user={ESTUDIANTE} showToast={showToast} />);
}

const campo = () => cy.get('textarea');
const boton = () => cy.contains('button', /Enviar al administrador|Enviando/);

describe('<HistoryView /> — formulario RF20', () => {
  it('COMP-RF20-01 · Botón deshabilitado con el campo vacío o con solo espacios', () => {
    montar();
    boton().should('be.disabled').and('have.css', 'cursor', 'not-allowed');
    campo().type('   ');
    boton().should('be.disabled');
    campo().type('x');
    boton().should('be.enabled');
  });

  it('COMP-RF20-02 · Envía correo y mensaje, muestra "Enviando…", avisa y limpia el campo', () => {
    montar();
    cy.simularApi('POST', '/suggestions/', {
      delay: 400, statusCode: 201, body: { notificacion: 'Tu reporte llegó al administrador. Gracias por avisar.' },
    }, 'enviar');
    campo().type('El calendario no carga.');
    boton().click();
    boton().should('have.text', 'Enviando…').and('be.disabled');
    cy.wait('@enviar').its('request.body')
      .should('deep.eq', { email: ESTUDIANTE.email, mensaje: 'El calendario no carga.' });
    cy.get('@toast').should('have.been.calledWith', 'Tu reporte llegó al administrador. Gracias por avisar.', 'success');
    campo().should('have.value', '');
  });

  it('COMP-RF20-03 · Si el servidor rechaza el mensaje, avisa el error y conserva el texto', () => {
    montar();
    cy.simularApi('POST', '/suggestions/', { statusCode: 400, body: { error: 'Escribe el mensaje antes de enviarlo.' } });
    campo().type('Texto que no se debe perder');
    boton().click();
    cy.get('@toast').should('have.been.calledWith', 'Escribe el mensaje antes de enviarlo.', 'error');
    campo().should('have.value', 'Texto que no se debe perder');
    boton().should('be.enabled');
  });

  it('COMP-RF20-04 · El campo limita el mensaje a 2000 caracteres', () => {
    montar();
    campo().should('have.attr', 'maxlength', '2000');
  });
});

describe('<HistoryView /> — historial', () => {
  it('COMP-HIST-01 · Sin historial muestra el estado vacío', () => {
    montar([]);
    cy.contains('Aún no tienes historial.').should('be.visible');
  });

  it('COMP-HIST-02 · Traduce cada estado de reserva a su etiqueta', () => {
    montar([
      { id: 'a', hour: '06:00', date: '2026-10-01', estado: 'COMPLETADA' },
      { id: 'b', hour: '08:00', date: '2026-10-02', estado: 'CANCELADA' },
      { id: 'c', hour: '10:00', date: '2026-10-03', estado: 'NO_SHOW' },
    ]);
    ['Asistió', 'Cancelada', 'No asistió'].forEach((t) => cy.contains('span', t).should('be.visible'));
  });
});

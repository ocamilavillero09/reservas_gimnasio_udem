// Defectos de interfaz encontrados con pruebas de componente.
// Igual que en e2e/defectos: cada prueba afirma el comportamiento correcto y
// FALLA mientras el defecto exista. Se ejecutan con npm run cy:defectos.
import TrainerPanel from '../../../../frontend/src/components/TrainerPanel';
import AdminPanel from '../../../../frontend/src/components/AdminPanel';

const ENTRENADOR = { name: 'Tomás', email: 'tomas.coach@udem.edu.co', role: 'ENTRENADOR' };
const ADMIN = { name: 'Ana', email: 'ana.admin@udemedellin.edu.co', role: 'ADMIN', es_principal: true };
const ERROR_500 = { statusCode: 500, body: { error: 'Error en el servidor' } };

describe('Defectos de interfaz', () => {
  it('DEF-05 (RF12) · Si falla la consulta de pendientes, NO debe decir que no hay pendientes', () => {
    // TrainerPanel descarta el error con .catch(() => {}) y muestra el estado vacío.
    cy.simularApi('GET', '/slots/', { slots: [] });
    cy.simularApi('GET', '/attendance/pending/', ERROR_500).as('pendientes');
    cy.simularApi('GET', '/reports/daily/entrenador/', { totales: {} });
    cy.mount(<TrainerPanel user={ENTRENADOR} showToast={cy.stub()} onChanged={cy.stub()} />);
    cy.wait('@pendientes');
    cy.contains('No hay estudiantes pendientes').should('not.exist');
    cy.get('[role="alert"]').should('be.visible');
    cy.screenshot('DEF-05-estado', { overwrite: true });
  });

  it('DEF-06 (RF16) · Si falla el registro diario, NO debe mostrar los totales en cero', () => {
    cy.simularApi('GET', '/slots/', { slots: [] });
    cy.simularApi('GET', '/attendance/pending/', { total: 0, pendientes: [] });
    cy.simularApi('GET', '/reports/daily/entrenador/', ERROR_500).as('registro');
    cy.mount(<TrainerPanel user={ENTRENADOR} showToast={cy.stub()} onChanged={cy.stub()} />);
    cy.wait('@registro');
    // No debe haber un total "0" presentado como dato real, y el error se avisa.
    cy.get('p').filter(':contains("Asistencias")').should(($p) => {
      if ($p.length) expect($p.prev().text()).not.to.eq('0');
    });
    cy.get('[role="alert"]').should('be.visible');
    cy.screenshot('DEF-06-estado', { overwrite: true });
  });

  it('DEF-07 (RF21) · Si falla la carga del buzón, NO debe decir que no hay mensajes', () => {
    cy.simularApi('GET', '/config/', { dominios: [] });
    cy.simularApi('GET', '/admin/users/', []);
    cy.simularApi('GET', '/suggestions/inbox/', ERROR_500).as('buzon');
    cy.mount(<AdminPanel user={ADMIN} showToast={cy.stub()} />);
    cy.wait('@buzon');
    cy.contains('Todavía no hay mensajes.').should('not.exist');
    cy.get('[role="alert"]').should('be.visible');
    cy.screenshot('DEF-07-estado', { overwrite: true });
  });

  it('DEF-04b (RF21) · Un mensaje enviado a las 20:15 UTC debe mostrarse a las 15:15 (hora de Colombia)', () => {
    cy.simularApi('GET', '/config/', { dominios: [] });
    cy.simularApi('GET', '/admin/users/', []);
    cy.simularApi('GET', '/suggestions/inbox/', {
      total: 1,
      mensajes: [{ id: 'm1', autor_nombre: 'Laura', autor_email: 'l@soyudemedellin.edu.co',
        mensaje: 'Hola', fecha: '2026-10-10T20:15:00+00:00' }],
    });
    cy.mount(<AdminPanel user={ADMIN} showToast={cy.stub()} />);
    cy.contains('15:15').should('be.visible');
    cy.screenshot('DEF-04b-estado', { overwrite: true });
  });
});

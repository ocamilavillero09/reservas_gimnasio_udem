// Pantallas que se evalúan en las pruebas de UX, cada una con los datos que
// necesita para verse como en uso real. Las comparten las pruebas de
// accesibilidad y de interfaz.

export const PANTALLAS = {
  'login': {
    rf: 'RF02',
    preparar: () => {
      cy.clearAllLocalStorage();
      cy.visit('/');
      cy.contains('Bienvenido de nuevo').should('be.visible');
    },
  },
  'panel-entrenador': {
    rf: 'RF11 · RF12 · RF13 · RF16',
    preparar: (u) => {
      cy.task('db:fijarInasistencias', { email: u.estudiante.email, cantidad: 4 });
      cy.sembrarReserva(u.estudiante.email);
      cy.sembrarReserva(u.estudiante2.email, { estado: 'COMPLETADA', slotId: 2, hour: '08:00' });
      cy.iniciarSesion('entrenador');
      cy.contains('h2', 'Panel del gimnasio').should('be.visible');
      cy.contains('tr', u.estudiante.name).should('be.visible');
      // Deja a la vista el resultado de una búsqueda (RF11).
      cy.get('input[placeholder="Documento de identidad del estudiante"]').type(u.estudiante.documento);
      cy.contains('button', 'Buscar').click();
      cy.contains('p', u.estudiante.name).should('be.visible');
    },
  },
  'historial-reporte': {
    rf: 'RF20',
    preparar: (u) => {
      cy.sembrarReserva(u.estudiante.email, { estado: 'COMPLETADA', reserva_date: '2026-10-01' });
      cy.sembrarReserva(u.estudiante.email, { estado: 'NO_SHOW', reserva_date: '2026-10-02', slotId: 2, hour: '08:00' });
      cy.iniciarSesion('estudiante');
      cy.contains('button', 'Historial').click();
      cy.contains('h2', 'Mi historial').should('be.visible');
    },
  },
  'buzon-admin': {
    rf: 'RF21',
    preparar: (u) => {
      cy.api('POST', '/suggestions/', { email: u.estudiante.email, mensaje: 'El botón de cancelar no responde en el celular.' });
      cy.api('POST', '/suggestions/', { email: u.estudiante2.email, mensaje: 'Sería útil un bloque a las 18:00.' });
      cy.iniciarSesion('admin');
      cy.contains('button', 'Usuarios').click();
      cy.contains('h3', 'Buzón de sugerencias').should('be.visible');
    },
  },
};

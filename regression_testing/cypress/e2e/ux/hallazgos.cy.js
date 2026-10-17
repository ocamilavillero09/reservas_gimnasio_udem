// Hallazgos de la evaluación heurística (Nielsen) y de accesibilidad,
// convertidos en pruebas verificables.
//
// Cada prueba afirma el comportamiento ESPERADO tras la corrección y deja una
// captura con el id del hallazgo. Ejecutada sobre el código original, falla y
// su captura es la evidencia del problema; sobre el código corregido pasa y su
// captura es la evidencia de la corrección.
// Los hallazgos de estados de error (H-05, H-11, H-18) y de la hora del buzón
// (H-17) están en component/defectos y e2e/defectos (DEF-04 a DEF-07).
import { MANANA } from '../../support/commands';

describe('Hallazgos heurísticos — RF11, RF12, RF13, RF16, RF20, RF21', () => {
  let u;
  before(() => cy.fixture('usuarios').then((f) => { u = f; }));
  beforeEach(() => cy.escenarioBase());

  const buscar = (doc) => {
    cy.get('input[placeholder="Documento de identidad del estudiante"]').clear().type(doc);
    cy.contains('button', /^Buscar$/).click();
  };

  context('Panel del entrenador', () => {
    beforeEach(() => cy.iniciarSesion('entrenador'));

    it('H-01 (H1 Visibilidad del estado, RF11) · La búsqueda muestra que está trabajando', () => {
      cy.intercept({ method: 'GET', pathname: '/api/students/lookup/' }, (req) => {
        req.on('response', (res) => res.setDelay(1500));
      });
      cy.get('input[placeholder="Documento de identidad del estudiante"]').type(u.estudiante.documento);
      cy.contains('button', /^Buscar$/).click();
      cy.contains('button', 'Buscando…').should('be.disabled');
      cy.screenshot('H-01-busqueda-en-curso', { capture: 'viewport', overwrite: true });
    });

    it('H-02 (H5 Prevención de errores, RF11) · No se ofrece registrar una reserva que no es de hoy', () => {
      cy.sembrarReserva(u.estudiante.email, { reserva_date: MANANA() });
      buscar(u.estudiante.documento);
      cy.contains('p', u.estudiante.name).should('be.visible');
      cy.screenshot('H-02-reserva-de-manana', { capture: 'viewport', overwrite: true });
      cy.contains('button', 'Registrar asistencia').should('be.disabled');
      cy.contains('Se registra el día de la reserva').should('be.visible');
    });

    it('H-04 (H5 Prevención de errores, RF11) · Un documento mal escrito se avisa sin llamar al servidor', () => {
      cy.intercept({ method: 'GET', pathname: '/api/students/lookup/' }).as('buscar');
      buscar('12345');
      cy.screenshot('H-04-documento-corto', { capture: 'viewport', overwrite: true });
      cy.contains('El documento tiene 10 dígitos').should('be.visible');
      cy.get('@buscar.all').should('have.length', 0);
    });

    it('H-06 (H4 Consistencia, RF12) · La misma acción se llama igual en la búsqueda y en la tabla', () => {
      cy.sembrarReserva(u.estudiante.email);
      cy.recargarPanel();
      cy.contains('tr', u.estudiante.name).within(() => {
        cy.root().screenshot('H-06-boton-tabla', { overwrite: true });
        cy.contains('button', 'Registrar asistencia').should('be.visible');
      });
    });

    it('H-07 (H7 Flexibilidad y eficiencia, RF12) · La tabla de pendientes se puede filtrar', () => {
      cy.sembrarReserva(u.estudiante.email);
      cy.sembrarReserva(u.estudiante2.email, { slotId: 2, hour: '08:00' });
      cy.recargarPanel();
      cy.screenshot('H-07-tabla-pendientes', { capture: 'viewport', overwrite: true });
      cy.get('input[aria-label="Filtrar pendientes"]').type('Mateo');
      cy.get('tbody tr').should('have.length', 1).and('contain', u.estudiante2.name);
    });

    it('H-08 (H3 Control y libertad, RF13) · La confirmación dice a quién afecta y a quién penaliza', () => {
      cy.task('db:fijarInasistencias', { email: u.estudiante.email, cantidad: 4 });
      cy.sembrarReserva(u.estudiante.email);
      cy.sembrarReserva(u.estudiante2.email, { slotId: 2, hour: '08:00' });
      cy.recargarPanel();
      let texto = '';
      cy.on('window:confirm', (t) => { texto = t; return false; });
      cy.contains('button', 'Cerrar jornada').click();
      cy.then(() => {
        cy.task('guardarJson', { ruta: `evidencias/${Cypress.env('informe') || 'ux'}/H-08-confirmacion.json`, datos: { texto } });
        expect(texto).to.contain(u.estudiante.name).and.contain(u.estudiante2.name);
        expect(texto).to.match(/quedará penalizad[oa]|quedarán penalizad/i);
      });
    });

    it('H-13 (Accesibilidad 1.1.1, RF16) · Los emojis decorativos no se leen como texto', () => {
      cy.contains('h3', 'Reporte general diario').then(($h) => {
        cy.wrap($h).find('[aria-hidden="true"]').should('exist');
      });
      cy.contains('a', 'Generar PDF').find('[aria-hidden="true"]').should('exist');
    });
  });

  it('H-28 (Interfaz móvil, todas las pantallas) · La página declara el viewport para celulares', () => {
    // Sin esta etiqueta el teléfono dibuja la página a 980 px y la reduce: el
    // texto queda diminuto. Cypress no lo detecta con cy.viewport (cambia el
    // tamaño de la ventana, no emula el navegador móvil); lo detectó Lighthouse.
    cy.visit('/');
    cy.get('head meta[name="viewport"]').should('have.attr', 'content').and('contain', 'width=device-width');
  });

  context('Historial del estudiante (RF20)', () => {
    beforeEach(() => {
      cy.iniciarSesion('estudiante');
      cy.contains('button', 'Historial').click();
    });

    it('H-15 (H2 Coincidencia con el mundo real, RF20) · El formulario dice que recibe fallas y sugerencias', () => {
      cy.screenshot('H-15-titulo-formulario', { capture: 'viewport', overwrite: true });
      cy.contains('h3', /falla o sugerencia/i).should('be.visible');
    });

    it('H-16 (H1 Visibilidad del estado, RF20) · Hay un contador de caracteres', () => {
      cy.get('textarea').type('Hola');
      cy.contains('4/2000').should('be.visible');
    });
  });

  context('Buzón del administrador (RF21)', () => {
    it('H-20 (Accesibilidad 2.5.8, RF21) · El botón Borrar es legible, cómodo de tocar y dice qué borra', () => {
      cy.api('POST', '/suggestions/', { email: u.estudiante.email, mensaje: 'Mensaje de prueba' });
      cy.iniciarSesion('admin');
      cy.contains('button', 'Usuarios').click();
      cy.contains('button', 'Borrar').then(($b) => {
        cy.wrap($b).scrollIntoView().screenshot('H-20-boton-borrar', { overwrite: true, padding: 20 });
        const r = $b[0].getBoundingClientRect();
        const fuente = parseFloat(getComputedStyle($b[0]).fontSize);
        expect(r.height, 'alto (px)').to.be.at.least(32);
        expect(fuente, 'tamaño de letra (px)').to.be.at.least(13);
        // El nombre accesible sigue siendo "Borrar"; la descripción dice de quién es el mensaje.
        const descrito = $b.attr('aria-describedby');
        expect(descrito, 'aria-describedby').to.be.a('string');
        cy.get(`#${descrito}`).should('have.text', u.estudiante.name);
      });
    });
  });
});

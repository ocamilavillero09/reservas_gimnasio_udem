// Comportamiento visual de la interfaz en móvil, tableta y escritorio.
//
// Por pantalla y tamaño: captura de página completa y tres verificaciones:
//   · sin desplazamiento horizontal (el contenido cabe en el ancho)
//   · objetivos táctiles de al menos 24×24 px (WCAG 2.2, criterio 2.5.8)
//   · el foco del teclado se ve en los campos de texto (WCAG 2.4.7 / 2.4.13)
import { PANTALLAS } from './escenarios';

const DISPOSITIVOS = {
  movil: [375, 812],
  tableta: [768, 1024],
  escritorio: [1280, 900],
};

describe('Interfaz — responsive y foco visible', () => {
  let u;
  before(() => cy.fixture('usuarios').then((f) => { u = f; }));

  Object.entries(PANTALLAS).forEach(([nombre, { rf, preparar }]) => {
    Object.entries(DISPOSITIVOS).forEach(([dispositivo, [ancho, alto]]) => {
      it(`UI-${nombre}-${dispositivo} (${rf}) · Cabe en ${ancho}px y los controles miden al menos 24×24`, () => {
        cy.escenarioBase();
        cy.viewport(ancho, alto);
        preparar(u);
        cy.medirInterfaz(nombre, dispositivo).then((m) => {
          expect(m.desborde_horizontal_px, 'desplazamiento horizontal (px)').to.eq(0);
          expect(m.objetivos_menores_24px, 'controles menores de 24×24 px').to.have.length(0);
        });
      });
    });

    it(`UI-${nombre}-foco (${rf}) · El foco del teclado es visible en los campos de texto`, () => {
      // Criterio: contorno visible, o sombra de foco con opacidad de al menos
      // 0.3. Una sombra más tenue no alcanza el contraste 3:1 que pide WCAG
      // 2.4.13 (Apariencia del foco) frente al fondo del campo.
      cy.escenarioBase();
      preparar(u);
      cy.terminarAnimaciones();
      cy.get('input:visible, textarea:visible').then(($els) => {
        const sinFoco = [];
        [...$els].forEach((el) => {
          el.focus();
          const s = el.ownerDocument.defaultView.getComputedStyle(el);
          const contorno = s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) > 0;
          const alfa = (s.boxShadow.match(/rgba\([^)]*,\s*([\d.]+)\)/) || [])[1];
          const sombra = s.boxShadow !== 'none' && (alfa === undefined || parseFloat(alfa) >= 0.3);
          if (!contorno && !sombra) {
            sinFoco.push(`${el.tagName.toLowerCase()} "${(el.placeholder || '').slice(0, 30)}" (sombra: ${s.boxShadow})`);
          }
        });
        cy.task('guardarJson', {
          ruta: `evidencias/${Cypress.env('informe') || 'ux'}/interfaz/${nombre}-foco.json`,
          datos: { pantalla: nombre, campos_sin_foco_visible: sinFoco },
        });
        if ($els.length) cy.wrap($els.first()).focus();
        cy.screenshot(`UI-${nombre}-foco`, { capture: 'viewport', overwrite: true });
        cy.then(() => expect(sinFoco, 'campos con indicador de foco insuficiente').to.have.length(0));
      });
    });
  });
});

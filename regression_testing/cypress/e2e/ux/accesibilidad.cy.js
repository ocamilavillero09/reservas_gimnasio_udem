// Accesibilidad automatizada con axe-core (WCAG 2.2 niveles A y AA).
//
// Cada pantalla se audita con datos reales. Todas las violaciones quedan en
// evidencias/<ejecución>/accesibilidad/<pantalla>.json; la prueba falla si hay
// alguna de impacto crítico o serio.
import { PANTALLAS } from './escenarios';

describe('Accesibilidad — WCAG 2.2 A/AA (axe-core)', () => {
  let u;
  before(() => cy.fixture('usuarios').then((f) => { u = f; }));
  beforeEach(() => cy.escenarioBase());

  Object.entries(PANTALLAS).forEach(([nombre, { rf, preparar }]) => {
    it(`A11Y-${nombre} (${rf}) · Sin violaciones críticas ni serias`, () => {
      preparar(u);
      cy.auditarAccesibilidad(nombre);
    });
  });
});

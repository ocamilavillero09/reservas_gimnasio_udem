// Comandos para las pruebas de UX: accesibilidad (axe-core) e interfaz.

const ETIQUETAS_WCAG = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];
const carpeta = () => `evidencias/${Cypress.env('informe') || 'ux'}`;

// Las pantallas entran con una animación de opacidad (fadeUp). Si se mide en
// mitad de ella, los colores salen más claros de lo que son. Se terminan las
// animaciones antes de medir para evaluar los colores reales.
Cypress.Commands.add('terminarAnimaciones', () => {
  cy.document().then((doc) => {
    if (doc.getElementById('sin-animaciones')) return;
    const estilo = doc.createElement('style');
    estilo.id = 'sin-animaciones';
    estilo.textContent = '*, *::before, *::after { animation: none !important; transition: none !important; }';
    doc.head.appendChild(estilo);
  });
});

// Audita la página con axe-core contra WCAG 2.2 A/AA, guarda TODAS las
// violaciones en un JSON y falla si hay alguna de impacto crítico o serio.
Cypress.Commands.add('auditarAccesibilidad', (pantalla) => {
  cy.terminarAnimaciones();
  cy.injectAxe({ axeCorePath: 'node_modules/axe-core/axe.min.js' });
  let encontradas = [];
  cy.checkA11y(
    null,
    { runOnly: { type: 'tag', values: ETIQUETAS_WCAG } },
    (violaciones) => { encontradas = violaciones; },
    true,                                    // no falla aquí: primero se registra todo
  );
  cy.then(() => {
    const resumen = encontradas.map((v) => ({
      regla: v.id, impacto: v.impact, descripcion: v.help, ayuda: v.helpUrl,
      wcag: v.tags.filter((t) => /^wcag\d/.test(t)),
      nodos: v.nodes.length,
      ejemplos: v.nodes.slice(0, 3).map((n) => ({ selector: n.target.join(' '), html: n.html.slice(0, 160), resumen: n.failureSummary })),
    }));
    cy.task('guardarJson', { ruta: `${carpeta()}/accesibilidad/${pantalla}.json`, datos: { pantalla, violaciones: resumen } });
    cy.screenshot(`A11Y-${pantalla}`, { capture: 'fullPage', overwrite: true });
    // La aserción va en un paso posterior: si estuviera aquí, fallaría antes de
    // que Cypress ejecute el guardado y la captura de arriba.
    cy.then(() => {
      const graves = resumen.filter((v) => ['critical', 'serious'].includes(v.impacto));
      const detalle = graves.map((v) => `${v.regla} (${v.impacto}, ${v.nodos} elementos)`).join('; ');
      expect(graves, `violaciones críticas o serias: ${detalle || 'ninguna'}`).to.have.length(0);
    });
  });
});

// Mide la interfaz en el tamaño de pantalla actual y guarda los datos.
Cypress.Commands.add('medirInterfaz', (pantalla, dispositivo) => {
  cy.terminarAnimaciones();
  cy.document().then((doc) => {
    const win = doc.defaultView;
    const desborde = doc.documentElement.scrollWidth - win.innerWidth;
    // Objetivos táctiles: WCAG 2.2 (2.5.8) pide al menos 24×24 px.
    const pequenos = [...doc.querySelectorAll('button, a[href], input, textarea, select')]
      .filter((el) => el.offsetParent !== null)
      .map((el) => ({ el, r: el.getBoundingClientRect() }))
      .filter(({ r }) => r.width < 24 || r.height < 24)
      .map(({ el, r }) => `${el.tagName.toLowerCase()} "${(el.innerText || el.placeholder || el.getAttribute('aria-label') || '').trim().slice(0, 30)}" ${Math.round(r.width)}×${Math.round(r.height)}`);
    // Texto más pequeño visible.
    const tamanos = [...doc.querySelectorAll('body *')]
      .filter((el) => el.offsetParent !== null && [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()))
      .map((el) => parseFloat(win.getComputedStyle(el).fontSize));
    const datos = {
      pantalla, dispositivo, ancho: win.innerWidth,
      desborde_horizontal_px: Math.max(0, desborde),
      objetivos_menores_24px: pequenos,
      fuente_minima_px: Math.min(...tamanos),
    };
    cy.task('guardarJson', { ruta: `${carpeta()}/interfaz/${pantalla}-${dispositivo}.json`, datos });
    cy.screenshot(`UI-${pantalla}-${dispositivo}`, { capture: 'fullPage', overwrite: true });
    cy.wrap(datos);
  });
});

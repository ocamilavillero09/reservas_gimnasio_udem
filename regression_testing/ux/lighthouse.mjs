// Auditoría Lighthouse (accesibilidad, buenas prácticas y rendimiento, en móvil)
// de las pantallas de RF11–RF21, sobre el build de producción del frontend.
//
//   cd frontend && VITE_API_URL=http://localhost:8000/api npx vite build --outDir /tmp/dist
//   npx vite preview --outDir /tmp/dist --port 4173 &
//   CHROME_PATH=/ruta/a/chrome node ../regression_testing/ux/lighthouse.mjs <etiqueta>
//
// Variables: APP_URL (por defecto http://localhost:4173) y API_URL
// (http://localhost:8000/api). Crea los usuarios de prueba si no existen y deja
// en lighthouse/<etiqueta>/ un informe HTML por pantalla y resumen.json.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const requireFront = createRequire(path.join(AQUI, '../../frontend/package.json'));
const puppeteer = requireFront('puppeteer-core');
const { default: lighthouse } = await import(requireFront.resolve('lighthouse'));

const ETIQUETA = process.argv[2] || 'actual';
const APP = process.env.APP_URL || 'http://localhost:4173';
const API = process.env.API_URL || 'http://localhost:8000/api';
const SALIDA = path.join(AQUI, 'lighthouse', ETIQUETA);
fs.mkdirSync(SALIDA, { recursive: true });

const usuarios = JSON.parse(fs.readFileSync(path.join(AQUI, '../cypress/fixtures/usuarios.json'), 'utf8'));
const post = (ruta, body) => fetch(`${API}${ruta}`, {
  method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
});
for (const u of Object.values(usuarios)) await post('/auth/register/', u);      // si ya existe, responde 400
await post('/suggestions/', { email: usuarios.estudiante.email, mensaje: 'Mensaje para la auditoría Lighthouse.' });

// Cada pantalla: quién inicia sesión y en qué vista se abre.
const PANTALLAS = [
  { nombre: 'login', usuario: null },
  { nombre: 'panel-entrenador', usuario: 'entrenador', boton: null },
  { nombre: 'historial-reporte', usuario: 'estudiante', boton: 'Historial' },
  { nombre: 'buzon-admin', usuario: 'admin', boton: 'Usuarios' },
];

const navegador = await puppeteer.launch({
  executablePath: process.env.CHROME_PATH,
  args: ['--no-sandbox', '--headless=new'],
});
const puerto = Number(new URL(navegador.wsEndpoint()).port);
const resumen = [];

for (const p of PANTALLAS) {
  const pagina = await navegador.newPage();
  await pagina.goto(APP);
  await pagina.evaluate((u) => {
    localStorage.clear();
    if (u) localStorage.setItem('gym_udem_session', JSON.stringify({ name: u.name, email: u.email, role: u.role }));
  }, p.usuario ? { ...usuarios[p.usuario], role: { entrenador: 'ENTRENADOR', estudiante: 'ESTUDIANTE', admin: 'ADMIN' }[p.usuario] } : null);

  // La vista de historial y la de usuarios se abren desde la barra: se audita
  // con un flujo de Lighthouse en modo "snapshot" después de hacer clic.
  let resultado;
  if (p.boton) {
    await pagina.goto(APP, { waitUntil: 'networkidle0' });
    await pagina.evaluate((texto) => [...document.querySelectorAll('button')].find((b) => b.textContent.trim() === texto)?.click(), p.boton);
    await new Promise((r) => setTimeout(r, 1500));
    const { snapshot } = await import(requireFront.resolve('lighthouse'));
    resultado = await snapshot(pagina, { config: { extends: 'lighthouse:default', settings: { onlyCategories: ['accessibility', 'best-practices'] } } });
  } else {
    resultado = await lighthouse(APP, {
      port: puerto, output: 'html', disableStorageReset: true,
      onlyCategories: ['performance', 'accessibility', 'best-practices'],
    });
  }
  const lhr = resultado.lhr;
  const html = resultado.report ?? (await import(requireFront.resolve('lighthouse/report/generator/report-generator.js'))).ReportGenerator.generateReportHtml(lhr);
  fs.writeFileSync(path.join(SALIDA, `${p.nombre}.html`), Array.isArray(html) ? html[0] : html);
  const fila = { pantalla: p.nombre, modo: p.boton ? 'snapshot' : 'navegación' };
  for (const [id, cat] of Object.entries(lhr.categories)) fila[id] = Math.round(cat.score * 100);
  fila.fallas_accesibilidad = Object.values(lhr.audits)
    .filter((a) => lhr.categories.accessibility.auditRefs.some((r) => r.id === a.id && r.weight > 0) && a.score === 0)
    .map((a) => a.title);
  fila.fallas_buenas_practicas = Object.values(lhr.audits)
    .filter((a) => lhr.categories['best-practices'].auditRefs.some((r) => r.id === a.id && r.weight > 0) && a.score !== null && a.score < 1)
    .map((a) => {
      const items = (a.details?.items || []).slice(0, 3).map((i) => i.description || i.source?.url || i.url || '').filter(Boolean);
      return items.length ? `${a.title}: ${items.join(' | ')}` : a.title;
    });
  if (lhr.audits['largest-contentful-paint']) {
    fila.LCP_ms = Math.round(lhr.audits['largest-contentful-paint'].numericValue);
    fila.TBT_ms = Math.round(lhr.audits['total-blocking-time'].numericValue);
    fila.CLS = Number(lhr.audits['cumulative-layout-shift'].numericValue.toFixed(3));
  }
  resumen.push(fila);
  console.log(fila);
  await pagina.close();
}

fs.writeFileSync(path.join(SALIDA, 'resumen.json'), JSON.stringify(resumen, null, 2));
await navegador.close();

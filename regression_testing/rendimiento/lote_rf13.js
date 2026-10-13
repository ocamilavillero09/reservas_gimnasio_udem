// RF13 — Cerrar la jornada: proceso por lotes que corre una vez al día.
//
// Mide cuánto tarda en procesar la jornada con el gimnasio lleno (120 reservas
// sin asistencia) y comprueba que las procese todas. Se ejecuta justo después
// de sembrar los datos:
//
//   node sembrar_datos.mjs && k6 run lote_rf13.js
import http from 'k6/http';
import { check } from 'k6';

const BASE = __ENV.BASE_URL || 'http://localhost:8000/api';
const DATOS = JSON.parse(open('./usuarios.json'));

export const options = {
  vus: 1,
  iterations: 1,
  thresholds: {
    // Criterio: cerrar una jornada llena en menos de 5 segundos.
    'http_req_duration{op:RF13_cerrar_jornada}': ['max<5000'],
    checks: ['rate==1'],
  },
  summaryTrendStats: ['avg', 'min', 'med', 'max'],
};

export default function () {
  const actor = DATOS.entrenadores[0].email;
  const pendientes = http.get(`${BASE}/attendance/pending/?actor_email=${encodeURIComponent(actor)}`).json('total');
  const r = http.post(`${BASE}/attendance/process/`, JSON.stringify({ actor_email: actor }),
    { headers: { 'Content-Type': 'application/json' }, tags: { op: 'RF13_cerrar_jornada' }, timeout: '120s' });
  check(r, {
    'RF13 200': (x) => x.status === 200,
    'procesó todas las pendientes': (x) => x.json('total_procesadas') === pendientes,
  });
  console.log(`Pendientes: ${pendientes} · procesadas: ${r.json('total_procesadas')} · ${r.timings.duration.toFixed(0)} ms`);
}

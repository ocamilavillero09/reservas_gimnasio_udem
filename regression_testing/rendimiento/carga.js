// Pruebas de rendimiento con k6 — RF11, RF12, RF13*, RF16, RF20 y RF21.
//
// Simula la operación real del gimnasio: estudiantes que entran a la app,
// entrenadores que atienden la puerta y el administrador que revisa el buzón.
// (*) RF13 es un proceso por lotes de una vez al día: se mide aparte, en lote_rf13.js.
//
//   k6 run -e PERFIL=humo   carga.js     # 2 usuarios, 30 s: comprueba que todo responde
//   k6 run -e PERFIL=carga  carga.js     # 50 usuarios simultáneos, la hora pico
//   k6 run -e PERFIL=estres carga.js     # sube hasta 200 usuarios para encontrar el límite
//
// Variables: BASE_URL (por defecto http://localhost:8000/api).
// Antes de cada ejecución hay que volver a sembrar los datos (sembrar_datos.mjs):
// la prueba registra asistencias y cambia el estado de la base.
import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

const BASE = __ENV.BASE_URL || 'http://localhost:8000/api';
const PERFIL = __ENV.PERFIL || 'humo';
const DATOS = JSON.parse(open('./usuarios.json'));
const JSON_H = { headers: { 'Content-Type': 'application/json' } };

// Respuestas de negocio que no son errores del sistema: un estudiante sin
// reserva (404) o una asistencia ya registrada / fuera de horario (409).
const ESPERADAS_ASISTENCIA = http.expectedStatuses(200, 404, 409);
const erroresNegocio = new Rate('respuestas_inesperadas');

// ── Perfiles de carga ──────────────────────────────────────────────────────
// Reparto: 70 % estudiantes, 20 % entrenadores, 10 % administrador.
function etapas(total) {
  const p = (x) => Math.max(1, Math.round(x));
  if (PERFIL === 'humo') return { est: [{ duration: '30s', target: 1 }], ent: [{ duration: '30s', target: 1 }], adm: [{ duration: '30s', target: 1 }] };
  if (PERFIL === 'carga') {
    const e = (n) => [{ duration: '30s', target: n }, { duration: '2m', target: n }, { duration: '15s', target: 0 }];
    return { est: e(p(total * 0.7)), ent: e(p(total * 0.2)), adm: e(p(total * 0.1)) };
  }
  // estres: escalones de 50, 100 y 200 usuarios.
  const e = (n) => [
    { duration: '30s', target: p(n * 0.25) }, { duration: '45s', target: p(n * 0.25) },
    { duration: '30s', target: p(n * 0.5) }, { duration: '45s', target: p(n * 0.5) },
    { duration: '30s', target: n }, { duration: '45s', target: n },
    { duration: '15s', target: 0 },
  ];
  return { est: e(p(total * 0.7)), ent: e(p(total * 0.2)), adm: e(p(total * 0.1)) };
}
const TOTAL = PERFIL === 'carga' ? 50 : PERFIL === 'estres' ? 200 : 3;
const E = etapas(TOTAL);
const escenario = (exec, stages) => (PERFIL === 'humo'
  ? { executor: 'constant-vus', exec, vus: 1, duration: '30s' }
  : { executor: 'ramping-vus', exec, startVUs: 0, stages, gracefulRampDown: '10s' });

// ── Criterios de aceptación ────────────────────────────────────────────────
// p95 < 500 ms por operación de lectura, < 800 ms para el login (el hash
// PBKDF2 es lento a propósito), menos de 1 % de errores y 99 % de checks.
const P95 = 'p(95)<500';
export const options = {
  scenarios: {
    estudiantes: escenario('estudiante', E.est),
    entrenadores: escenario('entrenador', E.ent),
    administrador: escenario('administrador', E.adm),
  },
  thresholds: {
    http_req_failed: ['rate<0.01'],
    checks: ['rate>0.99'],
    http_req_duration: [P95],
    'http_req_duration{op:login}': ['p(95)<800'],
    'http_req_duration{op:horarios}': [P95],
    'http_req_duration{op:mis_reservas}': [P95],
    'http_req_duration{op:historial}': [P95],
    'http_req_duration{op:RF11_buscar}': [P95],
    'http_req_duration{op:RF11_registrar}': [P95],
    'http_req_duration{op:RF12_pendientes}': [P95],
    'http_req_duration{op:RF16_registro_diario}': [P95],
    'http_req_duration{op:RF20_enviar}': [P95],
    'http_req_duration{op:RF21_buzon}': [P95],
  },
  summaryTrendStats: ['avg', 'min', 'med', 'max', 'p(90)', 'p(95)', 'p(99)'],
};

const azar = (lista) => lista[Math.floor(Math.random() * lista.length)];
const pausa = () => sleep(1 + Math.random() * 2);     // tiempo de lectura de una persona

// ── Estudiante: entra, mira horarios, sus reservas y su historial ──────────
export function estudiante() {
  const u = azar(DATOS.estudiantes);
  const login = http.post(`${BASE}/auth/login/`, JSON.stringify(u), { ...JSON_H, tags: { op: 'login' } });
  check(login, { 'login 200': (r) => r.status === 200 });
  pausa();
  const q = `email=${encodeURIComponent(u.email)}`;
  check(http.get(`${BASE}/slots/`, { tags: { op: 'horarios' } }), { 'horarios 200': (r) => r.status === 200 });
  check(http.get(`${BASE}/reservations/?${q}`, { tags: { op: 'mis_reservas' } }), { 'mis reservas 200': (r) => r.status === 200 });
  pausa();
  check(http.get(`${BASE}/reservations/history/?${q}`, { tags: { op: 'historial' } }), { 'historial 200': (r) => r.status === 200 });
  if (Math.random() < 0.1) {          // 1 de cada 10 reporta algo (RF20)
    const r = http.post(`${BASE}/suggestions/`, JSON.stringify({ email: u.email, mensaje: 'Prueba de carga: la app va lenta en hora pico.' }),
      { ...JSON_H, tags: { op: 'RF20_enviar' } });
    check(r, { 'RF20 201': (x) => x.status === 201 });
  }
  pausa();
}

// ── Entrenador: pendientes, busca por documento, registra, mira el registro ─
export function entrenador() {
  const c = azar(DATOS.entrenadores);
  const actor = `actor_email=${encodeURIComponent(c.email)}`;
  check(http.get(`${BASE}/attendance/pending/?${actor}`, { tags: { op: 'RF12_pendientes' } }),
    { 'RF12 200': (r) => r.status === 200 });
  pausa();
  const documento = azar(DATOS.documentos_con_reserva_hoy);
  check(http.get(`${BASE}/students/lookup/?documento=${documento}&${actor}`, { tags: { op: 'RF11_buscar' } }),
    { 'RF11 buscar 200': (r) => r.status === 200 });
  const reg = http.post(`${BASE}/attendance/register/`, JSON.stringify({ actor_email: c.email, documento }),
    { ...JSON_H, tags: { op: 'RF11_registrar' }, responseCallback: ESPERADAS_ASISTENCIA });
  const ok = check(reg, { 'RF11 registrar 200/404/409': (r) => [200, 404, 409].includes(r.status) });
  erroresNegocio.add(!ok);
  pausa();
  check(http.get(`${BASE}/reports/daily/entrenador/?${actor}`, { tags: { op: 'RF16_registro_diario' } }),
    { 'RF16 200': (r) => r.status === 200 });
  pausa();
}

// ── Administrador: revisa el buzón ─────────────────────────────────────────
export function administrador() {
  const r = http.get(`${BASE}/suggestions/inbox/?actor_email=${encodeURIComponent(DATOS.admin.email)}`, { tags: { op: 'RF21_buzon' } });
  check(r, { 'RF21 200': (x) => x.status === 200 });
  pausa();
  pausa();
}

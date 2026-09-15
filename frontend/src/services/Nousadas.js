// ============================================================================
//  Requisitos que no entran en esta entrega de pruebas — cliente HTTP
// ----------------------------------------------------------------------------
//  El plan reparte los requisitos entre tres personas: RF01 a RF05 (acceso y
//  perfiles), RF06 a RF10 (reservas), y RF11 a RF16 junto con RF20 y RF21
//  (asistencia, registro diario y buzón). Los cinco que quedan fuera de ese
//  reparto viven aquí, separados de api.js, para que se vea de un vistazo qué
//  entra en la entrega y qué no.
//
//    RF17  Ver el registro diario, administrador
//    RF18  Descargar el registro en PDF, entrenador
//    RF19  Descargar el registro en PDF, administrador
//    RF22  Crear cuentas con rol de administrador
//    RF23  Retirar el rol de administrador
//
//  Estar en este archivo no las desconecta: los componentes las siguen usando
//  y la aplicación se comporta igual. Es una separación para leer el código.
// ============================================================================
import { BASE, request } from './api';


// RF21/RF22 — Gestión de usuarios por el ADMINISTRADOR PRINCIPAL.
export const adminApi = {
  listarUsuarios: (actorEmail) => request(`/admin/users/?actor_email=${encodeURIComponent(actorEmail)}`),
  // RF22 — Crear una cuenta de administrador (backend: crear_administrador).
  crearAdministrador: (body) => request('/admin/users/', { method: 'POST', body: JSON.stringify(body) }),
  // RF23 — Retirar el rol de administrador (backend: retirar_administrador).
  // La cuenta NO se borra: queda sin rol. accion: 'retirar' | 'restaurar'.
  retirarAdministrador: (email, accion, actorEmail) =>
    request(`/admin/users/${encodeURIComponent(email)}/`, {
      method: 'PATCH',
      body: JSON.stringify({ accion, actor_email: actorEmail }),
    }),
};

// RF11/RF13 — El entrenador busca al estudiante por su DOCUMENTO y le registra
// la asistencia. RF14/RF15 — Inasistencias pendientes y su procesamiento general.


// RF17, RF18 y RF19 — El registro diario del administrador y las dos descargas
// en PDF. El registro del entrenador (RF16) se queda en api.js porque sí entra
// en la entrega, aunque comparta pantalla con estas.
export const registroDiarioApi = {
  // RF17 — Ver el registro diario, administrador (backend: ver_registro_administrador).
  verRegistroAdministrador: (actorEmail, fecha = '') =>
    request(`/reports/daily/administrador/?actor_email=${encodeURIComponent(actorEmail)}&fecha=${fecha}`),
  // RF18 — Descargar el registro en PDF, entrenador (backend: descargar_registro_entrenador).
  descargarRegistroEntrenador: (actorEmail, fecha = '') =>
    `${BASE}/reports/daily/entrenador.pdf?actor_email=${encodeURIComponent(actorEmail)}&fecha=${fecha}`,
  // RF19 — Descargar el registro en PDF, administrador (backend: descargar_registro_administrador).
  descargarRegistroAdministrador: (actorEmail, fecha = '') =>
    `${BASE}/reports/daily/administrador.pdf?actor_email=${encodeURIComponent(actorEmail)}&fecha=${fecha}`,
};

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

async function request(path, options = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Error en el servidor');
  return data;
}

// RF01/RF02 — Registro e inicio de sesión con nombre, correo institucional y
// DOCUMENTO DE IDENTIDAD (el documento es además la contraseña).
export const authApi = {
  // RF01 — Registrar una cuenta (backend: registrar_cuenta)
  registrarCuenta: (body) => request('/auth/register/', { method: 'POST', body: JSON.stringify(body) }),
  // RF02 — Iniciar sesión (backend: iniciar_sesion)
  iniciarSesion: (body) => request('/auth/login/', { method: 'POST', body: JSON.stringify(body) }),
  // Rehidrata la sesión al recargar la página (la sesión no se pierde con F5).
  session:  (email) => request(`/auth/session/?email=${encodeURIComponent(email)}`),
};

// RF21/RF22 — Gestión de usuarios por el ADMINISTRADOR PRINCIPAL.
export const adminApi = {
  listUsers:  (actorEmail) => request(`/admin/users/?actor_email=${encodeURIComponent(actorEmail)}`),
  createUser: (body)       => request('/admin/users/', { method: 'POST', body: JSON.stringify(body) }),
  // RF22 — accion: 'retirar' | 'restaurar' el rol de administrador.
  setAdminRole: (email, accion, actorEmail) =>
    request(`/admin/users/${encodeURIComponent(email)}/`, {
      method: 'PATCH',
      body: JSON.stringify({ accion, actor_email: actorEmail }),
    }),
};

// RF11/RF13 — El entrenador busca al estudiante por su DOCUMENTO y le registra
// la asistencia. RF14/RF15 — Inasistencias pendientes y su procesamiento general.
export const attendanceApi = {
  lookup: (documento, actorEmail) =>
    request(`/students/lookup/?documento=${encodeURIComponent(documento)}&actor_email=${encodeURIComponent(actorEmail)}`),
  register: (body) => request('/attendance/register/', { method: 'POST', body: JSON.stringify(body) }),
  pending:  (actorEmail, fecha = '') =>
    request(`/attendance/pending/?actor_email=${encodeURIComponent(actorEmail)}&fecha=${fecha}`),
  process:  (actorEmail, fecha = '') =>
    request('/attendance/process/', { method: 'POST', body: JSON.stringify({ actor_email: actorEmail, fecha }) }),
};

export const slotsApi = {
  // RF06 — Consultar los bloques horarios con sus cupos (backend: consultar_horarios).
  // Devuelve { fecha, fecha_label, slots }. La fecha es SIEMPRE la del día siguiente.
  consultarHorarios: () => request('/slots/'),
};

export const reservationsApi = {
  // RF08 — Consultar mis reservas (backend: consultar_reserva).
  consultarReserva: (email) => request(`/reservations/?email=${encodeURIComponent(email)}`),
  // RF07 — Reservar un bloque para el día siguiente (backend: reservar_mañana).
  reservarMañana:   (body)  => request('/reservations/', { method: 'POST', body: JSON.stringify(body) }),
  // RF09 — Cancelar mi reserva (backend: cancelar_reserva).
  cancelarReserva:  (id)    => request(`/reservations/${id}/`, { method: 'DELETE' }),
  // El entrenador marca una inasistencia suelta.
  noShow: (id, actorEmail) =>
    request(`/reservations/${id}/no-show/`, { method: 'POST', body: JSON.stringify({ actor_email: actorEmail }) }),
  // RF14 — Ver mi historial.
  history: (email) => request(`/reservations/history/?email=${encodeURIComponent(email)}`),
};

// RF12 — Lista de espera.
// RF13 — Perfil y metas.
export const profileApi = {
  // RF03 — Consultar y actualizar el perfil del estudiante
  //        (backend: consultar_actualizar_perfil)
  consultarPerfil:  (email) => request(`/users/profile/?email=${encodeURIComponent(email)}`),
  actualizarPerfil: (body)  => request('/users/profile/', { method: 'PUT', body: JSON.stringify(body) }),
  // RF04 — Perfil del entrenador (backend: consultar_entrenador)
  consultarEntrenador:    (email) => request(`/users/entrenador/?email=${encodeURIComponent(email)}`),
  // RF05 — Perfil del administrador (backend: consultar_administrador)
  consultarAdministrador: (email) => request(`/users/administrador/?email=${encodeURIComponent(email)}`),
};

// RF15 — Calificación del servicio.
export const ratingsApi = {
  list:   ()     => request('/ratings/'),
  create: (body) => request('/ratings/', { method: 'POST', body: JSON.stringify(body) }),
};

// Reportes: aforo, por estudiante, personal (RF18) y general diario (RF19/RF20).
export const reportsApi = {
  students:  () => request('/reports/students/'),
  // RF18 — Reporte personal del estudiante: inasistencias y penalizaciones.
  personal:  (email) => request(`/reports/personal/?email=${encodeURIComponent(email)}`),
  // RF19 — Reporte general diario del gimnasio.
  daily:     (actorEmail, fecha = '') =>
    request(`/reports/daily/?actor_email=${encodeURIComponent(actorEmail)}&fecha=${fecha}`),
  // RF20 — El mismo reporte diario en PDF, listo para imprimir.
  dailyPdfUrl: (actorEmail, fecha = '') =>
    `${BASE}/reports/daily.pdf?actor_email=${encodeURIComponent(actorEmail)}&fecha=${fecha}`,
  pdfUrl:    `${BASE}/reports/usage.pdf`,
};

// RF18 — Máquinas.

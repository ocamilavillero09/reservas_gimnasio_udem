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

// Constantes de negocio para la interfaz. No es un requisito funcional: es lo
// que hace cumplir el RNF06 (backend: consultar_configuracion).
export const configApi = {
  consultarConfiguracion: () => request('/config/'),
};

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
export const attendanceApi = {
  // RF10 — Buscar la reserva de un estudiante por su documento (backend: buscar_reserva).
  buscarReserva: (documento, actorEmail) =>
    request(`/students/lookup/?documento=${encodeURIComponent(documento)}&actor_email=${encodeURIComponent(actorEmail)}`),
  // RF11 — Registrar la asistencia (backend: registrar_asistencia).
  registrarAsistencia: (body) => request('/attendance/register/', { method: 'POST', body: JSON.stringify(body) }),
  // RF12 — Reservas sin asistencia registrada (backend: consultar_reservas).
  consultarReservas: (actorEmail, fecha = '') =>
    request(`/attendance/pending/?actor_email=${encodeURIComponent(actorEmail)}&fecha=${fecha}`),
  // RF13 — Cerrar la jornada (backend: procesar_inasistencia). Solo el entrenador.
  procesarInasistencia: (actorEmail, fecha = '') =>
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
  // RF14 — Ver mi historial (backend: ver_historial).
  verHistorial: (email) => request(`/reservations/history/?email=${encodeURIComponent(email)}`),
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
export const buzonApi = {
  // RF20 — Reportar una falla o enviar una sugerencia (backend: fallo_sugerencia).
  falloSugerencia: (body) => request('/suggestions/', { method: 'POST', body: JSON.stringify(body) }),
  // RF21 — Consultar el buzón (backend: consultar_buzon). Solo el administrador.
  consultarBuzon: (actorEmail) =>
    request(`/suggestions/inbox/?actor_email=${encodeURIComponent(actorEmail)}`),
};

// Reportes: aforo, por estudiante, personal (RF18) y general diario (RF19/RF20).
export const reportsApi = {
  // RF15 — Ver mi reporte de inasistencias (backend: ver_inasistencias).
  verInasistencias: (email) => request(`/reports/personal/?email=${encodeURIComponent(email)}`),
  // RF16 — Ver el registro diario, entrenador (backend: ver_registro_entrenador).
  verRegistroEntrenador: (actorEmail, fecha = '') =>
    request(`/reports/daily/entrenador/?actor_email=${encodeURIComponent(actorEmail)}&fecha=${fecha}`),
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

// RF18 — Máquinas.

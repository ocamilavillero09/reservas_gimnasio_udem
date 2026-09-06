from django.urls import path
from . import views, features, reports, attendance

# Una ruta por requisito. El nombre de la función es el del requisito, de modo
# que la trazabilidad entre el documento y el código sea directa.
urlpatterns = [
    # Constantes de negocio para la interfaz. No es un requisito funcional:
    # es lo que hace cumplir el RNF06, la separación de capas.
    path('config/',                     views.consultar_configuracion, name='config'),

    # ── Módulo 1 — Autenticación y perfiles ─────────────────────────────────
    # RF01 — Registrar una cuenta
    path('auth/register/',              views.registrar_cuenta,     name='register'),
    # RF02 — Iniciar sesión
    path('auth/login/',                 views.iniciar_sesion,       name='login'),
    # Rehidratación de la sesión al recargar la página (apoya a RF02)
    path('auth/session/',               views.session,              name='session'),
    # RF03 — Consultar y actualizar el perfil del estudiante
    path('users/profile/',              features.consultar_actualizar_perfil, name='profile'),
    # RF04 — Perfil del entrenador
    path('users/entrenador/',           features.consultar_entrenador,        name='perfil-entrenador'),
    # RF05 — Perfil del administrador
    path('users/administrador/',        features.consultar_administrador,     name='perfil-administrador'),

    # ── Módulo 2 — Gestión de reservas ──────────────────────────────────────
    # RF06 — Consultar los bloques horarios con sus cupos
    path('slots/',                      views.consultar_horarios,   name='slots'),
    # RF08 (GET) y RF07 (POST) — Consultar mis reservas y reservar el día siguiente
    path('reservations/',               views.reservations,         name='reservations'),
    # RF14 — Ver mi historial (antes de las rutas con <id> para no colisionar)
    path('reservations/history/',       features.ver_historial,     name='history'),
    # RF09 — Cancelar mi reserva
    path('reservations/<str:reservation_id>/',         views.cancelar_reserva, name='cancel-reservation'),
    # RF10 — Buscar la reserva de un estudiante por su documento
    path('students/lookup/',            attendance.buscar_reserva,  name='student-lookup'),

    # ── Módulo 3 — Asistencia e inasistencia ────────────────────────────────
    # RF11 — Registrar la asistencia de un estudiante
    path('attendance/register/',        attendance.registrar_asistencia,  name='attendance-register'),
    # RF12 — Consultar las reservas sin asistencia registrada
    path('attendance/pending/',         attendance.consultar_reservas,    name='attendance-pending'),
    # RF13 — Procesar las inasistencias al cerrar la jornada
    path('attendance/process/',         attendance.procesar_inasistencia, name='attendance-process'),

    # ── Módulo 4 — Historial y reportes ─────────────────────────────────────
    # RF15 — Ver mi reporte de inasistencias
    path('reports/personal/',           attendance.ver_inasistencias,           name='personal-report'),
    # RF16 — Ver el registro diario (entrenador)
    path('reports/daily/entrenador/',   attendance.ver_registro_entrenador,     name='registro-entrenador'),
    # RF17 — Ver el registro diario (administrador)
    path('reports/daily/administrador/', attendance.ver_registro_administrador, name='registro-administrador'),
    # RF18 — Descargar el registro diario en PDF (entrenador)
    path('reports/daily/entrenador.pdf', reports.descargar_registro_entrenador,     name='registro-entrenador-pdf'),
    # RF19 — Descargar el registro diario en PDF (administrador)
    path('reports/daily/administrador.pdf', reports.descargar_registro_administrador, name='registro-administrador-pdf'),

    # ── Módulo 5 — Buzón de sugerencias ─────────────────────────────────────
    # RF20 — Reportar una falla o enviar una sugerencia
    path('suggestions/',                features.fallo_sugerencia,  name='suggestion-create'),
    # RF21 — Consultar el buzón de sugerencias
    path('suggestions/inbox/',          features.consultar_buzon,   name='suggestion-inbox'),

    # ── Módulo 6 — Administración de usuarios ───────────────────────────────
    # RF22 — Crear cuentas con rol de administrador
    path('admin/users/',                views.crear_administrador,  name='admin-users'),
    # RF23 — Retirar el rol de administrador
    path('admin/users/<str:user_email>/', views.retirar_administrador, name='admin-user-detail'),
]

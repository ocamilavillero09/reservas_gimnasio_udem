from django.urls import path
from . import views, features, reports, attendance

urlpatterns = [
    # Auth
    # RF01 — Registrar una cuenta
    path('auth/register/',              views.registrar_cuenta,    name='register'),
    # RF02 — Iniciar sesión
    path('auth/login/',                 views.iniciar_sesion,      name='login'),
    path('auth/session/',               views.session,             name='session'),

    # RF21 — Gestión de usuarios (solo el administrador principal crea ADMIN)
    path('admin/users/',                views.admin_users,         name='admin-users'),
    # RF22 — Retirar / restaurar el rol de administrador
    path('admin/users/<str:user_email>/', views.admin_user_detail, name='admin-user-detail'),

    # RF06 — Consultar los bloques horarios con sus cupos
    path('slots/',                      views.consultar_horarios,  name='slots'),
    # RF08 (GET) y RF07 (POST) — Consultar mis reservas y reservar el día siguiente
    path('reservations/',               views.reservations,        name='reservations'),

    # RF11 — Historial (antes de las rutas con <reservation_id> para no colisionar)
    path('reservations/history/',       features.reservation_history, name='history'),

    # RF09 — Cancelar mi reserva
    path('reservations/<str:reservation_id>/',          views.cancelar_reserva,      name='cancel-reservation'),
    path('reservations/<str:reservation_id>/no-show/',  views.mark_no_show,          name='mark-no-show'),

    # RF03 — Consultar y actualizar el perfil del estudiante
    path('users/profile/',              features.consultar_actualizar_perfil, name='profile'),
    # RF04 — Perfil del entrenador · RF05 — Perfil del administrador
    path('users/entrenador/',           features.consultar_entrenador,     name='perfil-entrenador'),
    path('users/administrador/',        features.consultar_administrador,  name='perfil-administrador'),

    # RF15 — Calificaciones
    path('ratings/',                    features.ratings,           name='ratings'),
    path('reports/students/',           features.students_report,   name='students-report'),
    path('reports/usage.pdf',           reports.usage_pdf,          name='usage-pdf'),

    # ── Asistencia, inasistencias y penalizaciones ────────────────────────
    # RF11 — El entrenador busca al estudiante por su DOCUMENTO de identidad
    path('students/lookup/',            attendance.student_lookup,     name='student-lookup'),
    # RF13 — Registrar la asistencia del estudiante
    path('attendance/register/',        attendance.register_attendance, name='attendance-register'),
    # RF14 — Estudiantes con reserva y sin asistencia registrada
    path('attendance/pending/',         attendance.pending_attendance,  name='attendance-pending'),
    # RF15/RF16 — Procesar de forma general las inasistencias de la jornada
    path('attendance/process/',         attendance.process_no_shows,    name='attendance-process'),

    # RF18 — Reporte personal del estudiante (inasistencias y penalizaciones)
    path('reports/personal/',           attendance.personal_report,     name='personal-report'),
    # RF19 — Reporte general diario · RF20 — el mismo reporte en PDF
    path('reports/daily/',              attendance.daily_report,        name='daily-report'),
    path('reports/daily.pdf',           reports.daily_pdf,              name='daily-pdf'),
]

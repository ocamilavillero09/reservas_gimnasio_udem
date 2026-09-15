"""
Asistencia, inasistencias y penalizaciones.

  RF10  Buscar la reserva de un estudiante por su documento  (buscar_reserva)
  RF11  Registrar la asistencia de un estudiante             (registrar_asistencia)
  RF12  Consultar las reservas sin asistencia registrada     (consultar_reservas)
  RF13  Procesar las inasistencias al cerrar la jornada      (procesar_inasistencia)
  RF15  Ver mi reporte de inasistencias                      (ver_inasistencias)
  RF16  Ver el registro diario — entrenador                  (ver_registro_entrenador)
  RF17  Ver el registro diario — administrador               (ver_registro_administrador)
"""
from datetime import datetime

from bson import ObjectId
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .db import (
    ahora_utc,
    get_db, add_business_days, hoy_local, formato_fecha_es, normalizar_documento,
    inasistencias_restantes, alerta_inasistencias, ventana_asistencia,
    NO_SHOW_LIMITE, PENALIZACION_DIAS_HABILES,
)

ROLES_STAFF = ('ENTRENADOR', 'ADMIN')


def _actor_staff(email: str):
    """Devuelve el ENTRENADOR/ADMIN que ejecuta la acción, o None si no lo es."""
    user = get_db().users.find_one({'email': (email or '').strip().lower()})
    return user if user and user.get('role') in ROLES_STAFF else None


def _fecha_jornada(request) -> str:
    """Fecha ISO de la jornada consultada. Por defecto, HOY."""
    pedida = (request.query_params.get('fecha') if request.method == 'GET'
              else request.data.get('fecha'))
    return (pedida or '').strip() or hoy_local().isoformat()


def _fecha_label(fecha_iso: str) -> str:
    try:
        y, m, d = (int(x) for x in fecha_iso.split('-'))
        from datetime import date as _date
        return formato_fecha_es(_date(y, m, d))
    except Exception:
        return fecha_iso


def aplicar_inasistencia(email: str):
    """RF16 — Suma una inasistencia y penaliza al llegar al límite de CINCO (5).

    Devuelve (usuario_actualizado, penalizado_ahora).
    """
    db = get_db()
    owner = db.users.find_one_and_update(
        {'email': email}, {'$inc': {'no_show_count': 1}}, return_document=True,
    )
    if not owner:
        return None, False
    penalizado = False
    if owner.get('no_show_count', 0) >= NO_SHOW_LIMITE and owner.get('estado') != 'PENALIZADO':
        hasta = add_business_days(ahora_utc(), PENALIZACION_DIAS_HABILES)
        db.users.update_one(
            {'email': email},
            {'$set': {'estado': 'PENALIZADO', 'penalizado_hasta': hasta,
                      'penalizado_at': ahora_utc()}},
        )
        owner['estado'] = 'PENALIZADO'
        penalizado = True
    return owner, penalizado


def _fila_estudiante(user: dict) -> dict:
    return {
        'name': user.get('name'),
        'email': user.get('email'),
        'documento': user.get('documento', ''),
        'estado': user.get('estado', 'ACTIVO'),
        'no_show_count': user.get('no_show_count', 0),
        'inasistencias_restantes': inasistencias_restantes(user),
        'no_show_limite': NO_SHOW_LIMITE,
    }


# ── RF11 / HU11 — BUSCAR AL ESTUDIANTE POR SU DOCUMENTO DE IDENTIDAD ────────
@api_view(['GET'])
def buscar_reserva(request):
    """El entrenador busca a un estudiante por su documento y ve su reserva.

    Parámetros: ?documento=1001234567&actor_email=coach@udem.edu.co
    Devuelve los datos del estudiante y sus reservas ACTIVAS (con la del día
    de la jornada marcada), para poder registrarle la asistencia (RF13).
    """
    if not _actor_staff(request.query_params.get('actor_email')):
        return Response(
            {'error': 'Solo un entrenador o administrador puede consultar reservas de estudiantes.'},
            status=403,
        )

    documento = normalizar_documento(request.query_params.get('documento'))
    if not documento:
        return Response({'error': 'Debes indicar el documento de identidad.'}, status=400)

    db = get_db()
    student = db.users.find_one({'documento': documento, 'role': 'ESTUDIANTE'})
    if not student:
        return Response(
            {'error': f'No hay ningún estudiante registrado con el documento {documento}.'},
            status=404,
        )

    hoy = hoy_local().isoformat()
    reservas = [{
        'id': str(r['_id']), 'slotId': r['slotId'], 'hour': r['hour'],
        'date': r.get('date'), 'reserva_date': r.get('reserva_date'),
        'estado': r.get('estado'),
        'es_de_hoy': r.get('reserva_date') == hoy,
    } for r in db.reservations.find({'email': student['email'], 'estado': 'ACTIVA'}).sort('reserva_date', 1)]

    return Response({
        'estudiante': _fila_estudiante(student),
        'reservas': reservas,
        'tiene_reserva': len(reservas) > 0,
        'fecha_jornada': hoy,
    })


# ── RF13 / HU12 — REGISTRAR LA ASISTENCIA DEL ESTUDIANTE ───────────────────
@api_view(['POST'])
def registrar_asistencia(request):
    """RF11 — Registrar la asistencia de un estudiante.

    Deja constancia de que el estudiante con reserva se presentó a su bloque.

    Solo se puede registrar el MISMO día de la reserva y a partir de la hora en
    que empieza el bloque (RN12): antes de esa hora el estudiante todavía no ha
    tenido la oportunidad de presentarse.

    Cuerpo: {actor_email, documento} o {actor_email, reservation_id}.
    """
    actor = _actor_staff(request.data.get('actor_email'))
    if not actor:
        return Response(
            {'error': 'Solo un entrenador o administrador puede registrar asistencias.'},
            status=403,
        )

    db = get_db()
    filtro = {'estado': 'ACTIVA'}
    reservation_id = request.data.get('reservation_id')

    if reservation_id:
        try:
            filtro['_id'] = ObjectId(reservation_id)
        except Exception:
            return Response({'error': 'ID de reserva inválido.'}, status=400)
    else:
        documento = normalizar_documento(request.data.get('documento'))
        if not documento:
            return Response(
                {'error': 'Debes indicar el documento de identidad o el id de la reserva.'},
                status=400,
            )
        student = db.users.find_one({'documento': documento, 'role': 'ESTUDIANTE'})
        if not student:
            return Response(
                {'error': f'No hay ningún estudiante registrado con el documento {documento}.'},
                status=404,
            )
        filtro['email'] = student['email']
        filtro['reserva_date'] = _fecha_jornada(request)

    # RN12 — La ventana se comprueba ANTES de tocar la reserva, para que un
    # intento fuera de hora no deje la reserva a medio cambiar.
    reserva = db.reservations.find_one(filtro)
    if reserva is None:
        return Response(
            {'error': 'El estudiante no tiene una reserva activa para registrar asistencia.'},
            status=404,
        )

    abierta, motivo = ventana_asistencia(reserva)
    if not abierta:
        return Response({'error': motivo}, status=409)

    reserva = db.reservations.find_one_and_update(
        {'_id': reserva['_id'], 'estado': 'ACTIVA'},
        {'$set': {'estado': 'COMPLETADA', 'completed_at': ahora_utc(),
                  'registrada_por': actor['email']}},
    )
    if reserva is None:
        # Otro entrenador la registró entre la comprobación y este punto.
        return Response({'error': 'La asistencia ya fue registrada.'}, status=409)

    return Response({
        'message': 'Asistencia registrada.',
        'notificacion': f"Asistencia registrada para las {reserva['hour']} del {reserva.get('date', '')}.",
        'reservation_id': str(reserva['_id']),
        'email': reserva['email'],
        'hour': reserva['hour'],
    })


# ── RF14 / HU13 / HU15 — ESTUDIANTES SIN ASISTENCIA REGISTRADA ─────────────
@api_view(['GET'])
def consultar_reservas(request):
    """Reservas de la jornada que siguen ACTIVAS: nadie les registró asistencia.

    Se incluyen las de la fecha consultada y las de días anteriores que
    quedaron sin procesar. Las reservas de días futuros NO aparecen: todavía
    no ha llegado su jornada.
    """
    if not _actor_staff(request.query_params.get('actor_email')):
        return Response(
            {'error': 'Solo un entrenador o administrador puede consultar las inasistencias.'},
            status=403,
        )

    fecha = _fecha_jornada(request)
    db = get_db()
    pendientes = []
    for r in db.reservations.find(
        {'estado': 'ACTIVA', 'reserva_date': {'$lte': fecha}}
    ).sort('reserva_date', 1):
        student = db.users.find_one({'email': r['email']}) or {}
        pendientes.append({
            'id': str(r['_id']),
            'name': student.get('name', r['email']),
            'email': r['email'],
            'documento': student.get('documento', ''),
            'hour': r['hour'],
            'slotId': r['slotId'],
            'date': r.get('date'),
            'reserva_date': r.get('reserva_date'),
            'no_show_count': student.get('no_show_count', 0),
            'inasistencias_restantes': inasistencias_restantes(student),
        })

    return Response({
        'fecha': fecha,
        'fecha_label': _fecha_label(fecha),
        'no_show_limite': NO_SHOW_LIMITE,
        'total': len(pendientes),
        'pendientes': pendientes,
    })


# ── RF15 / HU14 / HU16 — PROCESAR DE FORMA GENERAL LAS INASISTENCIAS ───────
@api_view(['POST'])
def procesar_inasistencia(request):
    """RF13 — Procesar las inasistencias al cerrar la jornada.

    En una sola operación, toda reserva que quedó sin asistencia se marca como
    inasistencia, se actualiza el contador de cada estudiante y se penaliza a
    quien llegue al límite (RN08).

    Cerrar la jornada es responsabilidad EXCLUSIVA del entrenador, que es quien
    estuvo en el gimnasio y puede dar fe de quién asistió. El administrador
    consulta las pendientes (RF12) pero no cierra el día.

    Cuerpo: {actor_email, fecha?}.
    """
    actor = get_db().users.find_one(
        {'email': (request.data.get('actor_email') or '').strip().lower()})
    if not actor or actor.get('role') != 'ENTRENADOR':
        return Response(
            {'error': 'Solo el entrenador puede cerrar la jornada y procesar las inasistencias.'},
            status=403,
        )

    fecha = _fecha_jornada(request)
    db = get_db()
    procesados, penalizados = [], []

    while True:
        # Se toma una reserva a la vez con find_one_and_update: la transición
        # ACTIVA -> NO_SHOW es atómica, así dos entrenadores que cierren la
        # jornada al mismo tiempo no cuentan dos veces la misma inasistencia.
        reserva = db.reservations.find_one_and_update(
            {'estado': 'ACTIVA', 'reserva_date': {'$lte': fecha}},
            {'$set': {'estado': 'NO_SHOW', 'no_show_at': ahora_utc(),
                      'procesado_por': actor['email']}},
        )
        if reserva is None:
            break

        owner, penalizado = aplicar_inasistencia(reserva['email'])
        procesados.append({
            'email': reserva['email'],
            'name': (owner or {}).get('name', reserva['email']),
            'documento': (owner or {}).get('documento', ''),
            'hour': reserva['hour'],
            'date': reserva.get('date'),
            'no_show_count': (owner or {}).get('no_show_count', 0),
            'inasistencias_restantes': inasistencias_restantes(owner),
            'penalizado': penalizado,
        })
        if penalizado:
            penalizados.append((owner or {}).get('name', reserva['email']))

    mensaje = (f'No había inasistencias pendientes para el {_fecha_label(fecha)}.'
               if not procesados else
               f'Se procesaron {len(procesados)} inasistencias del {_fecha_label(fecha)}.')
    if penalizados:
        mensaje += f" Estudiantes penalizados: {', '.join(penalizados)}."

    return Response({
        'message': mensaje,
        'fecha': fecha,
        'fecha_label': _fecha_label(fecha),
        'total_procesadas': len(procesados),
        'total_penalizados': len(penalizados),
        'no_show_limite': NO_SHOW_LIMITE,
        'procesados': procesados,
    })


# ── RF18 / HU08 — REPORTE PERSONAL DE INASISTENCIAS Y PENALIZACIONES ───────
@api_view(['GET'])
def ver_inasistencias(request):
    """RF15 — Ver mi reporte de inasistencias.

    El estudiante ve cuántas veces no fue al gimnasio teniendo reserva, cuántas
    le faltan para llegar al límite y si su cuenta está penalizada. El límite
    que se muestra es el mismo valor que aplica el sistema (RN08), no un número
    escrito en la interfaz.
    """
    email = request.query_params.get('email', '').strip().lower()
    if not email:
        return Response({'error': 'Parámetro email requerido.'}, status=400)

    db = get_db()
    user = db.users.find_one({'email': email})
    if not user:
        return Response({'error': 'Usuario no encontrado.'}, status=404)

    inasistencias = [{
        'id': str(r['_id']), 'hour': r['hour'], 'date': r.get('date'),
        'reserva_date': r.get('reserva_date'),
    } for r in db.reservations.find({'email': email, 'estado': 'NO_SHOW'}).sort('reserva_date', -1)]

    penalizado_hasta = user.get('penalizado_hasta')
    return Response({
        'name': user.get('name'),
        'email': email,
        'documento': user.get('documento', ''),
        'estado': user.get('estado', 'ACTIVO'),
        # RN08 — inasistencias y cuántas faltan para la penalización.
        'no_show_count': user.get('no_show_count', 0),
        'no_show_limite': NO_SHOW_LIMITE,
        'inasistencias_restantes': inasistencias_restantes(user),
        'alerta_inasistencias': alerta_inasistencias(user),
        'penalizado': user.get('estado') == 'PENALIZADO',
        'penalizado_hasta': penalizado_hasta.isoformat() if penalizado_hasta else None,
        'inasistencias': inasistencias,
        'total_asistencias': db.reservations.count_documents({'email': email, 'estado': 'COMPLETADA'}),
        'total_cancelaciones': db.reservations.count_documents({'email': email, 'estado': 'CANCELADA'}),
    })


# ── RF19 / HU17 / HU18 — REPORTE GENERAL DIARIO DEL GIMNASIO ───────────────
def build_daily_report(fecha_iso: str) -> dict:
    """Totales del día: asistencias, cancelaciones e inasistencias.

    Lo usan tanto la consulta en pantalla (RF19) como el PDF (RF20).
    """
    db = get_db()
    del_dia = {'reserva_date': fecha_iso}

    def _detalle(estado):
        filas = []
        for r in db.reservations.find({**del_dia, 'estado': estado}).sort('hour', 1):
            u = db.users.find_one({'email': r['email']}) or {}
            filas.append({
                'name': u.get('name', r['email']), 'email': r['email'],
                'documento': u.get('documento', ''), 'hour': r['hour'],
            })
        return filas

    asistencias   = _detalle('COMPLETADA')
    cancelaciones = _detalle('CANCELADA')
    inasistencias = _detalle('NO_SHOW')
    pendientes    = _detalle('ACTIVA')

    penalizados = [{
        'name': u.get('name'), 'email': u['email'],
        'documento': u.get('documento', ''),
        'no_show_count': u.get('no_show_count', 0),
        'penalizado_hasta': (u['penalizado_hasta'].date().isoformat()
                             if u.get('penalizado_hasta') else None),
    } for u in db.users.find({'role': 'ESTUDIANTE', 'estado': 'PENALIZADO'}).sort('name', 1)]

    # Ocupación por bloque horario del día (RF07 aplicado al reporte).
    bloques = []
    for s in db.slots.find().sort('slotId', 1):
        reservados = db.reservations.count_documents(
            {**del_dia, 'slotId': s['slotId'], 'estado': {'$in': ['ACTIVA', 'COMPLETADA', 'NO_SHOW']}}
        )
        bloques.append({
            'slotId': s['slotId'], 'hour': s['hour'], 'total': s['total'],
            'reservados': reservados,
            'asistencias': db.reservations.count_documents({**del_dia, 'slotId': s['slotId'], 'estado': 'COMPLETADA'}),
            'inasistencias': db.reservations.count_documents({**del_dia, 'slotId': s['slotId'], 'estado': 'NO_SHOW'}),
        })

    return {
        'fecha': fecha_iso,
        'fecha_label': _fecha_label(fecha_iso),
        'totales': {
            'reservas': db.reservations.count_documents(del_dia),
            'asistencias': len(asistencias),
            'cancelaciones': len(cancelaciones),
            'inasistencias': len(inasistencias),
            'pendientes': len(pendientes),
            'estudiantes_penalizados': len(penalizados),
        },
        'asistencias': asistencias,
        'cancelaciones': cancelaciones,
        'inasistencias': inasistencias,
        'pendientes': pendientes,
        'penalizados': penalizados,
        'bloques': bloques,
        'no_show_limite': NO_SHOW_LIMITE,
    }


def _registro_diario_para(request, rol, etiqueta):
    """Registro de la jornada, comprobando que el rol sea el del requisito.

    RF16 y RF17 son dos requisitos porque son dos actores distintos: el
    entrenador cierra su turno con este registro y el administrador supervisa
    la operación. El contenido es el mismo.
    """
    actor = get_db().users.find_one(
        {'email': (request.query_params.get('actor_email') or '').strip().lower()})
    if not actor or actor.get('role') != rol:
        return Response({'error': f'Este registro es el de {etiqueta}.'}, status=403)
    return Response(build_daily_report(_fecha_jornada(request)))


@api_view(['GET'])
def ver_registro_entrenador(request):
    """RF16 — Ver el registro diario del gimnasio (entrenador).

    Asistencias, cancelaciones, inasistencias y estudiantes penalizados de la
    jornada, con el detalle bloque por bloque. Es el resumen con el que el
    entrenador cierra su turno.
    """
    return _registro_diario_para(request, 'ENTRENADOR', 'un entrenador')

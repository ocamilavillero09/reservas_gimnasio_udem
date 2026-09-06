"""
Funcionalidades complementarias del documento de análisis (RF11–RF18):

  RF11  Historial de entrenamiento          (reservation_history)
  RF12  Lista de espera                      (waitlist + pop_next_in_waitlist)
  RF03  Consultar y actualizar el perfil     (consultar_actualizar_perfil)
  RF04  Perfil del entrenador                 (consultar_entrenador)
  RF05  Perfil del administrador              (consultar_administrador)
  RF15  Calificación del servicio            (ratings)
  RF16  Dashboard de aforo proyectado        (occupancy_report)
  RF17  Reporte POR ESTUDIANTE               (students_report, complete_reservation)
  RF18  Mantenimiento de máquinas            (machines, machine_detail)
"""
from datetime import datetime
from bson import ObjectId
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .db import (
    get_db, seed_machines, cancelaciones_restantes, alerta_cancelaciones,
    inasistencias_restantes, alerta_inasistencias, normalizar_documento,
    add_business_days, hoy_local, formato_fecha_es,
    validar_campo_perfil, normalizar_campo_perfil,
    CANCELACION_LIMITE, NO_SHOW_LIMITE, PENALIZACION_DIAS_HABILES,
)


def _is_staff(email: str) -> bool:
    """True si el correo corresponde a un ENTRENADOR (profesor) o ADMIN."""
    u = get_db().users.find_one({'email': (email or '').strip().lower()})
    return bool(u and u.get('role') in ('ENTRENADOR', 'ADMIN'))


# ── RF11 — HISTORIAL DE ENTRENAMIENTO ───────────────────────────────────────
@api_view(['GET'])
def reservation_history(request):
    """RF17 — Historial completo del estudiante.

    Incluye TODOS sus movimientos: reservas vigentes, cancelaciones,
    asistencias (COMPLETADA) e inasistencias (NO_SHOW). Con ?solo=pasadas se
    excluyen las reservas todavía activas.
    """
    email = request.query_params.get('email', '').strip().lower()
    if not email:
        return Response({'error': 'Parámetro email requerido.'}, status=400)
    db = get_db()

    filtro = {'email': email}
    if request.query_params.get('solo') == 'pasadas':
        filtro['estado'] = {'$ne': 'ACTIVA'}

    docs = []
    for r in db.reservations.find(filtro).sort('created_at', -1):
        docs.append({
            'id': str(r['_id']), 'slotId': r['slotId'], 'hour': r['hour'],
            'date': r.get('date'), 'reserva_date': r.get('reserva_date'),
            'estado': r.get('estado'),
        })
    return Response(docs)


# ── RF17 — MARCAR ASISTENCIA (COMPLETADA) ───────────────────────────────────
@api_view(['POST'])
def complete_reservation(request, reservation_id):
    """El profesor confirma que el estudiante asistió: ACTIVA -> COMPLETADA."""
    if not _is_staff(request.data.get('actor_email')):
        return Response({'error': 'Solo profesor/admin.'}, status=403)
    db = get_db()
    try:
        oid = ObjectId(reservation_id)
    except Exception:
        return Response({'error': 'ID inválido.'}, status=400)
    res = db.reservations.find_one_and_update(
        {'_id': oid, 'estado': 'ACTIVA'},
        {'$set': {'estado': 'COMPLETADA', 'completed_at': datetime.utcnow()}},
    )
    if res is None:
        return Response({'error': 'Reserva no encontrada o no activa.'}, status=404)
    # Asistió: el cupo se "consumió", se libera para el siguiente día (se devuelve).
    db.slots.update_one({'slotId': res['slotId']}, {'$inc': {'available': 1}})
    return Response({'message': 'Asistencia registrada.'})


# ── RF12 — LISTA DE ESPERA ──────────────────────────────────────────────────
@api_view(['GET', 'POST'])
def waitlist(request, slot_id):
    db = get_db()
    slot_id = int(slot_id)
    if request.method == 'GET':
        docs = [{'email': w['email'], 'created_at': w['created_at']}
                for w in db.waitlist.find({'slotId': slot_id}).sort('created_at', 1)]
        return Response(docs)

    email = request.data.get('email', '').strip().lower()
    if not email:
        return Response({'error': 'email requerido.'}, status=400)
    slot = db.slots.find_one({'slotId': slot_id})
    if not slot:
        return Response({'error': 'Horario no encontrado.'}, status=404)
    if slot['available'] > 0:
        return Response({'error': 'Aún hay cupos: puedes reservar directamente.'}, status=409)
    if db.waitlist.find_one({'slotId': slot_id, 'email': email}):
        return Response({'error': 'Ya estás en la lista de espera de este bloque.'}, status=409)
    db.waitlist.insert_one({'slotId': slot_id, 'email': email, 'created_at': datetime.utcnow()})
    pos = db.waitlist.count_documents({'slotId': slot_id})
    return Response({'message': 'Añadido a la lista de espera.', 'posicion': pos}, status=201)


def pop_next_in_waitlist(slot_id: int):
    """Al liberarse un cupo, saca al primero de la lista de espera.

    El aviso ya no se envía por correo ni push: el estudiante ve el cupo
    liberado directamente en la pantalla de disponibilidad.
    """
    return get_db().waitlist.find_one_and_delete({'slotId': slot_id}, sort=[('created_at', 1)])


# ── RF03 — CONSULTAR Y ACTUALIZAR EL PERFIL ─────────────────────────────────
# Campos del perfil físico que el estudiante puede editar. El nombre, el correo,
# el documento y el rol NO están aquí: identifican a la persona y no se editan.
CAMPOS_PERFIL = ('edad', 'peso', 'altura', 'meta')


def _identidad(user: dict) -> dict:
    """Datos que identifican a la persona. Son de solo lectura para todos los
    roles: el nombre, el correo, el documento y el rol no se editan desde el
    perfil porque son los que la identifican en el sistema."""
    return {
        'name': user['name'],
        'email': user['email'],
        'documento': user.get('documento', ''),
        'role': user.get('role'),
        'estado': user.get('estado'),
    }


def _perfil_de_rol(request, rol_esperado, etiqueta):
    """Consulta de solo lectura del perfil propio, para RF04 y RF05.

    Comprueba que la cuenta consultada tenga el rol que le corresponde a este
    requisito. Un entrenador y un administrador tienen requisitos separados
    porque son actores distintos, aunque hoy consulten los mismos campos: el
    administrador ve además si es el administrador principal.
    """
    email = request.query_params.get('email', '').strip().lower()
    if not email:
        return Response({'error': 'email requerido.'}, status=400), None

    user = get_db().users.find_one({'email': email})
    if not user:
        return Response({'error': 'Usuario no encontrado.'}, status=404), None

    if user.get('role') != rol_esperado:
        return Response(
            {'error': f'Esta consulta es del perfil de {etiqueta}.'},
            status=403,
        ), None

    return None, user


@api_view(['GET'])
def consultar_entrenador(request):
    """RF04 — Consultar el perfil del entrenador.

    Devuelve el nombre, el correo institucional, el documento de identidad y el
    rol asignado. Es de solo lectura: este perfil no tiene datos físicos ni
    objetivo de entrenamiento, porque el entrenador no reserva ni entrena dentro
    del sistema.
    """
    error, user = _perfil_de_rol(request, 'ENTRENADOR', 'un entrenador')
    if error is not None:
        return error
    return Response(_identidad(user))


@api_view(['GET'])
def consultar_administrador(request):
    """RF05 — Consultar el perfil del administrador.

    Devuelve el nombre, el correo institucional, el documento de identidad y el
    rol asignado, e indica además si esta cuenta es la del administrador
    principal, que es la única que puede crear y retirar cuentas de
    administrador (RF22 y RF23). Es de solo lectura.
    """
    error, user = _perfil_de_rol(request, 'ADMIN', 'un administrador')
    if error is not None:
        return error
    datos = _identidad(user)
    datos['es_principal'] = bool(user.get('es_principal'))
    return Response(datos)


def _respuesta_perfil(user: dict) -> dict:
    """Perfil completo tal como lo consume la interfaz."""
    return {
        **_identidad(user),
        'es_principal': bool(user.get('es_principal')),
        # Inasistencias y cuántas faltan para la penalización (RN08).
        'no_show_count': user.get('no_show_count', 0),
        'inasistencias_restantes': inasistencias_restantes(user),
        'no_show_limite': NO_SHOW_LIMITE,
        'alerta_inasistencias': alerta_inasistencias(user),
        # Contadores de cancelaciones. Campo heredado: sale al refactorizar RF09.
        'cancel_count': user.get('cancel_count', 0),
        'cancelaciones_restantes': cancelaciones_restantes(user),
        'cancelacion_limite': CANCELACION_LIMITE,
        'alerta': alerta_cancelaciones(user),
        # RF03 — perfil físico y objetivo de entrenamiento.
        'edad': user.get('edad'), 'peso': user.get('peso'),
        'altura': user.get('altura'), 'meta': user.get('meta'),
    }


@api_view(['GET', 'PUT'])
def consultar_actualizar_perfil(request):
    """RF03 — Consultar y actualizar mi perfil.

    GET devuelve el perfil. PUT guarda la edad, el peso, la altura y el objetivo
    de entrenamiento del estudiante.

    Los valores se validan ANTES de escribir. Los rangos admitidos son los
    mismos que declara el validador de esquema de MongoDB, así que un valor
    fuera de rango se rechaza aquí con un mensaje que dice qué corregir, en vez
    de llegar a la base de datos y provocar un error del servidor.

    Flujo alterno A1: si algún campo está fuera de rango no se guarda NINGUNO,
    para que el perfil no quede a medio actualizar.

    El actor es el estudiante. El entrenador y el administrador tienen sus
    propias consultas, RF04 y RF05, que son de solo lectura.
    """
    db = get_db()
    if request.method == 'GET':
        email = request.query_params.get('email', '').strip().lower()
    else:
        email = request.data.get('email', '').strip().lower()
    if not email:
        return Response({'error': 'email requerido.'}, status=400)

    user = db.users.find_one({'email': email})
    if not user:
        return Response({'error': 'Usuario no encontrado.'}, status=404)

    # RF03 es del estudiante. El entrenador consulta por RF04 y el
    # administrador por RF05, que devuelven solo los datos de identidad.
    if user.get('role') != 'ESTUDIANTE':
        return Response(
            {'error': 'Este perfil es el del estudiante. '
                      'El entrenador y el administrador tienen su propia consulta.'},
            status=403,
        )

    if request.method == 'PUT':
        # Primero se validan TODOS los campos recibidos; solo si no hay ningún
        # error se escribe. Así el flujo alterno A1 no deja el perfil a medias.
        errores = {}
        cambios = {}
        for campo in CAMPOS_PERFIL:
            if campo not in request.data:
                continue
            valor = request.data.get(campo)
            error = validar_campo_perfil(campo, valor)
            if error:
                errores[campo] = error
            else:
                cambios[campo] = normalizar_campo_perfil(campo, valor)

        if errores:
            return Response(
                {'error': ' '.join(errores.values()), 'campos': errores},
                status=400,
            )

        if cambios:
            db.users.update_one({'email': email}, {'$set': cambios})
            user = db.users.find_one({'email': email})

    return Response(_respuesta_perfil(user))


# ── RF15 — CALIFICACIÓN DEL SERVICIO ────────────────────────────────────────
@api_view(['GET', 'POST'])
def ratings(request):
    db = get_db()
    if request.method == 'GET':
        docs = [{'email': r['email'], 'stars': r['stars'], 'comment': r.get('comment', ''),
                 'created_at': r['created_at']}
                for r in db.ratings.find().sort('created_at', -1).limit(50)]
        avg = None
        if docs:
            all_stars = [r['stars'] for r in db.ratings.find({}, {'stars': 1})]
            avg = round(sum(all_stars) / len(all_stars), 2)
        return Response({'promedio': avg, 'total': db.ratings.count_documents({}), 'comentarios': docs})

    email = request.data.get('email', '').strip().lower()
    try:
        stars = int(request.data.get('stars'))
    except (TypeError, ValueError):
        return Response({'error': 'stars debe ser un entero 1-5.'}, status=400)
    if not email or not (1 <= stars <= 5):
        return Response({'error': 'email y stars (1-5) son obligatorios.'}, status=400)
    db.ratings.insert_one({
        'email': email, 'stars': stars, 'comment': request.data.get('comment', '').strip(),
        'slotId': request.data.get('slotId'), 'created_at': datetime.utcnow(),
    })
    return Response({'message': '¡Gracias por tu calificación!'}, status=201)


# ── RF16 — DASHBOARD DE AFORO PROYECTADO (profesor / admin) ─────────────────
@api_view(['GET'])
def occupancy_report(request):
    db = get_db()
    data = []
    for s in db.slots.find().sort('slotId', 1):
        reserved = db.reservations.count_documents({'slotId': s['slotId'], 'estado': 'ACTIVA'})
        data.append({
            'slotId': s['slotId'], 'hour': s['hour'], 'total': s['total'],
            'available': s['available'], 'reservados': reserved,
            'ocupacion_pct': round((reserved / s['total']) * 100) if s['total'] else 0,
            'enEspera': db.waitlist.count_documents({'slotId': s['slotId']}),
        })
    return Response(data)


# ── RF17 — REPORTE POR ESTUDIANTE ───────────────────────────────────────────
def build_student_rows():
    """Una fila por ESTUDIANTE con su actividad y sus contadores.

    El reporte del sistema es por persona, no por bloque horario: para cada
    estudiante se muestran sus reservas activas, asistencias, cancelaciones e
    inasistencias, además de su estado (ACTIVO / PENALIZADO).
    """
    db = get_db()
    rows = []
    for u in db.users.find({'role': 'ESTUDIANTE'}).sort('name', 1):
        email = u['email']
        canceladas = db.reservations.count_documents({'email': email, 'estado': 'CANCELADA'})
        rows.append({
            'name': u.get('name'),
            'email': email,
            'estado': u.get('estado', 'ACTIVO'),
            'activas': db.reservations.count_documents({'email': email, 'estado': 'ACTIVA'}),
            'completadas': db.reservations.count_documents({'email': email, 'estado': 'COMPLETADA'}),
            'canceladas': canceladas,
            'cancel_count': u.get('cancel_count', 0),
            'cancelaciones_restantes': cancelaciones_restantes(u),
            'no_show': db.reservations.count_documents({'email': email, 'estado': 'NO_SHOW'}),
            'no_show_count': u.get('no_show_count', 0),
            'en_alerta': alerta_cancelaciones(u) is not None,
        })
    return rows


@api_view(['GET'])
def students_report(request):
    return Response({
        'cancelacion_limite': CANCELACION_LIMITE,
        'no_show_limite': NO_SHOW_LIMITE,
        'estudiantes': build_student_rows(),
    })


# ── RF18 — MANTENIMIENTO DE MÁQUINAS ────────────────────────────────────────
@api_view(['GET', 'POST'])
def machines(request):
    seed_machines()
    db = get_db()
    if request.method == 'GET':
        docs = [{'machineId': m['machineId'], 'name': m['name'],
                 'estado': m['estado'], 'note': m.get('note', '')}
                for m in db.machines.find().sort('machineId', 1)]
        return Response(docs)

    if not _is_staff(request.data.get('actor_email')):
        return Response({'error': 'Solo profesor/admin.'}, status=403)
    name = request.data.get('name', '').strip()
    if not name:
        return Response({'error': 'name requerido.'}, status=400)
    next_id = (db.machines.find_one(sort=[('machineId', -1)]) or {}).get('machineId', 0) + 1
    db.machines.insert_one({'machineId': next_id, 'name': name, 'estado': 'DISPONIBLE', 'note': ''})
    return Response({'message': 'Máquina creada.', 'machineId': next_id}, status=201)


@api_view(['PATCH'])
def machine_detail(request, machine_id):
    if not _is_staff(request.data.get('actor_email')):
        return Response({'error': 'Solo profesor/admin.'}, status=403)
    db = get_db()
    estado = request.data.get('estado')
    if estado not in ('DISPONIBLE', 'FUERA_DE_SERVICIO'):
        return Response({'error': 'estado inválido.'}, status=400)
    res = db.machines.update_one(
        {'machineId': int(machine_id)},
        {'$set': {'estado': estado, 'note': request.data.get('note', ''), 'updated_at': datetime.utcnow()}},
    )
    if res.matched_count == 0:
        return Response({'error': 'Máquina no encontrada.'}, status=404)
    return Response({'message': 'Máquina actualizada.'})

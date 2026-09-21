"""
Requisitos que atiende este módulo:

  RF03  Consultar y actualizar el perfil     (consultar_actualizar_perfil)
  RF04  Perfil del entrenador                 (consultar_entrenador)
  RF05  Perfil del administrador              (consultar_administrador)
  RF14  Ver mi historial                      (ver_historial)
  RF20  Reportar una falla o sugerencia        (fallo_sugerencia)
  RF21  Consultar el buzón de sugerencias      (consultar_buzon)

Se retiraron por decisión del equipo, porque no corresponden a ningún requisito:
la lista de espera, el reporte de ocupación y el catálogo de máquinas. También
se retiró complete_reservation, que duplicaba el registro de asistencia (RF11) y
además devolvía el cupo al bloque, algo que ya no tiene sentido ahora que la
disponibilidad es de cada jornada.
"""
from datetime import datetime
from bson import ObjectId
from bson.errors import InvalidId
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .db import (
    ahora_utc,
    get_db,
    inasistencias_restantes, alerta_inasistencias, normalizar_documento,
    add_business_days, hoy_local, formato_fecha_es,
    validar_campo_perfil, normalizar_campo_perfil,
    NO_SHOW_LIMITE, PENALIZACION_DIAS_HABILES,
)


def _is_staff(email: str) -> bool:
    """True si el correo corresponde a un ENTRENADOR (profesor) o ADMIN."""
    u = get_db().users.find_one({'email': (email or '').strip().lower()})
    return bool(u and u.get('role') in ('ENTRENADOR', 'ADMIN'))


# ── RF11 — HISTORIAL DE ENTRENAMIENTO ───────────────────────────────────────
@api_view(['GET'])
def ver_historial(request):
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


# ── RF20 y RF21 — BUZÓN DE SUGERENCIAS ──────────────────────────────────────
MENSAJE_MAX = 2000


@api_view(['POST'])
def fallo_sugerencia(request):
    """RF20 — Reportar una falla o enviar una sugerencia.

    El estudiante escribe un mensaje contando una falla que encontró en la
    aplicación o proponiendo una mejora, y lo envía al administrador.
    """
    db = get_db()
    email = request.data.get('email', '').strip().lower()
    mensaje = (request.data.get('mensaje') or '').strip()

    if not email:
        return Response({'error': 'email requerido.'}, status=400)
    if not mensaje:
        return Response({'error': 'Escribe el mensaje antes de enviarlo.'}, status=400)
    if len(mensaje) > MENSAJE_MAX:
        return Response(
            {'error': f'El mensaje no puede superar los {MENSAJE_MAX} caracteres.'},
            status=400,
        )

    autor = db.users.find_one({'email': email})
    if not autor:
        return Response({'error': 'Usuario no encontrado.'}, status=404)
    if autor.get('role') != 'ESTUDIANTE':
        return Response(
            {'error': 'El buzón es el canal por el que los estudiantes reportan fallas.'},
            status=403,
        )

    # Se guarda el nombre junto al mensaje para que el administrador no tenga
    # que cruzarlo con la colección de usuarios al leer la bandeja.
    db.suggestions.insert_one({
        'autor_email': email,
        'autor_nombre': autor['name'],
        'mensaje': mensaje,
        'created_at': ahora_utc(),
    })
    # RN11 — la confirmación la produce el backend.
    return Response({
        'message': 'Mensaje enviado.',
        'notificacion': 'Tu reporte llegó al administrador. Gracias por avisar.',
        'tipo': 'SUGERENCIA_ENVIADA',
    }, status=201)


@api_view(['GET'])
def consultar_buzon(request):
    """RF21 — Consultar el buzón de sugerencias.

    El administrador lee los mensajes que enviaron los estudiantes, del más
    reciente al más antiguo. Es el único rol con acceso: ni el estudiante ve los
    mensajes de otros ni el entrenador entra a esta bandeja.
    """
    db = get_db()
    actor = db.users.find_one(
        {'email': (request.query_params.get('actor_email') or '').strip().lower()})
    if not actor or actor.get('role') != 'ADMIN':
        return Response(
            {'error': 'Solo el administrador puede consultar el buzón de sugerencias.'},
            status=403,
        )

    mensajes = [{
        # El identificador viaja al frontend porque es lo que necesita el
        # administrador para borrar un mensaje ya atendido.
        'id': str(m['_id']),
        'autor_nombre': m['autor_nombre'],
        'autor_email': m['autor_email'],
        'mensaje': m['mensaje'],
        'fecha': m['created_at'].isoformat(),
    } for m in db.suggestions.find().sort('created_at', -1).limit(200)]

    return Response({'total': db.suggestions.count_documents({}), 'mensajes': mensajes})


@api_view(['DELETE'])
def eliminar_sugerencia(request, suggestion_id):
    """RF21 — Borrar del buzón un mensaje ya atendido.

    La bandeja se llena de reportes resueltos y el administrador pierde de vista
    los que faltan. Borrar es definitivo y por eso solo puede hacerlo quien lee
    la bandeja, que es el administrador: ni el estudiante que escribió el
    mensaje ni el entrenador entran aquí.
    """
    db = get_db()
    actor = db.users.find_one(
        {'email': (request.query_params.get('actor_email') or '').strip().lower()})
    if not actor or actor.get('role') != 'ADMIN':
        return Response(
            {'error': 'Solo el administrador puede borrar mensajes del buzón.'},
            status=403,
        )

    try:
        objetivo = ObjectId(suggestion_id)
    except (InvalidId, TypeError):
        return Response({'error': 'Mensaje no encontrado.'}, status=404)

    if db.suggestions.delete_one({'_id': objetivo}).deleted_count == 0:
        return Response({'error': 'Mensaje no encontrado.'}, status=404)

    return Response({
        'message': 'Mensaje borrado del buzón.',
        'total': db.suggestions.count_documents({}),
    })

from datetime import datetime
from bson import ObjectId
from rest_framework.decorators import api_view
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .db import (
    ahora_utc,
    get_db, seed_slots, hash_password, verify_password, serialize,
    asegurar_disponibilidad, tomar_cupo, devolver_cupo,
    BLOQUES_HORARIOS, AFORO_POR_DEFECTO, DOCUMENTO_LONGITUD, NO_SHOW_ALERTA,
    PERFIL_RANGOS, META_MAX,
    ROLES, DOMINIOS_ROL, role_for_email,
    fecha_reserva, formato_fecha_es,
    normalizar_documento, inasistencias_restantes, alerta_inasistencias,
    MAX_RESERVAS_POR_DIA, NO_SHOW_LIMITE, PENALIZACION_DIAS_HABILES,
    error_de_documento,
)


# ══════════════════════════════════════════════════════════════════════════
#  CASOS DE USO CRÍTICOS DEL SISTEMA
#  --------------------------------------------------------------------------
#  Este archivo concentra los 5 casos de uso críticos del sistema de reservas.
#  Cada uno está marcado con un encabezado «CASO DE USO CRÍTICO #N» que explica
#  la regla de negocio que protege y por qué es crítico. Son los flujos que,
#  si fallan, comprometen la integridad de los datos o la seguridad:
#
#    CU-1  Registro con correo institucional      (seguridad / control de acceso)
#    CU-2  Inicio de sesión y verificación de hash (seguridad / credenciales)
#    CU-3  Consulta de cupos en tiempo real        (consistencia de lectura)
#    CU-4  Crear reserva con descuento ATÓMICO     (concurrencia / no sobreventa)
#    CU-5  Cancelar reserva y liberar cupo         (consistencia / no perder cupos)
# ══════════════════════════════════════════════════════════════════════════


ETIQUETA_ROL = {
    'ESTUDIANTE': 'Estudiante',
    'ENTRENADOR': 'Entrenador',
    'ADMIN': 'Administrador',
    'SIN_ROL': 'Sin rol asignado',
}


@api_view(['GET'])
def consultar_configuracion(request):
    """Constantes de negocio que la interfaz necesita para pintarse.

    No es un requisito funcional: es lo que hace cumplir el RNF06. La interfaz
    aporta presentación y no guarda constantes de negocio, así que los dominios
    institucionales, los bloques horarios y los límites los recibe de aquí.

    Antes, la tabla que decide el rol según el dominio estaba escrita a mano en
    dos componentes del frontend. Si mañana cambia un dominio institucional
    había que tocar tres archivos, y bastaba olvidar uno para que la interfaz
    dijera algo distinto de lo que el backend aplica.
    """
    return Response({
        # RN01 — el dominio determina el rol.
        'dominios': [
            {'dominio': dominio, 'rol': rol, 'etiqueta': ETIQUETA_ROL[rol]}
            for dominio, rol in DOMINIOS_ROL.items()
        ],
        # RN03 — los seis bloques de dos horas en horas pares.
        'bloques': [
            {'id': i, 'hora_inicio': inicio, 'hora_fin': fin}
            for i, inicio, fin in BLOQUES_HORARIOS
        ],
        'aforo_por_defecto': AFORO_POR_DEFECTO,
        # RN02 — el documento de identidad es una cédula de diez dígitos.
        'documento_longitud': DOCUMENTO_LONGITUD,
        # RN05 — una reserva por estudiante y por día.
        'max_reservas_por_dia': MAX_RESERVAS_POR_DIA,

        # RN08 — cinco inasistencias penalizan, y se avisa cuando faltan dos.
        'no_show_limite': NO_SHOW_LIMITE,
        'no_show_alerta': NO_SHOW_ALERTA,

        # RF03 — rangos admitidos en el perfil físico.
        'perfil_rangos': {
            campo: {'minimo': minimo, 'maximo': maximo}
            for campo, (minimo, maximo) in PERFIL_RANGOS.items()
        },
        'meta_max': META_MAX,
        'etiquetas_rol': ETIQUETA_ROL,
    })


def _dominios_texto() -> str:
    """'@soyudemedellin.edu.co (Estudiante), @udem.edu.co (Entrenador), ...'"""
    return ', '.join(
        f'{d} ({ETIQUETA_ROL[r].lower()})'
        for d, r in DOMINIOS_ROL.items()
    )


def _perfil_sesion(user: dict) -> dict:
    """Datos de sesión que el frontend necesita para pintar la interfaz.

    RF05 — Incluye siempre nombre, DOCUMENTO DE IDENTIDAD y rol asignado, que
    es lo que consultan entrenadores y administradores en su perfil.
    """
    return {
        'name': user['name'],
        'email': user['email'],
        'documento': user.get('documento', ''),
        'role': user.get('role', 'ESTUDIANTE'),
        'estado': user.get('estado', 'ACTIVO'),
        'es_principal': bool(user.get('es_principal')),

        # RN08 — inasistencias acumuladas y cuántas faltan para la penalización.
        'no_show_count': user.get('no_show_count', 0),
        'inasistencias_restantes': inasistencias_restantes(user),
        'no_show_limite': NO_SHOW_LIMITE,
        'alerta_inasistencias': alerta_inasistencias(user),
    }


def _leer_documento(data) -> str:
    """RF01/RF02 — Toma el documento de identidad del cuerpo de la petición.

    El campo se llama `documento`; se acepta `password` como alias porque el
    documento ES la contraseña con la que la persona inicia sesión.
    """
    return normalizar_documento(
        data.get('documento') or data.get('password') or ''
    )


# ──────────────────────────────────────────
# AUTH
# ──────────────────────────────────────────

@swagger_auto_schema(
    method='post',
    operation_description="Registro de usuarios. El rol se deduce del dominio del correo institucional.",
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        required=['name', 'email', 'documento'],
        properties={
            'name': openapi.Schema(
                type=openapi.TYPE_STRING,
                example='Juan Pérez'
            ),
            'email': openapi.Schema(
                type=openapi.TYPE_STRING,
                example='juan.perez@soyudemedellin.edu.co'
            ),
            'documento': openapi.Schema(
                type=openapi.TYPE_STRING,
                example='1001234567',
                description='Documento de identidad: es también la contraseña.'
            ),
        }
    ),
    responses={
        201: openapi.Response(
            'Registro exitoso.',
            openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    'message': openapi.Schema(type=openapi.TYPE_STRING),
                    'role': openapi.Schema(type=openapi.TYPE_STRING)
                }
            )
        ),
        400: openapi.Response(
            'Datos inválidos.',
            openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    'error': openapi.Schema(type=openapi.TYPE_STRING)
                }
            )
        ),
        409: openapi.Response(
            'Correo ya existe.',
            openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    'error': openapi.Schema(type=openapi.TYPE_STRING)
                }
            )
        ),
    }
)
@api_view(['POST'])
def registrar_cuenta(request):
    """RF01 — Registrar una cuenta.

    Crea la cuenta con nombre, correo institucional y documento de identidad.
    El rol NO se recibe del cliente: lo determina el dominio del correo (RN01),
    de modo que nadie pueda auto-asignarse permisos de entrenador o de
    administrador. El documento se guarda normalizado, para que el entrenador
    pueda buscarlo (RF10), y cifrado, para validar el inicio de sesión (RN02).
    """
    # ╔══════════════════════════════════════════════════════════════════╗
    # ║ CASO DE USO CRÍTICO #1 — REGISTRO CON CORREO INSTITUCIONAL      ║
    # ║ Crítico porque es el control de acceso: solo miembros de la      ║
    # ║ universidad pueden crear cuenta, la contraseña se almacena       ║
    # ║ HASHEADA (PBKDF2, nunca en claro) y el correo es único.           ║
    # ║ RN01 — El ROL SE DEDUCE DEL DOMINIO (tres tipos de correo):      ║
    # ║   @soyudemedellin.edu.co -> ESTUDIANTE                          ║
    # ║   @udem.edu.co           -> ENTRENADOR                          ║
    # ║   @udemedellin.edu.co    -> ADMIN                               ║
    # ║ El cliente NO puede elegir el rol: así nadie se auto-asigna      ║
    # ║ privilegios de profesor o administrador al registrarse.           ║
    # ╚══════════════════════════════════════════════════════════════════╝

    db = get_db()

    name = request.data.get('name', '').strip()
    email = request.data.get('email', '').strip().lower()
    documento = _leer_documento(request.data)

    if not name or not email or not documento:
        return Response(
            {
                'error': (
                    'Nombre, correo institucional y documento '
                    'de identidad son obligatorios.'
                )
            },
            status=400,
        )

    # RF01 — El documento de identidad es además la contraseña (RF02).
    problema = error_de_documento(documento)
    if problema:
        return Response({'error': problema}, status=400)

    role = role_for_email(email)

    if role is None:
        return Response(
            {
                'error': (
                    f'Debes usar un correo institucional válido: '
                    f'{_dominios_texto()}.'
                )
            },
            status=400,
        )

    if db.users.find_one({'email': email}):
        return Response(
            {'error': 'Ya existe una cuenta con este correo.'},
            status=409,
        )

    if db.users.find_one({'documento': documento}):
        return Response(
            {
                'error': (
                    'Ya existe una cuenta con este documento de identidad.'
                )
            },
            status=409,
        )

    # RF21 — El PRIMER administrador del sistema es el administrador principal:
    # es quien puede crear y gestionar las cuentas de los demás administradores.
    es_principal = (
        role == 'ADMIN'
        and db.users.count_documents({'role': 'ADMIN'}) == 0
    )

    db.users.insert_one({
        'name': name,
        'email': email,
        'documento': documento,
        'password': hash_password(documento),
        'role': role,
        'estado': 'ACTIVO',
        'es_principal': es_principal,
        'no_show_count': 0,
        'penalizado_hasta': None,
        'created_at': ahora_utc(),
    })

    return Response({
        'message': 'Registro exitoso.',
        'role': role,
        'documento': documento,
        'es_principal': es_principal,
    }, status=201)


@swagger_auto_schema(
    method='post',
    operation_description="Inicio de sesión y validación de credenciales.",
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        required=['email', 'documento'],
        properties={
            'email': openapi.Schema(
                type=openapi.TYPE_STRING,
                example='juan.perez@soyudemedellin.edu.co'
            ),
            'documento': openapi.Schema(
                type=openapi.TYPE_STRING,
                example='1001234567',
                description='Documento de identidad usado como contraseña.'
            ),
        }
    ),
    responses={
        200: openapi.Response(
            'Login exitoso.',
            openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    'name': openapi.Schema(type=openapi.TYPE_STRING),
                    'email': openapi.Schema(type=openapi.TYPE_STRING)
                }
            )
        ),
        401: openapi.Response(
            'Credenciales incorrectas.',
            openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    'error': openapi.Schema(type=openapi.TYPE_STRING)
                }
            )
        ),
    }
)
@api_view(['POST'])
def iniciar_sesion(request):
    """RF02 — Iniciar sesión.

    Autentica con el correo institucional y el documento de identidad como
    contraseña (RN02), y devuelve el rol ALMACENADO en la cuenta para que la
    interfaz muestre las herramientas de ese perfil.
    """
    db = get_db()

    email = request.data.get('email', '').strip().lower()
    documento = _leer_documento(request.data)

    user = db.users.find_one({'email': email})

    if not user or not verify_password(user['password'], documento):
        return Response(
            {'error': 'Correo o documento de identidad incorrectos.'},
            status=401,
        )

    # RF22 — A esta cuenta le retiraron el rol: ya no puede entrar al sistema.
    if user.get('estado') == 'INACTIVO' or user.get('role') == 'SIN_ROL':
        return Response(
            {
                'error': (
                    'Tu cuenta fue desactivada por el administrador principal.'
                )
            },
            status=403,
        )

    return Response(_perfil_sesion(user))


@swagger_auto_schema(
    method='get',
    operation_description="Devuelve la sesión actualizada de un usuario (se usa al recargar la página).",
    manual_parameters=[
        openapi.Parameter(
            'email',
            openapi.IN_QUERY,
            description="Correo del usuario",
            type=openapi.TYPE_STRING,
            required=True
        ),
    ],
    responses={
        200: openapi.Response(
            'Sesión vigente.',
            openapi.Schema(type=openapi.TYPE_OBJECT)
        ),
        404: openapi.Response(
            'Usuario no encontrado.',
            openapi.Schema(type=openapi.TYPE_OBJECT)
        ),
    }
)
@api_view(['GET'])
def session(request):
    """Rehidrata la sesión tras recargar la página."""
    email = request.query_params.get('email', '').strip().lower()

    if not email:
        return Response(
            {'error': 'Parámetro email requerido.'},
            status=400
        )

    user = get_db().users.find_one({'email': email})

    if not user:
        return Response(
            {'error': 'Usuario no encontrado.'},
            status=404
        )

    return Response(_perfil_sesion(user))


# ──────────────────────────────────────────
# SLOTS
# ──────────────────────────────────────────

@swagger_auto_schema(
    method='get',
    operation_description="Bloques horarios y cupos disponibles para la fecha de reserva (el día siguiente).",
    responses={
        200: openapi.Response(
            'Disponibilidad del día siguiente.',
            openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    'fecha': openapi.Schema(
                        type=openapi.TYPE_STRING,
                        example='2026-08-17'
                    ),
                    'fecha_label': openapi.Schema(
                        type=openapi.TYPE_STRING,
                        example='lunes 17 de agosto de 2026'
                    ),
                    'slots': openapi.Schema(
                        type=openapi.TYPE_ARRAY,
                        items=openapi.Schema(
                            type=openapi.TYPE_OBJECT
                        )
                    ),
                }
            )
        ),
    }
)
@api_view(['GET'])
def consultar_horarios(request):
    """RF06 — Consultar los bloques horarios con sus cupos."""
    fecha = fecha_reserva()
    fecha_iso = fecha.isoformat()

    asegurar_disponibilidad(fecha_iso)

    db = get_db()

    catalogo = {
        b['slotId']: b
        for b in db.slots.find({}, {'_id': 0})
    }

    slots = [
        {
            'id': d['slotId'],
            'hour': catalogo[d['slotId']]['hour'],
            'hora_fin': catalogo[d['slotId']].get('hora_fin', ''),
            'available': d['cupos_disponibles'],
            'total': d['aforo_maximo'],
        }
        for d in db.disponibilidad.find(
            {'fecha': fecha_iso}
        ).sort('slotId', 1)
        if d['slotId'] in catalogo
    ]

    return Response({
        'fecha': fecha_iso,
        'fecha_label': formato_fecha_es(fecha),
        'slots': slots,
    })


# ──────────────────────────────────────────
# RESERVATIONS
# ──────────────────────────────────────────

@swagger_auto_schema(
    method='get',
    operation_description="Lista las reservas activas de un estudiante.",
    manual_parameters=[
        openapi.Parameter(
            'email',
            openapi.IN_QUERY,
            description="Correo del usuario",
            type=openapi.TYPE_STRING,
            required=True
        ),
    ],
    responses={
        200: openapi.Response(
            'Lista de reservas.',
            openapi.Schema(
                type=openapi.TYPE_ARRAY,
                items=openapi.Schema(type=openapi.TYPE_OBJECT)
            )
        ),
        400: openapi.Response(
            'Parámetro email requerido.',
            openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    'error': openapi.Schema(type=openapi.TYPE_STRING)
                }
            )
        ),
    }
)
@swagger_auto_schema(
    method='post',
    operation_description="Crea la reserva del día siguiente y descuenta cupo. Una sola reserva por día.",
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        required=['email', 'slotId'],
        properties={
            'email': openapi.Schema(
                type=openapi.TYPE_STRING,
                example='juan.perez@soyudemedellin.edu.co'
            ),
            'slotId': openapi.Schema(
                type=openapi.TYPE_INTEGER,
                example=1
            ),
        }
    ),
    responses={
        201: openapi.Response(
            'Reserva creada.',
            openapi.Schema(type=openapi.TYPE_OBJECT)
        ),
        400: openapi.Response(
            'Datos inválidos.',
            openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    'error': openapi.Schema(type=openapi.TYPE_STRING)
                }
            )
        ),
        403: openapi.Response(
            'Perfil sin permiso de reserva.',
            openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    'error': openapi.Schema(type=openapi.TYPE_STRING)
                }
            )
        ),
        404: openapi.Response(
            'Horario no encontrado.',
            openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    'error': openapi.Schema(type=openapi.TYPE_STRING)
                }
            )
        ),
        409: openapi.Response(
            'Sin cupos o ya reservó hoy.',
            openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    'error': openapi.Schema(type=openapi.TYPE_STRING)
                }
            )
        ),
    }
)
@api_view(['GET', 'POST'])
def reservations(request):
    """Punto de entrada de /api/reservations/."""
    if request.method == 'GET':
        return consultar_reserva(request)

    return reservar_mañana(request)


def consultar_reserva(request):
    """RF08 — Consultar mis reservas."""
    email = request.query_params.get('email', '').lower()

    if not email:
        return Response(
            {'error': 'Parámetro email requerido.'},
            status=400
        )

    docs = [
        serialize(r)
        for r in get_db().reservations.find({
            'email': email,
            'estado': 'ACTIVA'
        })
    ]

    return Response(docs)


def reservar_mañana(request):
    """RF07 — Reservar un bloque para el día siguiente."""
    db = get_db()

    email = request.data.get('email', '').strip().lower()
    slot_id = request.data.get('slotId')

    if not email or slot_id is None:
        return Response(
            {'error': 'email y slotId son obligatorios.'},
            status=400
        )

    try:
        slot_id = int(slot_id)
    except (TypeError, ValueError):
        return Response(
            {'error': 'slotId debe ser un número.'},
            status=400
        )

    owner = db.users.find_one({'email': email})

    if not owner:
        return Response(
            {'error': 'El usuario de la reserva no existe.'},
            status=404
        )

    # RN10 — Entrenadores y administradores consultan el aforo,
    # no lo ocupan.
    if owner.get('role') != 'ESTUDIANTE':
        return Response(
            {
                'error': (
                    'Los entrenadores y administradores no reservan cupos: '
                    'solo consultan la disponibilidad.'
                )
            },
            status=403,
        )

    # RN09 — Una cuenta penalizada no reserva mientras dure la penalización.
    if owner.get('estado') == 'PENALIZADO':
        hasta = owner.get('penalizado_hasta')

        if hasta and hasta > ahora_utc():
            return Response(
                {
                    'error': (
                        'Tu cuenta está penalizada por inasistencias. '
                        'No puedes reservar por ahora.'
                    )
                },
                status=403,
            )

        # Penalización vencida: la cuenta vuelve a estar activa.
        db.users.update_one(
            {'email': email},
            {
                '$set': {
                    'estado': 'ACTIVO',
                    'no_show_count': 0,
                    'penalizado_hasta': None
                }
            },
        )

    # RN04 — La fecha la calcula el sistema: siempre el día siguiente.
    fecha = fecha_reserva()
    fecha_iso = fecha.isoformat()
    fecha_label = formato_fecha_es(fecha)

    asegurar_disponibilidad(fecha_iso)

    slot = db.slots.find_one({'slotId': slot_id})

    if not slot:
        return Response(
            {'error': 'Horario no encontrado.'},
            status=404
        )

    # RN05 — Una sola reserva por estudiante y por día.
    if db.reservations.count_documents({
        'email': email,
        'estado': 'ACTIVA',
        'reserva_date': fecha_iso
    }) >= MAX_RESERVAS_POR_DIA:

        aviso = (
            f'Ya tienes una reserva para el {fecha_label}. '
            'Solo se permite una reserva por día: '
            'cancela la actual si quieres cambiar de horario.'
        )

        return Response(
            {
                'error': aviso,
                'notificacion': aviso,
                'tipo': 'RESERVA_DUPLICADA'
            },
            status=409
        )

    # RN06 — Comprobar y descontar en una sola operación.
    if not tomar_cupo(fecha_iso, slot_id):
        aviso = (
            f"El bloque de las {slot['hour']} se quedó sin cupos."
        )

        return Response(
            {
                'error': aviso,
                'notificacion': aviso,
                'tipo': 'SIN_CUPOS'
            },
            status=409
        )

    result = db.reservations.insert_one({
        'email': email,
        'slotId': slot_id,
        'hour': slot['hour'],
        'reserva_date': fecha_iso,
        'date': fecha_label,
        'estado': 'ACTIVA',
        'created_by': email,
        'created_at': ahora_utc(),
    })

    # RN11 — La confirmación la produce el backend.
    nueva = serialize(
        db.reservations.find_one({
            '_id': result.inserted_id
        })
    )

    nueva['notificacion'] = (
        f"Reserva confirmada para las {slot['hour']} del {fecha_label}. "
        'Si no vas a asistir, cancélala para liberar el cupo.'
    )

    nueva['tipo'] = 'RESERVA_CONFIRMADA'

    return Response(nueva, status=201)


@swagger_auto_schema(
    method='delete',
    operation_description="Cancela reserva y libera cupo inmediatamente. Suma al contador de cancelaciones (RN10).",
    manual_parameters=[
        openapi.Parameter(
            'reservation_id',
            openapi.IN_PATH,
            description="ID de la reserva (ObjectId)",
            type=openapi.TYPE_STRING,
            required=True
        ),
    ],
    responses={
        200: openapi.Response(
            'Reserva cancelada.',
            openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    'message': openapi.Schema(type=openapi.TYPE_STRING)
                }
            )
        ),
        400: openapi.Response(
            'ID inválido.',
            openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    'error': openapi.Schema(type=openapi.TYPE_STRING)
                }
            )
        ),
        404: openapi.Response(
            'Reserva no encontrada.',
            openapi.Schema(
                type=openapi.TYPE_OBJECT,
                properties={
                    'error': openapi.Schema(type=openapi.TYPE_STRING)
                }
            )
        ),
    }
)
@api_view(['DELETE'])
def cancelar_reserva(request, reservation_id):
    """RF09 — Cancelar mi reserva.

    Anula la reserva vigente y devuelve el cupo al bloque en la misma operación,
    para que otro estudiante lo vea disponible enseguida (RN07).

    Cancelar a tiempo NO penaliza. La penalización es por no presentarse
    habiendo reservado (RN08).
    """
    db = get_db()

    try:
        oid = ObjectId(reservation_id)
    except Exception:
        return Response(
            {'error': 'ID de reserva inválido.'},
            status=400
        )

    # La condición sobre el estado es la guardia: de dos peticiones
    # simultáneas de cancelación, solo una encuentra la reserva ACTIVA.
    reservation = db.reservations.find_one_and_update(
        {
            '_id': oid,
            'estado': 'ACTIVA'
        },
        {
            '$set': {
                'estado': 'CANCELADA',
                'cancelled_at': ahora_utc()
            }
        },
    )

    if reservation is None:
        if db.reservations.find_one({'_id': oid}):
            return Response(
                {'error': 'La reserva ya no está activa.'},
                status=409
            )

        return Response(
            {'error': 'Reserva no encontrada.'},
            status=404
        )

    # RN07 — El cupo vuelve al bloque de ESA jornada.
    devolver_cupo(
        reservation['reserva_date'],
        reservation['slotId']
    )

    # RN11 — La confirmación la produce el backend.
    return Response({
        'message': 'Reserva cancelada. Cupo liberado.',
        'notificacion': (
            f"Cancelaste tu reserva de las {reservation['hour']} "
            f"del {reservation.get('date', '')}. "
            'El cupo quedó liberado para otro compañero.'
        ),
        'tipo': 'RESERVA_CANCELADA',
    })
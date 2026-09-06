from datetime import datetime
from bson import ObjectId
from rest_framework.decorators import api_view
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from .db import (
    get_db, seed_slots, hash_password, verify_password, serialize,
    asegurar_disponibilidad, tomar_cupo, devolver_cupo,
    ROLES, DOMINIOS_ROL, role_for_email,
    fecha_reserva, formato_fecha_es,
    normalizar_documento, inasistencias_restantes, alerta_inasistencias,
    MAX_RESERVAS_POR_DIA, NO_SHOW_LIMITE, PENALIZACION_DIAS_HABILES,
    DOCUMENTO_MIN,
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


def _dominios_texto() -> str:
    """'@soyudemedellin.edu.co (estudiante), @udem.edu.co (profesor), ...'"""
    etiquetas = {'ESTUDIANTE': 'estudiante', 'ENTRENADOR': 'profesor', 'ADMIN': 'administrador'}
    return ', '.join(f'{d} ({etiquetas[r]})' for d, r in DOMINIOS_ROL.items())


def _perfil_sesion(user: dict) -> dict:
    """Datos de sesión que el frontend necesita para pintar la interfaz.

    RF05 — Incluye siempre nombre, DOCUMENTO DE IDENTIDAD y rol asignado, que
    es lo que consultan entrenadores y administradores en su perfil.
    """
    return {
        'name':      user['name'],
        'email':     user['email'],
        'documento': user.get('documento', ''),
        'role':      user.get('role', 'ESTUDIANTE'),
        'estado':    user.get('estado', 'ACTIVO'),
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
    return normalizar_documento(data.get('documento') or data.get('password') or '')


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
            'name': openapi.Schema(type=openapi.TYPE_STRING, example='Juan Pérez'),
            'email': openapi.Schema(type=openapi.TYPE_STRING, example='juan.perez@soyudemedellin.edu.co'),
            'documento': openapi.Schema(type=openapi.TYPE_STRING, example='1001234567', description='Documento de identidad: es también la contraseña.'),
        }
    ),
    responses={
        201: openapi.Response('Registro exitoso.', openapi.Schema(type=openapi.TYPE_OBJECT, properties={'message': openapi.Schema(type=openapi.TYPE_STRING), 'role': openapi.Schema(type=openapi.TYPE_STRING)})),
        400: openapi.Response('Datos inválidos.', openapi.Schema(type=openapi.TYPE_OBJECT, properties={'error': openapi.Schema(type=openapi.TYPE_STRING)})),
        409: openapi.Response('Correo ya existe.', openapi.Schema(type=openapi.TYPE_OBJECT, properties={'error': openapi.Schema(type=openapi.TYPE_STRING)})),
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
    # ║ CASO DE USO CRÍTICO #1 — REGISTRO CON CORREO INSTITUCIONAL          ║
    # ║ Crítico porque es el control de acceso: solo miembros de la         ║
    # ║ universidad pueden crear cuenta, la contraseña se almacena HASHEADA ║
    # ║ (PBKDF2, nunca en claro) y el correo es único.                      ║
    # ║ RN01 — El ROL SE DEDUCE DEL DOMINIO (tres tipos de correo):         ║
    # ║   @soyudemedellin.edu.co -> ESTUDIANTE                              ║
    # ║   @udem.edu.co           -> ENTRENADOR (profesor)                   ║
    # ║   @udemedellin.edu.co    -> ADMIN                                   ║
    # ║ El cliente NO puede elegir el rol: así nadie se auto-asigna         ║
    # ║ privilegios de profesor o administrador al registrarse.             ║
    # ╚══════════════════════════════════════════════════════════════════╝
    db = get_db()
    name      = request.data.get('name', '').strip()
    email     = request.data.get('email', '').strip().lower()
    documento = _leer_documento(request.data)

    if not name or not email or not documento:
        return Response(
            {'error': 'Nombre, correo institucional y documento de identidad son obligatorios.'},
            status=400,
        )

    # RF01 — El documento de identidad es además la contraseña (RF02).
    if len(documento) < DOCUMENTO_MIN:
        return Response(
            {'error': f'El documento de identidad debe tener al menos {DOCUMENTO_MIN} caracteres.'},
            status=400,
        )

    role = role_for_email(email)
    if role is None:
        return Response(
            {'error': f'Debes usar un correo institucional válido: {_dominios_texto()}.'},
            status=400,
        )

    if db.users.find_one({'email': email}):
        return Response({'error': 'Ya existe una cuenta con este correo.'}, status=409)

    if db.users.find_one({'documento': documento}):
        return Response({'error': 'Ya existe una cuenta con este documento de identidad.'}, status=409)

    # RF21 — El PRIMER administrador del sistema es el administrador principal:
    # es quien puede crear y gestionar las cuentas de los demás administradores.
    es_principal = role == 'ADMIN' and db.users.count_documents({'role': 'ADMIN'}) == 0

    db.users.insert_one({
        'name':       name,
        'email':      email,
        'documento':  documento,         # RF01/RF11 — se busca al estudiante por él
        'password':   hash_password(documento),   # RF02 — documento como contraseña
        'role':       role,
        'estado':     'ACTIVO',          # RN09: ACTIVO | PENALIZADO | INACTIVO
        'es_principal': es_principal,    # RF21/RF22 — administrador principal
        'no_show_count': 0,
        'penalizado_hasta': None,
        'created_at': datetime.utcnow(),
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
            'email': openapi.Schema(type=openapi.TYPE_STRING, example='juan.perez@soyudemedellin.edu.co'),
            'documento': openapi.Schema(type=openapi.TYPE_STRING, example='1001234567', description='Documento de identidad usado como contraseña.'),
        }
    ),
    responses={
        200: openapi.Response('Login exitoso.', openapi.Schema(type=openapi.TYPE_OBJECT, properties={'name': openapi.Schema(type=openapi.TYPE_STRING), 'email': openapi.Schema(type=openapi.TYPE_STRING)})),
        401: openapi.Response('Credenciales incorrectas.', openapi.Schema(type=openapi.TYPE_OBJECT, properties={'error': openapi.Schema(type=openapi.TYPE_STRING)})),
    }
)
@api_view(['POST'])
def iniciar_sesion(request):
    """RF02 — Iniciar sesión.

    Autentica con el correo institucional y el documento de identidad como
    contraseña (RN02), y devuelve el rol ALMACENADO en la cuenta para que la
    interfaz muestre las herramientas de ese perfil.

    El rol no se recalcula a partir del dominio del correo en cada entrada: si
    se recalculara, una cuenta a la que el administrador principal le retiró el
    rol (RF23) lo recuperaría sola en el siguiente inicio de sesión.

    Una cuenta penalizada entra con normalidad y ve su estado: la penalización
    limita reservar, no entrar (RN09).
    """
    # ╔══════════════════════════════════════════════════════════════════╗
    # ║ CASO DE USO CRÍTICO #2 — INICIO DE SESIÓN                          ║
    # ║ Crítico por seguridad: la verificación compara el hash PBKDF2       ║
    # ║ almacenado (verify_password) sin exponer la contraseña, y devuelve  ║
    # ║ un mensaje genérico ante correo o clave incorrectos para no revelar ║
    # ║ si el correo existe (mitiga enumeración de usuarios).               ║
    # ╚══════════════════════════════════════════════════════════════════╝
    db = get_db()
    email     = request.data.get('email', '').strip().lower()
    documento = _leer_documento(request.data)

    user = db.users.find_one({'email': email})
    if not user or not verify_password(user['password'], documento):
        return Response({'error': 'Correo o documento de identidad incorrectos.'}, status=401)

    # RF22 — A esta cuenta le retiraron el rol: ya no puede entrar al sistema.
    if user.get('estado') == 'INACTIVO' or user.get('role') == 'SIN_ROL':
        return Response({'error': 'Tu cuenta fue desactivada por el administrador principal.'}, status=403)

    # Se devuelve rol, estado y contadores para que el frontend muestre las
    # herramientas de cada perfil y la alerta de cancelaciones (RN10).
    return Response(_perfil_sesion(user))


@swagger_auto_schema(
    method='get',
    operation_description="Devuelve la sesión actualizada de un usuario (se usa al recargar la página).",
    manual_parameters=[
        openapi.Parameter('email', openapi.IN_QUERY, description="Correo del usuario", type=openapi.TYPE_STRING, required=True),
    ],
    responses={
        200: openapi.Response('Sesión vigente.', openapi.Schema(type=openapi.TYPE_OBJECT)),
        404: openapi.Response('Usuario no encontrado.', openapi.Schema(type=openapi.TYPE_OBJECT)),
    }
)
@api_view(['GET'])
def session(request):
    """Rehidrata la sesión tras recargar la página.

    El frontend guarda la sesión en localStorage; al recargar consulta este
    endpoint para traer datos frescos (rol, estado, cancelaciones) en vez de
    confiar ciegamente en lo guardado en el navegador.
    """
    email = request.query_params.get('email', '').strip().lower()
    if not email:
        return Response({'error': 'Parámetro email requerido.'}, status=400)
    user = get_db().users.find_one({'email': email})
    if not user:
        return Response({'error': 'Usuario no encontrado.'}, status=404)
    return Response(_perfil_sesion(user))


# ──────────────────────────────────────────
# ADMINISTRACIÓN DE USUARIOS
# ──────────────────────────────────────────

@swagger_auto_schema(
    method='get',
    operation_description="Lista los usuarios del sistema (solo ADMIN).",
    manual_parameters=[
        openapi.Parameter('actor_email', openapi.IN_QUERY, description="Correo del administrador", type=openapi.TYPE_STRING, required=True),
    ],
    responses={200: openapi.Response('Listado de usuarios.'), 403: openapi.Response('Solo administradores.')}
)
@swagger_auto_schema(
    method='post',
    operation_description="Un ADMIN crea nuevos usuarios, incluidos otros administradores.",
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        required=['actor_email', 'name', 'email', 'documento'],
        properties={
            'actor_email': openapi.Schema(type=openapi.TYPE_STRING, example='soporte@udemedellin.edu.co'),
            'name': openapi.Schema(type=openapi.TYPE_STRING, example='Nueva Administradora'),
            'email': openapi.Schema(type=openapi.TYPE_STRING, example='nueva.admin@udemedellin.edu.co'),
            'documento': openapi.Schema(type=openapi.TYPE_STRING, example='1009998887'),
            'role': openapi.Schema(type=openapi.TYPE_STRING, example='ADMIN', description='Debe coincidir con el dominio del correo.'),
        }
    ),
    responses={
        201: openapi.Response('Usuario creado.'),
        400: openapi.Response('Datos inválidos.'),
        403: openapi.Response('Solo administradores.'),
        409: openapi.Response('El correo ya existe.'),
    }
)
@api_view(['GET', 'POST'])
def crear_administrador(request):
    """RF22 — Crear cuentas con rol de administrador.

    GET lista las cuentas del sistema. POST da de alta una cuenta nueva: es la
    única vía para que exista un administrador además del principal.

    El rol sigue amarrado al dominio del correo (RN01), de modo que ni siquiera
    un administrador puede crear una cuenta de administrador con un correo de
    estudiante.
    """
    # ╔══════════════════════════════════════════════════════════════════╗
    # ║ CASO DE USO — GESTIÓN DE USUARIOS POR EL ADMINISTRADOR              ║
    # ║ Solo un ADMIN autenticado puede dar de alta cuentas, y es la única   ║
    # ║ vía para crear NUEVOS ADMINISTRADORES. El rol sigue amarrado al      ║
    # ║ dominio del correo (RN01): un admin no puede crear un administrador  ║
    # ║ con un correo de estudiante.                                        ║
    # ╚══════════════════════════════════════════════════════════════════╝
    db = get_db()
    actor_email = (request.query_params.get('actor_email') if request.method == 'GET'
                   else request.data.get('actor_email', ''))
    actor = db.users.find_one({'email': (actor_email or '').strip().lower()})
    if not actor or actor.get('role') != 'ADMIN':
        return Response({'error': 'Solo un administrador puede gestionar usuarios.'}, status=403)

    if request.method == 'GET':
        rows = [{
            'name': u.get('name'), 'email': u['email'], 'role': u.get('role'),
            'documento': u.get('documento', ''),          # RF05
            'estado': u.get('estado'),
            'no_show_count': u.get('no_show_count', 0),
            'es_principal': bool(u.get('es_principal')),  # RF21/RF22
        } for u in db.users.find().sort('role', 1)]
        return Response(rows)

    name      = request.data.get('name', '').strip()
    email     = request.data.get('email', '').strip().lower()
    documento = _leer_documento(request.data)
    if not name or not email or not documento:
        return Response({'error': 'Nombre, correo y documento de identidad son obligatorios.'}, status=400)
    if len(documento) < DOCUMENTO_MIN:
        return Response(
            {'error': f'El documento de identidad debe tener al menos {DOCUMENTO_MIN} caracteres.'},
            status=400,
        )

    role = role_for_email(email)
    if role is None:
        return Response(
            {'error': f'Debes usar un correo institucional válido: {_dominios_texto()}.'},
            status=400,
        )

    # Si el admin indica un rol explícito, debe coincidir con el dominio.
    pedido = request.data.get('role')
    if pedido:
        pedido = pedido.strip().upper()
        if pedido not in ROLES:
            return Response({'error': f'Rol inválido. Use uno de: {", ".join(ROLES)}.'}, status=400)
        if pedido != role:
            return Response(
                {'error': f'El correo {email} corresponde al rol {role}, no a {pedido}. '
                          f'Para crear un {pedido} usa un correo del dominio correspondiente.'},
                status=400,
            )

    # RF21 — Solo el ADMINISTRADOR PRINCIPAL crea cuentas con rol de administrador.
    if role == 'ADMIN' and not _es_principal(actor):
        return Response(
            {'error': 'Solo el administrador principal puede crear cuentas de administrador.'},
            status=403,
        )

    if db.users.find_one({'email': email}):
        return Response({'error': 'Ya existe una cuenta con este correo.'}, status=409)
    if db.users.find_one({'documento': documento}):
        return Response({'error': 'Ya existe una cuenta con este documento de identidad.'}, status=409)

    db.users.insert_one({
        'name':       name,
        'email':      email,
        'documento':  documento,
        'password':   hash_password(documento),   # RF02 — documento como contraseña
        'role':       role,
        'estado':     'ACTIVO',
        'es_principal': False,
        'no_show_count': 0,
        'penalizado_hasta': None,
        'created_at': datetime.utcnow(),
        'created_by': actor['email'],
    })
    return Response({'message': f'Usuario creado con rol {role}.', 'role': role}, status=201)


def _es_principal(actor: dict) -> bool:
    """RF21/RF22 — ¿El actor es el administrador principal del sistema?

    Es principal quien tiene la marca `es_principal`. Para no dejar el sistema
    sin administrador principal (por ejemplo, en instalaciones creadas antes de
    que existiera la marca), si NINGÚN administrador la tiene se considera
    principal al administrador más antiguo.
    """
    if not actor or actor.get('role') != 'ADMIN':
        return False
    if actor.get('es_principal'):
        return True
    db = get_db()
    if db.users.count_documents({'role': 'ADMIN', 'es_principal': True}) > 0:
        return False
    primero = db.users.find_one({'role': 'ADMIN'}, sort=[('created_at', 1)])
    return bool(primero and primero['email'] == actor['email'])


@swagger_auto_schema(
    method='patch',
    operation_description=(
        "RF22 — El administrador principal gestiona las cuentas de otros administradores. "
        "Con accion='retirar' le quita el rol de administrador; con accion='restaurar' se lo devuelve."
    ),
    manual_parameters=[
        openapi.Parameter('user_email', openapi.IN_PATH, description="Correo de la cuenta a gestionar", type=openapi.TYPE_STRING, required=True),
    ],
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        required=['actor_email', 'accion'],
        properties={
            'actor_email': openapi.Schema(type=openapi.TYPE_STRING, example='soporte@udemedellin.edu.co'),
            'accion': openapi.Schema(type=openapi.TYPE_STRING, enum=['retirar', 'restaurar'], example='retirar'),
        },
    ),
    responses={
        200: openapi.Response('Cuenta actualizada.'),
        400: openapi.Response('Acción inválida.'),
        403: openapi.Response('Solo el administrador principal.'),
        404: openapi.Response('Cuenta no encontrada.'),
    },
)
@api_view(['PATCH'])
def retirar_administrador(request, user_email):
    """RF23 — Retirar el rol de administrador.

    Solo el administrador principal puede quitarle el rol a otro administrador.

    Importante: la cuenta NO se borra. Queda con rol SIN_ROL y sin acceso a las
    funciones administrativas, conservando sus datos y su historial. El cambio
    persiste aunque la persona vuelva a iniciar sesión, porque el rol se lee de
    la cuenta y no se deduce del dominio del correo en cada entrada (RF02).

    El propio administrador principal no puede quedarse sin rol: el sistema
    nunca se queda sin administrador.

    Cuerpo: {actor_email, accion} con accion 'retirar' o 'restaurar'.
    """
    # ╔══════════════════════════════════════════════════════════════════╗
    # ║ RF23 — RETIRAR EL ROL DE ADMINISTRADOR                             ║
    # ║ Solo el ADMINISTRADOR PRINCIPAL puede retirar (o devolver) el rol   ║
    # ║ de administrador. Retirar el rol deja la cuenta con rol SIN_ROL y   ║
    # ║ estado INACTIVO, de modo que ya no puede iniciar sesión.            ║
    # ║ El propio administrador principal NO puede ser retirado: el sistema ║
    # ║ nunca queda sin administrador.                                      ║
    # ╚══════════════════════════════════════════════════════════════════╝
    db = get_db()
    actor = db.users.find_one({'email': (request.data.get('actor_email') or '').strip().lower()})
    if not _es_principal(actor):
        return Response(
            {'error': 'Solo el administrador principal puede gestionar las cuentas de administrador.'},
            status=403,
        )

    objetivo = db.users.find_one({'email': (user_email or '').strip().lower()})
    if not objetivo:
        return Response({'error': 'Cuenta no encontrada.'}, status=404)

    accion = (request.data.get('accion') or '').strip().lower()

    if accion == 'retirar':
        if objetivo['email'] == actor['email'] or objetivo.get('es_principal'):
            return Response(
                {'error': 'No puedes retirar el rol del administrador principal.'},
                status=400,
            )
        if objetivo.get('role') != 'ADMIN':
            return Response({'error': 'La cuenta no tiene rol de administrador.'}, status=400)
        db.users.update_one(
            {'email': objetivo['email']},
            {'$set': {'role': 'SIN_ROL', 'estado': 'INACTIVO',
                      'admin_retirado_por': actor['email'],
                      'admin_retirado_at': datetime.utcnow()}},
        )
        return Response({
            'message': f"Se retiró el rol de administrador a {objetivo['email']}.",
            'role': 'SIN_ROL', 'estado': 'INACTIVO',
        })

    if accion == 'restaurar':
        if role_for_email(objetivo['email']) != 'ADMIN':
            return Response(
                {'error': 'El correo de la cuenta no corresponde al dominio de administrador.'},
                status=400,
            )
        db.users.update_one(
            {'email': objetivo['email']},
            {'$set': {'role': 'ADMIN', 'estado': 'ACTIVO'},
             '$unset': {'admin_retirado_por': '', 'admin_retirado_at': ''}},
        )
        return Response({
            'message': f"Se restauró el rol de administrador a {objetivo['email']}.",
            'role': 'ADMIN', 'estado': 'ACTIVO',
        })

    return Response({'error': "Acción inválida. Use 'retirar' o 'restaurar'."}, status=400)


# ──────────────────────────────────────────
# SLOTS
# ──────────────────────────────────────────

@swagger_auto_schema(
    method='get',
    operation_description="Bloques horarios y cupos disponibles para la fecha de reserva (el día siguiente).",
    responses={
        200: openapi.Response('Disponibilidad del día siguiente.', openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'fecha': openapi.Schema(type=openapi.TYPE_STRING, example='2026-08-17'),
                'fecha_label': openapi.Schema(type=openapi.TYPE_STRING, example='lunes 17 de agosto de 2026'),
                'slots': openapi.Schema(type=openapi.TYPE_ARRAY, items=openapi.Schema(type=openapi.TYPE_OBJECT)),
            }
        )),
    }
)
@api_view(['GET'])
def consultar_horarios(request):
    """RF06 — Consultar los bloques horarios con sus cupos.

    Devuelve los seis bloques de la jornada siguiente, cada uno con su aforo y
    los cupos que quedan libres (RN03 y RN04). Es la misma consulta para los tres
    roles: lo único que cambia es que la interfaz no ofrece la acción de reservar
    a quien no es estudiante (RN10).

    Los cupos NO viven en el catálogo de bloques sino en la disponibilidad de
    cada jornada. Si vivieran en el catálogo, el contador sería el mismo para
    todos los días: lo que se reserva hoy para mañana descontaría también el
    aforo de pasado mañana, y el gimnasio quedaría lleno para siempre.
    """
    # ╔══════════════════════════════════════════════════════════════════╗
    # ║ CASO DE USO CRÍTICO #3 — CONSULTA DE CUPOS EN TIEMPO REAL           ║
    # ║ Crítico para la consistencia: la interfaz muestra la disponibilidad ║
    # ║ y decide qué bloques se pueden reservar a partir de este valor.     ║
    # ╚══════════════════════════════════════════════════════════════════╝
    fecha = fecha_reserva()
    fecha_iso = fecha.isoformat()
    asegurar_disponibilidad(fecha_iso)

    db = get_db()
    catalogo = {b['slotId']: b for b in db.slots.find({}, {'_id': 0})}
    slots = [
        {
            'id':        d['slotId'],
            'hour':      catalogo[d['slotId']]['hour'],
            'hora_fin':  catalogo[d['slotId']].get('hora_fin', ''),
            'available': d['cupos_disponibles'],
            'total':     d['aforo_maximo'],
        }
        for d in db.disponibilidad.find({'fecha': fecha_iso}).sort('slotId', 1)
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
        openapi.Parameter('email', openapi.IN_QUERY, description="Correo del usuario", type=openapi.TYPE_STRING, required=True),
    ],
    responses={
        200: openapi.Response('Lista de reservas.', openapi.Schema(type=openapi.TYPE_ARRAY, items=openapi.Schema(type=openapi.TYPE_OBJECT))),
        400: openapi.Response('Parámetro email requerido.', openapi.Schema(type=openapi.TYPE_OBJECT, properties={'error': openapi.Schema(type=openapi.TYPE_STRING)})),
    }
)
@swagger_auto_schema(
    method='post',
    operation_description="Crea la reserva del día siguiente y descuenta cupo. Una sola reserva por día.",
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        required=['email', 'slotId'],
        properties={
            'email': openapi.Schema(type=openapi.TYPE_STRING, example='juan.perez@soyudemedellin.edu.co'),
            'slotId': openapi.Schema(type=openapi.TYPE_INTEGER, example=1),
        }
    ),
    responses={
        201: openapi.Response('Reserva creada.', openapi.Schema(type=openapi.TYPE_OBJECT)),
        400: openapi.Response('Datos inválidos.', openapi.Schema(type=openapi.TYPE_OBJECT, properties={'error': openapi.Schema(type=openapi.TYPE_STRING)})),
        403: openapi.Response('Perfil sin permiso de reserva.', openapi.Schema(type=openapi.TYPE_OBJECT, properties={'error': openapi.Schema(type=openapi.TYPE_STRING)})),
        404: openapi.Response('Horario no encontrado.', openapi.Schema(type=openapi.TYPE_OBJECT, properties={'error': openapi.Schema(type=openapi.TYPE_STRING)})),
        409: openapi.Response('Sin cupos o ya reservó hoy.', openapi.Schema(type=openapi.TYPE_OBJECT, properties={'error': openapi.Schema(type=openapi.TYPE_STRING)})),
    }
)
@api_view(['GET', 'POST'])
def reservations(request):
    """Punto de entrada de /api/reservations/.

    Delega en el requisito que corresponde según el método: RF08 para consultar
    la reserva vigente y RF07 para crearla.
    """
    if request.method == 'GET':
        return consultar_reserva(request)
    return reservar_mañana(request)


def consultar_reserva(request):
    """RF08 — Consultar mis reservas.

    Devuelve la reserva vigente del estudiante con su bloque, su fecha y su
    estado. Solo se listan las ACTIVA: las canceladas, las completadas y las
    inasistencias pertenecen al historial (RF14), no a esta consulta.
    """
    email = request.query_params.get('email', '').lower()
    if not email:
        return Response({'error': 'Parámetro email requerido.'}, status=400)
    docs = [serialize(r) for r in get_db().reservations.find({'email': email, 'estado': 'ACTIVA'})]
    return Response(docs)


def reservar_mañana(request):
    """RF07 — Reservar un bloque para el día siguiente.

    Aplica en orden las reglas RN10 (solo el estudiante reserva), RN09 (la
    cuenta penalizada no reserva), RN04 (la fecha es siempre la del día
    siguiente), RN05 (una reserva por día) y RN06 (el cupo se descuenta sin que
    dos personas puedan tomar el mismo).
    """
    # ╔══════════════════════════════════════════════════════════════════╗
    # ║ CASO DE USO CRÍTICO #4 — CREAR RESERVA SIN SOBRECUPO                ║
    # ║ El más crítico del sistema. Si el cupo se comprobara primero y se    ║
    # ║ descontara después, dos estudiantes que reservan en el mismo         ║
    # ║ instante leerían los dos que queda un lugar y lo ocuparían los dos.  ║
    # ║ Por eso comprobar y descontar van en UNA sola operación condicionada ║
    # ║ (tomar_cupo). La reserva se inserta solo DESPUÉS de ganar el cupo.   ║
    # ╚══════════════════════════════════════════════════════════════════╝
    db = get_db()
    email   = request.data.get('email', '').strip().lower()
    slot_id = request.data.get('slotId')

    if not email or slot_id is None:
        return Response({'error': 'email y slotId son obligatorios.'}, status=400)
    try:
        slot_id = int(slot_id)
    except (TypeError, ValueError):
        return Response({'error': 'slotId debe ser un número.'}, status=400)

    owner = db.users.find_one({'email': email})
    if not owner:
        return Response({'error': 'El usuario de la reserva no existe.'}, status=404)

    # RN10 — Entrenadores y administradores consultan el aforo, no lo ocupan.
    if owner.get('role') != 'ESTUDIANTE':
        return Response(
            {'error': 'Los entrenadores y administradores no reservan cupos: solo consultan la disponibilidad.'},
            status=403,
        )

    # RN09 — Una cuenta penalizada no reserva mientras dure la penalización.
    if owner.get('estado') == 'PENALIZADO':
        hasta = owner.get('penalizado_hasta')
        if hasta and hasta > datetime.utcnow():
            return Response(
                {'error': 'Tu cuenta está penalizada por inasistencias. No puedes reservar por ahora.'},
                status=403,
            )
        # Penalización vencida: la cuenta vuelve a estar activa.
        db.users.update_one(
            {'email': email},
            {'$set': {'estado': 'ACTIVO', 'no_show_count': 0, 'penalizado_hasta': None}},
        )

    # RN04 — La fecha la calcula el sistema: siempre el día siguiente.
    fecha = fecha_reserva()
    fecha_iso = fecha.isoformat()
    fecha_label = formato_fecha_es(fecha)
    asegurar_disponibilidad(fecha_iso)

    slot = db.slots.find_one({'slotId': slot_id})
    if not slot:
        return Response({'error': 'Horario no encontrado.'}, status=404)

    # RN05 — Una sola reserva por estudiante y por día. Se comprueba ANTES de
    # tocar el aforo, para que un intento duplicado no descuente ningún cupo.
    if db.reservations.count_documents(
            {'email': email, 'estado': 'ACTIVA', 'reserva_date': fecha_iso}) >= MAX_RESERVAS_POR_DIA:
        aviso = (f'Ya tienes una reserva para el {fecha_label}. '
                 'Solo se permite una reserva por día: cancela la actual si quieres cambiar de horario.')
        return Response({'error': aviso, 'notificacion': aviso, 'tipo': 'RESERVA_DUPLICADA'}, status=409)

    # RN06 — Comprobar y descontar en una sola operación.
    if not tomar_cupo(fecha_iso, slot_id):
        aviso = f"El bloque de las {slot['hour']} se quedó sin cupos."
        return Response({'error': aviso, 'notificacion': aviso, 'tipo': 'SIN_CUPOS'}, status=409)

    result = db.reservations.insert_one({
        'email':        email,
        'slotId':       slot_id,
        'hour':         slot['hour'],
        'reserva_date': fecha_iso,        # RN04 — la jornada siguiente
        'date':         fecha_label,      # la misma fecha, escrita en palabras
        'estado':       'ACTIVA',
        'created_by':   email,
        'created_at':   datetime.utcnow(),
    })

    # RN11 — La confirmación la produce el backend, no la interfaz.
    nueva = serialize(db.reservations.find_one({'_id': result.inserted_id}))
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
        openapi.Parameter('reservation_id', openapi.IN_PATH, description="ID de la reserva (ObjectId)", type=openapi.TYPE_STRING, required=True),
    ],
    responses={
        200: openapi.Response('Reserva cancelada.', openapi.Schema(type=openapi.TYPE_OBJECT, properties={'message': openapi.Schema(type=openapi.TYPE_STRING)})),
        400: openapi.Response('ID inválido.', openapi.Schema(type=openapi.TYPE_OBJECT, properties={'error': openapi.Schema(type=openapi.TYPE_STRING)})),
        404: openapi.Response('Reserva no encontrada.', openapi.Schema(type=openapi.TYPE_OBJECT, properties={'error': openapi.Schema(type=openapi.TYPE_STRING)})),
    }
)
@api_view(['DELETE'])
def cancelar_reserva(request, reservation_id):
    """RF09 — Cancelar mi reserva.

    Anula la reserva vigente y devuelve el cupo al bloque en la misma operación,
    para que otro estudiante lo vea disponible enseguida (RN07).

    Cancelar a tiempo NO penaliza. Es justo la conducta que el sistema quiere
    fomentar: la penalización es por no presentarse habiendo reservado (RN08),
    no por avisar con antelación que no se va a ir.
    """
    # ╔══════════════════════════════════════════════════════════════════╗
    # ║ CASO DE USO CRÍTICO #5 — CANCELAR Y LIBERAR EL CUPO                 ║
    # ║ Crítico para no perder ni inventar cupos. El paso de ACTIVA a        ║
    # ║ CANCELADA es una sola operación condicionada: si la reserva ya no     ║
    # ║ estaba activa, no se ejecuta y el cupo no se devuelve dos veces.      ║
    # ╚══════════════════════════════════════════════════════════════════╝
    db = get_db()
    try:
        oid = ObjectId(reservation_id)
    except Exception:
        return Response({'error': 'ID de reserva inválido.'}, status=400)

    # La condición sobre el estado es la guardia: de dos peticiones simultáneas
    # de cancelación, solo una encuentra la reserva todavía ACTIVA.
    reservation = db.reservations.find_one_and_update(
        {'_id': oid, 'estado': 'ACTIVA'},
        {'$set': {'estado': 'CANCELADA', 'cancelled_at': datetime.utcnow()}},
    )
    if reservation is None:
        if db.reservations.find_one({'_id': oid}):
            return Response({'error': 'La reserva ya no está activa.'}, status=409)
        return Response({'error': 'Reserva no encontrada.'}, status=404)

    # RN07 — El cupo vuelve al bloque de ESA jornada, no a un contador global.
    devolver_cupo(reservation['reserva_date'], reservation['slotId'])

    # RN11 — La confirmación la produce el backend, no la interfaz.
    return Response({
        'message': 'Reserva cancelada. Cupo liberado.',
        'notificacion': (f"Cancelaste tu reserva de las {reservation['hour']} "
                         f"del {reservation.get('date', '')}. El cupo quedó liberado "
                         'para otro compañero.'),
        'tipo': 'RESERVA_CANCELADA',
    })

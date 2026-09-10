"""
Requisitos que no entran en esta entrega de pruebas.

El plan reparte los requisitos entre tres personas: RF01 a RF05 (acceso y
perfiles), RF06 a RF10 (reservas), y RF11 a RF16 junto con RF20 y RF21
(asistencia, registro diario y buzón). Los cinco que quedan fuera de ese
reparto viven aquí, separados del código que sí se prueba, para que se vea de
un vistazo qué entra en la entrega y qué no.

  RF17  Ver el registro diario, administrador        (ver_registro_administrador)
  RF18  Descargar el registro en PDF, entrenador     (descargar_registro_entrenador)
  RF19  Descargar el registro en PDF, administrador  (descargar_registro_administrador)
  RF22  Crear cuentas con rol de administrador       (crear_administrador)
  RF23  Retirar el rol de administrador              (retirar_administrador)

Estar en este archivo no las desconecta de nada: `urls.py` las sigue enrutando
y la aplicación se comporta igual que antes. Es una separación para leer el
código, no un cambio de funcionamiento.
"""
import io

from django.http import HttpResponse, JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from .db import (
    ahora_utc, get_db, hash_password,
    DOCUMENTO_MIN, ROLES, role_for_email,
)
# Ayudantes que se quedan en sus módulos porque los comparten requisitos que sí
# se prueban: la lectura del documento y el texto de los dominios (views), y el
# armado del registro diario (attendance).
from .views import _leer_documento, _dominios_texto
from .attendance import _registro_diario_para


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
        'created_at': ahora_utc(),
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
                      'admin_retirado_at': ahora_utc()}},
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


@api_view(['GET'])
def ver_registro_administrador(request):
    """RF17 — Ver el registro diario del gimnasio (administrador).

    El mismo registro de la jornada, con el propósito de supervisar la
    operación del gimnasio.
    """
    return _registro_diario_para(request, 'ADMIN', 'un administrador')


# ── RF18 y RF19 — EL REGISTRO DIARIO EN PDF ─────────────────────────────────
def _generar_pdf_diario(request, rol, etiqueta):
    """Arma el PDF del registro diario y comprueba el rol de quien lo pide.

    RF18 y RF19 son dos requisitos porque son dos actores distintos: el
    entrenador imprime el registro para dejar constancia física de su turno y el
    administrador lo descarga para archivarlo. El documento es el mismo.

    Parámetros: ?actor_email=...&fecha=AAAA-MM-DD (la fecha es opcional).
    """
    from reportlab.lib.pagesizes import A4
    from reportlab.lib import colors
    from reportlab.lib.units import cm
    from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer
    from reportlab.lib.styles import getSampleStyleSheet

    from .attendance import build_daily_report
    from .db import get_db, hoy_local

    actor = get_db().users.find_one(
        {'email': (request.query_params.get('actor_email') or '').strip().lower()})
    if not actor or actor.get('role') != rol:
        return JsonResponse({'error': f'Este registro es el de {etiqueta}.'}, status=403)

    fecha = (request.query_params.get('fecha') or '').strip() or hoy_local().isoformat()
    rep = build_daily_report(fecha)
    t = rep['totales']

    buf = io.BytesIO()
    doc = SimpleDocTemplate(buf, pagesize=A4, title=f"Reporte diario {rep['fecha']}")
    styles = getSampleStyleSheet()
    elems = [
        Paragraph('Reporte general diario — Gimnasio UdeM', styles['Title']),
        Paragraph(rep['fecha_label'].capitalize(), styles['Heading3']),
        Spacer(1, 0.5 * cm),
    ]

    # Totales del día (RF20).
    resumen = Table([
        ['Asistencias', 'Cancelaciones', 'Inasistencias', 'Estudiantes penalizados'],
        [t['asistencias'], t['cancelaciones'], t['inasistencias'], t['estudiantes_penalizados']],
    ], colWidths=[4.2 * cm] * 4)
    resumen.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#CC0000')),
        ('TEXTCOLOR', (0, 0), (-1, 0), colors.white),
        ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 1), (-1, 1), 20),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('GRID', (0, 0), (-1, -1), 0.5, colors.grey),
        ('BOTTOMPADDING', (0, 1), (-1, 1), 10),
        ('TOPPADDING', (0, 1), (-1, 1), 10),
    ]))
    elems += [resumen, Spacer(1, 0.7 * cm)]

    def _seccion(titulo, filas, columnas, extractor):
        elems.append(Paragraph(titulo, styles['Heading3']))
        if not filas:
            elems.append(Paragraph('Sin registros.', styles['Normal']))
        else:
            tabla = Table([columnas] + [extractor(f) for f in filas], repeatRows=1)
            tabla.setStyle(TableStyle([
                ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#F0F0F0')),
                ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
                ('FONTSIZE', (0, 0), (-1, -1), 9),
                ('GRID', (0, 0), (-1, -1), 0.4, colors.grey),
                ('ROWBACKGROUNDS', (0, 1), (-1, -1), [colors.white, colors.HexColor('#FAFAFA')]),
            ]))
            elems.append(tabla)
        elems.append(Spacer(1, 0.5 * cm))

    persona = ['Estudiante', 'Documento', 'Hora']
    _seccion(f"Asistencias ({t['asistencias']})", rep['asistencias'], persona,
             lambda f: [f['name'], f['documento'], f['hour']])
    _seccion(f"Cancelaciones ({t['cancelaciones']})", rep['cancelaciones'], persona,
             lambda f: [f['name'], f['documento'], f['hour']])
    _seccion(f"Inasistencias ({t['inasistencias']})", rep['inasistencias'], persona,
             lambda f: [f['name'], f['documento'], f['hour']])
    _seccion(f"Estudiantes penalizados ({t['estudiantes_penalizados']})", rep['penalizados'],
             ['Estudiante', 'Documento', 'Inasistencias', 'Penalizado hasta'],
             lambda f: [f['name'], f['documento'], f['no_show_count'], f['penalizado_hasta'] or '—'])

    doc.build(elems)
    resp = HttpResponse(buf.getvalue(), content_type='application/pdf')
    resp['Content-Disposition'] = f"inline; filename=\"reporte_diario_{rep['fecha']}.pdf\""
    return resp


@api_view(['GET'])
def descargar_registro_entrenador(request):
    """RF18 — Descargar el registro diario en PDF (entrenador).

    El mismo registro que muestra RF16, en un archivo imprimible para dejar
    constancia física de la actividad del gimnasio.
    """
    return _generar_pdf_diario(request, 'ENTRENADOR', 'un entrenador')


@api_view(['GET'])
def descargar_registro_administrador(request):
    """RF19 — Descargar el registro diario en PDF (administrador).

    El mismo registro que muestra RF17, para archivarlo o presentarlo ante las
    instancias que lo soliciten.
    """
    return _generar_pdf_diario(request, 'ADMIN', 'un administrador')

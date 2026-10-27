"""Autenticación de la API con token firmado.

Corrige las vulnerabilidades que quedaron pendientes en el informe de seguridad
(regression_testing/INFORME_SEGURIDAD_RENDIMIENTO.md, §2.4):

  VUL-01  La identidad era el `actor_email` que mandaba el cliente.
  VUL-02  /auth/session/ devolvía los datos de cualquier usuario sin credenciales.
  VUL-03  Cualquiera podía escribir en el buzón a nombre de otro estudiante.
  VUL-04  Cualquiera podía cancelar la reserva de otro (la vista lo comprueba
          con `usuario_de(request)`).

El inicio de sesión y el registro devuelven un token firmado con SECRET_KEY
(django.core.signing, sin dependencias nuevas). El cliente lo envía en
`Authorization: Bearer <token>`. El middleware obtiene el usuario DEL TOKEN y
exige que `actor_email` o `email`, si vienen en la petición, sean ese mismo
usuario. Así el contrato de los endpoints no cambia: los mismos campos siguen
llegando, pero ya no se pueden falsificar.
"""
from django.conf import settings
from django.core import signing
from django.urls import Resolver404, resolve

from .db import get_db
from .seguridad import JsonResponse

SAL = 'gym-udem-api-token'
VIGENCIA_SEGUNDOS = 8 * 60 * 60          # una jornada del gimnasio

# Rutas que se usan antes de tener sesión.
RUTAS_PUBLICAS = (
    '/api/config/',
    '/api/auth/register/',
    '/api/auth/login/',
    '/api/slots/',
)

ROLES_STAFF = ('ENTRENADOR', 'ADMIN')


def emitir_token(email: str) -> str:
    return signing.dumps({'email': email}, salt=SAL)


def _email_del_token(token: str):
    try:
        return signing.loads(token, salt=SAL, max_age=VIGENCIA_SEGUNDOS)['email']
    except (signing.BadSignature, KeyError, TypeError):
        return None


def usuario_de(request):
    """Usuario autenticado de la petición, o None si no hay token (pruebas
    unitarias que llaman a la vista directamente, o modo de transición)."""
    return getattr(request, 'usuario_api', None)


def _no_autenticado():
    return JsonResponse(
        {'error': 'Debes iniciar sesión para usar esta función.', 'tipo': 'NO_AUTENTICADO'},
        status=401,
    )


def _identidad_ajena():
    return JsonResponse(
        {'error': 'No puedes actuar a nombre de otro usuario.', 'tipo': 'IDENTIDAD_AJENA'},
        status=403,
    )


class AutenticacionAPI:
    """Identifica al usuario por su token y no por lo que diga el cliente."""

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if not request.path.startswith('/api/') or request.path in RUTAS_PUBLICAS \
                or request.method == 'OPTIONS':
            return self.get_response(request)
        # Una ruta que no existe sigue respondiendo 404 (VUL-09): pedir sesión
        # ahí no protege nada y confunde a quien se equivocó de dirección.
        try:
            resolve(request.path_info)
        except Resolver404:
            return self.get_response(request)

        cabecera = request.headers.get('Authorization', '')
        token = cabecera[7:].strip() if cabecera.startswith('Bearer ') else ''
        # Los PDF se abren con un enlace, que no puede llevar cabeceras: solo
        # en esas rutas se acepta el token en la dirección.
        if not token and request.path.endswith('.pdf'):
            token = request.GET.get('token', '').strip()

        if not token:
            # AUTENTICACION_OBLIGATORIA=False deja la API como antes, para
            # migrar por fases otras suites que todavía no envían el token.
            if getattr(settings, 'AUTENTICACION_OBLIGATORIA', True):
                return _no_autenticado()
            return self.get_response(request)

        email = _email_del_token(token)
        user = get_db().users.find_one({'email': email}) if email else None
        # Un token vencido, alterado o de una cuenta desactivada no sirve.
        if not user or user.get('estado') == 'INACTIVO' or user.get('role') == 'SIN_ROL':
            return _no_autenticado()

        if not self._identidad_coincide(request, user):
            return _identidad_ajena()

        request.usuario_api = {'email': user['email'], 'role': user.get('role')}
        return self.get_response(request)

    @staticmethod
    def _identidad_coincide(request, user) -> bool:
        datos = {}
        if 'json' in (request.content_type or ''):
            try:
                import json
                cuerpo = json.loads(request.body or b'{}')
                datos = cuerpo if isinstance(cuerpo, dict) else {}
            except (ValueError, UnicodeDecodeError):
                datos = {}

        def campo(nombre):
            valor = request.GET.get(nombre) or datos.get(nombre) or ''
            return str(valor).strip().lower()

        actor = campo('actor_email')
        if actor:
            return actor == user['email']
        email = campo('email')
        if not email or email == user['email']:
            return True
        # El personal puede CONSULTAR los datos de un estudiante (por ejemplo,
        # sus inasistencias), pero nunca escribir a su nombre.
        return request.method == 'GET' and user.get('role') in ROLES_STAFF

"""Controles de seguridad transversales de la API.

Correcciones de las pruebas de seguridad (regression_testing/cypress/e2e/seguridad):

  VUL-06  Bloqueo temporal del inicio de sesión tras varios intentos fallidos.
  VUL-07  Rechazo de operadores de MongoDB enviados como objetos en el cuerpo.
  VUL-08  Errores de validación de la base de datos devueltos como 400, no 500.
  VUL-09  Ningún error de la API devuelve trazas ni detalles internos.
"""
import json
import logging
from datetime import timedelta, timezone

from functools import partial

from django.http import JsonResponse as _JsonResponse
from pymongo.errors import DuplicateKeyError, WriteError

from .db import get_db, ahora_utc

log = logging.getLogger(__name__)
# Respuestas JSON con tildes legibles (sin escapes \u00e1).
JsonResponse = partial(_JsonResponse, json_dumps_params={'ensure_ascii': False})

# ── Bloqueo por fuerza bruta (VUL-06) ──────────────────────────────────────
# Cinco intentos fallidos en quince minutos bloquean ese correo quince minutos.
# El contador vive en MongoDB, no en memoria: así lo comparten todos los
# procesos del servidor (con varios workers, un contador en memoria se
# repartiría entre ellos y el atacante tendría N veces más intentos).
MAX_FALLOS = 5
VENTANA = timedelta(minutes=15)
BLOQUEO = timedelta(minutes=15)


def _utc(fecha):
    """MongoDB puede devolver fechas sin zona (por ejemplo, en pruebas con mongomock)."""
    return fecha.replace(tzinfo=timezone.utc) if fecha and fecha.tzinfo is None else fecha


def minutos_de_bloqueo(email: str) -> int:
    """Minutos que le quedan de bloqueo a ese correo, o 0 si puede intentar."""
    registro = get_db().login_intentos.find_one({'_id': email})
    hasta = _utc((registro or {}).get('bloqueado_hasta'))
    if not hasta:
        return 0
    restante = (hasta - ahora_utc()).total_seconds()
    return max(0, int(-(-restante // 60)))          # redondeo hacia arriba


def registrar_fallo(email: str) -> int:
    """Suma un intento fallido. Devuelve los minutos de bloqueo, si lo hubo."""
    db = get_db()
    ahora = ahora_utc()
    registro = db.login_intentos.find_one({'_id': email}) or {}
    desde = _utc(registro.get('desde'))
    fallos = registro.get('fallos', 0)
    if not desde or ahora - desde > VENTANA:     # la ventana venció: se empieza de cero
        desde, fallos = ahora, 0
    fallos += 1
    cambios = {'desde': desde, 'fallos': fallos}
    if fallos >= MAX_FALLOS:
        cambios['bloqueado_hasta'] = ahora + BLOQUEO
    db.login_intentos.update_one({'_id': email}, {'$set': cambios}, upsert=True)
    return minutos_de_bloqueo(email) if fallos >= MAX_FALLOS else 0


def limpiar_fallos(email: str):
    """Tras un inicio de sesión correcto (o una cuenta nueva) el contador se borra."""
    get_db().login_intentos.delete_one({'_id': email})


def respuesta_bloqueo(minutos: int):
    from rest_framework.response import Response
    return Response(
        {'error': f'Demasiados intentos fallidos. Por seguridad, espera {minutos} '
                  f'minuto{"s" if minutos != 1 else ""} antes de volver a intentarlo.',
         'tipo': 'LOGIN_BLOQUEADO'},
        status=429,
        headers={'Retry-After': str(minutos * 60)},
    )


# ── Middleware de la API (VUL-07, VUL-08, VUL-09) ──────────────────────────
class ProteccionAPI:
    """Valida la forma del cuerpo y convierte cualquier excepción en JSON."""

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        if self._es_api(request) and request.method in ('POST', 'PUT', 'PATCH'):
            rechazo = self._cuerpo_no_valido(request)
            if rechazo:
                return rechazo
        return self.get_response(request)

    @staticmethod
    def _es_api(request):
        return request.path.startswith('/api/')

    @staticmethod
    def _cuerpo_no_valido(request):
        # Ningún endpoint recibe objetos ni listas: todos los campos son texto o
        # número. Un objeto como {"$ne": ""} es un intento de inyectar un
        # operador de MongoDB en la consulta (VUL-07).
        if 'json' not in (request.content_type or ''):
            return None
        try:
            datos = json.loads(request.body or b'{}')
        except (ValueError, UnicodeDecodeError):
            return None                              # DRF responde 400 por JSON mal formado
        if isinstance(datos, dict) and any(isinstance(v, (dict, list)) for v in datos.values()):
            return JsonResponse(
                {'error': 'Formato no válido: cada campo debe ser un texto o un número.'},
                status=400,
            )
        return None

    def process_exception(self, request, exc):
        if not self._es_api(request):
            return None
        if isinstance(exc, DuplicateKeyError):
            return JsonResponse({'error': 'Ese registro ya existe.'}, status=409)
        if isinstance(exc, WriteError) and getattr(exc, 'code', None) == 121:
            # 121 = el documento no cumple el validador de esquema de MongoDB.
            return JsonResponse(
                {'error': 'Los datos enviados no cumplen las reglas del sistema. Revisa los campos.'},
                status=400,
            )
        # Cualquier otro error: se registra completo en el servidor y al cliente
        # solo le llega un mensaje genérico, sin traza (VUL-09).
        log.exception('Error no controlado en %s %s', request.method, request.path)
        return JsonResponse({'error': 'Ocurrió un error interno. Intenta de nuevo.'}, status=500)

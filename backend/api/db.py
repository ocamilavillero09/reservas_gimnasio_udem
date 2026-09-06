import hashlib
import os
from datetime import date, datetime, timedelta
from pymongo import MongoClient
from pymongo.errors import DuplicateKeyError
from django.conf import settings
from django.utils import timezone

_client = None

# Roles y estados de usuario (RF02 / RN09 del documento de análisis).
# SIN_ROL es el estado final de una cuenta a la que el administrador principal
# le retiró el rol de administrador (RF22).
ROLES = ('ESTUDIANTE', 'ENTRENADOR', 'ADMIN', 'SIN_ROL')
ESTADOS = ('ACTIVO', 'PENALIZADO', 'INACTIVO')

# ──────────────────────────────────────────────────────────────────────────
# RN01 — TRES TIPOS DE CORREO INSTITUCIONAL PARA DIFERENCIAR USUARIOS
# El dominio del correo determina el rol: no se elige en el formulario, se
# deduce del correo con el que la persona se registra. Así un estudiante no
# puede auto-asignarse un rol de entrenador o administrador.
# ──────────────────────────────────────────────────────────────────────────
DOMINIOS_ROL = {
    '@soyudemedellin.edu.co': 'ESTUDIANTE',
    '@udem.edu.co':           'ENTRENADOR',
    '@udemedellin.edu.co':    'ADMIN',
}

# Reglas de negocio configurables.
MAX_RESERVAS_POR_DIA = 1      # RN05: una única reserva activa por día
NO_SHOW_LIMITE = 5            # RF16: 5 inasistencias -> PENALIZADO
CANCELACION_LIMITE = 5        # RN10: 5 cancelaciones -> PENALIZADO
CANCELACION_ALERTA = 2        # RN10: avisar cuando falten 2 para la penalización
PENALIZACION_DIAS_HABILES = 5  # RN09/RN10: penalización de 5 días hábiles

# RN03 — Los seis bloques de dos horas en horas pares. El gimnasio cierra a las
# 18:00, por eso el último bloque empieza a las 16:00.
BLOQUES_HORARIOS = (
    (1, '06:00', '08:00'),
    (2, '08:00', '10:00'),
    (3, '10:00', '12:00'),
    (4, '12:00', '14:00'),
    (5, '14:00', '16:00'),
    (6, '16:00', '18:00'),
)
AFORO_POR_DEFECTO = 20        # aforo de cada bloque, configurable

# Nombres en español para las fechas: strftime depende del locale del sistema
# (que en los contenedores suele ser inglés), así que se formatea a mano.
_DIAS = ('lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo')
_MESES = ('enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio',
          'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre')


# RF01/RF02 — El DOCUMENTO DE IDENTIDAD es el dato con el que la persona se
# registra y, además, la contraseña con la que inicia sesión. Se guarda en
# claro para poder buscarlo (RF11: el entrenador busca al estudiante por su
# documento) y hasheado en el campo `password` para validar el inicio de sesión.
DOCUMENTO_MIN = 6             # longitud mínima del documento de identidad
NO_SHOW_ALERTA = 2            # RF15: avisar cuando falten 2 inasistencias


# RF03 — Rangos admitidos en el perfil físico del estudiante.
# Son los MISMOS que declara el validador de esquema de MongoDB. Si difirieran,
# el backend aceptaría un valor que la base de datos rechazaría después, y la
# persona vería un error del servidor en vez de un mensaje que explique qué
# corregir. Cualquier cambio aquí hay que hacerlo también en database/.
PERFIL_RANGOS = {
    'edad':   (10, 100),
    'peso':   (20, 300),
    'altura': (100, 250),
}
META_MAX = 200                # longitud máxima del objetivo de entrenamiento


def validar_campo_perfil(campo: str, valor):
    """RF03 — Comprueba un campo del perfil antes de guardarlo.

    Devuelve None si el valor es válido, o el texto del error si no lo es.
    Un valor vacío o nulo es válido: significa que la persona quiere dejar el
    campo sin diligenciar.
    """
    if valor is None or valor == '':
        return None

    if campo == 'meta':
        if not isinstance(valor, str):
            return 'El objetivo de entrenamiento debe ser un texto.'
        if len(valor) > META_MAX:
            return f'El objetivo de entrenamiento no puede superar los {META_MAX} caracteres.'
        return None

    minimo, maximo = PERFIL_RANGOS[campo]
    try:
        numero = float(valor)
    except (TypeError, ValueError):
        return f'El campo {campo} debe ser un número.'
    if numero != numero or numero in (float('inf'), float('-inf')):
        return f'El campo {campo} debe ser un número.'
    if not (minimo <= numero <= maximo):
        unidad = {'edad': 'años', 'peso': 'kilogramos', 'altura': 'centímetros'}[campo]
        return f'El campo {campo} debe estar entre {minimo} y {maximo} {unidad}.'
    return None


def normalizar_campo_perfil(campo: str, valor):
    """RF03 — Deja el valor en el tipo que espera la base de datos.

    La edad se guarda como entero; el peso y la altura admiten decimales; el
    objetivo se guarda sin espacios sobrantes. Un valor vacío se guarda como
    nulo, que es como el esquema representa un campo sin diligenciar.
    """
    if valor is None or valor == '':
        return None
    if campo == 'meta':
        return valor.strip()
    if campo == 'edad':
        return int(float(valor))
    return float(valor)


def normalizar_documento(documento) -> str:
    """Deja el documento sin espacios ni puntos: '1.020 304' -> '1020304'."""
    texto = str(documento or '').strip()
    return texto.replace('.', '').replace(' ', '').replace('-', '')


def inasistencias_restantes(user: dict) -> int:
    """RF18 — Cuántas inasistencias le faltan al estudiante para ser penalizado."""
    usadas = (user or {}).get('no_show_count', 0)
    return max(NO_SHOW_LIMITE - usadas, 0)


def alerta_inasistencias(user: dict):
    """RF18 — Mensaje sobre el estado de inasistencias del estudiante."""
    restantes = inasistencias_restantes(user)
    usadas = (user or {}).get('no_show_count', 0)
    if restantes == 0:
        return (f'Alcanzaste el límite de {NO_SHOW_LIMITE} inasistencias. '
                'Tu cuenta quedó penalizada.')
    if usadas > 0 and restantes <= NO_SHOW_ALERTA:
        veces = 'inasistencia' if restantes == 1 else 'inasistencias'
        return (f'Llevas {usadas} inasistencias. Estás a {restantes} {veces} '
                'de ser penalizado.')
    return None


def role_for_email(email: str):
    """Rol que corresponde al dominio del correo, o None si no es institucional."""
    email = (email or '').strip().lower()
    for dominio, rol in DOMINIOS_ROL.items():
        if email.endswith(dominio):
            return rol
    return None


def hoy_local() -> date:
    """Fecha de hoy en la zona horaria del gimnasio (America/Bogota)."""
    return timezone.localtime().date()


def fecha_reserva() -> date:
    """RN03 — Las reservas siempre son para el DÍA SIGUIENTE."""
    return hoy_local() + timedelta(days=1)


def formato_fecha_es(d: date) -> str:
    """'martes 18 de agosto de 2026' — etiqueta legible para la interfaz."""
    return f'{_DIAS[d.weekday()]} {d.day} de {_MESES[d.month - 1]} de {d.year}'


def cancelaciones_restantes(user: dict) -> int:
    """Cuántas cancelaciones le faltan al usuario para ser penalizado."""
    usadas = (user or {}).get('cancel_count', 0)
    return max(CANCELACION_LIMITE - usadas, 0)


def alerta_cancelaciones(user: dict):
    """Mensaje de alerta in-app cuando quedan pocas cancelaciones (RN10).

    Devuelve None si todavía no hay motivo de alerta.
    """
    restantes = cancelaciones_restantes(user)
    if restantes == 0:
        return (f'Alcanzaste el límite de {CANCELACION_LIMITE} cancelaciones. '
                'Tu cuenta quedó penalizada y no puedes reservar por ahora.')
    if restantes <= CANCELACION_ALERTA:
        veces = 'cancelación' if restantes == 1 else 'cancelaciones'
        return (f'Atención: llevas {(user or {}).get("cancel_count", 0)} cancelaciones. '
                f'Estás a {restantes} {veces} de ser penalizado.')
    return None


def add_business_days(start: datetime, days: int) -> datetime:
    """Suma N días hábiles (lunes-viernes) a una fecha."""
    current = start
    added = 0
    while added < days:
        current += timedelta(days=1)
        if current.weekday() < 5:  # 0-4 = lunes a viernes
            added += 1
    return current

def get_db():
    global _client
    if _client is None:
        _client = MongoClient(settings.MONGO_URI)
    return _client[settings.MONGO_DB]

def seed_slots():
    """Carga el catálogo de bloques horarios si todavía no existe (RN03).

    El catálogo es fijo: seis bloques de dos horas en horas pares. NO guarda
    cupos disponibles, porque el aforo depende de la jornada: los cupos viven en
    la colección `disponibilidad`, un documento por cada fecha y bloque.
    """
    db = get_db()
    if db.slots.count_documents({}) == 0:
        db.slots.insert_many([
            {'slotId': i, 'hour': inicio, 'hora_fin': fin, 'total': AFORO_POR_DEFECTO}
            for i, inicio, fin in BLOQUES_HORARIOS
        ])


def asegurar_disponibilidad(fecha_iso: str):
    """Crea la disponibilidad de una jornada si todavía no existe.

    Cada jornada arranca con el aforo completo en cada bloque. Los documentos se
    crean la primera vez que alguien consulta o reserva esa fecha, así no hace
    falta un proceso nocturno que las genere por adelantado.

    `$setOnInsert` garantiza que una jornada ya empezada NO se reinicie: si el
    documento existe, la operación no toca los cupos que ya se descontaron.
    """
    db = get_db()
    seed_slots()
    for bloque in db.slots.find({}).sort('slotId', 1):
        try:
            db.disponibilidad.update_one(
                {'fecha': fecha_iso, 'slotId': bloque['slotId']},
                {'$setOnInsert': {
                    'fecha': fecha_iso,
                    'slotId': bloque['slotId'],
                    'cupos_disponibles': bloque['total'],
                    'aforo_maximo': bloque['total'],
                }},
                upsert=True,
            )
        except DuplicateKeyError:
            # Dos peticiones simultáneas intentaron crear la misma jornada.
            # El índice único dejó pasar solo una, que es justo lo que se busca.
            pass


def tomar_cupo(fecha_iso: str, slot_id: int) -> bool:
    """RN06 — Descuenta un cupo de un bloque de una jornada, o devuelve False.

    La comprobación de que queda cupo y el descuento van en UNA SOLA operación
    condicionada. Si se hicieran por separado, dos estudiantes que reservan en el
    mismo instante podrían leer los dos que queda un lugar y ocuparlo los dos,
    dejando el bloque con más personas de las que caben.
    """
    tomado = get_db().disponibilidad.find_one_and_update(
        {'fecha': fecha_iso, 'slotId': slot_id, 'cupos_disponibles': {'$gt': 0}},
        {'$inc': {'cupos_disponibles': -1}},
    )
    return tomado is not None


def devolver_cupo(fecha_iso: str, slot_id: int):
    """RN07 — Devuelve un cupo al bloque al cancelar una reserva.

    La condición sobre el aforo impide que una doble cancelación deje el bloque
    con más cupos libres de los que tiene de aforo.
    """
    get_db().disponibilidad.update_one(
        {'fecha': fecha_iso, 'slotId': slot_id,
         '$expr': {'$lt': ['$cupos_disponibles', '$aforo_maximo']}},
        {'$inc': {'cupos_disponibles': 1}},
    )


def get_config(key: str, default=None):
    """Lee un valor de la colección de configuración."""
    doc = get_db().config.find_one({'_id': key})
    return doc['value'] if doc else default


def set_config(key: str, value):
    get_db().config.update_one({'_id': key}, {'$set': {'value': value}}, upsert=True)


def hash_password(password: str) -> str:
    salt = os.urandom(32)
    key = hashlib.pbkdf2_hmac('sha256', password.encode(), salt, 100_000)
    return salt.hex() + ':' + key.hex()

def verify_password(stored: str, provided: str) -> bool:
    try:
        salt_hex, key_hex = stored.split(':')
        salt = bytes.fromhex(salt_hex)
        key = hashlib.pbkdf2_hmac('sha256', provided.encode(), salt, 100_000)
        return key.hex() == key_hex
    except Exception:
        return False

def serialize(doc: dict) -> dict:
    """Convierte ObjectId a string para que sea JSON serializable."""
    doc['id'] = str(doc.pop('_id'))
    return doc

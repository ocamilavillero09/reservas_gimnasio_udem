import hashlib
import math
import os
from datetime import date, datetime, timedelta, timezone
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
PENALIZACION_DIAS_HABILES = 5  # RN08/RN09: la penalización dura 5 días hábiles

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
DOCUMENTO_LONGITUD = 10       # la cédula colombiana tiene diez dígitos exactos
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
    # math.isfinite descarta de una vez los valores infinitos y el "no es un
    # número". Antes esto era `numero != numero`, que funciona pero es un truco:
    # se apoya en que un NaN no es igual ni a sí mismo. Con isfinite se lee.
    if not math.isfinite(numero):
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


def error_de_documento(documento: str):
    """Devuelve el motivo por el que un documento no sirve, o None si sirve.

    RN02 — El documento de identidad es la cédula de la persona y además su
    contraseña, así que tiene que ser una cédula real: solo dígitos y exactamente
    diez. Antes se aceptaba cualquier cosa de seis caracteres en adelante, letras
    incluidas, y con eso entraban documentos que no existen.
    """
    if not documento.isdigit():
        return 'El documento de identidad solo puede tener dígitos.'
    if len(documento) != DOCUMENTO_LONGITUD:
        return (f'El documento de identidad debe tener exactamente '
                f'{DOCUMENTO_LONGITUD} dígitos.')
    return None


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


def ahora_utc() -> datetime:
    """Momento actual en tiempo universal, con su zona horaria declarada.

    `datetime.utcnow()` está obsoleto desde Python 3.12 porque devuelve una
    fecha sin zona horaria que PARECE universal pero que nadie puede distinguir
    de una hora local. Comparar dos de esas es una fuente clásica de errores.

    El cliente de MongoDB se abre con `tz_aware=True`, así que lo que se guarda
    y lo que se lee llevan la zona horaria puesta y se pueden comparar entre sí
    sin sorpresas.
    """
    return datetime.now(timezone.utc)


def hoy_local() -> date:
    """Fecha de hoy en la zona horaria del gimnasio (America/Bogota)."""
    return timezone.localtime().date()


def fecha_reserva() -> date:
    """RN03 — Las reservas siempre son para el DÍA SIGUIENTE."""
    return hoy_local() + timedelta(days=1)


def hora_local() -> datetime:
    """Momento actual en la zona horaria del gimnasio (America/Bogota)."""
    return timezone.localtime()


def ventana_asistencia(reserva: dict):
    """RN12 — ¿Se puede registrar ya la asistencia de esta reserva?

    La asistencia solo se registra el MISMO día de la reserva y a partir de la
    hora en que empieza el bloque. Antes de esa hora el estudiante todavía no ha
    tenido la oportunidad de presentarse, así que darla por cierta sería
    registrar un hecho que aún no ha ocurrido.

    Devuelve (True, None) si la ventana está abierta, o (False, motivo) con el
    texto que explica desde cuándo se habilita.
    """
    fecha_iso = (reserva or {}).get('reserva_date', '')
    hoy = hoy_local().isoformat()

    if fecha_iso != hoy:
        cuando = 'ya pasó' if fecha_iso < hoy else 'todavía no llega'
        return False, (f'La reserva es del {fecha_iso} y esa jornada {cuando}. '
                       'La asistencia solo se registra el mismo día del bloque.')

    hora_bloque = (reserva or {}).get('hour', '')
    try:
        h, m = (int(x) for x in hora_bloque.split(':'))
    except (ValueError, AttributeError):
        return True, None      # sin hora legible no se puede acotar la ventana

    ahora = hora_local()
    if (ahora.hour, ahora.minute) < (h, m):
        return False, (f'El bloque de las {hora_bloque} todavía no empieza. '
                       f'Podrás registrar la asistencia a partir de las {hora_bloque}.')

    return True, None


def formato_fecha_es(d: date) -> str:
    """'martes 18 de agosto de 2026' — etiqueta legible para la interfaz."""
    return f'{_DIAS[d.weekday()]} {d.day} de {_MESES[d.month - 1]} de {d.year}'


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
        # tz_aware: las fechas que devuelve MongoDB llegan con su zona horaria,
        # de modo que se puedan comparar con las que produce ahora_utc().
        _client = MongoClient(settings.MONGO_URI, tz_aware=True)
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

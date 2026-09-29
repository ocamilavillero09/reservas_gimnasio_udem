#!/usr/bin/env python
"""
Métricas de rendimiento — Camila.

Requisitos: RF11, RF12, RF13, RF16, RF20 y RF21.

Mide, para cada función del requisito, el tiempo de respuesta, el uso de CPU y
el uso de memoria (ISO 25010, eficiencia de desempeño). Los resultados se
registran en metricas-camila.xlsx.

Las mediciones NO tocan los datos reales: el script trabaja en una base de
datos aparte (gym_udem_metricas) del mismo servidor MongoDB, crea ahí sus
propios usuarios, reservas y mensajes, y la borra al terminar. Esto importa
sobre todo para RF13, que cierra la jornada y marcaría inasistencias de verdad.

Uso (desde la raíz del repositorio):
    python Metricas/metricas_camila.py              # contra MongoDB (docker compose up -d)
    python Metricas/metricas_camila.py --mongomock  # sin MongoDB, base en memoria

Con --mongomock los tiempos no representan al servidor real: sirve para
comprobar que el script funciona cuando no hay MongoDB levantado.
"""
import os
import statistics
import sys
import time
from datetime import datetime, timedelta, timezone
from pathlib import Path

import psutil


# ============================================================
# CONFIGURACIÓN DEL PROYECTO
# ============================================================

BASE_DIR = Path(__file__).resolve().parent
RAIZ = BASE_DIR.parent
BACKEND_DIR = RAIZ / "backend"

sys.path.insert(0, str(RAIZ))
sys.path.insert(0, str(BACKEND_DIR))

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "gym_api.settings")

import django

django.setup()

from django.conf import settings
from rest_framework.test import APIRequestFactory

from api import attendance, features
from api import db as db_module


# ============================================================
# CONFIGURACIÓN DE LAS MÉTRICAS
# ============================================================

REPETICIONES = 20      # peticiones medidas por requisito
CALENTAMIENTO = 3      # peticiones previas que no se cuentan

# Base de datos exclusiva de las mediciones.
settings.MONGO_DB = os.getenv("METRICAS_DB", "gym_udem_metricas")

ESTUDIANTE = "metricas.estudiante@soyudemedellin.edu.co"
ENTRENADOR = "metricas.entrenador@udem.edu.co"
ADMIN = "metricas.admin@udemedellin.edu.co"
DOC_ESTUDIANTE = "9990000001"

factory = APIRequestFactory()
process = psutil.Process(os.getpid())


# ============================================================
# MEDICIÓN
# ============================================================

def tiempo_cpu():
    cpu = process.cpu_times()
    return cpu.user + cpu.system


def medir(preparar, ejecutar, despues=None):
    """Mide REPETICIONES ejecuciones, tras CALENTAMIENTO que no se cuentan.

    preparar() deja los datos listos y devuelve la petición; ejecutar(request)
    llama a la vista; despues() deshace lo que la ejecución haya cambiado.
    Devuelve los tiempos (s), el tiempo de CPU total (s) y el código de la
    última respuesta.
    """
    tiempos = []
    cpu_total = 0.0
    codigo = None

    for i in range(CALENTAMIENTO + REPETICIONES):
        request = preparar()
        cpu_antes = tiempo_cpu()
        inicio = time.perf_counter()

        respuesta = ejecutar(request)          # EJECUCIÓN REAL DEL REQUISITO

        duracion = time.perf_counter() - inicio
        cpu_usado = tiempo_cpu() - cpu_antes
        codigo = respuesta.status_code

        if i >= CALENTAMIENTO:
            tiempos.append(duracion)
            cpu_total += cpu_usado
        if despues:
            despues()

    return tiempos, cpu_total, codigo


def imprimir(requisito, descripcion, funcion, vg, tiempos, cpu_total, codigo):
    promedio = statistics.mean(tiempos)
    mediana = statistics.median(tiempos)
    uso_cpu = cpu_total / sum(tiempos) * 100

    memoria = process.memory_info().rss
    memoria_total = psutil.virtual_memory().total
    uso_memoria = memoria / memoria_total * 100

    print("\n========================================")
    print(f"MÉTRICAS DE {requisito}")
    print(descripcion)
    print("========================================")
    print(f"Función medida: {funcion}")
    print(f"Complejidad ciclomática V(G): {vg}")
    print(f"Respuesta de la vista: HTTP {codigo}")
    print(f"Peticiones medidas: {REPETICIONES} (tras {CALENTAMIENTO} de calentamiento)")
    print(f"Tiempo de respuesta promedio: {promedio * 1000:.3f} ms")
    print(f"Tiempo de respuesta mediana: {mediana * 1000:.3f} ms")
    print(f"Uso CPU: {uso_cpu:.2f}%")
    print(f"Memoria del proceso: {memoria / 1024 ** 2:.1f} MiB de {memoria_total / 1024 ** 3:.3f} GiB")
    print(f"Uso de memoria: {uso_memoria:.2f}%")

    return {"requisito": requisito, "promedio_ms": promedio * 1000,
            "cpu": uso_cpu, "memoria": uso_memoria}


# ============================================================
# DATOS DE LA MEDICIÓN
# ============================================================

def hora_de_bloque_iniciado():
    """Hora del último bloque que ya empezó hoy (RN12), o 06:00 si ninguno."""
    ahora = db_module.hora_local()
    iniciados = [inicio for _, inicio, _ in db_module.BLOQUES_HORARIOS
                 if (ahora.hour, ahora.minute) >= tuple(int(x) for x in inicio.split(":"))]
    return iniciados[-1] if iniciados else "06:00"


def preparar_base(db):
    """Crea en la base de las métricas los usuarios, bloques y datos del día."""
    db_module.seed_slots()
    ahora = db_module.ahora_utc()
    password = db_module.hash_password(DOC_ESTUDIANTE)
    db.users.insert_many([
        {"name": "Estudiante Métricas", "email": ESTUDIANTE, "documento": DOC_ESTUDIANTE,
         "password": password, "role": "ESTUDIANTE", "estado": "ACTIVO",
         "no_show_count": 0, "created_at": ahora},
        {"name": "Entrenador Métricas", "email": ENTRENADOR, "documento": "9990000002",
         "password": password, "role": "ENTRENADOR", "estado": "ACTIVO", "created_at": ahora},
        {"name": "Admin Métricas", "email": ADMIN, "documento": "9990000003",
         "password": password, "role": "ADMIN", "estado": "ACTIVO",
         "es_principal": True, "created_at": ahora},
    ])
    # Mensajes para que el buzón (RF21) no esté vacío.
    db.suggestions.insert_many([
        {"autor_email": ESTUDIANTE, "autor_nombre": "Estudiante Métricas",
         "mensaje": f"Mensaje de prueba {i}", "created_at": ahora - timedelta(minutes=i)}
        for i in range(5)
    ])


def nueva_reserva(db, hour, estado="ACTIVA"):
    hoy = db_module.hoy_local().isoformat()
    slot = next(s for s, inicio, _ in db_module.BLOQUES_HORARIOS if inicio == hour)
    return db.reservations.insert_one({
        "email": ESTUDIANTE, "slotId": slot, "hour": hour, "reserva_date": hoy,
        "date": db_module.formato_fecha_es(db_module.hoy_local()), "estado": estado,
        "created_at": db_module.ahora_utc(),
    }).inserted_id


# ============================================================
# FUNCIONES PARA MEDIR CADA REQUISITO
# ============================================================

def medir_rf11(db):
    hour = hora_de_bloque_iniciado()
    rid = nueva_reserva(db, hour)

    def preparar():
        db.reservations.update_one({"_id": rid}, {"$set": {"estado": "ACTIVA"}})
        return factory.post("/api/attendance/register/",
                            {"actor_email": ENTRENADOR, "reservation_id": str(rid)},
                            format="json")

    resultado = medir(preparar, attendance.registrar_asistencia)
    db.reservations.delete_one({"_id": rid})
    return imprimir("RF11", "Registrar la asistencia de un estudiante",
                    "registrar_asistencia (backend/api/attendance.py)", 9, *resultado)


def medir_rf12(db):
    ids = [nueva_reserva(db, h) for h in ("06:00", "08:00", "10:00")]
    resultado = medir(
        lambda: factory.get("/api/attendance/pending/", {"actor_email": ENTRENADOR}),
        attendance.consultar_reservas,
    )
    db.reservations.delete_many({"_id": {"$in": ids}})
    return imprimir("RF12", "Consultar las reservas sin asistencia registrada",
                    "consultar_reservas (backend/api/attendance.py)", 3, *resultado)


def medir_rf13(db):
    # Cada cierre procesa una reserva pendiente y deja al estudiante en cero,
    # para medir siempre el mismo recorrido (una inasistencia, sin penalizar).
    rid = nueva_reserva(db, "06:00")

    def preparar():
        db.reservations.update_one({"_id": rid}, {"$set": {"estado": "ACTIVA"}})
        db.users.update_one({"email": ESTUDIANTE},
                            {"$set": {"no_show_count": 0, "estado": "ACTIVO"}})
        return factory.post("/api/attendance/process/", {"actor_email": ENTRENADOR}, format="json")

    resultado = medir(preparar, attendance.procesar_inasistencia)
    db.reservations.delete_one({"_id": rid})
    db.users.update_one({"email": ESTUDIANTE}, {"$set": {"no_show_count": 0}})
    return imprimir("RF13", "Procesar las inasistencias al cerrar la jornada",
                    "procesar_inasistencia (backend/api/attendance.py)", 7, *resultado)


def medir_rf16(db):
    ids = [nueva_reserva(db, "06:00", "COMPLETADA"), nueva_reserva(db, "08:00", "NO_SHOW"),
           nueva_reserva(db, "10:00", "CANCELADA")]
    resultado = medir(
        lambda: factory.get("/api/reports/daily/entrenador/", {"actor_email": ENTRENADOR}),
        attendance.ver_registro_entrenador,
    )
    db.reservations.delete_many({"_id": {"$in": ids}})
    return imprimir("RF16", "Ver el registro diario (entrenador)",
                    "ver_registro_entrenador (backend/api/attendance.py)", 4, *resultado)


def medir_rf20(db):
    def borrar_enviados():
        db.suggestions.delete_many({"mensaje": "Reporte de la medición RF20"})

    resultado = medir(
        lambda: factory.post("/api/suggestions/",
                             {"email": ESTUDIANTE, "mensaje": "Reporte de la medición RF20"},
                             format="json"),
        features.fallo_sugerencia,
        despues=borrar_enviados,
    )
    return imprimir("RF20", "Reportar una falla o enviar una sugerencia",
                    "fallo_sugerencia (backend/api/features.py)", 6, *resultado)


def medir_rf21_consultar(db):
    resultado = medir(
        lambda: factory.get("/api/suggestions/inbox/", {"actor_email": ADMIN}),
        features.consultar_buzon,
    )
    return imprimir("RF21 consultar_buzon", "Consultar el buzón de sugerencias",
                    "consultar_buzon (backend/api/features.py)", 3, *resultado)


def medir_rf21_eliminar(db):
    objetivo = {}

    def preparar():
        objetivo["id"] = db.suggestions.insert_one({
            "autor_email": ESTUDIANTE, "autor_nombre": "Estudiante Métricas",
            "mensaje": "Mensaje para borrar", "created_at": db_module.ahora_utc(),
        }).inserted_id
        return factory.delete(f"/api/suggestions/{objetivo['id']}/?actor_email={ADMIN}")

    resultado = medir(
        preparar,
        lambda request: features.eliminar_sugerencia(request, str(objetivo["id"])),
    )
    return imprimir("RF21 eliminar_sugerencia", "Borrar un mensaje ya atendido del buzón",
                    "eliminar_sugerencia (backend/api/features.py)", 4, *resultado)


# ============================================================
# EJECUCIÓN
# ============================================================

def conectar():
    if "--mongomock" in sys.argv:
        import mongomock
        db_module._client = mongomock.MongoClient(tz_aware=True)
        print("Base en memoria (mongomock): los tiempos no representan al servidor real.")
    db = db_module.get_db()
    try:
        db.client.admin.command("ping")
    except Exception as error:   # noqa: BLE001 — cualquier fallo de conexión
        sys.exit(f"No se pudo conectar a MongoDB en {settings.MONGO_URI}: {error}\n"
                 "Levanta el stack con `docker compose up -d` o usa --mongomock.")
    return db


if __name__ == "__main__":
    db = conectar()
    print("\n========================================")
    print("MÉTRICAS DE RENDIMIENTO — CAMILA")
    print(f"Base de datos de medición: {settings.MONGO_DB} (se borra al terminar)")
    print("========================================")

    db.client.drop_database(settings.MONGO_DB)
    preparar_base(db)
    try:
        resumen = [medir_rf11(db), medir_rf12(db), medir_rf13(db), medir_rf16(db),
                   medir_rf20(db), medir_rf21_consultar(db), medir_rf21_eliminar(db)]
    finally:
        db.client.drop_database(settings.MONGO_DB)

    print("\n========================================")
    print("RESUMEN")
    print("========================================")
    print(f"{'Requisito':<26}{'Tiempo (ms)':>12}{'CPU (%)':>10}{'Memoria (%)':>13}")
    for fila in resumen:
        print(f"{fila['requisito']:<26}{fila['promedio_ms']:>12.3f}{fila['cpu']:>10.2f}{fila['memoria']:>13.2f}")
    print("\nMEDICIÓN FINALIZADA")

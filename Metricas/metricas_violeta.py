#!/usr/bin/env python
import os
import sys
import time
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


# ============================================================
# INICIALIZAR DJANGO
# ============================================================

import django

django.setup()


# ============================================================
# IMPORTACIONES DEL PROYECTO
# ============================================================

from rest_framework.test import APIRequestFactory

from api import views
from api import features
# TODO: si ver_inasistencias vive en otro módulo (por ejemplo api.attendance),
# ajusta este import y la llamada dentro de medir_rf15().


# ============================================================
# CONFIGURACIÓN DE LAS MÉTRICAS
# ============================================================

REPETICIONES = 10

factory = APIRequestFactory()
process = psutil.Process(os.getpid())


# ============================================================
# DATOS DE PRUEBA (se crean una sola vez, antes de medir)
# ============================================================

ESTUDIANTE_EMAIL = "estudiante.metricas@soyudemedellin.edu.co"
ESTUDIANTE_DOC = "9990001"

PROFESOR_EMAIL = "entrenador.metricas@udem.edu.co"
PROFESOR_DOC = "9990002"

ADMIN_EMAIL = "admin.metricas@udemedellin.edu.co"
ADMIN_DOC = "9990003"


def preparar_datos():
    """Crea (o deja como estaban, si ya existen) los tres usuarios de prueba
    usando el propio registrar_cuenta, para que RF02/RF03/RF04/RF05/RF15
    tengan una cuenta real contra la cual responder."""

    db = views.get_db()

    for email, name, documento in (
        (ESTUDIANTE_EMAIL, "Estudiante Metricas", ESTUDIANTE_DOC),
        (PROFESOR_EMAIL, "Entrenador Metricas", PROFESOR_DOC),
        (ADMIN_EMAIL, "Admin Metricas", ADMIN_DOC),
    ):
        if db.users.find_one({"email": email}):
            continue

        data = {"name": name, "email": email, "documento": documento}
        request = factory.post("/api/register/", data, format="json")
        request.data = data
        views.registrar_cuenta(request)


# ============================================================
# FUNCIÓN PARA MEDIR RF01
# ============================================================

def medir_rf01():
    print("\n========================================")
    print("MÉTRICAS DE RF01")
    print("Registrar una cuenta")
    print("========================================")

    tiempos = []
    tiempos_cpu = []
    memorias = []

    db = views.get_db()
    email = "carga.metricas@soyudemedellin.edu.co"

    for i in range(REPETICIONES):

        # Limpieza: RF01 falla con 409 si el correo ya existe
        db.users.delete_many({"email": email})

        data = {
            "name": "Carga Metricas",
            "email": email,
            "documento": "9990099",
        }

        request = factory.post("/api/register/", data, format="json")
        request.data = data

        # Memoria antes
        memoria_antes = process.memory_info().rss

        # CPU antes
        cpu_antes = process.cpu_times()
        cpu_antes_total = cpu_antes.user + cpu_antes.system

        # Tiempo inicial
        inicio = time.perf_counter()

        # EJECUCIÓN REAL DEL RF01
        views.registrar_cuenta(request)

        # Tiempo final
        fin = time.perf_counter()

        # CPU después
        cpu_despues = process.cpu_times()
        cpu_despues_total = cpu_despues.user + cpu_despues.system

        # Memoria después
        memoria_despues = process.memory_info().rss

        # Cálculos
        tiempo = fin - inicio
        tiempo_cpu = cpu_despues_total - cpu_antes_total
        memoria = memoria_despues - memoria_antes

        tiempos.append(tiempo)
        tiempos_cpu.append(tiempo_cpu)
        memorias.append(memoria)

    # Limpieza final
    db.users.delete_many({"email": email})

    # Promedios
    tiempo_promedio = sum(tiempos) / len(tiempos)
    cpu_promedio = sum(tiempos_cpu) / len(tiempos_cpu)
    memoria_promedio = sum(memorias) / len(memorias)

    # CPU %
    uso_cpu = (cpu_promedio / tiempo_promedio) * 100

    # Memoria
    memoria_mb = memoria_promedio / (1024 * 1024)
    memoria_total_gb = psutil.virtual_memory().total / (1024 ** 3)
    memoria_total_mb = memoria_total_gb * 1024

    uso_memoria = (memoria_mb / memoria_total_mb) * 100

    print(f"Repeticiones: {REPETICIONES}")
    print(f"Tiempo promedio: {tiempo_promedio:.6f} segundos")
    print(f"Tiempo CPU promedio: {cpu_promedio:.6f} segundos")
    print(f"Uso CPU: {uso_cpu:.4f}%")
    print(f"Memoria utilizada: {memoria_mb:.4f} MB")
    print(f"Memoria total: {memoria_total_gb:.2f} GB")
    print(f"Uso de memoria: {uso_memoria:.6f}%")


# ============================================================
# FUNCIÓN PARA MEDIR RF02
# ============================================================

def medir_rf02():
    print("\n========================================")
    print("MÉTRICAS DE RF02")
    print("Iniciar sesión")
    print("========================================")

    tiempos = []
    tiempos_cpu = []
    memorias = []

    for i in range(REPETICIONES):

        data = {"email": ESTUDIANTE_EMAIL, "documento": ESTUDIANTE_DOC}

        request = factory.post("/api/login/", data, format="json")
        request.data = data

        # Memoria antes
        memoria_antes = process.memory_info().rss

        # CPU antes
        cpu_antes = process.cpu_times()
        cpu_antes_total = cpu_antes.user + cpu_antes.system

        # Tiempo inicial
        inicio = time.perf_counter()

        # EJECUCIÓN REAL DEL RF02
        views.iniciar_sesion(request)

        # Tiempo final
        fin = time.perf_counter()

        # CPU después
        cpu_despues = process.cpu_times()
        cpu_despues_total = cpu_despues.user + cpu_despues.system

        # Memoria después
        memoria_despues = process.memory_info().rss

        # Cálculos
        tiempo = fin - inicio
        tiempo_cpu = cpu_despues_total - cpu_antes_total
        memoria = memoria_despues - memoria_antes

        tiempos.append(tiempo)
        tiempos_cpu.append(tiempo_cpu)
        memorias.append(memoria)

    # Promedios
    tiempo_promedio = sum(tiempos) / len(tiempos)
    cpu_promedio = sum(tiempos_cpu) / len(tiempos_cpu)
    memoria_promedio = sum(memorias) / len(memorias)

    # CPU %
    uso_cpu = (cpu_promedio / tiempo_promedio) * 100

    # Memoria
    memoria_mb = memoria_promedio / (1024 * 1024)
    memoria_total_gb = psutil.virtual_memory().total / (1024 ** 3)
    memoria_total_mb = memoria_total_gb * 1024

    uso_memoria = (memoria_mb / memoria_total_mb) * 100

    print(f"Repeticiones: {REPETICIONES}")
    print(f"Tiempo promedio: {tiempo_promedio:.6f} segundos")
    print(f"Tiempo CPU promedio: {cpu_promedio:.6f} segundos")
    print(f"Uso CPU: {uso_cpu:.4f}%")
    print(f"Memoria utilizada: {memoria_mb:.4f} MB")
    print(f"Memoria total: {memoria_total_gb:.2f} GB")
    print(f"Uso de memoria: {uso_memoria:.6f}%")


# ============================================================
# FUNCIÓN PARA MEDIR RF03
# ============================================================

def medir_rf03():
    print("\n========================================")
    print("MÉTRICAS DE RF03")
    print("Consultar el perfil del estudiante")
    print("========================================")

    tiempos = []
    tiempos_cpu = []
    memorias = []

    for i in range(REPETICIONES):

        request = factory.get(
            "/api/profile/",
            {"email": ESTUDIANTE_EMAIL},
        )

        # RF03 usa request.query_params
        request.query_params = request.GET

        # Memoria antes
        memoria_antes = process.memory_info().rss

        # CPU antes
        cpu_antes = process.cpu_times()
        cpu_antes_total = cpu_antes.user + cpu_antes.system

        # Tiempo inicial
        inicio = time.perf_counter()

        # EJECUCIÓN REAL DEL RF03
        views.consultar_actualizar_perfil(request)

        # Tiempo final
        fin = time.perf_counter()

        # CPU después
        cpu_despues = process.cpu_times()
        cpu_despues_total = cpu_despues.user + cpu_despues.system

        # Memoria después
        memoria_despues = process.memory_info().rss

        # Cálculos
        tiempo = fin - inicio
        tiempo_cpu = cpu_despues_total - cpu_antes_total
        memoria = memoria_despues - memoria_antes

        tiempos.append(tiempo)
        tiempos_cpu.append(tiempo_cpu)
        memorias.append(memoria)

    # Promedios
    tiempo_promedio = sum(tiempos) / len(tiempos)
    cpu_promedio = sum(tiempos_cpu) / len(tiempos_cpu)
    memoria_promedio = sum(memorias) / len(memorias)

    # CPU %
    uso_cpu = (cpu_promedio / tiempo_promedio) * 100

    # Memoria
    memoria_mb = memoria_promedio / (1024 * 1024)
    memoria_total_gb = psutil.virtual_memory().total / (1024 ** 3)
    memoria_total_mb = memoria_total_gb * 1024

    uso_memoria = (memoria_mb / memoria_total_mb) * 100

    print(f"Repeticiones: {REPETICIONES}")
    print(f"Tiempo promedio: {tiempo_promedio:.6f} segundos")
    print(f"Tiempo CPU promedio: {cpu_promedio:.6f} segundos")
    print(f"Uso CPU: {uso_cpu:.4f}%")
    print(f"Memoria utilizada: {memoria_mb:.4f} MB")
    print(f"Memoria total: {memoria_total_gb:.2f} GB")
    print(f"Uso de memoria: {uso_memoria:.6f}%")


# ============================================================
# FUNCIÓN PARA MEDIR RF04
# ============================================================

def medir_rf04():
    print("\n========================================")
    print("MÉTRICAS DE RF04")
    print("Consultar el perfil del entrenador")
    print("========================================")

    tiempos = []
    tiempos_cpu = []
    memorias = []

    for i in range(REPETICIONES):

        request = factory.get(
            "/api/entrenador/",
            {"email": PROFESOR_EMAIL},
        )

        # RF04 usa request.query_params
        request.query_params = request.GET

        # Memoria antes
        memoria_antes = process.memory_info().rss

        # CPU antes
        cpu_antes = process.cpu_times()
        cpu_antes_total = cpu_antes.user + cpu_antes.system

        # Tiempo inicial
        inicio = time.perf_counter()

        # EJECUCIÓN REAL DEL RF04
        views.consultar_entrenador(request)

        # Tiempo final
        fin = time.perf_counter()

        # CPU después
        cpu_despues = process.cpu_times()
        cpu_despues_total = cpu_despues.user + cpu_despues.system

        # Memoria después
        memoria_despues = process.memory_info().rss

        # Cálculos
        tiempo = fin - inicio
        tiempo_cpu = cpu_despues_total - cpu_antes_total
        memoria = memoria_despues - memoria_antes

        tiempos.append(tiempo)
        tiempos_cpu.append(tiempo_cpu)
        memorias.append(memoria)

    # Promedios
    tiempo_promedio = sum(tiempos) / len(tiempos)
    cpu_promedio = sum(tiempos_cpu) / len(tiempos_cpu)
    memoria_promedio = sum(memorias) / len(memorias)

    # CPU %
    uso_cpu = (cpu_promedio / tiempo_promedio) * 100

    # Memoria
    memoria_mb = memoria_promedio / (1024 * 1024)
    memoria_total_gb = psutil.virtual_memory().total / (1024 ** 3)
    memoria_total_mb = memoria_total_gb * 1024

    uso_memoria = (memoria_mb / memoria_total_mb) * 100

    print(f"Repeticiones: {REPETICIONES}")
    print(f"Tiempo promedio: {tiempo_promedio:.6f} segundos")
    print(f"Tiempo CPU promedio: {cpu_promedio:.6f} segundos")
    print(f"Uso CPU: {uso_cpu:.4f}%")
    print(f"Memoria utilizada: {memoria_mb:.4f} MB")
    print(f"Memoria total: {memoria_total_gb:.2f} GB")
    print(f"Uso de memoria: {uso_memoria:.6f}%")


# ============================================================
# FUNCIÓN PARA MEDIR RF05
# ============================================================

def medir_rf05():
    print("\n========================================")
    print("MÉTRICAS DE RF05")
    print("Consultar el perfil del administrador")
    print("========================================")

    tiempos = []
    tiempos_cpu = []
    memorias = []

    for i in range(REPETICIONES):

        request = factory.get(
            "/api/administrador/",
            {"email": ADMIN_EMAIL},
        )

        # RF05 usa request.query_params
        request.query_params = request.GET

        # Memoria antes
        memoria_antes = process.memory_info().rss

        # CPU antes
        cpu_antes = process.cpu_times()
        cpu_antes_total = cpu_antes.user + cpu_antes.system

        # Tiempo inicial
        inicio = time.perf_counter()

        # EJECUCIÓN REAL DEL RF05
        views.consultar_administrador(request)

        # Tiempo final
        fin = time.perf_counter()

        # CPU después
        cpu_despues = process.cpu_times()
        cpu_despues_total = cpu_despues.user + cpu_despues.system

        # Memoria después
        memoria_despues = process.memory_info().rss

        # Cálculos
        tiempo = fin - inicio
        tiempo_cpu = cpu_despues_total - cpu_antes_total
        memoria = memoria_despues - memoria_antes

        tiempos.append(tiempo)
        tiempos_cpu.append(tiempo_cpu)
        memorias.append(memoria)

    # Promedios
    tiempo_promedio = sum(tiempos) / len(tiempos)
    cpu_promedio = sum(tiempos_cpu) / len(tiempos_cpu)
    memoria_promedio = sum(memorias) / len(memorias)

    # CPU %
    uso_cpu = (cpu_promedio / tiempo_promedio) * 100

    # Memoria
    memoria_mb = memoria_promedio / (1024 * 1024)
    memoria_total_gb = psutil.virtual_memory().total / (1024 ** 3)
    memoria_total_mb = memoria_total_gb * 1024

    uso_memoria = (memoria_mb / memoria_total_mb) * 100

    print(f"Repeticiones: {REPETICIONES}")
    print(f"Tiempo promedio: {tiempo_promedio:.6f} segundos")
    print(f"Tiempo CPU promedio: {cpu_promedio:.6f} segundos")
    print(f"Uso CPU: {uso_cpu:.4f}%")
    print(f"Memoria utilizada: {memoria_mb:.4f} MB")
    print(f"Memoria total: {memoria_total_gb:.2f} GB")
    print(f"Uso de memoria: {uso_memoria:.6f}%")


# ============================================================
# FUNCIÓN PARA MEDIR RF15
# ============================================================

def medir_rf15():
    print("\n========================================")
    print("MÉTRICAS DE RF15")
    print("Ver mi reporte de inasistencias")
    print("========================================")

    tiempos = []
    tiempos_cpu = []
    memorias = []

    for i in range(REPETICIONES):

        request = factory.get(
            "/api/inasistencias/",
            {"email": ESTUDIANTE_EMAIL},
        )

        # RF15 usa request.query_params
        request.query_params = request.GET

        # Memoria antes
        memoria_antes = process.memory_info().rss

        # CPU antes
        cpu_antes = process.cpu_times()
        cpu_antes_total = cpu_antes.user + cpu_antes.system

        # Tiempo inicial
        inicio = time.perf_counter()

        # EJECUCIÓN REAL DEL RF15
        features.ver_inasistencias(request)

        # Tiempo final
        fin = time.perf_counter()

        # CPU después
        cpu_despues = process.cpu_times()
        cpu_despues_total = cpu_despues.user + cpu_despues.system

        # Memoria después
        memoria_despues = process.memory_info().rss

        # Cálculos
        tiempo = fin - inicio
        tiempo_cpu = cpu_despues_total - cpu_antes_total
        memoria = memoria_despues - memoria_antes

        tiempos.append(tiempo)
        tiempos_cpu.append(tiempo_cpu)
        memorias.append(memoria)

    # Promedios
    tiempo_promedio = sum(tiempos) / len(tiempos)
    cpu_promedio = sum(tiempos_cpu) / len(tiempos_cpu)
    memoria_promedio = sum(memorias) / len(memorias)

    # CPU %
    uso_cpu = (cpu_promedio / tiempo_promedio) * 100

    # Memoria
    memoria_mb = memoria_promedio / (1024 * 1024)
    memoria_total_gb = psutil.virtual_memory().total / (1024 ** 3)
    memoria_total_mb = memoria_total_gb * 1024

    uso_memoria = (memoria_mb / memoria_total_mb) * 100

    print(f"Repeticiones: {REPETICIONES}")
    print(f"Tiempo promedio: {tiempo_promedio:.6f} segundos")
    print(f"Tiempo CPU promedio: {cpu_promedio:.6f} segundos")
    print(f"Uso CPU: {uso_cpu:.4f}%")
    print(f"Memoria utilizada: {memoria_mb:.4f} MB")
    print(f"Memoria total: {memoria_total_gb:.2f} GB")
    print(f"Uso de memoria: {uso_memoria:.6f}%")


# ============================================================
# EJECUCIÓN
# ============================================================

if __name__ == "__main__":

    print("\n========================================")
    print("MÉTRICAS DE RENDIMIENTO")
    print("========================================")

    preparar_datos()

    medir_rf01()
    medir_rf02()
    medir_rf03()
    medir_rf04()
    medir_rf05()
    medir_rf15()

    print("\n========================================")
    print("MEDICIÓN FINALIZADA")
    print("========================================")
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
from api import attendance
from api import features


# ============================================================
# CONFIGURACIÓN DE LAS MÉTRICAS
# ============================================================

REPETICIONES = 10

factory = APIRequestFactory()
process = psutil.Process(os.getpid())


# ============================================================
# FUNCIÓN PARA MEDIR RF06
# ============================================================

def medir_rf06():
    print("\n========================================")
    print("MÉTRICAS DE RF06")
    print("Consultar los bloques horarios con sus cupos")
    print("========================================")

    tiempos = []
    tiempos_cpu = []
    memorias = []

    for i in range(REPETICIONES):

        request = factory.get("/api/horarios/")

        # Memoria antes de ejecutar el requisito
        memoria_antes = process.memory_info().rss

        # CPU antes
        cpu_antes = process.cpu_times()
        cpu_antes_total = cpu_antes.user + cpu_antes.system

        # Tiempo inicial
        inicio = time.perf_counter()

        # EJECUCIÓN REAL DEL REQUISITO RF06
        views.consultar_horarios(request)

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
# FUNCIÓN PARA MEDIR RF07
# ============================================================

def medir_rf07():
    print("\n========================================")
    print("MÉTRICAS DE RF07")
    print("Reservar un bloque para el día siguiente")
    print("========================================")

    tiempos = []
    tiempos_cpu = []
    memorias = []

    # Datos usados para realizar la reserva
    email = "estudiante@udem.edu.co"
    slot_id = 1

    # Base de datos
    db = views.get_db()

    for i in range(REPETICIONES):

    # ----------------------------------------------------
    # LIMPIEZA
    # ----------------------------------------------------
     db.reservations.delete_many({
        "email": email
    })

    data = {
        "email": email,
        "slotId": slot_id
    }

    request = factory.post(
        "/api/reservations/",
        data,
        format="json"
    )

    request.data = data

    # Memoria antes
    memoria_antes = process.memory_info().rss

    # CPU antes
    cpu_antes = process.cpu_times()
    cpu_antes_total = cpu_antes.user + cpu_antes.system

    # Tiempo inicial
    inicio = time.perf_counter()

    # EJECUCIÓN REAL DEL RF07
    views.reservar_mañana(request)

    # Tiempo final
    fin = time.perf_counter()

    # CPU después
    cpu_despues = process.cpu_times()
    cpu_despues_total = cpu_despues.user + cpu_despues.system

    # Memoria después
    memoria_despues = process.memory_info().rss

    tiempo = fin - inicio
    tiempo_cpu = cpu_despues_total - cpu_antes_total
    memoria = memoria_despues - memoria_antes

    tiempos.append(tiempo)
    tiempos_cpu.append(tiempo_cpu)
    memorias.append(memoria)

    # Limpieza
    db.reservations.delete_many({
        "email": email
    })

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
# FUNCIÓN PARA MEDIR RF08
# ============================================================

def medir_rf08():
    print("\n========================================")
    print("MÉTRICAS DE RF08")
    print("Consultar mi reserva vigente")
    print("========================================")

    tiempos = []
    tiempos_cpu = []
    memorias = []

    # Correo usado para consultar la reserva
    email = "estudiante@udem.edu.co"

    for i in range(REPETICIONES):

        request = factory.get(
            "/api/reservations/",
            {"email": email}
        )

        # RF08 se ejecuta directamente y necesita query_params
        request.query_params = request.GET

        # Memoria antes
        memoria_antes = process.memory_info().rss

        # CPU antes
        cpu_antes = process.cpu_times()
        cpu_antes_total = cpu_antes.user + cpu_antes.system

        # Tiempo inicial
        inicio = time.perf_counter()

        # EJECUCIÓN REAL DEL RF08
        views.consultar_reserva(request)

        # Tiempo final
        fin = time.perf_counter()

        # CPU después
        cpu_despues = process.cpu_times()
        cpu_despues_total = cpu_despues.user + cpu_despues.system

        # Memoria después
        memoria_despues = process.memory_info().rss

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
    
def medir_rf09():
    print("\n========================================")
    print("MÉTRICAS DE RF09")
    print("Cancelar mi reserva vigente")
    print("========================================")

    tiempos = []
    tiempos_cpu = []
    memorias = []

    db = views.get_db()

    # Buscar una reserva activa para usarla en la prueba
    reserva_base = db.reservations.find_one({"estado": "ACTIVA"})

    if not reserva_base:
        print("No se encontró una reserva activa para medir RF09.")
        return

    reservation_id = str(reserva_base["_id"])
    reserva_date = reserva_base["reserva_date"]
    slot_id = reserva_base["slotId"]

    for i in range(REPETICIONES):

        # Asegurar que la reserva esté activa antes de medir
        db.reservations.update_one(
            {"_id": reserva_base["_id"]},
            {"$set": {"estado": "ACTIVA"}}
        )

        # Preparar la solicitud
        request = factory.delete(
            f"/api/reservations/{reservation_id}/"
        )

        memoria_antes = process.memory_info().rss

        cpu_antes = process.cpu_times()
        cpu_antes_total = cpu_antes.user + cpu_antes.system

        inicio = time.perf_counter()

        views.cancelar_reserva(request, reservation_id)

        fin = time.perf_counter()

        cpu_despues = process.cpu_times()
        cpu_despues_total = cpu_despues.user + cpu_despues.system

        memoria_despues = process.memory_info().rss

        tiempo = fin - inicio
        tiempo_cpu = cpu_despues_total - cpu_antes_total
        memoria = memoria_despues - memoria_antes

        tiempos.append(tiempo)
        tiempos_cpu.append(tiempo_cpu)
        memorias.append(memoria)

        # Restaurar el cupo que devolver_cupo() acaba de liberar
        db.disponibilidad.update_one(
            {"fecha": reserva_date, "slotId": slot_id},
            {"$inc": {"cupos_disponibles": -1}}
        )

    tiempo_promedio = sum(tiempos) / len(tiempos)
    cpu_promedio = sum(tiempos_cpu) / len(tiempos_cpu)
    memoria_promedio = sum(memorias) / len(memorias)

    uso_cpu = (cpu_promedio / tiempo_promedio) * 100

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

    # Dejar la reserva nuevamente activa al terminar
    db.reservations.update_one(
        {"_id": reserva_base["_id"]},
        {"$set": {"estado": "ACTIVA"}}
    )
    
# ============================================================
# FUNCIÓN PARA MEDIR RF10
# ============================================================

def medir_rf10():
    print("\n========================================")
    print("MÉTRICAS DE RF10")
    print("Buscar reserva de estudiante por documento")
    print("========================================")

    tiempos = []
    tiempos_cpu = []
    memorias = []

    db = views.get_db()

    # Datos de prueba
    staff = {
        "email": "coach@udem.edu.co",
        "role": "ENTRENADOR"
    }

    student = {
        "name": "Juan Perez",
        "email": "student@udem.edu.co",
        "documento": "1001234567",
        "role": "ESTUDIANTE",
        "estado": "ACTIVO",
        "no_show_count": 0
    }

    reserva = {
        "_id": "reserva-test",
        "slotId": 1,
        "hour": "06:00",
        "date": "15/09/2026",
        "reserva_date": "2026-09-15",
        "estado": "ACTIVA"
    }

    # Guardar métodos originales
    users_find_one_original = db.users.find_one
    reservations_find_original = db.reservations.find

    for i in range(REPETICIONES):

        # Simular las búsquedas de usuario
        resultados_usuario = [staff, student]

        db.users.find_one = lambda *args, _resultados=resultados_usuario, **kwargs: _resultados.pop(0)

        # Simular las reservas
        class ReservasMock:
            def sort(self, *args, **kwargs):
                return [reserva]

        db.reservations.find = lambda *args, **kwargs: ReservasMock()

        # Crear solicitud
        request = factory.get(
            "/api/students/lookup/",
            {
                "documento": "1001234567",
                "actor_email": "coach@udem.edu.co"
            }
        )

        # Memoria antes
        memoria_antes = process.memory_info().rss

        # CPU antes
        cpu_antes = process.cpu_times()
        cpu_antes_total = cpu_antes.user + cpu_antes.system

        # Tiempo inicial
        inicio = time.perf_counter()

        # EJECUCIÓN REAL DEL RF10
        attendance.buscar_reserva(request)

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

    # Restaurar métodos originales
    db.users.find_one = users_find_one_original
    db.reservations.find = reservations_find_original

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
# FUNCIÓN PARA MEDIR RF14
# ============================================================

def medir_rf14():
    print("\n========================================")
    print("MÉTRICAS DE RF14")
    print("Consultar historial de entrenamiento")
    print("========================================")

    tiempos = []
    tiempos_cpu = []
    memorias = []

    email = "estudiante@udem.edu.co"

    for i in range(REPETICIONES):

        request = factory.get(
            "/api/historial/",
            {
                "email": email
            }
        )

        # RF14 utiliza request.query_params
        request.query_params = request.GET

        # Memoria antes
        memoria_antes = process.memory_info().rss

        # CPU antes
        cpu_antes = process.cpu_times()
        cpu_antes_total = cpu_antes.user + cpu_antes.system

        # Tiempo inicial
        inicio = time.perf_counter()

        # EJECUCIÓN REAL DEL RF14
        features.ver_historial(request)

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

    medir_rf06()
    medir_rf07()
    medir_rf08()
    medir_rf09()
    medir_rf10()
    medir_rf14()
    
        
    print("\n========================================")
    print("MEDICIÓN FINALIZADA")
    print("========================================")
    
    
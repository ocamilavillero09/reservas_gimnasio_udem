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
# MEDICIÓN COMÚN A TODOS LOS REQUISITOS
# ============================================================

def encabezado(requisito, descripcion):
    print("\n========================================")
    print(f"MÉTRICAS DE {requisito}")
    print(descripcion)
    print("========================================")


def tiempo_cpu_total():
    cpu = process.cpu_times()
    return cpu.user + cpu.system


def medir_ejecucion(ejecutar):
    """Ejecuta el requisito una vez y devuelve (tiempo, tiempo de CPU, memoria)."""
    memoria_antes = process.memory_info().rss
    cpu_antes = tiempo_cpu_total()
    inicio = time.perf_counter()

    # EJECUCIÓN REAL DEL REQUISITO
    ejecutar()

    fin = time.perf_counter()
    cpu_despues = tiempo_cpu_total()
    memoria_despues = process.memory_info().rss

    return fin - inicio, cpu_despues - cpu_antes, memoria_despues - memoria_antes


def medir_repeticiones(preparar, ejecutar, despues=None):
    """Repite la medición REPETICIONES veces.

    preparar() deja los datos listos y devuelve la solicitud; ejecutar(request)
    llama al requisito; despues() limpia lo que haya cambiado la ejecución.
    """
    tiempos, tiempos_cpu, memorias = [], [], []

    for _ in range(REPETICIONES):
        request = preparar()
        tiempo, tiempo_cpu, memoria = medir_ejecucion(lambda: ejecutar(request))

        tiempos.append(tiempo)
        tiempos_cpu.append(tiempo_cpu)
        memorias.append(memoria)

        if despues:
            despues()

    return tiempos, tiempos_cpu, memorias


def imprimir_resultados(tiempos, tiempos_cpu, memorias):
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


def consulta_con_email(ruta, email):
    """GET con ?email=, con query_params puestos: la vista se llama directamente."""
    request = factory.get(ruta, {"email": email})
    request.query_params = request.GET
    return request


# ============================================================
# FUNCIÓN PARA MEDIR RF06
# ============================================================

def medir_rf06():
    encabezado("RF06", "Consultar los bloques horarios con sus cupos")

    resultados = medir_repeticiones(
        preparar=lambda: factory.get("/api/horarios/"),
        ejecutar=views.consultar_horarios,
    )
    imprimir_resultados(*resultados)


# ============================================================
# FUNCIÓN PARA MEDIR RF07
# ============================================================

def medir_rf07():
    encabezado("RF07", "Reservar un bloque para el día siguiente")

    # Datos usados para realizar la reserva
    email = "estudiante@udem.edu.co"
    slot_id = 1

    db = views.get_db()

    def limpiar():
        db.reservations.delete_many({"email": email})

    def preparar():
        limpiar()
        data = {"email": email, "slotId": slot_id}
        request = factory.post("/api/reservations/", data, format="json")
        request.data = data
        return request

    resultados = medir_repeticiones(preparar, views.reservar_mañana, despues=limpiar)
    imprimir_resultados(*resultados)


# ============================================================
# FUNCIÓN PARA MEDIR RF08
# ============================================================

def medir_rf08():
    encabezado("RF08", "Consultar mi reserva vigente")

    resultados = medir_repeticiones(
        preparar=lambda: consulta_con_email("/api/reservations/", "estudiante@udem.edu.co"),
        ejecutar=views.consultar_reserva,
    )
    imprimir_resultados(*resultados)


# ============================================================
# FUNCIÓN PARA MEDIR RF09
# ============================================================

def medir_rf09():
    encabezado("RF09", "Cancelar mi reserva vigente")

    db = views.get_db()

    # Buscar una reserva activa para usarla en la prueba
    reserva_base = db.reservations.find_one({"estado": "ACTIVA"})

    if not reserva_base:
        print("No se encontró una reserva activa para medir RF09.")
        return

    reservation_id = str(reserva_base["_id"])

    def activar_reserva():
        db.reservations.update_one(
            {"_id": reserva_base["_id"]},
            {"$set": {"estado": "ACTIVA"}}
        )

    def preparar():
        # Asegurar que la reserva esté activa antes de medir
        activar_reserva()
        return factory.delete(f"/api/reservations/{reservation_id}/")

    def restaurar_cupo():
        # Restaurar el cupo que devolver_cupo() acaba de liberar
        db.disponibilidad.update_one(
            {"fecha": reserva_base["reserva_date"], "slotId": reserva_base["slotId"]},
            {"$inc": {"cupos_disponibles": -1}}
        )

    resultados = medir_repeticiones(
        preparar,
        lambda request: views.cancelar_reserva(request, reservation_id),
        despues=restaurar_cupo,
    )
    imprimir_resultados(*resultados)

    # Dejar la reserva nuevamente activa al terminar
    activar_reserva()


# ============================================================
# FUNCIÓN PARA MEDIR RF10
# ============================================================

def medir_rf10():
    encabezado("RF10", "Buscar reserva de estudiante por documento")

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

    class ReservasMock:
        def sort(self, *args, **kwargs):
            return [reserva]

    # Guardar métodos originales
    users_find_one_original = db.users.find_one
    reservations_find_original = db.reservations.find

    def preparar():
        # Simular las búsquedas de usuario y las reservas
        resultados_usuario = [staff, student]
        db.users.find_one = lambda *args, _resultados=resultados_usuario, **kwargs: _resultados.pop(0)
        db.reservations.find = lambda *args, **kwargs: ReservasMock()

        return factory.get(
            "/api/students/lookup/",
            {
                "documento": "1001234567",
                "actor_email": "coach@udem.edu.co"
            }
        )

    resultados = medir_repeticiones(preparar, attendance.buscar_reserva)

    # Restaurar métodos originales
    db.users.find_one = users_find_one_original
    db.reservations.find = reservations_find_original

    imprimir_resultados(*resultados)


# ============================================================
# FUNCIÓN PARA MEDIR RF14
# ============================================================

def medir_rf14():
    encabezado("RF14", "Consultar historial de entrenamiento")

    resultados = medir_repeticiones(
        preparar=lambda: consulta_con_email("/api/historial/", "estudiante@udem.edu.co"),
        ejecutar=features.ver_historial,
    )
    imprimir_resultados(*resultados)


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

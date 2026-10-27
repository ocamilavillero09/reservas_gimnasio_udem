from screenpy import Actor, See
from screenpy.resolutions import IsEqualTo
from screenplay.tasks.registrar_cuenta import RegistrarCuenta
from screenplay.tasks.consultar_horarios import ConsultarHorarios
from screenplay.tasks.reservar_horario import ReservarHorario
from screenplay.tasks.consultar_reservas import ConsultarReservas
from screenplay.tasks.cancelar_reserva import CancelarReserva
from screenplay.tasks.buscar_estudiante import BuscarEstudiante
from screenplay.tasks.consultar_historial import ConsultarHistorial
from datetime import datetime, timedelta, timezone
from zoneinfo import ZoneInfo
import os

import pytest
import requests
from bson import ObjectId
from pymongo import MongoClient
from screenplay.abilities.iniciar_sesion_en_la_api import IniciarSesionEnLaApi

def fecha_de_reserva():
    # Misma regla que la API (RN03/RN04): el día siguiente en America/Bogota.
    return (datetime.now(ZoneInfo("America/Bogota")) + timedelta(days=1)).date().isoformat()

def asegurar_jornada():
    # GET /api/slots/ crea la disponibilidad del día siguiente si todavía no existe.
    requests.get("http://localhost:8000/api/slots/", timeout=10).raise_for_status()

MONGO_URI = os.environ.get("MONGO_URI", "mongodb://localhost:27017")
MONGO_DB = os.environ.get("MONGO_DB", "gym_udem")
URL_API = "http://localhost:8000/api"

# Cuentas de prueba (las mismas de seed_e2e.js y de los pasos de Serenity/JS).
CUENTAS = {
    "e2e1": {"name": "Estudiante E2E Uno", "email": "1@soyudemedellin.edu.co", "documento": "1111111111"},
    "e2e2": {"name": "Estudiante E2E Dos", "email": "es@soyudemedellin.edu.co", "documento": "2222222222"},
    "penalizacion": {
        "name": "Estudiante E2E Penalizacion",
        "email": "prueba.e2e.penalizacion@soyudemedellin.edu.co",
        "documento": "3333333333",
    },
    "entrenador": {"name": "Entrenador E2E", "email": "3@udem.edu.co", "documento": "4444444444"},
}
RESERVA_CANCELADA_SEED = "6ac81dc345b1dd6d13b418da"


def base_de_datos():
    cliente = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
    return cliente, cliente[MONGO_DB]


def actor_con_sesion(nombre, cuenta):
    # La API exige el token de sesión: el actor inicia sesión con su cuenta.
    datos = CUENTAS[cuenta]
    return Actor.named(nombre).who_can(IniciarSesionEnLaApi.como(datos["email"], datos["documento"]))


@pytest.fixture(autouse=True)
def preparar_datos():
    # Cada prueba parte del mismo estado: cuentas registradas, sin reservas
    # activas, sin penalización y con la reserva ya cancelada de seed_e2e.js.
    for datos in CUENTAS.values():
        respuesta = requests.post(f"{URL_API}/auth/register/", json=datos, timeout=10)
        assert respuesta.status_code in (201, 409), respuesta.text

    correos = [datos["email"] for datos in CUENTAS.values()]
    cliente, db = base_de_datos()
    try:
        for reserva in db.reservations.find({"email": {"$in": correos}, "estado": "ACTIVA"}):
            db.disponibilidad.update_one(
                {"fecha": reserva["reserva_date"], "slotId": reserva["slotId"]},
                {"$inc": {"cupos_disponibles": 1}},
            )
        db.reservations.delete_many({"email": {"$in": correos}, "estado": "ACTIVA"})
        db.users.update_many(
            {"email": {"$in": correos}},
            {"$set": {"estado": "ACTIVO", "penalizado_hasta": None, "no_show_count": 0}},
        )
        db.login_intentos.delete_many({"email": {"$in": correos}})
        ayer = (datetime.now(ZoneInfo("America/Bogota")) - timedelta(days=1)).date().isoformat()
        ahora = datetime.now(timezone.utc)
        db.reservations.replace_one(
            {"_id": ObjectId(RESERVA_CANCELADA_SEED)},
            {
                "email": CUENTAS["e2e1"]["email"], "slotId": 1, "hour": "06:00",
                "reserva_date": ayer, "date": ayer, "estado": "CANCELADA",
                "created_by": CUENTAS["e2e1"]["email"], "created_at": ahora, "cancelled_at": ahora,
            },
            upsert=True,
        )
    finally:
        cliente.close()
    yield


def consultar_cupos(fecha, slot_id):
    asegurar_jornada()
    cliente, db = base_de_datos()
    try:
        return db.disponibilidad.find_one({"fecha": fecha, "slotId": slot_id})["cupos_disponibles"]
    finally:
        cliente.close()


def preparar_penalizacion(email, dias):
    cliente, db = base_de_datos()
    try:
        db.users.update_one(
            {"email": email},
            {"$set": {"estado": "PENALIZADO", "penalizado_hasta": datetime.now(timezone.utc) + timedelta(days=dias)}},
        )
    finally:
        cliente.close()


def poner_cupos(fecha, slot_id, cupos):
    cliente, db = base_de_datos()
    try:
        db.disponibilidad.update_one({"fecha": fecha, "slotId": slot_id}, {"$set": {"cupos_disponibles": cupos}})
    finally:
        cliente.close()

URL_REGISTRO = "http://localhost:8000/api/auth/register/"


def test_registro_rechaza_campos_vacios(): #RF01
    actor = Actor.named("Estudiante")

    tarea = RegistrarCuenta.en(URL_REGISTRO)
    actor.attempts_to(tarea)

    respuesta = tarea.respuesta

    assert respuesta is not None
    actor.should(
        See.the(respuesta.status_code, IsEqualTo(400))
    )


URL = "http://localhost:8000/api/slots/"


def test_consultar_horarios_gimnasio(): #RF06
    actor = Actor.named("Estudiante")

    tarea = ConsultarHorarios.en(URL)
    actor.attempts_to(tarea)

    respuesta = tarea.respuesta
    assert respuesta is not None
    assert respuesta.status_code == 200

    datos = respuesta.json()

    actor.should(
        See.the(len(datos["slots"]), IsEqualTo(6))
    )

    for horario in datos["slots"]:
        assert "available" in horario
        assert "total" in horario
        assert horario["available"] >= 0
        assert horario["total"] > 0
        

def test_consultar_horarios_no_incluye_bloques_fuera_del_catalogo():  # RF06
    actor = Actor.named("Estudiante")

    tarea = ConsultarHorarios.en(
        "http://localhost:8000/api/slots/"
    )
    actor.attempts_to(tarea)

    respuesta = tarea.respuesta
    assert respuesta is not None
    assert respuesta.status_code == 200

    datos = respuesta.json()
    assert "slots" in datos
    assert all(horario["id"] != 99 for horario in datos["slots"])

        
def test_reserva_rechaza_datos_obligatorios_vacios(): #RF07
    actor = actor_con_sesion("Estudiante", "e2e1")

    tarea = ReservarHorario.en(
        "http://localhost:8000/api/reservations/"
    )
    actor.attempts_to(tarea)

    respuesta = tarea.respuesta

    assert respuesta is not None
    actor.should(
        See.the(respuesta.status_code, IsEqualTo(400))
    )
    
def test_reserva_rechaza_estudiante_inexistente(): #RF07
    # Sin sesión la API no deja reservar: responde 401 antes de buscar al estudiante.
    actor = Actor.named("Estudiante")
    tarea = ReservarHorario.en(
        "http://localhost:8000/api/reservations/",
        email="estudiante_inexistente@example.com",
        slot_id=1,
    )

    actor.attempts_to(tarea)
    respuesta = tarea.respuesta

    assert respuesta is not None
    assert respuesta.status_code == 401
    
def test_reserva_rechaza_usuario_que_no_es_estudiante(): #RF07
    actor = actor_con_sesion("Entrenador", "entrenador")
    tarea = ReservarHorario.en(
        "http://localhost:8000/api/reservations/",
        email="3@udem.edu.co",
        slot_id=1,
    )

    actor.attempts_to(tarea)
    respuesta = tarea.respuesta

    assert respuesta is not None
    assert respuesta.status_code == 403

def test_reserva_rechaza_horario_inexistente(): #RF07
    actor = actor_con_sesion("Estudiante", "e2e1")
    tarea = ReservarHorario.en(
        "http://localhost:8000/api/reservations/",
        email="1@soyudemedellin.edu.co",
        slot_id=999,
    )

    actor.attempts_to(tarea)
    respuesta = tarea.respuesta

    assert respuesta is not None
    assert respuesta.status_code == 404
    


def test_reserva_rechaza_estudiante_penalizado():  # RF07
    preparar_penalizacion(
        "prueba.e2e.penalizacion@soyudemedellin.edu.co",
        dias=7,
    )

    actor = actor_con_sesion("Estudiante penalizado", "penalizacion")

    tarea = ReservarHorario.en(
        "http://localhost:8000/api/reservations/",
        email="prueba.e2e.penalizacion@soyudemedellin.edu.co",
        slot_id=1,
    )

    actor.attempts_to(tarea)

    respuesta = tarea.respuesta
    assert respuesta is not None
    assert respuesta.status_code == 403


def test_reserva_reactiva_estudiante_con_penalizacion_vencida():  # RF07
    preparar_penalizacion(
        "prueba.e2e.penalizacion@soyudemedellin.edu.co",
        dias=-7,
    )

    actor = actor_con_sesion("Estudiante con penalizacion vencida", "penalizacion")

    tarea = ReservarHorario.en(
        "http://localhost:8000/api/reservations/",
        email="prueba.e2e.penalizacion@soyudemedellin.edu.co",
        slot_id=1,
    )

    actor.attempts_to(tarea)
    respuesta = tarea.respuesta

    assert respuesta is not None
    assert respuesta.status_code != 403



def test_reserva_rechaza_reserva_duplicada():  # RF07
    email = "1@soyudemedellin.edu.co"
    slot_id = 1
    url = "http://localhost:8000/api/reservations/"

    actor = actor_con_sesion("Estudiante", "e2e1")

    primera_reserva = ReservarHorario.en(
        url,
        email=email,
        slot_id=slot_id,
    )
    actor.attempts_to(primera_reserva)

    respuesta_primera = primera_reserva.respuesta
    assert respuesta_primera is not None
    assert respuesta_primera.status_code in (200, 201)

    reservation_id = respuesta_primera.json().get("id")
    assert reservation_id is not None

    try:
        segunda_reserva = ReservarHorario.en(
            url,
            email=email,
            slot_id=slot_id,
        )
        actor.attempts_to(segunda_reserva)

        respuesta_segunda = segunda_reserva.respuesta
        assert respuesta_segunda is not None
        assert respuesta_segunda.status_code == 409
        assert respuesta_segunda.json()["tipo"] == "RESERVA_DUPLICADA"

    finally:
        actor.attempts_to(
            CancelarReserva.en(url, str(reservation_id))
        )

def test_reserva_rechaza_bloque_sin_cupos():  # RF07
    fecha = fecha_de_reserva()
    slot_id = 1

    # Usa un estudiante distinto para evitar reservas duplicadas.
    cupos_originales = consultar_cupos(fecha, slot_id)

    try:
        poner_cupos(fecha, slot_id, 0)

        actor = actor_con_sesion("Estudiante sin cupos", "e2e2")
        tarea = ReservarHorario.en(
            "http://localhost:8000/api/reservations/",
            email=CUENTAS["e2e2"]["email"],
            slot_id=slot_id,
        )

        actor.attempts_to(tarea)
        respuesta = tarea.respuesta

        assert respuesta is not None
        assert respuesta.status_code == 409
        assert respuesta.json()["tipo"] == "SIN_CUPOS"

    finally:
        poner_cupos(fecha, slot_id, cupos_originales)


def test_reserva_exitosa_descuenta_un_cupo():  # RF07
    fecha = fecha_de_reserva()
    slot_id = 1
    email = "1@soyudemedellin.edu.co"
    url = "http://localhost:8000/api/reservations/"

    cupos_antes = consultar_cupos(fecha, slot_id)
    assert cupos_antes > 0

    actor = actor_con_sesion("Estudiante", "e2e1")
    tarea = ReservarHorario.en(
        url,
        email=email,
        slot_id=slot_id,
    )

    actor.attempts_to(tarea)
    respuesta = tarea.respuesta

    assert respuesta is not None
    assert respuesta.status_code in (200, 201)

    datos = respuesta.json()
    reservation_id = datos.get("id")

    assert reservation_id is not None

    try:
        cupos_despues = consultar_cupos(fecha, slot_id)
        assert cupos_despues == cupos_antes - 1
    finally:
        actor.attempts_to(
            CancelarReserva.en(url, str(reservation_id))
        )
  
def test_consultar_reservas_requiere_email(): #RF08
    actor = actor_con_sesion("Estudiante", "e2e1")

    tarea = ConsultarReservas.en(
        "http://localhost:8000/api/reservations/"
    )
    actor.attempts_to(tarea)

    respuesta = tarea.respuesta

    assert respuesta is not None
    actor.should(
        See.the(respuesta.status_code, IsEqualTo(400))
    )
    
def test_consultar_reservas_con_email_valido(): #RF08
    actor = actor_con_sesion("Estudiante", "e2e1")
    tarea = ConsultarReservas.en(
        "http://localhost:8000/api/reservations/",
        CUENTAS["e2e1"]["email"],
    )

    actor.attempts_to(tarea)
    respuesta = tarea.respuesta

    assert respuesta is not None
    assert respuesta.status_code == 200
    assert isinstance(respuesta.json(), list)
    
def test_cancelar_reserva_rechaza_id_invalido(): #RF09
    actor = actor_con_sesion("Estudiante", "e2e1")

    tarea = CancelarReserva.en(
        "http://localhost:8000/api/reservations"
    )
    actor.attempts_to(tarea)

    respuesta = tarea.respuesta

    assert respuesta is not None
    actor.should(
        See.the(respuesta.status_code, IsEqualTo(400))
    )
    
def test_cancelar_reserva_inexistente(): #RF09
    actor = actor_con_sesion("Estudiante", "e2e1")
    tarea = CancelarReserva.en(
        "http://localhost:8000/api/reservations",
        "507f1f77bcf86cd799439011",
    )

    actor.attempts_to(tarea)
    respuesta = tarea.respuesta

    assert respuesta is not None
    assert respuesta.status_code == 404  
    
def test_cancelar_reserva_ya_cancelada(): #RF09
    actor = actor_con_sesion("Estudiante", "e2e1")
    tarea = CancelarReserva.en(
        "http://localhost:8000/api/reservations",
        "6ac81dc345b1dd6d13b418da",
    )

    actor.attempts_to(tarea)
    respuesta = tarea.respuesta

    assert respuesta is not None
    assert respuesta.status_code == 409    
    

def test_cancelar_reserva_libera_un_cupo():  # RF09
    fecha = fecha_de_reserva()
    slot_id = 1
    email = "1@soyudemedellin.edu.co"
    url = "http://localhost:8000/api/reservations/"

    cupos_antes = consultar_cupos(fecha, slot_id)

    actor = actor_con_sesion("Estudiante", "e2e1")
    tarea_reserva = ReservarHorario.en(
        url,
        email=email,
        slot_id=slot_id,
    )

    actor.attempts_to(tarea_reserva)
    respuesta_reserva = tarea_reserva.respuesta

    assert respuesta_reserva is not None
    assert respuesta_reserva.status_code in (200, 201)

    datos = respuesta_reserva.json()
    reservation_id = datos.get("id")
    assert reservation_id is not None

    cupos_despues_reserva = consultar_cupos(fecha, slot_id)

    try:
        assert cupos_despues_reserva == cupos_antes - 1

        tarea_cancelacion = CancelarReserva.en(
            url,
            str(reservation_id),
        )
        actor.attempts_to(tarea_cancelacion)

        respuesta_cancelacion = tarea_cancelacion.respuesta
        assert respuesta_cancelacion is not None
        assert respuesta_cancelacion.status_code == 200

        cupos_despues_cancelacion = consultar_cupos(fecha, slot_id)
        assert cupos_despues_cancelacion == cupos_antes

    finally:
        
        if respuesta_reserva is not None and reservation_id:
            actor.attempts_to(
                CancelarReserva.en(url, str(reservation_id))
            )
 
    
    
def test_buscar_estudiante_rechaza_usuario_sin_permisos(): #RF10
    actor = actor_con_sesion("Estudiante", "e2e1")

    tarea = BuscarEstudiante.en(
        "http://localhost:8000/api/students/lookup/",
        actor_email=CUENTAS["e2e1"]["email"],
    )
    actor.attempts_to(tarea)

    respuesta = tarea.respuesta

    assert respuesta is not None
    actor.should(
        See.the(respuesta.status_code, IsEqualTo(403))
    )
def test_buscar_estudiante_con_entrenador_autorizado(): #RF10
    actor = actor_con_sesion("Entrenador", "entrenador")
    tarea = BuscarEstudiante.en(
        "http://localhost:8000/api/students/lookup/",
        documento="1111111111",
        actor_email="3@udem.edu.co",
    )

    actor.attempts_to(tarea)
    respuesta = tarea.respuesta

    assert respuesta is not None
    assert respuesta.status_code == 200

    datos = respuesta.json()
    assert isinstance(datos, dict)
    
def test_buscar_estudiante_rechaza_documento_invalido():  # RF10
    actor = actor_con_sesion("Entrenador", "entrenador")
    tarea = BuscarEstudiante.en(
        "http://localhost:8000/api/students/lookup/",
        documento="abc",
        actor_email="3@udem.edu.co",
    )

    actor.attempts_to(tarea)
    respuesta = tarea.respuesta

    assert respuesta is not None
    assert respuesta.status_code == 400


def test_buscar_estudiante_inexistente():  # RF10
    actor = actor_con_sesion("Entrenador", "entrenador")

    tarea = BuscarEstudiante.en(
        "http://localhost:8000/api/students/lookup/",
        documento="5555555555",
        actor_email="3@udem.edu.co",
    )

    actor.attempts_to(tarea)
    respuesta = tarea.respuesta

    assert respuesta is not None
    assert respuesta.status_code == 404
    
def test_consultar_historial_requiere_email(): #RF14
    actor = actor_con_sesion("Estudiante", "e2e1")

    tarea = ConsultarHistorial.en(
        "http://localhost:8000/api/reservations/history/"
    )
    actor.attempts_to(tarea)

    respuesta = tarea.respuesta

    assert respuesta is not None
    actor.should(
        See.the(respuesta.status_code, IsEqualTo(400))
    )
    
def test_consultar_historial_con_email_valido(): #RF14
    actor = actor_con_sesion("Estudiante", "e2e1")
    tarea = ConsultarHistorial.en(
        "http://localhost:8000/api/reservations/history/",
        "1@soyudemedellin.edu.co",
    )

    actor.attempts_to(tarea)
    respuesta = tarea.respuesta

    assert respuesta is not None
    assert respuesta.status_code == 200
    assert isinstance(respuesta.json(), list)
    
def test_consultar_historial_solo_pasadas(): #RF14
    actor = actor_con_sesion("Estudiante", "e2e1")
    tarea = ConsultarHistorial.en(
        "http://localhost:8000/api/reservations/history/",
        "1@soyudemedellin.edu.co",
        solo_pasadas=True,
    )

    actor.attempts_to(tarea)
    respuesta = tarea.respuesta

    assert respuesta is not None
    assert respuesta.status_code == 200
    assert isinstance(respuesta.json(), list)
    
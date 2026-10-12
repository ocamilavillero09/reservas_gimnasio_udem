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
import json
import requests

def fecha_de_reserva():
    # Misma regla que la API (RN03/RN04): el día siguiente en America/Bogota.
    return (datetime.now(ZoneInfo("America/Bogota")) + timedelta(days=1)).date().isoformat()

def asegurar_jornada():
    # GET /api/slots/ crea la disponibilidad del día siguiente si todavía no existe.
    requests.get("http://localhost:8000/api/slots/", timeout=10).raise_for_status()

def consultar_cupos(fecha, slot_id):
    import json
    import subprocess

    asegurar_jornada()

    javascript = (
        "JSON.stringify(db.disponibilidad.findOne("
        f"{{fecha:'{fecha}',slotId:{slot_id}}},"
        "{_id:0,cupos_disponibles:1}))"
    )

    resultado = subprocess.run(
        [
            "docker", "exec", "reservas_gimnasio_udem-database-1",
            "mongosh", "gym_udem", "--quiet", "--eval", javascript,
        ],
        check=True,
        capture_output=True,
        text=True,
    )

    datos = json.loads(resultado.stdout.strip())
    return datos["cupos_disponibles"]

def preparar_penalizacion(email, dias): 
    import subprocess

    fecha = (
        datetime.now(timezone.utc) + timedelta(days=dias)
    ).isoformat()

    javascript = (
        "db.users.updateOne("
        f"{{email:'{email}'}},"
        f"{{$set:{{estado:'PENALIZADO',penalizado_hasta:new Date('{fecha}')}}}}"
        ")"
    )

    subprocess.run(
        [
            "docker", "exec", "reservas_gimnasio_udem-database-1",
            "mongosh", "gym_udem", "--quiet", "--eval", javascript,
        ],
        check=True,
        capture_output=True,
        text=True,
    )

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
    actor = Actor.named("Estudiante")

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
    actor = Actor.named("Estudiante")
    tarea = ReservarHorario.en(
        "http://localhost:8000/api/reservations/",
        email="estudiante_inexistente@example.com",
        slot_id=1,
    )

    actor.attempts_to(tarea)
    respuesta = tarea.respuesta

    assert respuesta is not None
    assert respuesta.status_code == 404
    
def test_reserva_rechaza_usuario_que_no_es_estudiante(): #RF07
    actor = Actor.named("Entrenador")
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
    actor = Actor.named("Estudiante")
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

    actor = Actor.named("Estudiante penalizado")

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

    actor = Actor.named("Estudiante con penalizacion vencida")

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

    actor = Actor.named("Estudiante")

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
    import subprocess

    fecha = fecha_de_reserva()
    asegurar_jornada()
    slot_id = 1
    docker = "reservas_gimnasio_udem-database-1"

    # Usa un estudiante distinto para evitar reservas duplicadas.
    email = "es@soyudemedellin.edu.co"

    consulta = (
        "JSON.stringify(db.disponibilidad.findOne("
        f"{{fecha:'{fecha}',slotId:{slot_id}}},"
        "{_id:0,cupos_disponibles:1}))"
    )

    resultado = subprocess.run(
        [
            "docker", "exec", docker, "mongosh", "gym_udem",
            "--quiet", "--eval", consulta,
        ],
        check=True,
        capture_output=True,
        text=True,
    )

    import json
    cupos_originales = json.loads(resultado.stdout.strip())["cupos_disponibles"]

    poner_cero = (
        "db.disponibilidad.updateOne("
        f"{{fecha:'{fecha}',slotId:{slot_id}}},"
        "{$set:{cupos_disponibles:0}})"
    )

    restaurar = (
        "db.disponibilidad.updateOne("
        f"{{fecha:'{fecha}',slotId:{slot_id}}},"
        f"{{$set:{{cupos_disponibles:{cupos_originales}}}}})"
    )

    try:
        subprocess.run(
            [
                "docker", "exec", docker, "mongosh", "gym_udem",
                "--quiet", "--eval", poner_cero,
            ],
            check=True,
            capture_output=True,
            text=True,
        )

        actor = Actor.named("Estudiante sin cupos")
        tarea = ReservarHorario.en(
            "http://localhost:8000/api/reservations/",
            email=email,
            slot_id=slot_id,
        )

        actor.attempts_to(tarea)
        respuesta = tarea.respuesta

        assert respuesta is not None
        assert respuesta.status_code == 409
        assert respuesta.json()["tipo"] == "SIN_CUPOS"

    finally:
        subprocess.run(
            [
                "docker", "exec", docker, "mongosh", "gym_udem",
                "--quiet", "--eval", restaurar,
            ],
            check=True,
            capture_output=True,
            text=True,
        )

        

def test_reserva_exitosa_descuenta_un_cupo():  # RF07
    fecha = fecha_de_reserva()
    slot_id = 1
    email = "1@soyudemedellin.edu.co"
    url = "http://localhost:8000/api/reservations/"

    cupos_antes = consultar_cupos(fecha, slot_id)
    assert cupos_antes > 0

    actor = Actor.named("Estudiante")
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
    actor = Actor.named("Estudiante")

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
    actor = Actor.named("Estudiante")
    tarea = ConsultarReservas.en(
        "http://localhost:8000/api/reservations/",
        "estudiante@example.com",
    )

    actor.attempts_to(tarea)
    respuesta = tarea.respuesta

    assert respuesta is not None
    assert respuesta.status_code == 200
    assert isinstance(respuesta.json(), list)
    
def test_cancelar_reserva_rechaza_id_invalido(): #RF09
    actor = Actor.named("Estudiante")

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
    actor = Actor.named("Estudiante")
    tarea = CancelarReserva.en(
        "http://localhost:8000/api/reservations",
        "507f1f77bcf86cd799439011",
    )

    actor.attempts_to(tarea)
    respuesta = tarea.respuesta

    assert respuesta is not None
    assert respuesta.status_code == 404  
    
def test_cancelar_reserva_ya_cancelada(): #RF09
    actor = Actor.named("Estudiante")
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

    actor = Actor.named("Estudiante")
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
    actor = Actor.named("Estudiante")

    tarea = BuscarEstudiante.en(
        "http://localhost:8000/api/students/lookup/"
    )
    actor.attempts_to(tarea)

    respuesta = tarea.respuesta

    assert respuesta is not None
    actor.should(
        See.the(respuesta.status_code, IsEqualTo(403))
    )
def test_buscar_estudiante_con_entrenador_autorizado(): #RF10
    actor = Actor.named("Entrenador")
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
    actor = Actor.named("Entrenador")
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
    actor = Actor.named("Entrenador")

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
    actor = Actor.named("Estudiante")

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
    actor = Actor.named("Estudiante")
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
    actor = Actor.named("Estudiante")
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
    
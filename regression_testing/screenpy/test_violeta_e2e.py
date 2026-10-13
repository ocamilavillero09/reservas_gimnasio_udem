"""Pruebas E2E en navegador (Chrome) con Screenplay: screenpy + screenpy_selenium.

Un caso exitoso y uno alterno por requisito, con las cuentas de database/seed.js:
  RF01 registro · RF02 login · RF03 perfil estudiante · RF04 perfil entrenador
  RF05 perfil administrador · RF15 reporte de inasistencias

Requiere la app levantada (frontend en :5173, backend en :8000) y el seed.js
cargado. Cada prueba abre su propio Chrome y lo cierra al terminar.
"""
import random
import subprocess
import time

import pytest
from screenpy import See
from screenpy_selenium import Click, Element, Text, Wait
from screenpy_selenium.resolutions import IsInvisible, IsPresent, IsVisible
from screenpy.resolutions import ContainsTheText, ReadsExactly

# el actor (violeta/actores.py) tiene la habilidad de navegar con Chrome,
# ejecuta tareas (violeta/tareas) hechas de interacciones (Click, Enter, Visit),
# y al final le hacemos preguntas a la pantalla (Text, Element) que comparamos
# con lo esperado usando See.the(...)
from violeta.actores import actor_con_navegador
from violeta.tareas.buscar_estudiante import BuscarEstudiante
from violeta.tareas.editar_perfil import EditarPerfil
from violeta.tareas.iniciar_sesion import IniciarSesion
from violeta.tareas.registrar_cuenta import RegistrarCuenta
# los targets son los elementos de la pantalla (por id o xpath)
from violeta import targets as t

CONTENEDOR_DB = "reservas_gimnasio_udem-database-1"

# cuentas del seed, cada una es (correo, documento)
ANA = ("ana.demo@soyudemedellin.edu.co", "1001234567")
CLARA = ("clara.demo@soyudemedellin.edu.co", "1003456789")   # penalizada
DIEGO = ("diego.demo@udem.edu.co", "7009998881")             # entrenador
ELENA = ("elena.demo@udemedellin.edu.co", "3005554442")      # administradora


@pytest.fixture
def actor(request):
    """Actor con Chrome. El navegador se cierra siempre, pase o falle la prueba."""
    # el actor se llama como el test, asi en el reporte se sabe quien hizo que
    nombre = request.node.name.removeprefix("test_")
    el_actor = actor_con_navegador(nombre)
    try:
        # aqui se entrega el actor al test
        yield el_actor
    finally:
        # al terminar el test se cierra el navegador
        el_actor.exit()


def _mongosh(javascript: str) -> None:
    # corre un comando en la base de datos del contenedor de docker
    subprocess.run(
        ["docker", "exec", CONTENEDOR_DB, "mongosh", "gym_udem", "--quiet",
         "--eval", javascript],
        check=True, capture_output=True, text=True,
    )


@pytest.fixture
def cuenta_nueva():
    """Datos de una cuenta que no existe; se borra al terminar la prueba."""
    # el correo lleva la hora y el documento es aleatorio para que no se repitan
    correo = f"nueva.e2e.{int(time.time())}@soyudemedellin.edu.co"
    documento = str(random.randint(1_000_000_000, 9_999_999_999))
    try:
        yield correo, documento
    finally:
        # se borra la cuenta creada para no dejar basura en la base
        _mongosh(f"db.users.deleteOne({{email:'{correo}'}})")


# RF01 registro
def test_rf01_registro_exitoso(actor, cuenta_nueva):
    correo, documento = cuenta_nueva
    # tarea: el actor llena el formulario de registro y lo envia
    actor.attempts_to(RegistrarCuenta.en("Nueva Persona E2E", correo, documento))

    # interaccion: espera a que salga el titulo antes de leerlo, si no se lee vacio
    actor.attempts_to(Wait.for_the(t.REGISTRO_EXITOSO).to_appear())
    # pregunta: a la pantalla que texto tiene el titulo, y debe decir Registro exitoso
    actor.should(
        See.the(Text.of_the(t.REGISTRO_EXITOSO), ContainsTheText("Registro exitoso"))
    )


def test_rf01_registro_rechaza_dominio_no_institucional(actor):
    # caso alterno: correo de gmail, no debe dejar registrar
    actor.attempts_to(
        RegistrarCuenta.en("Persona Externa", "externa@gmail.com", "1234567890")
    )

    actor.attempts_to(Wait.for_the(t.LOGIN_AVISO_DOMINIO).to_appear())
    actor.should(
        # debe salir el aviso de dominio no institucional
        See.the(
            Text.of_the(t.LOGIN_AVISO_DOMINIO),
            ReadsExactly("⚠ Ese dominio no es institucional"),
        ),
        # debe haber un mensaje de error en el formulario
        See.the(Element(t.LOGIN_ERROR), IsPresent()),
        # y no debe salir la pantalla de registro exitoso
        See.the(Element(t.REGISTRO_EXITOSO), IsInvisible()),
    )


# RF02 inicio de sesion
def test_rf02_login_exitoso_estudiante(actor):
    # el * abre la tupla ANA en correo y documento
    actor.attempts_to(IniciarSesion.en(*ANA))

    actor.should(
        # si entro, se ve el boton Perfil y ya no se ve el boton de enviar del login
        See.the(Element(t.NAV_PERFIL), IsVisible()),
        See.the(Element(t.LOGIN_ENVIAR), IsInvisible()),
    )


def test_rf02_login_rechaza_documento_incorrecto(actor):
    # caso alterno: el correo de Ana con un documento que no es el suyo
    actor.attempts_to(IniciarSesion.en(ANA[0], "9876543210"))

    actor.should(
        # debe salir el error y no debe entrar a la aplicacion
        See.the(Element(t.LOGIN_ERROR), IsPresent()),
        See.the(Element(t.NAV_PERFIL), IsInvisible()),
    )


# RF03 perfil del estudiante
# Valores actuales de Ana en la base: se restauran al final de la prueba exitosa.
PERFIL_ANA = dict(edad="19", peso="65", altura="165", meta="Ganar resistencia")


def test_rf03_perfil_estudiante_actualiza_datos(actor):
    actor.attempts_to(IniciarSesion.en(*ANA))
    try:
        # tarea: cambia los 4 datos del perfil y guarda
        actor.attempts_to(
            EditarPerfil.en(edad="20", peso="66", altura="170", meta="Ganar fuerza")
        )
        actor.attempts_to(Wait.for_the(t.TOAST_MENSAJE).to_appear())
        actor.should(
            # debe salir el aviso de que se guardo, y seguir en la pantalla del perfil
            See.the(Text.of_the(t.TOAST_MENSAJE), ReadsExactly("Perfil actualizado.")),
            See.the(Text.of_the(t.PERFIL_TITULO), ReadsExactly("Mi perfil")),
        )
    finally:
        # pase o falle, se devuelven los datos originales de Ana para no dañar otras pruebas
        actor.attempts_to(EditarPerfil.en(**PERFIL_ANA))

def test_rf03_perfil_estudiante_rechaza_edad_fuera_de_rango(actor):
    actor.attempts_to(IniciarSesion.en(*ANA))
    actor.attempts_to(EditarPerfil.en(edad="5"))

    actor.attempts_to(Wait.for_the(t.TOAST_MENSAJE).to_appear())
    actor.should(
        See.the(Element(t.TOAST_MENSAJE), IsPresent()),
        See.the(Text.of_the(t.TOAST_MENSAJE), ContainsTheText("edad")),
    )


# ── RF04 — Perfil del entrenador ─────────────────────────────────────────────
def test_rf04_perfil_entrenador_muestra_sus_datos(actor):
    actor.attempts_to(IniciarSesion.en(*DIEGO), Click.on_the(t.NAV_PERFIL))
    actor.attempts_to(Wait.for_the(t.PERFIL_DOCUMENTO).to_appear())

    actor.should(
        See.the(Text.of_the(t.PERFIL_TITULO), ReadsExactly("Mi perfil")),
        See.the(Text.of_the(t.PERFIL_ROL), ReadsExactly("Entrenador")),
        See.the(Text.of_the(t.PERFIL_DOCUMENTO), ReadsExactly(DIEGO[1])),
    )


def test_rf04_perfil_entrenador_no_edita_datos_de_entrenamiento(actor):
    actor.attempts_to(IniciarSesion.en(*DIEGO), Click.on_the(t.NAV_PERFIL))

    actor.should(
        See.the(Element(t.PERFIL_EDAD), IsInvisible()),
        See.the(Element(t.PERFIL_GUARDAR), IsInvisible()),
    )


# ── RF05 — Perfil del administrador ──────────────────────────────────────────
def test_rf05_perfil_administrador_muestra_sus_datos(actor):
    actor.attempts_to(IniciarSesion.en(*ELENA), Click.on_the(t.NAV_PERFIL))
    actor.attempts_to(Wait.for_the(t.PERFIL_DOCUMENTO).to_appear())

    actor.should(
        See.the(Text.of_the(t.PERFIL_ROL), ContainsTheText("Administrador")),
        See.the(Text.of_the(t.PERFIL_ROL), ContainsTheText("Administrador principal")),
        See.the(Text.of_the(t.PERFIL_DOCUMENTO), ReadsExactly(ELENA[1])),
    )


def test_rf05_perfil_administrador_no_edita_datos_de_entrenamiento(actor):
    actor.attempts_to(IniciarSesion.en(*ELENA), Click.on_the(t.NAV_PERFIL))

    actor.should(
        See.the(Element(t.NAV_USUARIOS), IsVisible()),
        See.the(Element(t.PERFIL_EDAD), IsInvisible()),
    )


# ── RF15 — Reporte de inasistencias ──────────────────────────────────────────
def test_rf15_reporte_inasistencias_estudiante_sin_penalizacion(actor):
    actor.attempts_to(IniciarSesion.en(*ANA), Click.on_the(t.NAV_PERFIL))
    actor.attempts_to(Wait.for_the(t.REPORTE_INASISTENCIAS).to_appear())

    actor.should(
        See.the(Element(t.REPORTE_TITULO), IsVisible()),
        See.the(Text.of_the(t.REPORTE_INASISTENCIAS), ReadsExactly("0")),
        See.the(Element(t.REPORTE_AVISO_PENALIZADA), IsInvisible()),
    )


def test_rf15_reporte_inasistencias_estudiante_penalizado(actor):
    actor.attempts_to(IniciarSesion.en(*CLARA), Click.on_the(t.NAV_PERFIL))
    actor.attempts_to(Wait.for_the(t.REPORTE_AVISO_PENALIZADA).to_appear())

    actor.should(
        See.the(Text.of_the(t.REPORTE_INASISTENCIAS), ReadsExactly("5")),
        See.the(Text.of_the(t.REPORTE_AVISO_PENALIZADA), ContainsTheText("PENALIZADA")),
    )


def test_rf15_entrenador_busca_estudiante_penalizado(actor):
    actor.attempts_to(IniciarSesion.en(*DIEGO))
    actor.attempts_to(BuscarEstudiante.en(CLARA[1]))
    actor.attempts_to(Wait.for_the(t.BUSCAR_RESULTADO_ESTADO).to_appear())

    actor.should(
        See.the(Text.of_the(t.BUSCAR_RESULTADO_NOMBRE), ReadsExactly("Clara Ospina")),
        See.the(Text.of_the(t.BUSCAR_RESULTADO_ESTADO), ReadsExactly("PENALIZADO")),
    )

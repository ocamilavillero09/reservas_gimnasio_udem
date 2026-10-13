from screenpy import Actor
from screenpy.pacing import beat
from screenpy_selenium import Click, Enter, Visit

from ..targets import (
    LOGIN_CORREO, LOGIN_DOCUMENTO, LOGIN_ENVIAR, LOGIN_NOMBRE, TAB_REGISTER,
    URL_FRONT,
)


class RegistrarCuenta:
    """RF01 — Crear una cuenta con nombre, correo institucional y documento."""

    def __init__(self, nombre: str, correo: str, documento: str) -> None:
        self.nombre = nombre
        self.correo = correo
        self.documento = documento

    @classmethod
    def en(cls, nombre: str, correo: str, documento: str) -> "RegistrarCuenta":
        #crea la tarea en la clase
        return cls(nombre, correo, documento)

    @beat("{} intenta registrar la cuenta {correo}.")
    def perform_as(self, actor: Actor) -> None:
        actor.attempts_to(
            Visit(URL_FRONT),
            Click.on_the(TAB_REGISTER),
            Enter.the_text(self.nombre).into_the(LOGIN_NOMBRE),
            Enter.the_text(self.correo).into_the(LOGIN_CORREO),
            Enter.the_text(self.documento).into_the(LOGIN_DOCUMENTO),
            Click.on_the(LOGIN_ENVIAR),
        )

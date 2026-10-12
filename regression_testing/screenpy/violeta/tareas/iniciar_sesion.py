from screenpy import Actor
from screenpy.pacing import beat
from screenpy_selenium import Click, Enter, Visit

from ..targets import LOGIN_CORREO, LOGIN_DOCUMENTO, LOGIN_ENVIAR, URL_FRONT


class IniciarSesion:
    """RF02 — Entrar con correo institucional y documento como contraseña."""

    def __init__(self, correo: str, documento: str) -> None:
        self.correo = correo
        self.documento = documento

    @classmethod
    def en(cls, correo: str, documento: str) -> "IniciarSesion":
        return cls(correo, documento)

    @beat("{} inicia sesión con {correo}.")
    def perform_as(self, actor: Actor) -> None:
        actor.attempts_to(
            Visit(URL_FRONT),
            Enter.the_text(self.correo).into_the(LOGIN_CORREO),
            Enter.the_text(self.documento).into_the(LOGIN_DOCUMENTO),
            Click.on_the(LOGIN_ENVIAR),
        )

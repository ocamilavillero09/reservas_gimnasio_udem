from typing import Optional

from screenpy import Actor
from screenpy.pacing import beat
from screenpy_selenium import Click, Enter
from selenium.webdriver.common.keys import Keys

from ..targets import (
    NAV_PERFIL, PERFIL_ALTURA, PERFIL_EDAD, PERFIL_GUARDAR, PERFIL_META,
    PERFIL_PESO,
)

# Los campos son controlados por React: `clear()` no actualiza su estado, así
# que se reemplaza el contenido con Ctrl+A y se teclea encima.
_SELECCIONAR_TODO = Keys.CONTROL + "a" + Keys.NULL


class EditarPerfil:
    """RF03 — El estudiante actualiza edad, peso, altura y objetivo."""

    def __init__(
        self,
        edad: Optional[str] = None,
        peso: Optional[str] = None,
        altura: Optional[str] = None,
        meta: Optional[str] = None,
    ) -> None:
        self.campos = [
            (PERFIL_EDAD, edad),
            (PERFIL_PESO, peso),
            (PERFIL_ALTURA, altura),
            (PERFIL_META, meta),
        ]

    @classmethod
    def en(cls, **valores: str) -> "EditarPerfil":
        return cls(**valores)

    @beat("{} edita su perfil y lo guarda.")
    def perform_as(self, actor: Actor) -> None:
        actor.attempts_to(Click.on_the(NAV_PERFIL))
        for target, valor in self.campos:
            if valor is None:
                continue
            actor.attempts_to(
                Enter.the_text(_SELECCIONAR_TODO + (valor or Keys.BACKSPACE))
                .into_the(target)
            )
        actor.attempts_to(Click.on_the(PERFIL_GUARDAR))

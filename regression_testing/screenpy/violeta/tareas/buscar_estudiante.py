from screenpy import Actor
from screenpy.pacing import beat
from screenpy_selenium import Click, Enter

from ..targets import BUSCAR_BOTON, BUSCAR_DOCUMENTO


class BuscarEstudiante:
    """El entrenador busca a un estudiante por documento y ve su estado."""

    def __init__(self, documento: str) -> None:
        self.documento = documento

    @classmethod
    def en(cls, documento: str) -> "BuscarEstudiante":
        return cls(documento)

    @beat("{} busca al estudiante con documento {documento}.")
    def perform_as(self, actor: Actor) -> None:
        actor.attempts_to(
            Enter.the_text(self.documento).into_the(BUSCAR_DOCUMENTO),
            Click.on_the(BUSCAR_BOTON),
        )

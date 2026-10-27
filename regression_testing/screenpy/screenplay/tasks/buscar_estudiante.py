import requests
from screenpy import Actor
from screenplay.abilities.iniciar_sesion_en_la_api import cabeceras_de
from screenpy.pacing import beat


class BuscarEstudiante:
    def __init__(
        self,
        url: str,
        documento: str = "1001234567",
        actor_email: str = "usuario-invalido@example.com",
    ) -> None:
        self.url = url
        self.documento = documento
        self.actor_email = actor_email
        self.respuesta = None

    @classmethod
    def en(
        cls,
        url: str,
        documento: str = "1001234567",
        actor_email: str = "usuario-invalido@example.com",
    ) -> "BuscarEstudiante":
        return cls(url, documento, actor_email)

    @beat("{} intenta buscar un estudiante.")
    def perform_as(self, actor: Actor) -> None:
        parametros = {
            "documento": self.documento,
            "actor_email": self.actor_email,
        }

        self.respuesta = requests.get(
            self.url,
            params=parametros,
            headers=cabeceras_de(actor),
            timeout=10,
        )
import requests

from screenpy import Actor
from screenpy.pacing import beat


class ConsultarHorarios:
    def __init__(self, url: str) -> None:
        self.url = url
        self.respuesta = None

    @classmethod
    def en(cls, url: str) -> "ConsultarHorarios":
        return cls(url)

    @beat("{} consulta los horarios disponibles del gimnasio.")
    def perform_as(self, actor: Actor) -> None:
        self.respuesta = requests.get(self.url, timeout=10)
        self.respuesta.raise_for_status()
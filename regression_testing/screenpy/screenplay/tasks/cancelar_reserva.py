import requests
from screenpy import Actor
from screenplay.abilities.iniciar_sesion_en_la_api import cabeceras_de
from screenpy.pacing import beat


class CancelarReserva:
    def __init__(self, url: str, reservation_id: str = "id-invalido") -> None:
        self.url = url.rstrip("/")
        self.reservation_id = reservation_id
        self.respuesta = None

    @classmethod
    def en(
        cls,
        url: str,
        reservation_id: str = "id-invalido",
    ) -> "CancelarReserva":
        return cls(url, reservation_id)

    @beat("{} intenta cancelar una reserva.")
    def perform_as(self, actor: Actor) -> None:
        self.respuesta = requests.delete(
            f"{self.url}/{self.reservation_id}/",
            headers=cabeceras_de(actor),
            timeout=10,
        )
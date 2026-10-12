import requests
from screenpy import Actor
from screenpy.pacing import beat


class ReservarHorario:
    def __init__(
        self,
        url: str,
        email: str = "",
        slot_id: str = "",
    ) -> None:
        self.url = url
        self.email = email
        self.slot_id = slot_id
        self.respuesta = None

    @classmethod
    def en(
        cls,
        url: str,
        email: str = "",
        slot_id: str = "",
    ) -> "ReservarHorario":
        return cls(url, email, slot_id)

    @beat("{} intenta reservar un horario.")
    def perform_as(self, actor: Actor) -> None:
        datos = {}

        if self.email:
            datos["email"] = self.email

        if self.slot_id:
            datos["slotId"] = self.slot_id

        self.respuesta = requests.post(
            self.url,
            json=datos,
            timeout=10,
        )
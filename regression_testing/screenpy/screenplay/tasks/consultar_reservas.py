import requests
from screenpy import Actor
from screenpy.pacing import beat


class ConsultarReservas:
    def __init__(self, url: str, email: str = "") -> None:
        self.url = url
        self.email = email
        self.respuesta = None

    @classmethod
    def en(cls, url: str, email: str = "") -> "ConsultarReservas":
        return cls(url, email)

    @beat("{} intenta consultar sus reservas.")
    def perform_as(self, actor: Actor) -> None:
        parametros = {}

        if self.email:
            parametros["email"] = self.email

        self.respuesta = requests.get(
            self.url,
            params=parametros,
            timeout=10,
        )

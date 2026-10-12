import requests
from screenpy import Actor
from screenpy.pacing import beat


class ConsultarHistorial:
    def __init__(
        self,
        url: str,
        email: str = "",
        solo_pasadas: bool = False,
    ) -> None:
        self.url = url
        self.email = email
        self.solo_pasadas = solo_pasadas
        self.respuesta = None

    @classmethod
    def en(
        cls,
        url: str,
        email: str = "",
        solo_pasadas: bool = False,
    ) -> "ConsultarHistorial":
        return cls(url, email, solo_pasadas)

    @beat("{} intenta consultar su historial.")
    def perform_as(self, actor: Actor) -> None:
        parametros = {}

        if self.email:
            parametros["email"] = self.email

        if self.solo_pasadas:
            parametros["solo"] = "pasadas"

        self.respuesta = requests.get(
            self.url,
            params=parametros,
            timeout=10,
        )
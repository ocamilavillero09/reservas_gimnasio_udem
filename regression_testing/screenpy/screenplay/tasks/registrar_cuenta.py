import requests
from screenpy import Actor
from screenpy.pacing import beat


class RegistrarCuenta:
    def __init__(
        self,
        url: str,
        name: str = "",
        email: str = "",
        documento: str = "",
        password: str = "",
    ) -> None:
        self.url = url
        self.name = name
        self.email = email
        self.documento = documento
        self.password = password
        self.respuesta = None

    @classmethod
    def en(
        cls,
        url: str,
        name: str = "",
        email: str = "",
        documento: str = "",
        password: str = "",
    ) -> "RegistrarCuenta":
        return cls(url, name, email, documento, password)

    @beat("{} intenta registrar una cuenta.")
    def perform_as(self, actor: Actor) -> None:
        datos = {
            "name": self.name,
            "email": self.email,
            "documento": self.documento,
            "password": self.password,
        }

        self.respuesta = requests.post(
            self.url,
            json=datos,
            timeout=10,
        )
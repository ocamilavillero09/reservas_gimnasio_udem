import requests
from screenpy import Actor

URL_LOGIN = "http://localhost:8000/api/auth/login/"


class IniciarSesionEnLaApi:
    """Habilidad de usar la API con la sesión de una cuenta.

    La API exige el token de sesión (VUL-01 a VUL-04). El actor inicia sesión
    con su correo y su documento la primera vez que lo necesita y luego envía
    el token en la cabecera Authorization de cada petición.
    """

    def __init__(self, email: str, documento: str) -> None:
        self.email = email
        self.documento = documento
        self.token = None

    @classmethod
    def como(cls, email: str, documento: str) -> "IniciarSesionEnLaApi":
        return cls(email, documento)

    def cabeceras(self) -> dict:
        if not self.token:
            respuesta = requests.post(
                URL_LOGIN,
                json={"email": self.email, "documento": self.documento},
                timeout=10,
            )
            self.token = respuesta.json().get("token")
            if not self.token:
                raise RuntimeError(f"No se pudo iniciar sesión como {self.email}: {respuesta.status_code}")
        return {"Authorization": f"Bearer {self.token}"}

    def forget(self) -> None:
        self.token = None


def cabeceras_de(actor: Actor) -> dict:
    """Cabeceras con el token si el actor tiene sesión; sin sesión, ninguna."""
    if actor.has_ability_to(IniciarSesionEnLaApi):
        return actor.ability_to(IniciarSesionEnLaApi).cabeceras()
    return {}

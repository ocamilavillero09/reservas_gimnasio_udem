from screenpy import Actor
from screenpy_selenium import BrowseTheWeb

ESPERA_SEGUNDOS = 4


def actor_con_navegador(nombre: str) -> Actor:
    """Actor que navega con Chrome. Hay que llamar a `actor.exit()` al final."""
    actor = Actor.named(nombre).who_can(BrowseTheWeb.using_chrome())
    # Espera implícita: React pinta los elementos un instante después del clic.
    actor.ability_to(BrowseTheWeb).browser.implicitly_wait(ESPERA_SEGUNDOS)
    return actor

#!/usr/bin/env python
import os
import sys
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent


def main():
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'gym_api.settings')

    # Las pruebas no viven dentro de backend/ sino en tests/, en la raíz del
    # repositorio, para que no queden mezcladas con el código de la aplicación.
    # Ese directorio se añade a la ruta de importación para que
    # `manage.py test tests.backend` encuentre el paquete desde cualquier sitio.
    raiz = BASE_DIR.parent
    if (raiz / 'tests').is_dir() and str(raiz) not in sys.path:
        sys.path.insert(0, str(raiz))

    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "No se pudo importar Django. Asegúrate de que está instalado y "
            "activado en tu entorno virtual."
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()

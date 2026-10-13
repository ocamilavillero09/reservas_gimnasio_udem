"""Levanta el backend con la hora del día fijada, solo para ejecutar pruebas.

La regla RN12 solo deja registrar una asistencia desde que empieza el bloque
(el primero, a las 06:00). Entre las 00:00 y las 06:00 ninguna prueba que
registre asistencias puede pasar con el reloj real. Este lanzador fija la HORA
(por defecto las 10:00, hora de Colombia) conservando la FECHA de hoy, para que
coincida con la fecha que usan las pruebas, y deja correr el reloj desde ahí.

    pip install time-machine
    python regression_testing/herramientas/backend_reloj_fijo.py            # 10:00
    python regression_testing/herramientas/backend_reloj_fijo.py 15:30 8000

No toca el código de la aplicación: solo cambia el reloj de este proceso.
"""
import sys
from datetime import datetime
from pathlib import Path
from zoneinfo import ZoneInfo

import time_machine

hora = sys.argv[1] if len(sys.argv) > 1 else '10:00'
puerto = sys.argv[2] if len(sys.argv) > 2 else '8000'

bogota = ZoneInfo('America/Bogota')
hoy = datetime.now(bogota).date()
h, m = (int(x) for x in hora.split(':'))
destino = datetime(hoy.year, hoy.month, hoy.day, h, m, tzinfo=bogota)
time_machine.travel(destino, tick=True).start()
print(f'Reloj del backend fijado en {destino.isoformat()} (avanza normalmente desde ahí)')

backend = Path(__file__).resolve().parents[2] / 'backend'
sys.path.insert(0, str(backend))
import os  # noqa: E402
os.chdir(backend)
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'gym_api.settings')
from django.core.management import execute_from_command_line  # noqa: E402
execute_from_command_line(['manage.py', 'runserver', f'127.0.0.1:{puerto}', '--noreload'])

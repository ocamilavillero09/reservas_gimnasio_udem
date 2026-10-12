# Pruebas

Todas las pruebas del proyecto viven aquí, en `regression_testing/`, en la raíz
del repositorio. Ni `backend/` ni `frontend/` contienen código de pruebas: el
código de la aplicación y el que la comprueba quedan separados, y las imágenes
de Docker que se publican no llevan pruebas dentro.

| Carpeta                          | Qué prueba | Herramienta |
|----------------------------------|-----------|-------------|
| `regression_testing/backend/`    | Reglas de negocio y casos de uso de la API (`backend/api/`) | Django `TestCase` + `mongomock` |
| `regression_testing/frontend/`   | Componentes React y cliente HTTP (`frontend/src/`) | Vitest + Testing Library |
| `regression_testing/e2e/`        | Recorridos completos contra el stack levantado | Playwright |
| `regression_testing/screenpy/`   | E2E con patrón Screenplay (navegador y API) | screenpy + screenpy_selenium + pytest |
| `regression_testing/serenityjs/` | E2E con Screenplay y Gherkin (API) | Serenity/JS + Cucumber |

## Preparación (Windows / PowerShell)

Todos los comandos se corren desde la raíz del repositorio, salvo que se indique
otra cosa.

```powershell
docker compose up -d
.\.venv\Scripts\Activate.ps1
Get-Content database/seed.js -Raw | docker compose exec -T database mongosh --quiet
Get-Content database/seed_e2e.js -Raw | docker compose exec -T database mongosh --quiet
```

Las pruebas E2E con navegador necesitan además el backend en
http://localhost:8000 y el frontend en http://localhost:5173.

Nunca usar `docker compose down -v`: borra la base de datos.

## Cómo se ejecutan

### Backend

Se lanza **desde la raíz del repositorio**, no desde `backend/`: aquí es donde
están el paquete `regression_testing` y el fichero `.coveragerc`.

```powershell
python backend/manage.py test regression_testing.backend            # solo las pruebas
coverage run backend/manage.py test regression_testing.backend      # midiendo cobertura
coverage report                                                     # informe en consola
coverage html                                                       # informe en htmlcov/
```

Resultado esperado: `OK (expected failures=10)`.

`backend/manage.py` añade la raíz del repositorio a la ruta de importación de
Python, que es lo que permite que Django encuentre `regression_testing.backend`
estando fuera de la aplicación.

### Frontend

Se lanza desde `frontend/`, porque ahí está `node_modules`. La configuración de
Vitest (`frontend/vite.config.js`) apunta a `../regression_testing/frontend/`.

```powershell
cd frontend
npm test              # las pruebas
npm run test:coverage # con cobertura de frontend/src/
```

### End-to-end con Playwright

Requiere el stack levantado (`docker compose up -d`).

```powershell
cd frontend
npm run test:e2e
```

### End-to-end con Screenplay (screenpy)

Requiere el `.venv` activo, el stack levantado y los dos seeds de la
preparación.

```powershell
# Pruebas en navegador, RF01-RF05 y RF15 (13 pruebas, unos 3 minutos)
python -m pytest regression_testing/screenpy/test_violeta_e2e.py -q -W ignore::DeprecationWarning

# Pruebas sobre la API (25 pruebas)
python -m pytest regression_testing/screenpy/test_gym_slots.py -q
```

Resultado esperado: `13 passed` y `25 passed`.

### End-to-end con Serenity/JS y Gherkin

Serenity/JS no corre con Node 20, por eso se usa Node 22 a través de `npx`, sin
cambiar el Node global.

```powershell
cd regression_testing/serenityjs
npm install          # solo la primera vez
npx -y node@22 scripts/clean.js
npx -y node@22 node_modules/@cucumber/cucumber/bin/cucumber.js
cd ../..
```

Resultado esperado: `12 scenarios (12 passed)`.

### Si algo falla por datos

Volver a correr los dos seeds de la preparación.
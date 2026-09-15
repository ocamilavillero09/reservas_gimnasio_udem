# Pruebas

Todas las pruebas del proyecto viven aquí, en la raíz del repositorio. Ni
`backend/` ni `frontend/` contienen código de pruebas: el código de la
aplicación y el que la comprueba quedan separados, y las imágenes de Docker que
se publican no llevan pruebas dentro.

| Carpeta      | Qué prueba | Herramienta |
|--------------|-----------|-------------|
| `backend/`   | Reglas de negocio y casos de uso de la API (`backend/api/`) | Django `TestCase` + `mongomock` |
| `frontend/`  | Componentes React y cliente HTTP (`frontend/src/`) | Vitest + Testing Library |
| `e2e/`       | Recorridos completos contra el stack levantado | Playwright |

## Cómo se ejecutan

### Backend

Se lanza **desde la raíz del repositorio**, no desde `backend/`: aquí es donde
están el paquete `tests` y el fichero `.coveragerc`.

```bash
python backend/manage.py test tests.backend            # solo las pruebas
coverage run backend/manage.py test tests.backend      # midiendo cobertura
coverage report                                        # informe en consola
coverage html                                          # informe en htmlcov/
```

`backend/manage.py` añade la raíz del repositorio a la ruta de importación de
Python, que es lo que permite que Django encuentre `tests.backend` estando
fuera de la aplicación.

### Frontend

Se lanza desde `frontend/`, porque ahí está `node_modules`. La configuración de
Vitest (`frontend/vite.config.js`) apunta a `../tests/frontend/`.

```bash
cd frontend
npm test              # las pruebas
npm run test:coverage # con cobertura de frontend/src/
```

### End-to-end

Requiere el stack levantado (`docker compose up -d`).

```bash
cd frontend && npm run test:e2e
```

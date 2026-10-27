# Pruebas Stagehand — RF06, RF08 y RF10

Adaptación del proyecto de ejemplo del profe (Stagehand 4.3.0) a tres casos de
los requisitos de Sebas. La carpeta es independiente: tiene su propio
`package.json` y no hay que copiar nada al proyecto del profe.

**La IA hace las acciones** con `act`, **localiza elementos** con `observe` y
**lee datos** con `extract`. **El código verifica el resultado** con los mismos
selectores `data-cy` que usan las pruebas de Cypress en `cypress/e2e/sebas/`.
Nunca se acepta un dato de la IA sin compararlo con la página.

## Casos

| Script | Caso | `act` | `observe` | `extract` | El código verifica |
|---|---|---|---|---|---|
| `test:rf06` | RF06_FRONT_C2 · Verificar cupos y estado de los horarios | Vuelve al panel con "Reservar" | Encuentra los botones de reserva de cada bloque | Hora, cupos disponibles, total y estado de cada bloque | Que lo extraído coincida bloque a bloque con la página |
| `test:rf08` | RF08_FRONT_C2 · Consultar los detalles de una reserva activa | Abre "Mis reservas" | — | Hora y estado de la reserva | Estado `Activa`, hora `06:00`, recordatorio visible y que la IA leyó lo mismo |
| `test:rf10` | RF10_FRONT_C2 · Validar un documento con formato incorrecto | Escribe `abc` y pulsa "Buscar" | Encuentra el campo del documento | — | Que `observe` apuntó a `buscar-documento`, el mensaje exacto "El documento tiene 10 dígitos, sin letras, puntos ni espacios." y que no hay resultado |

El inicio de sesión se hace con selectores, no con la IA: no es lo que se
prueba y así cada caso hace menos peticiones al modelo.

## Evidencias

Cada ejecución deja en `evidencias/`:

- `<caso>.json`: cada paso de la IA (`act`, `observe`, `extract`) con su
  instrucción y resultado, si el caso pasó o falló, y las métricas de tokens.
- `<caso>.png`: la pantalla al terminar el caso.

## Datos de prueba

Antes de cada caso se hace lo mismo que `cy.escenarioBase()`: se vacían
`users`, `reservations`, `suggestions` y `disponibilidad` en MongoDB y se
registran los usuarios de `cypress/fixtures/usuarios.json`. RF08 crea además
una reserva por la API. **No la ejecute contra una base con datos que quiera
conservar.**

## Requisitos

- Node.js 22.18.0 o superior y Chrome (o Edge, con `CHROME_PATH`).
- La app corriendo: frontend en `http://localhost:5173`, backend en
  `http://localhost:8000` y MongoDB en `localhost:27017`.
- Ollama con un modelo descargado (por defecto `qwen2.5:7b`), o una clave de
  API de OpenAI o Gemini.

## Cómo correrla con Ollama

```powershell
ollama pull qwen2.5:7b
cd regression_testing/cypress/e2e/sebas/Stagehand
npm install
Copy-Item .env.example .env
npm run typecheck
npm run test:rf10
npm run test:rf08
npm run test:rf06
```

`AI_PROVIDER=ollama` ya viene en `.env.example`. Para usar otro proveedor,
cambie `AI_PROVIDER` a `openai` o `gemini` y escriba la clave en `.env`.

## Estado

- `npm run typecheck` pasa sin errores.
- Los 3 casos pasaron contra la app real (MongoDB, Django y Vite) con las
  acciones de la IA **simuladas**, para comprobar datos, selectores,
  aserciones y evidencias.
- **Pendiente:** ejecutarlos con Ollama. Con modelos locales pequeños,
  `observe` y `extract` pueden fallar porque el modelo no respeta el formato
  JSON que pide Stagehand (lo advierte también el README del profe). Si pasa,
  pruebe un modelo más capaz o OpenAI/Gemini.

# Cypress Cloud con IA — cy.prompt (RF06, RF07 y RF10)

Proyecto aparte con **Cypress 15.13** y el `projectId` de Cypress Cloud de Sebas.
No cambia la configuración del equipo (`frontend/`, Cypress 13).

| Caso | La IA hace (`cy.prompt`) | El código verifica (`data-cy`) |
|---|---|---|
| RF06_PROMPT_C1 | Inicia sesión como estudiante y busca el título de horarios | Título exacto, 6 bloques y cupos ≥ 0 |
| RF07_PROMPT_C1 | Inicia sesión, reserva el bloque de las 06:00 y confirma | Modal cerrado, contador `1/1` y bloque reservado |
| RF10_PROMPT_C1 | Inicia sesión como entrenador y busca a Laura | Nombre de Laura, aviso "sin reserva activa" y 0 reservas |

Antes de cada caso se limpia la base y se crean los usuarios del fixture
(`cy.escenarioBase()`, el mismo comando del equipo).

## Cómo correrla

Con la app corriendo (frontend 5173, backend 8000, MongoDB 27017):

```powershell
cd "regression_testing/cypress/e2e/sebas/Cypress Cloud"
npm install
npm run abrir
```

En la app de Cypress inicie sesión en Cypress Cloud, elija **E2E**, el
navegador Chrome o Edge y ejecute `cy_prompt.cy.js`. `cy.prompt` solo funciona
con sesión en Cypress Cloud y en navegadores Chromium.

Las capturas y videos quedan en `Evidencia/`.

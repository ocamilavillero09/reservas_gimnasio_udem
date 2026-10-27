# Pruebas con herramientas de IA — Camila (RF11, RF12, RF13, RF16, RF20, RF21)

Tres herramientas: **Playwright MCP**, **GitHub Copilot** y **Postman Agent Mode / Postbot**. Para cada una, la rúbrica pide propósito, configuración, pruebas, resultados, evidencias, y aportes y limitaciones. Esta guía deja listo lo técnico. Las capturas y el análisis los completas tú al ejecutar.

Antes de empezar, levanta el sistema con `docker compose up -d` (frontend en `:5173`, API en `:8000`). Usa siempre una base de pruebas, porque las pruebas crean y borran datos.

---

## 1. Playwright MCP — exploración y pruebas E2E dirigidas por un agente

**Propósito.** Un agente de IA (Copilot en modo Agent) controla un navegador real por medio del servidor MCP de Playwright. Se usa para explorar los flujos de RF11–RF21, verificar resultados en pantalla y generar un spec de Playwright a partir del recorrido.

**Configuración.** Ya está en [`.vscode/mcp.json`](../../.vscode/mcp.json), con la versión fijada `@playwright/mcp@0.0.83`. En VS Code: *Copilot Chat → modo Agent → icono de herramientas → activar `playwright`*.

**Pruebas (prompts para pegar en el chat).**

1. *RF11/RF12:* "Abre http://localhost:5173, inicia sesión con tomas.coach@udem.edu.co y documento 1000000002. En el panel, lista las reservas de la tabla 'Sin asistencia registrada'. Busca el documento 1000000003 y registra su asistencia. Dime qué aviso aparece y cuánto marca el total de Asistencias del 'Reporte general diario'."
2. *RF11 error:* "Busca el documento 9999999999 y copia el mensaje de error exacto."
3. *RF13:* "Pulsa 'Cerrar jornada', acepta la confirmación y dime cuántas inasistencias se procesaron."
4. *RF20/RF21:* "Inicia sesión como laura.est@soyudemedellin.edu.co (1000000003), envía desde Historial el mensaje 'Prueba IA'. Luego entra como ana.admin@udemedellin.edu.co (1000000001), abre Usuarios y confirma que el mensaje aparece en el buzón."
5. *Generación:* "Con lo que hiciste, genera un test de Playwright en `regression_testing/e2e/ia_rf11.spec.js` que repita el flujo 1 con aserciones."

Para preparar los datos (cuentas y una reserva de hoy), corre antes un caso de Cypress, por ejemplo `npm run cy:ui`, o siembra la reserva como en `features/camila/interactions.ts`.

**Evidencias.** Capturas del chat con las acciones del agente y de las capturas que toma (`browser_take_screenshot`), además del spec generado y su ejecución (`npx playwright test regression_testing/e2e/ia_rf11.spec.js`). Guárdalas en `evidencias/playwright-mcp/`.

**Qué analizar.** ¿Respetó los selectores reales (`data-cy`) o inventó alguno? ¿Manejó el diálogo `confirm()` de RF13? ¿El spec generado pasó sin retoques? ¿Cuántas veces hubo que corregir el prompt?

---

## 2. GitHub Copilot — generación y revisión de pruebas

**Propósito.** Generar casos de prueba unitarios y de API a partir del código de tus RF, y revisar las suites existentes en busca de casos faltantes.

**Configuración.** Extensión GitHub Copilot + Copilot Chat en VS Code, con tu cuenta (el plan educativo de GitHub la incluye).

**Pruebas.**

1. Abre `backend/api/attendance.py` y pide: "/tests Genera pruebas unitarias con APIRequestFactory y mongomock para `procesar_inasistencia`, cubriendo fecha futura, actor no entrenador y quinta inasistencia". Compara con `regression_testing/backend/test_camila.py`.
2. Abre `backend/api/autenticacion.py` y pide: "Genera pruebas Django para este middleware: token ausente, token alterado, token de cuenta desactivada, `actor_email` distinto al del token y ruta inexistente". Guárdalas en `regression_testing/backend/test_autenticacion_copilot.py` y ejecútalas con `python backend/manage.py test regression_testing.backend.test_autenticacion_copilot`.
3. En `cypress/e2e/api/rf20_rf21_buzon.cy.js`, pide: "¿Qué casos negativos faltan en esta suite?". Implementa uno de los que proponga.

**Evidencias.** Capturas del prompt y de la respuesta, el código generado (sin retoques y retocado) y la salida de la ejecución. Guárdalas en `evidencias/copilot/`.

**Qué analizar.** Porcentaje de pruebas generadas que pasaron sin cambios, errores típicos (inventar funciones, no conocer mongomock ni el reloj congelado) y casos útiles que el equipo no tenía.

---

## 3. Postman Agent Mode / Postbot — pruebas de API asistidas

**Propósito.** Generar aserciones y pruebas de contrato para los endpoints de RF11–RF21, y analizar las respuestas de error.

**Configuración.** Importa [`postman/gimnasio-camila.postman_collection.json`](postman/gimnasio-camila.postman_collection.json) en Postman. La variable `base` vale `http://localhost:8000/api`. Orden de ejecución:

1. **Preparación**: registra las tres cuentas, sobre una base limpia.
2. **0. Sesiones**: guarda los tokens en variables de la colección.
3. Las carpetas de cada RF.

**Pruebas.**

1. En cada petición, abre Postbot y pide "Add tests for this request". Revisa y ajusta los códigos esperados: 200, 400, 401, 403 y 409.
2. En Agent Mode: "Run the collection and summarize which requests failed and why".
3. Pide: "Generate a test that validates the JSON schema of the inbox response" (en `RF21 — Consultar buzón`).
4. Pide documentación: "Generate documentation for this collection".

**Evidencias.** Capturas de las pruebas que generó Postbot, del resultado de *Run collection* (exporta el JSON del runner) y de la documentación. Guárdalas en `evidencias/postman/`.

**Qué analizar.** ¿Postbot entendió el 401 sin token o lo marcó como fallo? ¿Las aserciones de esquema coinciden con lo que devuelve el backend? Compáralo con las 53 pruebas de API de Cypress.

---

## Tabla para el informe (llenar)

| Herramienta | Propósito | Pruebas | Pasaron sin cambios | Hallazgos | Aportes | Limitaciones |
|---|---|---|---|---|---|---|
| Playwright MCP | | | | | | |
| GitHub Copilot | | | | | | |
| Postman Postbot / Agent Mode | | | | | | |

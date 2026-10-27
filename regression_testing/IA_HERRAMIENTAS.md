# Herramientas de IA en las pruebas

Este documento resume cómo usamos las herramientas con IA para probar la app de reservas del gimnasio, qué salió bien, qué salió mal y qué falta.

**Cómo leerlo.** Todo está basado en archivos del repositorio. Cuando un dato no está en ningún archivo, dice **"no verificado"** y explica de dónde viene.

| Herramienta | Requisitos | Resultado final |
|---|---|---|
| Percy | RF03, RF04, RF05 | Línea base aprobada (build #3). Build #4 con cambios **sin aprobar**. |
| TestSprite | RF01, RF02 | 12 de 12 pasan, pero con aserciones débiles. |
| Browser Use | RF15 | 4 de 4 pasan con `gemini-3-flash-preview`, confirmados con lectura independiente de la página. |
| Stagehand | RF02 | 1 de 3 casos pasó. **(a) y (c) pendientes de ejecutar.** |
| Stagehand (Sebas) | RF06, RF08, RF10 | 3 de 3 pasan con Gemini, verificados con selectores `data-cy`. |
| Cypress Cloud: `cy.prompt` y Studio IA | RF06, RF07, RF10 | 6 pruebas ejecutadas en Cypress Cloud, con videos y capturas. |
| Katalon Studio (AI Assistant) | RF08, RF09, RF14 | 3 casos generados con ayuda de la IA y ejecutados, con capturas. |
| BugBug | RF07, RF10 | 3 pruebas grabadas, con capturas. |
| GitHub Copilot (Camila) | Autenticación (RF11–RF21) | 0 de 6 sin cambios (el archivo no cargaba); 6 de 6 después de corregirlo. |
| Playwright MCP (Camila) | RF11, RF16, RF20, RF21 | 3 de 3 recorridos correctos, verificados contra la base. La prueba generada pasó **sin cambios** (1 de 1). |
| Stagehand (Camila) | RF11, RF12, RF13, RF16, RF20, RF21 | 2 de 5 pasan (RF20 y RF21). **3 pendientes** (RF11, RF12, RF13 y RF16) por cuota y por la regla RN12. |

---

## 1. Percy (pruebas visuales) — RF03, RF04, RF05

**Qué se le pidió.** Tomar una captura de la pantalla "Mi perfil" de cada rol (estudiante, entrenador, administrador) y compararla con la captura anterior. No usa un modelo de lenguaje: compara imágenes.

**Qué generó.** Capturas con nombre `RF03 - perfil estudiante`, `RF04 - perfil entrenador` y `RF05 - perfil administrador`. Salen de las pruebas de [e2e/violeta](cypress/e2e/violeta/) con el comando `npm run cy:violeta:percy` (definido en `frontend/package.json`).

**Qué corregimos o verificamos.**
- Antes de cada captura la prueba llama a `cy.terminarAnimaciones()`, para que una animación a medias no cuente como diferencia.
- Build #3: se aprobó como **línea base** (la imagen de referencia).
- Build #4: trae cambios y **se dejó sin aprobar a propósito**, para que alguien los revise.

**Resultado.** Línea base aprobada y build #4 pendiente de revisión.
- **No verificado:** los números de build (#3 y #4) y su estado de aprobación los dio Violeta. No están en ningún archivo del repositorio, porque viven en el panel web de Percy.
- **No verificado:** qué cambió exactamente en el build #4.

**Limitaciones.**
- Percy solo dice "esta imagen cambió". No dice si el cambio es un error o una mejora: eso lo decide una persona.
- Una captura no comprueba textos. Cypress sí, y por eso las pruebas tienen además aserciones de texto.
- Solo se cubrieron tres pantallas de perfil.

---

## 2. TestSprite (pruebas generadas con IA) — RF01 y RF02

**Qué se le pidió.** Generar y ejecutar pruebas de interfaz para el registro (RF01) y el inicio de sesión (RF02), solo sobre el frontend en `http://localhost:5173`. Fuente: [standard_prd.json](../testsprite_tests/standard_prd.json) y el reporte [testsprite-mcp-test-report.md](../testsprite_tests/testsprite-mcp-test-report.md).

**Qué generó.**
- Un plan de pruebas.
- Un script de Python por prueba (`TC001` a `TC013` en [testsprite_tests](../testsprite_tests/)).

**Qué corregimos o verificamos.**
- **El plan hubo que corregirlo a mano antes de ejecutar.** El plan original ([ORIGINAL.json](../testsprite_tests/testsprite_frontend_test_plan.ORIGINAL.json)) tenía 11 pruebas. El reporte dice que ignoró los datos pedidos: inventó cuentas inexistentes y creaba 4 cuentas. El plan corregido tiene 12 pruebas, con las de correos hotmail y outlook agregadas.
- **Aserciones débiles o vacías que encontramos** (según el reporte):
  - **TC001** (registro) y **TC003** (login): solo comprueban que aparezca el botón "Reservar". TC001 no comprueba "¡Registro exitoso!".
  - **TC006** (rechazo de gmail): la segunda aserción busca "correo institucional", un texto que ya estaba en el subtítulo. Solo la primera tiene valor.
  - **TC007** y **TC008**: les faltan chequeos negativos (por ejemplo, que no aparezca "Registro exitoso").
  - **Todas las aserciones negativas del plan** ("NO aparece ¡Registro exitoso!") se perdieron al generar el código.
  - Todas las aserciones llevan el comentario `Assert-outcome: not verified`: TestSprite no pudo evaluarlas al exportar. Sí se ejecutaron.

**Resultado.** **12 de 12 pasan.** No se encontró ningún defecto real de la app. Con las aserciones débiles, ese "12 de 12" vale menos de lo que parece.

**Limitaciones.**
- La corrida creó una cuenta real que no se puede borrar desde aquí: `testsprite.rf01.202610252200@soyudemedellin.edu.co`. Repetir TC001 exige correo y documento nuevos.
- Gastó 6 créditos (150 → 144).
- No se probó: bloqueo tras 5 intentos fallidos, registro de entrenador o administrador, correo con mayúsculas o espacios, ni sesión al recargar.

---

## 3. Browser Use (la IA navega y lee) — RF15

**Qué se le pidió.** Iniciar sesión como entrenador, ir a "Panel", buscar a un estudiante por documento y **solo leer** (nombre, estado y la línea "Inasistencias: X de Y"). Sin dar veredicto. Código: [rf15_browser_use.py](../ia_browser_use/rf15_browser_use.py).

Cuatro tareas:
1. Estudiante con 0 inasistencias.
2. Estudiante en alerta, con 3.
3. Estudiante penalizada, con 5.
4. Control negativo: un documento que no existe, donde la IA no debe inventar un estudiante.

**Qué generó.** Un JSON por corrida y una captura por tarea en [ia_browser_use/resultados](../ia_browser_use/resultados/).

**Qué corregimos o verificamos.** El veredicto lo da el código, no la IA. Lo que la IA dice se contrasta con tres fuentes independientes:
- el contenido real de la página, leído con código;
- el valor sembrado en la base de datos;
- la respuesta de la API.

### Historial de fallos (leído de los 18 JSON)

| # | Qué pasó | Cuándo y modelo | Origen | Qué se hizo |
|---|---|---|---|---|
| 1 | **404 de modelo**: `gemini-2.5-flash` "ya no está disponible para cuentas nuevas". Tarea 1 sin datos (no concluyente). | 25-oct 22:42 | Servicio de IA, no la app | Se cambió de modelo. |
| 2 | **503 de saturación**: "high demand". Tarea 1 sin datos. | 25-oct 22:44 | Servicio de IA | Se reintentó. El script ahora clasifica 404, 503 y truncado como error del modelo, no de la IA. |
| 3 | **Respuesta truncada**: el modelo cortó la salida en 8096 tokens. Esa corrida igual pasó, pero con el error registrado. | 25-oct 22:54 | Configuración | Se subió el límite a 16000 (comentario en el script). |
| 4 | **Falso positivo del toast**: en el control negativo, el script dijo que la IA inventó el mensaje, porque la página ya no lo mostraba al leerla. | 25-oct 23:13, `gemini-3.1-flash-lite` | **El verificador**, no la IA. Mi lectura: el mensaje existió, era un aviso de 5 s. | Se agregó un observador (`MutationObserver`) que guarda los avisos. Desde la corrida 23:24 la tarea 4 pasa con el mensaje visto como `toast`. |
| 5 | **Alucinación "0 de 5"**: la IA reportó `Inasistencias: 0 de 5` y la página decía **`3 de 5`**. Veredicto: falso positivo de la IA. Pasó **dos veces** (25-oct 23:25 y 26-oct 08:21). | `gemini-3.1-flash-lite` | **La IA** | Se cambió la instrucción: copiar la línea letra por letra y dejarla vacía si no se ve. |
| 6 | Tras ese cambio, el modelo `flash-lite` dejó la línea vacía 3 veces (no concluyente). Además hubo 503 y "LLM call timed out after 75 seconds". | 26-oct 08:30 a 08:36 | IA y servicio | Se cambió a `gemini-3-flash-preview`. |

### Resultado final: 4 de 4 pasan
Con `gemini-3-flash-preview`, el 26-oct entre 08:39 y 08:47, las cuatro tareas dan **PASA**. En cada una, lo que dijo la IA coincide con lo que la página tenía:

| Tarea | Lectura de la IA | Lo que había en la página |
|---|---|---|
| 1 | `Inasistencias: 0 de 5` | `Inasistencias: 0 de 5` |
| 2 | `Inasistencias: 3 de 5` | `Inasistencias: 3 de 5` |
| 3 | `PENALIZADO`, `5 de 5` | `PENALIZADO`, `5 de 5` |
| 4 | Mensaje "No hay ningún estudiante registrado con el documento 9999999999." | El mismo mensaje, visto como `toast` |

**Limitaciones.**
- Las 4 tareas pasaron en **4 corridas separadas** (opción `--solo`), no en una sola corrida de las cuatro.
- **Que haya pasado una vez no prueba que vaya a pasar siempre.** Con otro modelo, la tarea 2 falló dos veces.
- El script **borra usuarios, reservas y disponibilidad** de la base antes de cada tarea.
- Las tareas que pasaron tardaron entre 21 y 60 segundos cada una (campo `segundos` de los JSON). Las que fallaron llegaron a tardar hasta 130 segundos.
- El nombre del modelo no está en los JSON más antiguos (los dos primeros). No verificado cuál se usó en 25-oct 22:54.

---

## 4. Stagehand (proyecto del profe adaptado a nuestro login) — RF02

**Qué se le pidió.** Adaptar el ejemplo del profe a nuestra app. La prueba es `D:\documentos universidad\validacion\Stagehand-E2E-AI\tests\login-gimnasio.e2e.ts` (está fuera de este repositorio). La IA hace las acciones y el código verifica con textos exactos:

| Caso | La IA hace | El código verifica |
|---|---|---|
| (a) Login correcto del estudiante | Escribir correo y documento, pulsar "Ingresar" | Que el botón diga exactamente "Reservar" |
| (b) Documento incorrecto | Lo mismo, con un documento erróneo | Que el mensaje sea exactamente "Correo o documento de identidad incorrectos." |
| (c) Correo gmail en el registro | Abrir la pestaña "Registrarse" y escribir un correo gmail | Que el aviso diga exactamente "Ese dominio no es institucional" |

**Qué generó.** Esa prueba más el script `test:gimnasio` en el `package.json` del ejemplo. El `typecheck` pasó sin errores.

**Qué verificamos y resultado.**

| Caso | Estado |
|---|---|
| (a) | **Pendiente de ejecutar.** |
| (b) | **Pasó una vez**, en la primera ejecución del 26-oct. En esa misma ejecución (a) y (c) ya habían fallado por cuota, así que (b) no se puede describir como "antes de agotar la cuota". |
| (c) | **Pendiente de ejecutar.** |

Los casos (a) y (c) **no se dan por pasados**. Ninguna ejecución los completó, y la causa fue la cuota o el servicio de Gemini, no la app.

**Modelos intentados el 26-oct** (la clave de Gemini está en el `.env` del ejemplo, que no se leyó):

| Modelo | Resultado | Verificado |
|---|---|---|
| `gemini-3-flash` | "Cuota diaria excedida": 20 peticiones por día en el plan gratuito. | Sí, lo vi en la salida de la ejecución. |
| `gemini-2.5-flash` | Error 404: "ya no está disponible para cuentas nuevas". Es el modelo por defecto del ejemplo. | Sí, lo vi en la salida. |
| `gemini-3.8-flash` (sugerido por la propia API) | "High demand" (saturación). La ejecución se quedó colgada unos 30 minutos y la detuve a mano. | Sí, lo vi en la salida. |
| `gemini-3-flash-preview` | Cuota diaria excedida o saturación. | **No verificado:** lo informó Violeta; no hay registro de esa ejecución en los archivos. |
| `gemini-3.1-flash-lite` | Cuota diaria excedida o saturación. | **No verificado:** igual que el anterior. |

**Hipótesis (no comprobada):** la cuota gratuita de 20 peticiones por día parece compartirse entre los modelos de Gemini 3. Sería consistente con que `gemini-3-flash-preview` y `gemini-3.1-flash-lite` fallaran igual, pero no lo comprobé en la documentación de Google ni con pruebas controladas.

**Ollama local (`qwen2.5:7b`).** Fue muy lento (105 s) y no devolvió ninguna acción. **No verificado en archivos:** este dato lo dio Violeta y no hay un registro de esa ejecución. Por eso Ollama no se usó para esta prueba.

**Limitaciones.**
- No hay evidencia de (a) ni de (c) hasta que se vuelvan a ejecutar con cuota disponible.
- El caso (b) tiene una sola ejecución exitosa.
- Una copia de la prueba está en [stagehand/](../stagehand/), sin claves.
- La ruta de los datos de prueba está escrita para este computador (se puede cambiar con `GIMNASIO_FIXTURES`).
- Tras 5 intentos fallidos el backend bloquea el correo 15 minutos. Cada ejecución hace solo un intento fallido.

---

## 5. Herramientas de Sebas — RF06, RF07, RF08, RF09, RF10 y RF14

Todo está en [cypress/e2e/sebas/](cypress/e2e/sebas/). La regla es la misma de la lección: **la IA actúa o lee, y el código da el veredicto** con los selectores `data-cy` de la app.

### 5.1 Stagehand — RF06, RF08 y RF10

**Qué se le pidió.** Adaptar el proyecto del profe (Stagehand 4.3.0) a tres casos frontend. La IA usa `act` para hacer clics, `observe` para encontrar elementos y `extract` para leer datos. Ver [Stagehand/README.md](cypress/e2e/sebas/Stagehand/README.md).

| Caso | La IA hace | El código verifica |
|---|---|---|
| RF06_FRONT_C2 | `act` + `observe` + `extract` de los 6 bloques | Que lo extraído coincida bloque a bloque con la página |
| RF08_FRONT_C2 | `act` (abre "Mis reservas") + `extract` | Estado `Activa`, hora `06:00` y que la IA leyó lo mismo |
| RF10_FRONT_C2 | `observe` del campo + `act` (escribe `abc` y busca) | Que `observe` apuntó a `buscar-documento` y el mensaje de error exacto |

**Qué corregimos.** RF08 fallaba con 401 al crear la reserva de prueba por la API, porque la API ahora exige el token de sesión. Se agregó el inicio de sesión (`tokenDe`) antes de crear la reserva.

**Resultado: 3 de 3 pasan con Gemini** (27-oct). Cada caso deja un JSON con los pasos de la IA, el resultado y los tokens, y una captura en [Stagehand/evidencias/](cypress/e2e/sebas/Stagehand/evidencias/).

| Caso | Pasos de la IA | Tokens de entrada / salida | Tiempo de la IA |
|---|---|---|---|
| RF06 | act, observe, extract | 7445 / 2507 | 73 s |
| RF08 | act, extract | 3672 / 750 | 45 s |
| RF10 | observe, act, act | 7546 / 1305 | 10 s |

- **No verificado:** el nombre exacto del modelo de Gemini. Está en el `.env` local, que no se sube al repositorio, y los JSON solo guardan el proveedor (`gemini`).

### 5.2 Cypress Cloud: `cy.prompt` y Cypress Studio IA — RF06, RF07 y RF10

**Qué se le pidió.** Dos formas de usar la IA de Cypress (Cypress 15.13, proyecto aparte en [Cypress Cloud/](cypress/e2e/sebas/Cypress%20Cloud/)):
- `cy.prompt`: la prueba se escribe en lenguaje natural y la IA la convierte en comandos ([cy_prompt.cy.js](cypress/e2e/sebas/Cypress%20Cloud/Pruebas/cy_prompt.cy.js)).
- Cypress Studio IA: se graba la prueba en el navegador y la IA sugiere las aserciones ([studio_ai.cy.js](cypress/e2e/sebas/Cypress%20Cloud/Pruebas/studio_ai.cy.js)).

**Qué verificamos.** Después de cada `cy.prompt`, el código comprueba con `data-cy`: el título exacto y los 6 bloques (RF06), el contador `1/1` y el bloque reservado (RF07), y el nombre de Laura con 0 reservas (RF10). Las sugerencias de Studio IA se revisaron antes de aceptarlas.

**Resultado.** 6 pruebas (3 con `cy.prompt` y 3 con Studio IA) ejecutadas en Cypress Cloud. Los videos y las capturas están en [Evidencia/videos/](cypress/e2e/sebas/Cypress%20Cloud/Evidencia/videos/).
- **No verificado en archivos:** el número de la ejecución en Cypress Cloud. Vive en el panel web de Cypress Cloud.
- `cy.prompt` solo funciona con sesión en Cypress Cloud y en navegadores Chromium.

### 5.3 Katalon Studio con AI Assistant — RF08, RF09 y RF14

**Qué se le pidió.** Generar con el asistente de IA de Katalon los casos RF08_FRONT_C1 (estado vacío sin reservas), RF09_FRONT_C1 (confirmar la cancelación) y RF14_FRONT_C1 (historial). El asistente se activó con una clave personal de Gemini.

**Resultado.** Los 3 casos están en [Katalon studio/Test Cases/](cypress/e2e/sebas/Katalon%20studio/Test%20Cases/) y las capturas de la generación y de la ejecución en [Katalon studio/Evidencia/](cypress/e2e/sebas/Katalon%20studio/Evidencia/).

### 5.4 BugBug — RF07 y RF10

**Qué se hizo.** Se grabaron en BugBug tres pruebas: intentar una segunda reserva (RF07), buscar con el campo vacío (RF10) y buscar a un estudiante con reserva activa (RF10). Las capturas están en [Bugbug/](cypress/e2e/sebas/Bugbug/).

### Limitaciones

- Stagehand y `cy.prompt` dependen de un servicio externo. Si la cuota de Gemini o de Cypress Cloud se agota, la prueba no se puede ejecutar. Eso no es un fallo de la app.
- Los resultados de Cypress Cloud y de BugBug se guardan también en sus paneles web. En el repositorio solo quedan los videos y las capturas.

---

## 6. Herramientas de Camila — RF11, RF12, RF13, RF16, RF20 y RF21

Las evidencias están en [ia/evidencias/](ia/evidencias/) y en [stagehand/evidencias/](stagehand/evidencias/). Se aplicó la misma regla: lo que dice la IA se contrasta con la base de datos o con la página.

### 6.1 GitHub Copilot (Chat) — middleware de autenticación

**Qué se le pidió.** Con [autenticacion.py](../backend/api/autenticacion.py) abierto: "Genera pruebas de Django para el middleware AutenticacionAPI: sin token (401), token alterado (401), cuenta INACTIVO (401), `actor_email` distinto al del token (403), ruta inexistente (404) y `/api/slots/` sin token (200). Usa mongomock como en `test_camila.py`."

**Qué generó.** Seis pruebas con buenos nombres y los códigos esperados correctos. Las creó por su cuenta en `backend/api/test_autenticacion.py`, no en `regression_testing/backend/`. La copia sin tocar está en [test_autenticacion_generado_por_copilot.py](ia/evidencias/copilot/test_autenticacion_generado_por_copilot.py).

**Resultado sin cambios: 0 de 6.** El archivo no carga: `NameError: name 'self' is not defined` ([ejecucion-sin-cambios.txt](ia/evidencias/copilot/ejecucion-sin-cambios.txt)).

**Qué corregimos.**

| # | Error de Copilot | Corrección |
|---|---|---|
| 1 | `@patch(..., return_value=self.db)` en el decorador de la clase, donde `self` no existe | La base mongomock se crea en `setUp`, como en `test_violeta.py` |
| 2 | Usa `emitir_token` sin importarlo | `from api.autenticacion import emitir_token` |
| 3 | `patch('backend.api.autenticacion.get_db')`: ese módulo no existe | Se reemplaza el cliente de `api.db` |
| 4 | Espera 401 en `/api/slots/` sin token, que es una ruta pública (su propia sexta prueba espera 200 en la misma ruta) | Los casos de 401 y 403 usan una ruta protegida (`/api/reports/personal/`) |
| 5 | Usuario `test@example.com` con rol `USER` | Correos institucionales y rol `ESTUDIANTE` |

**Resultado corregido: 6 de 6 pasan** ([test_autenticacion_copilot.py](backend/test_autenticacion_copilot.py), [ejecucion-corregida.txt](ia/evidencias/copilot/ejecucion-corregida.txt)).

**Limitaciones.**
- Propuso bien **qué** probar, pero el código no se pudo ejecutar.
- Inventó la ruta de un módulo y no conocía las reglas del sistema (rutas públicas, dominios y roles).
- Guardó el archivo donde quiso, no donde estaban las demás pruebas.

### 6.2 Playwright MCP (Copilot en modo Agent) — RF11, RF16, RF20 y RF21

**Configuración.** Servidor `@playwright/mcp@0.0.83` en [.vscode/mcp.json](../.vscode/mcp.json). El agente controla un Chrome real sobre la app en `http://localhost:5173`.

**Qué se le pidió y qué respondió.**

| Prompt | Respuesta del agente | Verificación independiente |
|---|---|---|
| RF20: como Laura, enviar "Prueba con Playwright MCP" desde Historial | Aviso: "Tu reporte llegó al administrador. Gracias por avisar." | La base guarda el mensaje con `autor_email` de Laura ✅ |
| RF21: como Ana, leer el buzón | 1 mensaje: Laura Estudiante, su correo, "Prueba con Playwright MCP", 00:43 | Coincide con la base. La hora está en Colombia (05:43 UTC), así que la corrección de DEF-04 funciona ✅ |
| RF11 (error) y RF16: como Tomás, buscar 9999999999 y leer el registro diario | "No hay ningún estudiante registrado con el documento 9999999999." Totales en 0 | Texto exacto del backend; ese día no había reservas ✅ |
| Generar una prueba de Playwright Test para el recorrido de RF20 | [ia_buzon.spec.js](e2e/ia_buzon.spec.js) con 8 selectores `data-cy` | Los 8 existen en el frontend; no inventó ninguno ✅ |

**Resultado.** 3 de 3 recorridos correctos, y la prueba generada **pasó sin cambios** (1 de 1, [ejecucion-sin-cambios.txt](ia/evidencias/playwright-mcp/ejecucion-sin-cambios.txt)). El primer intento de ejecución falló porque faltaba el navegador de Playwright (`npx playwright install chromium`), no por la prueba ([ejecucion-sin-navegador-instalado.txt](ia/evidencias/playwright-mcp/ejecucion-sin-navegador-instalado.txt)). Las capturas que tomó el agente están en [playwright-mcp/](ia/evidencias/playwright-mcp/).

**Comparación con 6.1.** El mismo Copilot acertó aquí y falló allá. La diferencia es el contexto: con el navegador, el agente leyó la página real (textos y `data-cy`); en el chat, adivinó cómo está armado el backend.

**Limitaciones.**
- Guardó sus capturas en la raíz del proyecto, no donde se le pidió.
- Pide permiso en cada paso, así que no corre sin una persona.
- Depende de que la app esté encendida y con datos. Los recorridos de asistencia (RF11 exitoso y RF13) no se pidieron porque se hicieron de madrugada, cuando la regla RN12 lo impide.

### 6.3 Stagehand — RF11, RF12, RF13, RF16, RF20 y RF21

**Qué se le pidió.** Cinco casos en [stagehand/pruebas/camila.test.mjs](stagehand/pruebas/camila.test.mjs). La IA usa `observe` para encontrar botones, `act` para las acciones y `extract` para leer tablas y totales con un esquema. El veredicto lo da el código, contra la base de datos. Ver [stagehand/README.md](stagehand/README.md).

| Caso | Resultado | Modelo |
|---|---|---|
| SH-RF20: la estudiante envía un reporte | ✅ Pasa. `observe` encontró "Enviar al administrador" y el mensaje quedó en la base | `gemini-3-flash-preview` |
| SH-RF21: la administradora extrae el buzón y borra el mensaje | ✅ Pasa. `extract` leyó autor, correo y texto exactos; el buzón quedó vacío | `gemini-3.1-flash-lite` |
| SH-RF12-RF11, SH-RF11-02 y SH-RF13 (panel del entrenador) | ⏳ **Pendientes de ejecutar** | — |

Las capturas y lo que devolvieron `observe` y `extract` están en [stagehand/evidencias/](stagehand/evidencias/) (`resultados.json`).

**Qué corregimos en el camino** (cada log `ejecucion*.txt` es la evidencia):
1. `gemini-2.5-flash` ya no está disponible para cuentas nuevas, y `gemini-3.8-flash` no respondió en 5 minutos. Se cambió de modelo.
2. Una vez el modelo no encontró el campo del correo (`resultCount: 0`). El login ahora llena los campos con `data-cy` y la IA solo pulsa "Ingresar". Así, además, las credenciales nunca llegan al modelo.
3. La capa gratuita admite 5 peticiones por minuto: se dejan 13 s entre llamadas (`LLM_INTERVALO_MS`).
4. El aviso emergente dura 5 s, y `extract` llegaba tarde (tardó 103 s y devolvió un texto vacío). Los avisos se leen directamente con `leerAviso`; `extract` se usa para lo que permanece en pantalla.
5. La segunda prueba encontró abierta la sesión de la primera. Ahora cada caso borra la sesión antes de empezar.

**Limitaciones.**
- La capa gratuita admite **20 peticiones por día por modelo**. SH-RF21 se terminó con otro modelo porque se agotó la cuota.
- Los casos del panel registran asistencias: solo se pueden ejecutar desde las 06:00 (regla RN12).
- Con las pausas por la cuota, cada caso tarda alrededor de un minuto.

---

## Lección

**Un "PASA" de la IA solo vale si se verifica con algo que no dependa de la IA.**

Lo vimos en los propios archivos:

- **Browser Use.** La IA dijo "0 de 5" con seguridad cuando la página decía "3 de 5". Lo que la detectó fue el código que lee la página, no otra pregunta a la IA. A la inversa, el verificador también falló una vez (el toast): ningún veredicto se debe aceptar sin revisar de dónde sale.
- **TestSprite.** "12 de 12" suena perfecto, pero varias pruebas solo miran que aparezca un botón. Un "pasa" con una aserción floja es solo un "no se rompió".
- **Stagehand.** Se diseñó con la regla correcta: la IA solo hace los clics, y la verificación es código con texto exacto. Los casos que no se ejecutaron se quedan como "pendiente", no como "pasó".
- **Copilot.** El mismo asistente generó código que no cargaba (0 de 6) cuando adivinó el backend, y una prueba que pasó sin cambios cuando leyó la página real con Playwright MCP. Lo que cambia el resultado es el contexto que tiene la IA.
- **Mismo problema sin IA.** En Cypress, la prueba E2E-RF05-01 comprobaba el texto "Administrador principal" con `have.text`, que no exige que el texto sea visible. Se corrigió agregando `.should('be.visible')` y la prueba volvió a pasar (2 de 2). Ver [rf05_perfil_administrador.cy.js](cypress/e2e/violeta/rf05_perfil_administrador.cy.js).

Reglas prácticas:
1. La IA actúa y lee; el veredicto lo da el código.
2. El código compara contra un valor esperado conocido (base de datos, API o texto exacto), no contra lo que la IA dice haber visto.
3. Si la verificación no se pudo hacer, el resultado es "no concluyente" o "pendiente", nunca "pasa".
4. Revisar las aserciones: que comprueben lo que dicen comprobar.

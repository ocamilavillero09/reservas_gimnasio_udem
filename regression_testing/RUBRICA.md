# Rúbrica → evidencias

Dónde está la evidencia de cada criterio. Todas las pruebas documentan **objetivo, resultado esperado, resultado obtenido y evidencia**:
- las automatizadas, en [`cypress/MATRIZ_DE_PRUEBAS.md`](cypress/MATRIZ_DE_PRUEBAS.md);
- las de rendimiento y las del formulario, en sus informes.

## 1. Regresión, API y componentes

| Lo que pide el nivel alto | Evidencia |
|---|---|
| Pruebas reproducibles con Cypress | `cypress/`: 101 pruebas de regresión (53 de API, 21 E2E, 27 de componentes). Cada caso parte de una base limpia y crea sus propios datos |
| Casos positivos y negativos | API: 200/201, 400, 403, 404 y 409 por endpoint de RF11, RF12, RF13, RF16, RF20 y RF21 |
| Aserciones pertinentes | Sobre la respuesta y sobre el efecto en la base de datos (estado de la reserva, contador de inasistencias, mensajes) y, en componentes, sobre el cuerpo y los parámetros de cada petición |
| Evidencias que permiten identificar regresiones | `cypress/reports/*/index.html` (informes con capturas), `cypress/evidencias/` (capturas y videos) y las suites de Django (149: 143 pasan y 6 son hallazgos de seguridad pendientes, marcados como fallo esperado) y Vitest (85) en `resultados-unitarias/` |

## 2. Seguridad y rendimiento → [`INFORME_SEGURIDAD_RENDIMIENTO.md`](INFORME_SEGURIDAD_RENDIMIENTO.md)

| Lo que pide el nivel alto | Evidencia |
|---|---|
| Verifica controles de seguridad relevantes | 8 controles (§2.2) y 11 vulnerabilidades OWASP Top 10 (§2.3), ejecutadas antes y después: 7 corregidas y 4 pendientes con su propuesta (§2.4) |
| Mide tiempos de respuesta, errores y comportamiento bajo carga | k6: humo, carga (50 usuarios), estrés (50 → 100 → 200) y lote RF13, con datos de volumen (§3.1 y §3.3) |
| Condiciones, métricas y criterios definidos | §3.1 y §3.2: p95 < 500 ms, errores < 1 %, checks > 99 % y lote < 5 s |
| Interpreta los resultados | §3.4: capacidad de hasta 100 usuarios, N+1 en RF12 y RF16, y cuello de botella en el servidor y en el hash |
| Propone mejoras | §2.4, §2.5 y §3.5. Las aplicadas (N+1, gunicorn, 7 controles) están medidas antes y después |

## 3. UX, heurísticas, accesibilidad e interfaz → [`ux/INFORME_UX.md`](ux/INFORME_UX.md)

| Lo que pide el nivel alto | Evidencia |
|---|---|
| Evaluación de recorridos | §2: recorridos de entrenador, administrador y estudiante en tres tamaños de pantalla |
| Heurísticas de Nielsen con hallazgos verificables, severidad y recomendaciones | §3: 28 hallazgos con heurística, severidad 0–4, fuente, recomendación y prueba automatizada (`cypress/e2e/ux/hallazgos.cy.js`) |
| Evidencias | Capturas antes y después (§3), informes axe y Lighthouse (§6) y la matriz |
| Accesibilidad | axe-core WCAG 2.2: 44 → 0 violaciones; Lighthouse 91 → 100 (§6) |
| Comportamiento visual | Celular, tableta y escritorio: desborde de 159–363 px → 0; foco visible (§6.3) |
| Análisis apoyado por IA, contrastado con la revisión del equipo | §5: análisis de la IA frente a las herramientas y las 15 respuestas del formulario, dimensión por dimensión, con coincidencias y discrepancias explicadas |
| Documenta las correcciones | §7: 21 hallazgos corregidos, con archivo, prueba que lo verifica y efecto en las suites existentes |

## 4. E2E con Screenplay

Pendiente: no forma parte de esta entrega.

## 5. E2E con Katalon → [`katalon/README.md`](katalon/README.md)

| Lo que pide el nivel alto | Evidencia |
|---|---|
| Flujos completos automatizados | `katalon/E2E_RF11_RF21.krecorder`: 11 casos de RF11, RF12, RF13, RF16, RF20 y RF21 con los tres roles (entrenador, administrador y estudiante) |
| Casos positivos y negativos | Documento con letras, documento inexistente, administrador sin permiso para cerrar la jornada y mensaje vacío |
| Datos de prueba controlados | `katalon/00_preparacion.krecorder` crea las cuentas y las reservas. Las reservas se pasan al día de la prueba con mongosh, porque la aplicación solo permite reservar para el día siguiente |
| Verificaciones | Cada caso verifica el mensaje, el estado de la tabla o las cifras del registro diario; no solo hace clics |
| Evidencias | Una captura por caso (`katalon/capturas/`), el log de la ejecución y la tabla de resultados en `katalon/README.md` |

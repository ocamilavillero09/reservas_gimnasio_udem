# Pruebas de regresión, API y componentes con Cypress

Cubren los requisitos **RF11, RF12, RF13, RF16, RF20 y RF21** en tres niveles:

| Nivel | Qué prueba | Dónde | Pruebas |
|---|---|---|---|
| **API** | Cada endpoint con casos positivos y negativos (200/201, 400, 403, 404, 409) y el estado que deja en la base de datos | `e2e/api/` | 53 |
| **E2E de interfaz** | Recorridos completos en el navegador contra el sistema real (frontend + backend + MongoDB) | `e2e/ui/` | 21 |
| **Componentes** | `TrainerPanel`, `HistoryView` y el buzón de `AdminPanel`, aislados y con la API simulada | `component/regresion/` | 27 |
| **Defectos** | Defectos encontrados durante la regresión (ver abajo) | `e2e/defectos/`, `component/defectos/` | 9 |
| **Seguridad** | Controles (8) y vulnerabilidades OWASP (11) | `e2e/seguridad/` | 19 |
| **UX** | Hallazgos heurísticos (11), accesibilidad axe (4) e interfaz responsive (16) | `e2e/ux/` | 31 |

La matriz con **objetivo, resultado esperado, resultado obtenido y evidencia** de cada prueba
está en [`MATRIZ_DE_PRUEBAS.md`](MATRIZ_DE_PRUEBAS.md).

## Requisitos previos

1. El sistema levantado: `docker compose up -d` desde la raíz (frontend en `:5173`, backend en `:8000`, MongoDB en `:27017`).
2. Las dependencias del frontend: `cd frontend && npm install` (instala Cypress, el reporte y el driver de MongoDB).

> ⚠️ **Las pruebas E2E y de API borran usuarios, reservas y mensajes** antes de cada caso, para partir
> siempre de un estado conocido. Ejecútenlas contra una base de datos de pruebas, nunca contra datos reales.
> La base se elige con las variables `MONGO_URI` y `MONGO_DB` (por defecto `mongodb://localhost:27017` y `gym_udem`),
> que deben ser las mismas para el backend y para Cypress.

> 🕕 Los casos que registran asistencias usan reservas del bloque de las **06:00 de hoy**, porque la regla RN12 solo
> permite registrar desde que empieza el bloque. Corran la suite **después de las 6:00 a. m.** (hora de Colombia), o
> levanten el backend con `python regression_testing/herramientas/backend_reloj_fijo.py`, que fija la hora del
> servidor en las 10:00 de hoy sin tocar el código de la aplicación.
>
> 🔒 VUL-06 bloquea el inicio de sesión de un correo tras 5 intentos fallidos. Las pruebas no se bloquean entre sí
> porque cada caso vuelve a registrar sus usuarios y una cuenta nueva empieza sin intentos fallidos.

## Cómo se ejecutan

Todo se lanza desde `frontend/`:

```bash
npm run cy:open                  # interfaz gráfica de Cypress, para ver las pruebas paso a paso
npm run cy:regresion             # API + E2E + componentes (debe quedar todo en verde)
npm run cy:api                   # solo API
npm run cy:ui                    # solo E2E de interfaz
npm run cy:componentes           # solo componentes
npm run cy:defectos:e2e          # defectos encontrados en la regresión
npm run cy:defectos:componentes
npm run cy:seguridad             # controles de seguridad (deben pasar)
npm run cy:vulnerabilidades      # vulnerabilidades OWASP (las pendientes fallan a propósito)
npm run cy:hallazgos             # hallazgos heurísticos verificables
npm run cy:accesibilidad         # axe-core, WCAG 2.2 A/AA
npm run cy:interfaz              # celular, tableta y escritorio; foco visible
```

Después de ejecutarlas, se regenera la matriz desde la raíz del repositorio:

```bash
python regression_testing/cypress/generar_matriz.py
```

## Evidencias

Cada ejecución deja su propia carpeta, con el nombre del script (`api`, `ui`, `componentes`, `defectos-e2e`, `defectos-componentes`, `seguridad-*`, `hallazgos`, `accesibilidad`, `interfaz`). Las ejecuciones sobre el código **original**, antes de corregir, están en `reports/antes/` y `evidencias/antes/`:

- `reports/<ejecución>/index.html` — informe HTML con gráficas, cada prueba, su código y las capturas incrustadas.
- `evidencias/<ejecución>/capturas/` — capturas de los pasos clave (`cy.evidencia(...)`) y de cada fallo.
- `evidencias/<ejecución>/videos/` — video de cada archivo de pruebas.

## Cómo están construidas

- **Reproducibles.** Cada caso limpia la base y crea sus propios usuarios (`fixtures/usuarios.json`) y reservas.
  Las reservas de hoy o de ayer se siembran directamente en MongoDB (`cy.task('db:insertarReserva')`), porque la API
  solo deja reservar para mañana. Así los casos no dependen del orden ni de lo que haya en la base.
- **Aserciones sobre el efecto, no solo sobre la respuesta.** Además del código HTTP, se comprueba en la base de datos
  que la reserva cambió de estado, que el contador de inasistencias subió o que el mensaje se borró.
- **Componentes aislados.** `cy.intercept` simula cada respuesta de la API y verifica el cuerpo y los parámetros que
  envía el componente (`request.body`, `actor_email`, `reservation_id`).
- **Esperas por eventos, no por tiempo.** Se espera a peticiones concretas (`cy.wait('@alias')`) y a elementos visibles;
  no hay `cy.wait(ms)` en la suite de regresión.

## Defectos encontrados

Las pruebas de defectos afirman el comportamiento correcto y **fallan mientras el defecto exista**. Cuando el equipo
lo corrija, la prueba pasa a verde sin tocarla y queda como prueba de regresión.

> **Estado (12 de octubre de 2026):** DEF-01, DEF-03, DEF-04, DEF-05, DEF-06 y DEF-07 ya están **corregidos** y sus
> pruebas pasan. Quedan pendientes DEF-02 y DEF-02b, que requieren autenticación (ver `../INFORME_SEGURIDAD_RENDIMIENTO.md`, §2.4).
> La tabla describe el problema original.

| ID | RF | Defecto | Severidad | Corrección sugerida |
|---|---|---|---|---|
| DEF-01 | RF13 | `POST /attendance/process/` acepta una `fecha` futura enviada por el cliente y marca como inasistencias las reservas de mañana, penalizando a estudiantes que no han faltado. | Alta | Ignorar `fecha` o rechazar con 400 cualquier fecha posterior a hoy. |
| DEF-02 | Todos | La API no autentica: la identidad es el `actor_email` que envía el cliente. Con el correo del administrador, cualquiera lee y borra el buzón, registra asistencias o cierra jornadas. | Crítica | Autenticación con token (por ejemplo JWT) y tomar el actor del token, no del cuerpo. |
| DEF-02b | RF20 | Cualquiera puede enviar mensajes al buzón a nombre de otro estudiante. | Alta | Igual que DEF-02. |
| DEF-03 | Sesión | Si el usuario recarga (F5) mientras la app carga datos, `App.jsx` cae en el `catch`, ejecuta `saveSession(null)` y lo expulsa. Lo encontró la propia suite: era la causa de fallos intermitentes. | Media | Cerrar sesión solo si `/auth/session` responde 404; los errores de `refreshData` no deben borrar la sesión. |
| DEF-04 / 04b | RF21 | El buzón muestra la hora en UTC (5 horas adelantada): la interfaz corta el texto ISO sin convertirlo. | Media | `new Date(m.fecha).toLocaleString('es-CO', { timeZone: 'America/Bogota' })`. |
| DEF-05 | RF12 | Si falla la consulta de pendientes, el panel dice "No hay estudiantes pendientes". | Media | Mostrar un mensaje de error con opción de reintentar en lugar del estado vacío. |
| DEF-06 | RF16 | Si falla el registro diario, los totales se muestran en 0, igual que un día sin actividad. | Media | Igual que DEF-05. |
| DEF-07 | RF21 | Si falla la carga del buzón, dice "Todavía no hay mensajes". | Media | Igual que DEF-05. |

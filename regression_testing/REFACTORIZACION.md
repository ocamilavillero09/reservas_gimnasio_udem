# Refactorización final: comparación antes y después

Esta entrega corrige los hallazgos que seguían abiertos al final de las pruebas: las 4 vulnerabilidades de control de acceso del [informe de seguridad](INFORME_SEGURIDAD_RENDIMIENTO.md) (§2.4), los defectos DEF-02 y DEF-02b, el hallazgo de Violeta del correo con dos arrobas y dos fallas en la infraestructura de pruebas de Sebas. Toca el backend, el frontend y las suites del equipo.

## 1. Resultados antes y después

| Suite | Antes | Después |
|---|---|---|
| Cypress · vulnerabilidades OWASP | 7 / 11 (VUL-01 a VUL-04 fallan) | **11 / 11** |
| Cypress · defectos E2E | 3 / 5 (DEF-02 y DEF-02b fallan) | **5 / 5** |
| Cypress · controles de seguridad | 8 / 8 | 8 / 8 |
| Cypress · API RF11–RF21 | 53 / 53 | 53 / 53 (4 casos con el nuevo contrato 401, ver §3) |
| Cypress · E2E de interfaz RF11–RF21 | 21 / 21 | 21 / 21 |
| Cypress · componentes | 27 + 4 | 27 + 4 |
| Cypress · Sebas (RF06–RF10, RF14) | 33 / 36 (3 fallas de infraestructura) | **36 / 36** |
| Cypress · Violeta (RF01–RF05, RF15) | 23 / 23 | 23 / 23 |
| Django (unitarias y API) | 143 pasan + 6 fallos esperados | **149 pasan, 0 fallos esperados** |
| Vitest (frontend) | 85 / 85 | 85 / 85 |
| Serenity/JS · Screenplay RF11–RF21 | no existía | **13 / 13 escenarios** |

Las ejecuciones del "antes" están en `cypress/reports/antes/` y `resultados-unitarias/`. Las del "después", en `cypress/reports/<suite>/` y `cypress/evidencias/<suite>/` (informes HTML, capturas y videos).

## 2. Cambios por hallazgo

### H1 · La API no autenticaba (VUL-01 a VUL-04, DEF-02, DEF-02b) — Crítica

**Antes.** La identidad era el `actor_email` o el `email` que enviaba el cliente. Con solo conocer el correo de la administradora, cualquiera podía leer y borrar el buzón, registrar asistencias, cerrar la jornada, leer la sesión de otro usuario (incluido su documento, que es su contraseña), escribir en el buzón a nombre de un estudiante o cancelar reservas ajenas.

**Después.**

| Capa | Archivo | Cambio |
|---|---|---|
| Backend | `backend/api/autenticacion.py` (nuevo) | El login y el registro devuelven un token firmado con `SECRET_KEY` (`django.core.signing`, vigencia de 8 horas, sin dependencias nuevas). Un middleware exige `Authorization: Bearer <token>` en toda la API, salvo en registro, login, configuración y horarios. Obtiene el usuario **del token** y rechaza con 403 la petición cuyo `actor_email` o `email` no sea ese usuario. El personal solo puede *consultar* datos de un estudiante (GET), nunca escribir a su nombre. Un token vencido, alterado o de una cuenta desactivada responde 401. Las rutas que no existen siguen respondiendo 404 (VUL-09). |
| Backend | `backend/api/views.py` | `iniciar_sesion` y `registrar_cuenta` devuelven `token`. `cancelar_reserva` comprueba que la reserva sea de quien la cancela (VUL-04, IDOR). |
| Backend | `backend/gym_api/settings.py` | Se registra el middleware y se añade `AUTENTICACION_OBLIGATORIA` (por defecto `True`). Con `False` la API acepta peticiones sin token: es un modo de transición para migrar por fases una suite que todavía no lo envía. |
| Frontend | `frontend/src/services/api.js` | `request()` adjunta el token. El token vive en `sessionStorage` (se borra al cerrar la pestaña) y no en `localStorage`. |
| Frontend | `frontend/src/App.jsx` | Al cerrar sesión se borra el token. Si al recargar la API responde 401 (otra pestaña o token vencido), se pide iniciar sesión de nuevo. |
| Frontend | `frontend/src/services/Nousadas.js` | El enlace del PDF lleva el token en la dirección, porque un enlace no puede enviar cabeceras. El backend solo lo acepta así en las rutas `.pdf`. |

**Contrato de la API.** Los endpoints no cambiaron de ruta ni de campos: `actor_email` y `email` siguen llegando, pero ya no se pueden falsificar. Lo único nuevo es la cabecera `Authorization`.

**Riesgo residual.** El token del PDF queda en la URL y puede aparecer en el historial o en los registros del servidor. Se acepta porque dura 8 horas y solo sirve en esas rutas; la alternativa es descargar el PDF con `fetch` y un `Blob`.

### H2 · Registro con dos arrobas (test_seguridad_violeta.py) — Alta

**Antes.** `role_for_email` solo comprobaba que el correo *terminara* en el dominio, así que `intruso@gmail.com@udemedellin.edu.co` se registraba como administrador.
**Después.** `backend/api/db.py` exige una sola arroba, una parte local válida y que el dominio sea **exactamente** uno de los tres institucionales.

### H3 · Fallas de la infraestructura de pruebas de Sebas — Media

**Antes.** RF07_C4, RF07_C5 y RF07_C8 fallaban antes de llegar a la API. `db:actualizarUsuario` mandaba la fecha como texto y el validador de MongoDB la rechazaba, y la tarea `db:fijarCupos` no existía.
**Después.** `frontend/cypress.config.js` convierte los campos `*_hasta` en fecha y añade `db:fijarCupos`.

## 3. Ajustes a las pruebas por el nuevo contrato

| Suite | Cambio | Por qué |
|---|---|---|
| `cypress/support/commands.js` | `cy.api` guarda el token que devuelven el registro y el login, y envía el del usuario que actúa. Se añaden `cy.apiSinCredenciales`, `cy.tokenDe` y la opción `{ como }`. | Las pruebas actúan como lo hace la interfaz. Las vulnerabilidades se prueban sin token, que es lo que haría un atacante. |
| `vulnerabilidades.cy.js` (VUL-01 a VUL-03), `controles.cy.js` (SEG-08), `rf16_registro_diario.cy.js` (PDF) | Se envía o se omite el token de forma explícita. | Son peticiones armadas a mano. |
| API-RF11-10, API-RF12-08, API-RF20-06, RF07_C2 | Esperan **401** en lugar de 403/404. | Un actor que no existe o que falta no puede tener sesión: la autenticación lo rechaza antes de llegar a la vista. |
| API-RF20-05, RF07_C1, RF08_C1, RF09, RF14_C1 | Se envían con la sesión de la estudiante (`{ como }`). | Así siguen probando la validación de la vista (400/404/409), que es su objetivo. |
| Django `test_violeta.py` | `ClienteConSesion` hace lo mismo que `cy.api`; `self.anonimo` es un cliente sin token. | Mismo criterio que Cypress. |
| Django · 15 caminos de caja blanca ("sin correo", "usuario inexistente") | `@override_settings(AUTENTICACION_OBLIGATORIA=False)`. | Con el token obligatorio, el middleware corta la petición antes de esa rama de la vista. Se recorre en modo de transición; la autenticación se prueba aparte. |
| Django · 6 hallazgos de Violeta | Se les quitó `@expectedFailure`. | Ya están corregidos. |

## 4. Pendiente

- **Serenity/JS de Sebas (`gym-slots.feature`)** llama a la API sin token, así que ahora recibe 401. Hay que obtener el token con `POST /auth/login/` y enviarlo en la cabecera `Authorization` de cada `GetRequest`/`PostRequest`, igual que hace `features/camila/interactions.ts` (`DejarMensajeEnElBuzon`).
- **Katalon** pasa por la interfaz y no necesita cambios. Hay que volver a ejecutarlo contra el despliegue final.

## 5. Cómo reproducir

```bash
docker compose up -d --build
cd frontend
npm run cy:api && npm run cy:ui && npm run cy:componentes
npm run cy:seguridad && npm run cy:vulnerabilidades && npm run cy:defectos:e2e
cd .. && python backend/manage.py test regression_testing.backend
cd frontend && npx vitest run
```

Entre las 00:00 y las 06:00, la regla RN12 impide registrar asistencias. Levanten el backend con `python regression_testing/herramientas/backend_reloj_fijo.py`.

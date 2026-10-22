# Matriz de pruebas de Violeta (Cypress)

Fuentes de los datos:
- E2E y accesibilidad: pruebas de [e2e/violeta/](e2e/violeta/) e informe [reports/violeta/index.html](reports/violeta/index.html), generado el 2026-10-21 (según el informe, de 22:59:14 a 23:06:05 UTC; Cypress reportó 3 min 3 s de ejecución).
- Componente: prueba de [component/violeta/](component/violeta/) e informe [reports/violeta-componentes/index.html](reports/violeta-componentes/index.html), generado el 2026-10-21 (de 22:58:02 a 22:58:05 UTC, 2,7 s en total).

## 1. Entorno

| Dato | Valor |
|---|---|
| Cypress | 13.17.0 |
| Node | v24.15.0 |
| Navegador | Electron 118 (headless), el que mostró Cypress en las ejecuciones |
| Informe | mochawesome 7.1.4 (Mocha 7.0.1) |
| Total de pruebas | **24**: 19 E2E + 4 de accesibilidad + 1 de componente |
| Resultado | 24 aprobadas, 0 fallidas, 0 pendientes, 0 omitidas (23 en el informe `violeta` y 1 en el de `violeta-componentes`) |

**Cómo ejecutar** (desde `frontend/`; las E2E y las de accesibilidad necesitan la aplicación, el backend y la base de datos encendidos):

```
cd frontend
npm run cy:violeta                 # 19 E2E + 4 de accesibilidad
npm run cy:violeta:componentes     # 1 de componente (no necesita backend)
```

Si en tu sesión existe la variable `ELECTRON_RUN_AS_NODE`, Cypress no arranca (error `cachedDataRejected`). Ejecútalo sin ella: `env -u ELECTRON_RUN_AS_NODE npm run cy:violeta` (en Git Bash).

## 2. Matriz de pruebas

Las E2E y las de accesibilidad empiezan con `cy.escenarioBase()`: borra la base y crea al administrador, al entrenador y a dos estudiantes. La de componente no usa base de datos: la respuesta de la API se simula.

Rutas de evidencia (relativas a `regression_testing/cypress/`):
- **Informe:** `reports/violeta/index.html` (E2E y accesibilidad) y `reports/violeta-componentes/index.html` (componente).
- **Video:** `evidencias/violeta/videos/<archivo>.mp4` y `evidencias/violeta-componentes/videos/Login.cy.jsx.mp4`. Hay un video por archivo de pruebas, no por prueba. Cada informe tiene una copia en su carpeta `videos/`.
- **Accesibilidad:** además, un JSON con todas las violaciones en `evidencias/violeta/accesibilidad/<pantalla>.json` y una captura en `evidencias/violeta/capturas/accesibilidad_violeta.cy.js/`.

| ID | RF | Tipo | Objetivo | Resultado esperado | Resultado obtenido | Duración | Video |
|---|---|---|---|---|---|---|---|
| E2E-RF01-01 | RF01 | E2E | Rechazar el registro con correo `@gmail.com` | Aviso "no es institucional", error visible y sin pantalla de registro exitoso | Aprobada | 4,1 s | rf01_registro.cy.js.mp4 |
| E2E-RF01-02 | RF01 | E2E | Rechazar el registro con correo `@hotmail.com` | Igual que RF01-01 | Aprobada | 2,5 s | rf01_registro.cy.js.mp4 |
| E2E-RF01-03 | RF01 | E2E | Rechazar el registro con correo `@outlook.com` | Igual que RF01-01 | Aprobada | 4,3 s | rf01_registro.cy.js.mp4 |
| E2E-RF01-04 | RF01 | E2E | Registrar a un estudiante con correo institucional único | Título con "Registro exitoso" y usuario guardado en la base con rol `ESTUDIANTE` | Aprobada | 8,8 s | rf01_registro.cy.js.mp4 |
| E2E-RF02-01 | RF02 | E2E | Rechazar el correo real de Laura con un documento incorrecto | Mensaje exacto "Correo o documento de identidad incorrectos.", login visible y sin `nav-perfil` | Aprobada | 8,9 s | rf02_login.cy.js.mp4 |
| E2E-RF02-02 | RF02 | E2E | Rechazar el correo de Laura con el documento de otra persona | Igual que RF02-01 | Aprobada | 6,1 s | rf02_login.cy.js.mp4 |
| E2E-RF02-03 | RF02 | E2E | Rechazar un correo que no está registrado | Igual que RF02-01 | Aprobada | 5,1 s | rf02_login.cy.js.mp4 |
| E2E-RF02-04 | RF02 | E2E | Entrar con correo y documento correctos | `nav-perfil` visible, nombre de Laura en `nav-usuario-nombre` y formulario de login ausente | Aprobada | 6,1 s | rf02_login.cy.js.mp4 |
| E2E-RF03-01 | RF03 | E2E | El estudiante actualiza edad, peso, altura y objetivo | Aviso "Perfil actualizado." | Aprobada | 16,0 s | rf03_perfil_estudiante.cy.js.mp4 |
| E2E-RF03-02 | RF03 | E2E | Rechazar una edad fuera de rango (5) | Aviso que menciona "edad" | Aprobada | 4,7 s | rf03_perfil_estudiante.cy.js.mp4 |
| E2E-RF04-01 | RF04 | E2E | El entrenador ve su perfil | Título de perfil, rol "Entrenador" y su documento | Aprobada | 10,0 s | rf04_perfil_entrenador.cy.js.mp4 |
| E2E-RF04-02 | RF04 | E2E | El entrenador no puede editar datos de entrenamiento | Sin campo de edad y sin botón de guardar perfil | Aprobada | 3,7 s | rf04_perfil_entrenador.cy.js.mp4 |
| E2E-RF05-01 | RF05 | E2E | La administradora ve su perfil | Rol con "Administrador principal" y su documento | Aprobada | 10,8 s | rf05_perfil_administrador.cy.js.mp4 |
| E2E-RF05-02 | RF05 | E2E | La administradora no edita datos de entrenamiento | Sin campo de edad y con el botón de usuarios | Aprobada | 4,2 s | rf05_perfil_administrador.cy.js.mp4 |
| E2E-RF15-01 | RF15 | E2E | Estudiante sin penalización ve su reporte de inasistencias | Contador 0 y sin aviso de penalización | Aprobada | 15,2 s | rf15_inasistencias.cy.js.mp4 |
| E2E-RF15-02 | RF15 | E2E | Estudiante penalizada (5 inasistencias) ve su reporte | Contador 5 y aviso "PENALIZADA" | Aprobada | 3,9 s | rf15_inasistencias.cy.js.mp4 |
| E2E-RF15-03 | RF15 | E2E | El entrenador busca por documento a una estudiante penalizada | Se ve su nombre y el estado `PENALIZADO` | Aprobada | 15,0 s | rf15_inasistencias.cy.js.mp4 |
| E2E-RF15-04 | RF15 | E2E | Estudiante con 3 inasistencias (estado de alerta) | Contador 3, aviso de alerta visible y sin aviso de penalización | Aprobada | 8,3 s | rf15_inasistencias.cy.js.mp4 |
| E2E-RF15-05 | RF15 | E2E | Caso límite: 2 inasistencias | Contador 2, sin alerta y sin penalización | Aprobada | 5,6 s | rf15_inasistencias.cy.js.mp4 |
| A11Y-RF02-01 | RF02 | Accesibilidad | Auditar con axe la pantalla de login | Sin violaciones críticas ni serias | Aprobada (0 violaciones de cualquier nivel) | 8,0 s | accesibilidad_violeta.cy.js.mp4 |
| A11Y-RF03-01 | RF03 | Accesibilidad | Auditar con axe el perfil de la estudiante | Sin violaciones críticas ni serias | Aprobada (0 violaciones de cualquier nivel) | 11,7 s | accesibilidad_violeta.cy.js.mp4 |
| A11Y-RF04-01 | RF04 | Accesibilidad | Auditar con axe el perfil del entrenador | Sin violaciones críticas ni serias | Aprobada (0 violaciones de cualquier nivel) | 7,6 s | accesibilidad_violeta.cy.js.mp4 |
| A11Y-RF05-01 | RF05 | Accesibilidad | Auditar con axe el perfil de la administradora | Sin violaciones críticas ni serias | Aprobada (0 violaciones de cualquier nivel) | 7,7 s | accesibilidad_violeta.cy.js.mp4 |
| COMP-RF02-01 | RF02 | Componente | Montar `Login` solo, con la API simulada respondiendo 401 | La petición lleva el correo y el documento escritos, `login-error` muestra "Correo o documento de identidad incorrectos." y `onLogin` no se llama | Aprobada | 2,5 s | Login.cy.jsx.mp4 |

**Datos que no existen y dejé fuera:** el informe no incluye capturas de las E2E (no falló ninguna prueba) ni un video por prueba, solo por archivo. Las duraciones salen de la última corrida y varían entre corridas (por ejemplo, RF05-01 tardó 5,8 s en una corrida, 28,1 s en otra y 10,8 s en la última). La columna "Resultado esperado" de RF03 a RF05 la resumí a partir del título de cada prueba, sin revisar sus pasos uno por uno.

### Nota sobre las pruebas de componentes de regresión

Según se indicó, las 3 pruebas de componentes de regresión de Camila (`AdminPanelBuzon`, `HistoryView` y `TrainerPanel`) se ejecutaron en Mac. En Windows fallan igual (3 de 3, verificado aquí con `npm run cy:componentes`) con `Failed to fetch dynamically imported module ... srcC:/Users/...`. La causa es que Cypress arma mal la dirección del archivo de soporte cuando está fuera de `frontend/`: en Windows queda sin la barra y en Mac/Linux funciona por casualidad. Por eso no están en esta matriz.

La prueba de Violeta evita el problema con un puente de soporte (`frontend/cypress-puente/component.js`) y una configuración propia (`frontend/cypress.violeta.config.js`) que solo usa el script `cy:violeta:componentes`. `cypress.config.js` no se modificó.

## Fallos provocados (resumen)

Un fallo provocado es romper algo a propósito, un poquito, para comprobar que las pruebas de verdad avisan. Aquí se hicieron tres, de tipos distintos. Cada uno se deshizo después y las pruebas volvieron a pasar. La explicación completa, paso a paso y en lenguaje simple, está en [FALLOS_PROVOCADOS.md](FALLOS_PROVOCADOS.md).

| Fallo | Qué se rompió | Quién tenía el error | Pruebas que fallaron | Evidencia (informe y video) |
|---|---|---|---|---|
| 1 | En RF02-04 se escribió a mano un nombre equivocado ("Laura Gomez") como el que debía aparecer | La prueba | 1 de 4 (E2E-RF02-04) | `reports/violeta-fallo-1/index.html` · `evidencias/violeta-fallo-1/videos/rf02_login.cy.js.mp4` |
| 2 | La pantalla de perfil mostró una inasistencia de más | La aplicación | 4 de 5 (E2E-RF15-01, 02, 04 y 05) | `reports/violeta-fallo-2/index.html` · `evidencias/violeta-fallo-2/videos/rf15_inasistencias.cy.js.mp4` |
| 3 | En RF02-01 la prueba buscó el botón con un nombre que no existe (`login-enviar`) | La prueba | 1 de 4 (E2E-RF02-01) | `reports/violeta-fallo-3/index.html` · `evidencias/violeta-fallo-3/videos/rf02_login.cy.js.mp4` |

Las capturas de cada fallo están en `evidencias/violeta-fallo-N/capturas/`. En los tres casos se comprobó que la prueba falló por la razón provocada y no por otra, y que después de revertir pasó.

**Cómo se comprobó que no quedó nada roto:** los archivos de pruebas de Violeta no están en git, así que se guardó una copia antes de cada cambio y se comparó después (idénticos). El archivo de la aplicación sí está en git y `git diff` confirmó que quedó sin cambios. Después se ejecutó todo de nuevo: 23 de 23 en `npm run cy:violeta` y 1 de 1 en `npm run cy:violeta:componentes`.

**Dos cosas que pasaron en el camino y conviene saber:**
- En el fallo 2, la primera vez las pruebas pasaron aunque el defecto ya estaba escrito: el servidor de desarrollo dentro de Docker en Windows no se había enterado del cambio. Hubo que reiniciar el contenedor del frontend para que lo tomara (y otra vez al revertir).
- En la corrida final, RF02-03 falló sola porque el sistema bloquea un correo después de 5 intentos fallidos en 15 minutos, y esa prueba usaba siempre el mismo correo inexistente. Se corrigió usando un correo distinto en cada ejecución. Está explicado en `FALLOS_PROVOCADOS.md`.

## 3. Pruebas que podrían pasar sin comprobar el comportamiento

### El caso de RF02

La versión original de "rechaza un documento incorrecto" era así:

1. Abría la página.
2. Escribía el correo de Laura y un documento cualquiera (`9876543210`).
3. Comprobaba solo que apareciera `login-error`.

**Por qué era un problema.** Esa prueba no creaba a Laura en la base de datos, porque no llamaba a `cy.escenarioBase()`. El correo no existía, así que el sistema rechazaba el intento por "correo inexistente" y la prueba pasaba. Pero la prueba decía comprobar otra cosa: que el **documento** incorrecto fuera la causa del rechazo. Habría pasado igual si el sistema aceptara documentos incorrectos para cuentas que sí existen, que es justo el fallo que debía detectar. Era una prueba que no podía fallar por la razón que decía vigilar.

También era débil porque solo miraba que hubiera un error, sin el texto del mensaje y sin comprobar que el usuario no hubiera entrado.

**Cómo quedó la corrección** ([rf02_login.cy.js](e2e/violeta/rf02_login.cy.js)):

- Antes de cada caso se llama a `cy.escenarioBase()`, así Laura existe de verdad. Los correos y documentos salen del fixture `usuarios.json`, no están escritos a mano.
- Cada rechazo comprueba tres cosas: el texto exacto "Correo o documento de identidad incorrectos.", que el formulario de login sigue visible y que `nav-perfil` no existe.
- El caso de documento incorrecto (RF02-01) ahora usa el correo real de Laura, así el documento es lo único que cambia.
- Se añadió RF02-02 (correo de Laura con el documento de otra persona, que es válido pero ajeno) y RF02-03 (correo inexistente, con título que lo dice claramente), para que cada causa de rechazo tenga su propio caso.
- Se añadió RF02-04, el caso feliz. Si el login rechazara siempre, los tres negativos pasarían, y solo este lo detecta.

**Limitación que sigue vigente.** Las pruebas RF02-01, 02 y 03 comprueban que el rechazo ocurre y con qué mensaje, pero el mensaje es el mismo en los tres casos. Por eso no distinguen por qué rechazó el sistema. Lo que garantiza que la causa sea el documento es que Laura exista y que el correo sea el suyo.

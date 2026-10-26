# Prueba Stagehand del inicio de sesión (RF02)

Este archivo es una copia de `login-gimnasio.e2e.ts`, la prueba que adaptamos del proyecto de ejemplo del profe (Stagehand) para el login de la app del gimnasio.

## Qué hace la prueba

La IA hace las acciones (escribir y pulsar botones). El código verifica el resultado con texto exacto. Son tres casos, cada uno con un navegador nuevo:

| Caso | La IA hace | El código verifica |
|---|---|---|
| (a) Login correcto | Escribe el correo y el documento del estudiante y pulsa "Ingresar" | Que el botón diga exactamente "Reservar" |
| (b) Documento incorrecto | Lo mismo, con un documento erróneo | Que el mensaje sea exactamente "Correo o documento de identidad incorrectos." |
| (c) Correo gmail en el registro | Abre la pestaña "Registrarse" y escribe un correo gmail | Que el aviso diga exactamente "Ese dominio no es institucional" |

Los datos del estudiante se leen de `regression_testing/cypress/fixtures/usuarios.json` (solo lectura).

## Cómo correrla

Esta carpeta guarda solo la copia del archivo. La prueba **se corre desde la carpeta del ejemplo del profe**, donde están `src/`, `package.json` y `node_modules`:

1. Copia `login-gimnasio.e2e.ts` a la carpeta `tests/` del ejemplo.
2. Agrega este script en el `package.json` del ejemplo:
   `"test:gimnasio": "node --import tsx tests/login-gimnasio.e2e.ts"`
3. Desde la carpeta del ejemplo: `npm run test:gimnasio`

## Qué necesita

- La app corriendo en `http://localhost:5173`, con el backend activo.
- Una clave de Gemini en el `.env` del ejemplo del profe (`GOOGLE_GENERATIVE_AI_API_KEY`).
- Edge o Chrome. Si `CHROME_PATH` no está definido, la prueba usa Edge en su ruta estándar de Windows.
- Si cambió el lugar del repo, la ruta de los datos de prueba se puede cambiar con `GIMNASIO_FIXTURES`.

## Importante

- **No incluye ninguna clave.** Tampoco se copió ningún `.env` ni `node_modules`. La clave va solo en el `.env` del ejemplo del profe, que no se sube a git.
- Tras 5 intentos fallidos con el mismo correo, el backend lo bloquea 15 minutos. Cada ejecución hace un solo intento fallido.
- Estado de los casos: ver la sección Stagehand de [IA_HERRAMIENTAS.md](../regression_testing/IA_HERRAMIENTAS.md).

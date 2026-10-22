# Prueba E2E frente a prueba de componente (login, RF02)

Se comparan dos pruebas del mismo requisito, el inicio de sesión:

- **E2E:** [e2e/violeta/rf02_login.cy.js](e2e/violeta/rf02_login.cy.js)
- **Componente:** [component/violeta/Login.cy.jsx](component/violeta/Login.cy.jsx)

| Aspecto | E2E (`rf02_login.cy.js`) | Componente (`Login.cy.jsx`) |
|---|---|---|
| **Qué recorre** | La aplicación completa en el navegador: abre la página, escribe en el formulario, la app llama al servidor, el servidor consulta la base de datos y la pantalla cambia. | Solo el formulario `Login`, montado solo en una página vacía. No hay barra de navegación ni resto de la app. |
| **Qué necesita para correr** | Frontend, backend y base de datos encendidos. Antes de cada caso crea las cuentas de prueba (`cy.escenarioBase()`). | Nada más que el frontend de Cypress. No necesita backend ni base de datos. |
| **Qué simula** | Nada: usa el servidor y la base reales. | La respuesta del servidor. Con `cy.intercept` se inventa un 401 con el mensaje "Correo o documento de identidad incorrectos.". |
| **Velocidad** | Cada caso carga la app, borra y crea usuarios y espera al servidor. Los 4 casos de RF02 tardaron entre 2,0 y 3,2 s cada uno (10,7 s en total) en una corrida y entre 5,1 y 8,9 s cada uno (26,2 s en total) en la última. | COMP-RF02-01 aprobada en 2,1 s en una corrida y 2,5 s en la última; la corrida completa, con el arranque de Cypress, duró 2,7 s. |
| **Qué errores detecta** | - El servidor acepta un documento incorrecto o de otra persona.<br>- El servidor dice que existe un correo que no existe.<br>- El mensaje del servidor cambia.<br>- La app deja entrar sin credenciales válidas.<br>- Falla algo entre pantalla, servidor y base. | - El formulario no envía el correo y el documento que se escribieron.<br>- El formulario no muestra el error que recibe.<br>- El formulario avisa de un inicio de sesión que no ocurrió.<br>- Cambian los `data-cy` del formulario. |
| **Qué errores NO detecta** | Es difícil saber en cuál capa está el fallo (pantalla, servidor o base). Es frágil si el servidor está apagado o los datos de prueba están mal. | Todo lo del servidor. Si el servidor aceptara un documento incorrecto, esta prueba pasaría igual, porque la respuesta es inventada. Tampoco prueba que la app cambie de pantalla al entrar. |

## Cuándo usar cada una

- **E2E** para confirmar que el sistema completo cumple el requisito: el rechazo lo decide de verdad el servidor.
- **Componente** para confirmar que la pantalla hace bien su parte (enviar lo escrito y mostrar el error), rápido y sin montar todo el sistema.

Se complementan: la de componente dice que el formulario hace bien su trabajo, y la E2E dice que el sistema entero lo hace.

## Resultado de la ejecución

COMP-RF02-01 se ejecutó con `npm run cy:violeta:componentes` y quedó **aprobada** (1 de 1, 2,1 s en la primera corrida y 2,5 s en la última). Informe: [reports/violeta-componentes/index.html](reports/violeta-componentes/index.html).

El arreglo que permitió ejecutarla fue un puente de soporte (`frontend/cypress-puente/component.js`) con una configuración propia (`frontend/cypress.violeta.config.js`), por un problema con la ruta en Windows. **Solo aplica a este script**: `cypress.config.js` no se tocó, y las pruebas de componentes de regresión de otras personas (`npm run cy:componentes`) siguen fallando en Windows.

## Qué tan justa es la comparación de velocidad

No del todo:

- **Distinta cantidad de casos.** El componente tiene 1 caso y la E2E tiene 4. Caso por caso, en la primera corrida la diferencia fue pequeña (2,1 s contra 2,0 a 3,2 s). En la última, con la máquina más lenta, cada caso E2E tardó de 5,1 a 8,9 s y el de componente 2,5 s.
- **Las E2E cambian mucho de una corrida a otra.** Dependen del servidor, de la base de datos y del estado de la máquina. La de componente casi no cambió (2,1 s y 2,5 s).
- **Pocas mediciones.** Son dos corridas de cada una, así que no alcanzan para dar un número exacto.

Lo que sí se puede decir: la prueba de componente no necesita backend ni base de datos, y su tiempo fue más estable. Que sea siempre más rápida que una E2E no queda demostrado con un solo caso de componente. Para afirmarlo habría que escribir más casos y repetir las mediciones.

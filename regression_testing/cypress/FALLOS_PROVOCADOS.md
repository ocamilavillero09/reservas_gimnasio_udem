# Fallos provocados

## Resumen en 5 líneas

1. Una prueba de software es como un guardia: revisa que algo esté bien y avisa si no lo está.
2. Un **fallo provocado** es romper algo a propósito, un poquito, para ver si el guardia de verdad avisa.
3. Si rompemos algo y la prueba sigue en verde, la prueba no sirve: no vigila lo que dice vigilar.
4. Si la prueba se pone en rojo y dice con claridad qué pasó, sabemos que funciona y que podemos confiar en ella.
5. Después de cada experimento se deshace el cambio y se comprueba que todo vuelve a la normalidad.

## Antes de leer los fallos: tres palabras

- **Prueba:** un guion que hace Cypress solo. Abre la página, escribe, hace clic y revisa lo que ve.
- **Aplicación:** el programa que se está probando (la página del gimnasio).
- **`data-cy`:** una etiqueta invisible que se le pone a un botón o a un texto para que la prueba lo encuentre. Es como el número de un asiento en el cine: la prueba dice "voy al asiento `login-submit`" y no tiene que adivinar cuál es.

## Cómo se hicieron

En cada fallo se siguieron los mismos pasos:
1. Se cambió **un solo archivo**, con el cambio más pequeño posible.
2. Se ejecutó solo la prueba afectada, guardando el informe, el video y las capturas en una carpeta propia del fallo.
3. Se comprobó que fallara **por la razón provocada** y no por otra.
4. Se devolvió el archivo a su estado original, se comprobó que era idéntico y se volvió a ejecutar la prueba: pasó.

Los archivos de pruebas de Violeta todavía no están en git, así que para comprobar que quedaron idénticos se guardó una copia antes de cada cambio y se comparó después. El archivo de la aplicación sí está en git, y `git diff` confirmó que quedó sin cambios.

---

## Fallo 1: error en la prueba

**1. ¿Qué rompimos y por qué?**
En la prueba E2E-RF02-04 (Laura entra con sus datos correctos) cambiamos el nombre que la prueba espera ver arriba, en la barra. Antes era el nombre de Laura sacado de los datos de prueba, "Laura Estudiante". Lo cambiamos a mano por "Laura Gomez". Es como si el guardia buscara a alguien con un nombre equivocado.
La aplicación no se tocó.

**2. ¿Qué esperaba la prueba y qué encontró?**
- Esperaba ver el nombre "Laura Gomez".
- Encontró "Laura Estudiante".

**3. ¿Por qué falló?**
Porque lo que la prueba pedía estaba mal escrito. La aplicación mostraba el nombre correcto.

**4. ¿Cómo sé si el problema estaba en la prueba o en la aplicación?**
Regla para decir en voz alta: *"Miro la captura de pantalla. Si la aplicación se ve bien y lo que se ve es lo que debería verse, el error estaba en lo que escribió la prueba."*
Aquí la captura muestra a Laura dentro de la aplicación, con su nombre real. Lo que no coincide es el nombre que se había escrito en la prueba.

**5. ¿Dónde está la evidencia?** (rutas desde `regression_testing/cypress/`)
- Informe: `reports/violeta-fallo-1/index.html`
- Video: `evidencias/violeta-fallo-1/videos/rf02_login.cy.js.mp4`
- Captura: `evidencias/violeta-fallo-1/capturas/rf02_login.cy.js/` (el archivo termina en "(failed).png")

**Resultado:** 3 pruebas pasaron y 1 falló (la RF02-04). Después de revertir, las 4 pasaron.

**Línea que cambió:**
- Antes: la prueba esperaba el nombre que viene de los datos de prueba (el de Laura).
- Después: la prueba esperaba el texto "Laura Gomez".

---

## Fallo 2: defecto en la aplicación

**1. ¿Qué rompimos y por qué?**
En la pantalla de perfil de la estudiante, la aplicación muestra cuántas inasistencias (faltas) tiene. Cambiamos esa cuenta para que mostrara **una de más**. Es como una balanza que siempre marca un kilo extra: la persona no pesa eso, pero el número en pantalla sí.
El cambio se hizo en la aplicación, no en las pruebas. Fue en el archivo del perfil, en la línea que decide qué número mostrar.

**2. ¿Qué esperaba la prueba y qué encontró?**
Fallaron cuatro pruebas de RF15, cada una por el mismo motivo:

| Prueba | Esperaba | Encontró |
|---|---|---|
| E2E-RF15-01 | 0 | 1 |
| E2E-RF15-02 | 5 | 6 |
| E2E-RF15-04 | 3 | 4 |
| E2E-RF15-05 | 2 | 3 |

La quinta, E2E-RF15-03, siguió pasando: esa prueba mira la pantalla del entrenador, que no usa ese contador.

**3. ¿Por qué falló?**
Porque la aplicación mostraba un número distinto al que tenía guardado la estudiante. Las pruebas pusieron en la base de datos un número conocido y la pantalla mostró otro.

**4. ¿Cómo sé si el problema estaba en la prueba o en la aplicación?**
Regla para decir en voz alta: *"Si el número que esperaba la prueba es el correcto y la pantalla muestra otro, el error está en la aplicación."*
Aquí la prueba dejó a la estudiante con 3 faltas y esperaba ver 3. Lo correcto era 3, así que la que se equivocaba era la pantalla.

**Una lección extra:** un solo defecto hizo fallar cuatro pruebas a la vez. Cuando varias pruebas fallan juntas con el mismo tipo de mensaje, suele ser una sola causa común, y conviene buscarla antes de revisar cada prueba por separado.

**5. ¿Dónde está la evidencia?**
- Informe: `reports/violeta-fallo-2/index.html`
- Video: `evidencias/violeta-fallo-2/videos/rf15_inasistencias.cy.js.mp4`
- Capturas: `evidencias/violeta-fallo-2/capturas/rf15_inasistencias.cy.js/` (cuatro archivos, uno por prueba fallida)

**Resultado:** 1 prueba pasó y 4 fallaron. Después de revertir, las 5 pasaron.

**Línea que cambió:**
- Antes: el contador mostraba el número de inasistencias tal cual.
- Después: el contador mostraba ese número más uno.

**Algo que pasó en el camino.** La primera vez que se probó, **las 5 pruebas pasaron**, aunque el defecto ya estaba escrito. Eso no era un resultado válido: el servidor de desarrollo de la aplicación, que corre dentro de Docker en Windows, no se había enterado del cambio y seguía mostrando la versión vieja. Para que la aplicación en marcha tuviera el defecto hubo que reiniciar el contenedor del frontend (solo ese, sin tocar la base de datos). Se reinició otra vez al revertir, para que volviera a mostrar el código original. Esto sirve para recordar que **hay que comprobar que el cambio llegó a la aplicación que se está probando**. Si no, un "todo pasa" no significa nada.

---

## Fallo 3: elemento no encontrado

**1. ¿Qué rompimos y por qué?**
En la prueba E2E-RF02-01 (rechazo con documento incorrecto) cambiamos la etiqueta con la que la prueba busca el botón de entrar. Antes buscaba `login-submit`, y la pusimos `login-enviar`, que no existe. Es como decirle al guardia que busque el asiento "Z99" en un cine que solo llega a la fila F.
La aplicación no se tocó.

**2. ¿Qué esperaba la prueba y qué encontró?**
- Esperaba encontrar un botón con la etiqueta `login-enviar` para hacerle clic.
- No encontró nada con esa etiqueta. Esperó 8 segundos y se rindió.

**3. ¿Por qué falló?**
Porque la prueba buscó algo que no existe en la pantalla, así que nunca pudo hacer clic.

**4. ¿Cómo sé si el problema estaba en la prueba o en la aplicación?**
Regla para decir en voz alta: *"Si el mensaje dice 'no encontré el elemento', miro la captura. Si el elemento se ve en la pantalla pero la prueba lo llama con otro nombre, el error está en la prueba. Si el elemento ya no existe en la pantalla, el error está en la aplicación."*
Aquí la captura muestra el botón "Ingresar" bien visible, así que lo que estaba mal era el nombre que usó la prueba.

**5. ¿Dónde está la evidencia?**
- Informe: `reports/violeta-fallo-3/index.html`
- Video: `evidencias/violeta-fallo-3/videos/rf02_login.cy.js.mp4`
- Captura: `evidencias/violeta-fallo-3/capturas/rf02_login.cy.js/` (el archivo termina en "(failed).png")

**Resultado:** 3 pruebas pasaron y 1 falló (la RF02-01). Después de revertir, las 4 pasaron.

**Línea que cambió:**
- Antes: la prueba hacía clic en el elemento `login-submit`.
- Después: la prueba hacía clic en el elemento `login-enviar`.

---

## Comparar los tres fallos

Los fallos 1 y 3 tienen el error en la prueba y el fallo 2 en la aplicación, pero por fuera se parecen: en los tres, la prueba se pone en rojo. Lo que cambia es **qué dice el mensaje**.

| Lo que dice el mensaje | Qué suele significar |
|---|---|
| "Esperaba X pero encontré Y" y X es lo correcto | La aplicación se equivoca (fallo 2) |
| "Esperaba X pero encontré Y" y X estaba mal escrito | La prueba se equivoca (fallo 1) |
| "No encontré el elemento" | Mirar la captura para saber si cambió el nombre o desapareció (fallo 3) |

## Tabla resumen

| Fallo | Tipo | ¿Quién tenía el error? | Resultado |
|---|---|---|---|
| 1 | Expectativa equivocada (nombre esperado) | La prueba | 1 de 4 falló (RF02-04), por la razón provocada. Revertido: 4 de 4 pasan |
| 2 | Defecto de la aplicación (contador con uno de más) | La aplicación | 4 de 5 fallaron (RF15-01, 02, 04 y 05), por la razón provocada. Revertido: 5 de 5 pasan |
| 3 | Elemento no encontrado (etiqueta equivocada) | La prueba | 1 de 4 falló (RF02-01), por la razón provocada. Revertido: 4 de 4 pasan |

## Un hallazgo extra: una prueba que fallaba a veces

Al hacer la corrida final de todas las pruebas, **E2E-RF02-03 falló sin que nadie hubiera roto nada**. No era uno de los tres fallos provocados.

- **Qué pasó:** la prueba esperaba el mensaje "Correo o documento de identidad incorrectos." y encontró "Demasiados intentos fallidos. Por seguridad, espera 15 minutos antes de volver a intentarlo."
- **Por qué:** la aplicación tiene un candado de seguridad: si alguien se equivoca 5 veces seguidas con el mismo correo en 15 minutos, ese correo se bloquea. La prueba usaba siempre el mismo correo que no existe, y ese contador no se borra al limpiar la base de datos (solo se borra cuando se registra una cuenta, y esa cuenta nunca existió). Como hoy se ejecutó muchas veces seguidas, el correo llegó a 5 intentos y quedó bloqueado.
- **De quién era el error:** de la prueba, que dependía de algo que quedaba guardado de una ejecución a otra. La aplicación hizo bien su trabajo.
- **Cómo se arregló:** la prueba ahora usa un correo distinto en cada ejecución (con la hora como parte del correo), así que nunca comparte contador con otra ejecución. Después se volvió a correr todo y pasaron las 23.
- **Lección:** una buena prueba no debe depender de lo que dejó la anterior. Si pasa a veces y falla a veces sin que cambie nada, hay que buscar qué estado se está arrastrando.

Esta es la regla de arriba aplicada: el mensaje decía "esperaba X y encontré Y", pero X estaba bien. Lo que cambió fue el estado de la aplicación, y la causa estaba en cómo se había armado la prueba.

## Comprobaciones después de revertir

Tras cada fallo se volvió a ejecutar la prueba afectada, y los resultados quedaron en `reports/violeta-verificacion/` y `evidencias/violeta-verificacion/`. Esa carpeta se sobrescribe con cada comprobación, así que solo guarda la última (la del fallo 3). Al final se ejecutó todo `npm run cy:violeta` y `npm run cy:violeta:componentes`; los resultados están en `MATRIZ_VIOLETA.md`.

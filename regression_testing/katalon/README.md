# Pruebas E2E con Katalon Recorder — RF11, RF12, RF13, RF16, RF20 y RF21

Dos suites para Katalon Recorder. Siguen las convenciones de la grabación de RF03 del equipo: cada caso empieza con la sesión limpia, los campos se llenan con `runScript` y los resultados se verifican sobre `id=toast-mensaje`.

| Archivo | Cuándo se corre | Casos |
|---|---|---|
| `00_preparacion.krecorder` | **El día anterior**: crea 4 cuentas y deja 2 reservas para el día siguiente a las 06:00 | 6 |
| `E2E_RF11_RF21.krecorder` | **El día de la reserva**, después de las 06:00 | 11 |

## Por qué en dos días

Un estudiante solo puede reservar para el día siguiente (RN05) y el entrenador solo puede registrar la asistencia el mismo día de la reserva, desde que empieza el bloque (RN12). Por eso las reservas se hacen un día y las pruebas al siguiente.

**En esta ejecución** las pruebas se corrieron el mismo día de la preparación. Para eso, las dos reservas de prueba se pasaron a la fecha del día directamente en la base de datos, preparando así los datos de prueba:

```bash
docker compose exec database mongosh gym_udem --quiet --eval 'const hoy=new Date().toLocaleDateString("en-CA",{timeZone:"America/Bogota"}); printjson(db.reservations.updateMany({email:/^katalon\.est/},{$set:{reserva_date:hoy,date:hoy}}))'
```

Solo cambia las reservas de las cuentas `katalon.est…`; el resto de la aplicación no se toca.

## Datos que usan

| Rol | Nombre | Correo | Documento |
|---|---|---|---|
| Entrenador | Katalon Entrenador | katalon.entrenador@udem.edu.co | 1090000001 |
| Administrador | Katalon Administrador | katalon.admin@udemedellin.edu.co | 1090000002 |
| Estudiante | Katalon Estudiante Uno | katalon.est1@soyudemedellin.edu.co | 1090000003 |
| Estudiante | Katalon Estudiante Dos | katalon.est2@soyudemedellin.edu.co | 1090000004 |

Los casos de RF13 y RF16 verifican cifras exactas (1 asistencia, 1 inasistencia). Por eso, el día de la prueba nadie más debe tener reserva en esa base de datos.

## Casos

Cada caso termina con `captureEntirePageScreenshot`. El nombre de la captura es el ID del caso. Las suites se corren en este orden, porque cada caso parte del anterior: RF11 registra la asistencia del estudiante 1, RF13 cierra la jornada con el estudiante 2 como inasistente y RF16 cuenta las dos.

| ID | RF | Objetivo | Resultado esperado | Resultado obtenido | Evidencia |
|---|---|---|---|---|---|
| KT-RF11-01 | RF11 | El entrenador busca al estudiante 1 por documento y registra su asistencia | Aparece la reserva marcada "HOY" y el aviso "Asistencia registrada para las 06:00…" | | KT-RF11-01.png |
| KT-RF11-02 | RF11 | Validar un documento con letras (`12ab`) | Error debajo del campo: "El documento tiene 10 dígitos…", sin consultar al servidor | | KT-RF11-02.png |
| KT-RF11-03 | RF11 | Buscar un documento que no existe (`9999999999`) | Aviso "No hay ningún estudiante registrado con el documento 9999999999." | | KT-RF11-03.png |
| KT-RF12-01 | RF12 | Ver los pendientes y filtrarlos | Aparece el estudiante 2 y no el 1, que ya asistió; el filtro por documento lo encuentra y uno inexistente lo oculta | | KT-RF12-01.png |
| KT-RF13-01 | RF13 | El administrador consulta los pendientes | Ve al estudiante 2, pero no tiene el botón "Cerrar jornada" | | KT-RF13-01.png |
| KT-RF13-02 | RF13 | El entrenador cierra la jornada | Aviso "Se procesaron 1 inasistencias…" y la tabla queda en "No hay estudiantes pendientes" | | KT-RF13-02.png |
| KT-RF16-01 | RF16 | Consultar el registro diario | Asistencias = 1 e Inasistencias = 1 | | KT-RF16-01.png |
| KT-RF20-01 | RF20 | El estudiante envía un reporte desde "Historial" | Aviso "Tu reporte llegó al administrador. Gracias por avisar." | | KT-RF20-01.png |
| KT-RF20-02 | RF20 | Intentar enviar un mensaje vacío | El botón "Enviar al administrador" está deshabilitado y el contador marca 0/2000 | | KT-RF20-02.png |
| KT-RF21-01 | RF21 | El administrador abre el buzón | Aparece el mensaje con el nombre del estudiante 1 | | KT-RF21-01.png |
| KT-RF21-02 | RF21 | El administrador borra el mensaje | Aviso "Mensaje borrado del buzón." y el mensaje desaparece | | KT-RF21-02.png |

En **Resultado obtenido** se anota "Pasó" o "Falló". Si falló, se agrega el paso y el mensaje que mostró Katalon Recorder. Un fallo también es un resultado válido: se documenta tal cual, con su explicación.

## Ejecución

| Fecha | Quién | Suite | Resultado | Log |
|---|---|---|---|---|
| | | 00_preparacion | /6 | |
| | | E2E_RF11_RF21 | /11 | |

## Notas técnicas

- **Campos de texto.** Se llenan con `runScript` usando el setter nativo, igual que en RF03. Con `type`, React no siempre registra el valor.
- **Pausa inicial.** Cada caso espera 2 s después de abrir la página antes de borrar la sesión. Si se borra antes, la aplicación vuelve a guardar la sesión anterior y el caso arranca con otro usuario dentro.
- **Confirmaciones.** "Cerrar jornada" y "Borrar" piden confirmación del navegador; `chooseOkOnNextConfirmation` la acepta. Si la versión de Katalon Recorder no reconoce ese comando, se reemplaza por `runScript` con `window.confirm = function(){return true;};` en la misma posición.
- **Validación previa.** Antes de entregarlas, las suites se ejecutaron con un intérprete equivalente sobre la aplicación con una base vacía, simulando los dos días: 6/6 y 11/11, tres veces seguidas. La evidencia oficial son las ejecuciones del equipo en Katalon Recorder.

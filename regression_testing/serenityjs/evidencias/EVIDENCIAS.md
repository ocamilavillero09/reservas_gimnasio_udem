# Evidencias de las pruebas Gherkin (Serenity/JS + Cucumber)

Cada archivo `.html` es el reporte que genera Cucumber en una corrida. La primera corrida es la prueba normal (todo debe pasar). Las otras tres son fallos provocados a propósito: se cambió una sola línea del `.feature` para que el resultado esperado fuera incorrecto y se comprobó que la prueba lo detecta. Después de cada fallo el archivo se devolvió a su contenido original.

| Archivo de evidencia | Escenario | Qué cambié | Esperado | Obtenido | Resultado |
|---|---|---|---|---|---|
| `aprobado_violeta.html` | Los 16 escenarios con la etiqueta `@violeta` | sin cambios | Todos los escenarios pasan | 16 de 16 exitosos | 16 de 16 exitosos |
| `fallido_1_contador.html` | Reporte de inasistencias de una estudiante penalizada (RF15 alterno) | `el contador de inasistencias debe ser "5"` por `"4"` | 4 | 5 | Falló solo este escenario (1 fallido, 2 exitosos de los 3 con `@rf15`) |
| `fallido_2_aviso.html` | Actualizar los datos del perfil de estudiante (RF03) | `debe ver el aviso "Perfil actualizado."` por `"Perfil guardado."` | Perfil guardado. | Perfil actualizado. | Falló solo este escenario (1 fallido, 1 exitoso de los 2 con `@rf03`). El perfil de Ana quedó restaurado (edad 19, peso 65, altura 165, objetivo "Ganar resistencia") |
| `fallido_3_rol.html` | El entrenador ve los datos de su perfil (RF04) | `debe ver el rol "Entrenador"` por `"Estudiante"` | Estudiante | Entrenador | Falló solo este escenario (1 fallido, 1 exitoso de los 2 con `@rf04`) |

## Notas

- Comando usado: `npx -y node@22 node_modules/@cucumber/cucumber/bin/cucumber.js --tags "<etiqueta>" --format html:evidencias/<archivo>.html`, desde `regression_testing/serenityjs`.
- Antes de las corridas se reinició el backend y se cargó `database/seed_e2e.js` para dejar las cuentas demo y el bloqueo de login en su estado inicial.
- Los valores Esperado/Obtenido se copiaron de la salida de Cucumber (`Expected string` / `Received string`).
- El archivo `features/violeta-e2e.feature` quedó idéntico a como estaba antes de empezar (15 inserciones y 4 eliminaciones sin commit).

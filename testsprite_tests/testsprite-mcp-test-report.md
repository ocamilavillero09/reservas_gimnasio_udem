# Reporte TestSprite — RF01 (registro) y RF02 (inicio de sesión)

## 1️⃣ Document Metadata
- **Proyecto:** reservas_gimnasio_udem (solo frontend, http://localhost:5173)
- **Fecha:** 2026-10-25
- **Alcance:** únicamente RF01 y RF02
- **Plan:** `testsprite_frontend_test_plan.json` (corregido a mano; el original está en `testsprite_frontend_test_plan.ORIGINAL.json`)
- **Créditos:** 150 → 144 (6 gastados en la corrida completa)

## 2️⃣ Requirement Validation Summary

### RF01 — Registro de usuario
| Caso | Qué verifica | Resultado | Calidad de la verificación |
|---|---|---|---|
| TC001 | Registra una cuenta de estudiante única y entra con ella | ✅ Pasó | **Débil**: solo comprueba que aparezca el botón "Reservar". No comprueba "¡Registro exitoso!" |
| TC006 | Rechaza `@gmail.com` | ✅ Pasó | **Parcialmente vacía**: la 2.ª aserción busca "correo institucional", texto que ya está en el subtítulo de la pestaña. Solo la 1.ª ("Ese dominio no es institucional") tiene valor |
| TC007 | Rechaza un correo ya registrado | ✅ Pasó | Buena (texto exacto), pero no comprueba que no aparezca "Registro exitoso" |
| TC008 | El aviso en vivo dice "Entrarás como ESTUDIANTE" | ✅ Pasó | Buena; falta el chequeo de que NO diga "no es institucional" |
| TC009 | Rechaza documento de 9 dígitos | ✅ Pasó | Buena (texto exacto del servidor) |
| TC011 | Las letras del documento se descartan | ✅ Pasó | Buena (`to_have_value("1234567890")`) |
| TC012 | Rechaza `@hotmail.com` | ✅ Pasó | Buena (aviso + "Debes usar un correo institucional válido") |
| TC013 | Rechaza `@outlook.com` | ✅ Pasó | Buena (igual que TC012) |

### RF02 — Inicio de sesión
| Caso | Qué verifica | Resultado | Calidad de la verificación |
|---|---|---|---|
| TC003 | Entra con la cuenta de Laura (fixtures) | ✅ Pasó | Débil: solo el botón "Reservar" |
| TC004 | Documento incorrecto → mensaje exacto | ✅ Pasó | Buena (texto exacto + formulario sigue visible) |
| TC005 | Correo no registrado → mensaje exacto | ✅ Pasó | Buena |
| TC010 | Documento vacío → mensaje exacto | ✅ Pasó | Buena |

## 3️⃣ Coverage & Matching Metrics
- 12 de 12 pasaron (100 %). **Ningún defecto real de la aplicación encontrado.**
- Fallos de la prueba generada: 0 que hicieran fallar la corrida, pero sí hay aserciones débiles/vacías (TC001, TC003, TC006).
- Todas las aserciones llevan el comentario `Assert-outcome: not verified — the export-time check could not be evaluated` (TestSprite no pudo evaluarlas al exportar; sí se ejecutaron y pasaron).
- Todas las aserciones negativas del plan ("NO aparece ¡Registro exitoso!", "ya no se ve el formulario de login") **se perdieron** al generar el código.

## 4️⃣ Key Gaps / Risks
- El plan automático ignoró los datos pedidos (inventó cuentas inexistentes, creaba 4 cuentas) y se corrigió a mano antes de ejecutar.
- Se creó **una** cuenta real que no se puede borrar desde aquí: `testsprite.rf01.202610252200@soyudemedellin.edu.co`. Repetir TC001 exige correo y documento nuevos (el documento 9000000001 ya quedó usado).
- No se probó: bloqueo tras 5 intentos fallidos, registro de entrenador/administrador, correo con mayúsculas/espacios, sesión al recargar (F5).

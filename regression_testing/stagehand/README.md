# Pruebas con Stagehand — RF11, RF12, RF13, RF16, RF20 y RF21

Stagehand (v4.2.1) controla un navegador con instrucciones en lenguaje natural apoyadas por un modelo de lenguaje. Cada prueba usa sus tres capacidades:

| Capacidad | Para qué se usa aquí |
|---|---|
| `observe()` | Localiza elementos y devuelve selectores reales sin actuar: los botones "Registrar asistencia", "Cerrar jornada" y "Enviar al administrador". En el login, el correo y el documento se escriben con sus selectores `data-cy`, así que **las credenciales nunca llegan al modelo**. |
| `act()` | Ejecuta acciones descritas en texto: buscar un documento, registrar la asistencia, cerrar la jornada, enviar y borrar mensajes. |
| `extract()` | Lee datos de la página validados con un esquema de zod: la tabla de pendientes, los cuatro totales del registro diario y los mensajes del buzón. Los avisos emergentes duran 5 s y las llamadas al modelo van espaciadas por la cuota, así que esos se leen directamente (`leerAviso`). |

Las aserciones se hacen sobre lo extraído **y sobre la base de datos** (estado de la reserva, contador de inasistencias, mensajes guardados). No basta con que el modelo "crea" que algo pasó.

## Casos

| ID | Requisitos | Qué verifica |
|---|---|---|
| SH-RF12-RF11 | RF12, RF11, RF16 | Extrae el pendiente con su documento, registra la asistencia, la reserva queda COMPLETADA y el registro diario marca 1 asistencia |
| SH-RF11-02 | RF11 (error) | Un documento inexistente muestra el error del servidor |
| SH-RF13 | RF13, RF16 | Cierra la jornada, el texto de la confirmación es correcto, se suma 1 inasistencia en la base y en el registro |
| SH-RF20 | RF20 | La estudiante envía un reporte y queda guardado |
| SH-RF21 | RF21 | La administradora extrae el mensaje (autor, correo y texto), lo borra y el buzón queda vacío |

Stagehand no maneja los diálogos nativos `confirm()`. La prueba los acepta desde la página (`aceptarConfirmaciones` en `soporte.mjs`) y guarda su texto para verificarlo.

## Cómo ejecutarlas

```bash
docker compose up -d                       # desde la raíz
cd regression_testing/stagehand
npm install
cp .env.example .env                       # y pon tu clave en LLM_API_KEY
npm test
```

`MODELO` acepta `google/…`, `openai/…` o `anthropic/…`. El valor por defecto es `google/gemini-3-flash-preview`, que tiene capa gratuita en Google AI Studio. Esa capa admite 5 peticiones por minuto, así que las pruebas dejan 13 s entre llamadas al modelo (`LLM_INTERVALO_MS`) y la ejecución completa tarda unos 6 minutos. Google retiró `gemini-2.5-flash` para las cuentas nuevas; si un modelo deja de estar disponible, cambia `MODELO` en el `.env`.

> ⚠️ Las pruebas borran usuarios, reservas y mensajes de la base. Úsenlas solo con la base de pruebas.

## Evidencias

- `evidencias/*.png`: captura de cada paso clave.
- `evidencias/resultados.json`: lo que devolvieron `observe()` y `extract()` en cada caso, con el modelo y la fecha.
- La salida de `npm test`, guardada con `mkdir -p evidencias && npm test | tee evidencias/ejecucion.txt`.

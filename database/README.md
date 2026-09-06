# Capa de base de datos

MongoDB 6.0. Base de datos `gym_udem`.

## Qué hace esta capa y qué no

Esta carpeta contiene **estructura, no comportamiento**. Es el requisito no
funcional RNF06 del proyecto.

**Sí vive aquí**

- La creación de las colecciones
- Los validadores de esquema
- Los índices
- Los datos de prueba
- Consultas de solo lectura para inspeccionar el sistema

**No vive aquí**

Ninguna función que cree, modifique o decida sobre una reserva. Las doce reglas
de negocio están implementadas una sola vez, en el backend, en Python.

La versión anterior de `queries.js` implementaba en JavaScript decidir si
alguien podía reservar, crear la reserva y cancelarla. Además lo hacía con otra
regla: permitía **dos** reservas activas por persona, una para hoy y otra para
mañana, con un caso especial de viernes a lunes. Eso contradice las reglas RN04
y RN05. Nada lo llamaba, así que era código muerto que documentaba reglas
falsas. Por eso se retiró.

## Archivos

| Archivo | Para qué sirve | Cuándo se ejecuta |
|---|---|---|
| `init.mongodb.js` | Crea las colecciones con sus validadores e índices y carga los seis bloques horarios | Automático, al arrancar el contenedor sobre un volumen vacío |
| `validations.js` | Vuelve a aplicar los validadores sobre una base que ya existe, sin borrar datos | A mano, cuando cambia el esquema |
| `indexes.js` | Crea y lista los índices | A mano; es idempotente |
| `seed.js` | Carga cuentas, reservas y sugerencias de demostración | A mano, en desarrollo |
| `queries.js` | Consultas de inspección, todas de solo lectura | A mano |
| `schema.json` | Documentación del esquema, campo por campo | Referencia |

```bash
mongosh mongodb://localhost:27017 database/validations.js
mongosh mongodb://localhost:27017 database/indexes.js
mongosh mongodb://localhost:27017 database/seed.js
mongosh mongodb://localhost:27017 database/queries.js
```

## Colecciones

| Colección | Contenido |
|---|---|
| `users` | Personas del sistema, sin importar su rol |
| `slots` | Catálogo de los seis bloques horarios. Es fijo y no guarda cupos |
| `disponibilidad` | Cupos libres de cada bloque en cada jornada |
| `reservations` | Reservas, con su fecha, su bloque y su desenlace |
| `suggestions` | Buzón de sugerencias (RF20 y RF21) |

### Por qué la disponibilidad está separada del catálogo

Los cupos vivían antes en el propio bloque, con un solo contador para todos los
días. Como solo se descontaba al reservar y solo se reponía al cancelar, una
asistencia o una inasistencia consumían el cupo de forma permanente. Tras veinte
reservas ese bloque quedaba lleno para siempre y nadie podía volver a reservarlo
ningún día.

Ahora hay un documento por cada fecha y bloque. Cada jornada arranca con su
aforo completo y se crea la primera vez que alguien la consulta o reserva.

Los campos declarados son exactamente los que escribe el backend. Antes no era
así: el script creaba `users` con nombres en español y un validador que exigía
`nombre`, `correo_institucional`, `rol` y `fecha_creacion`, mientras el backend
insertaba `name`, `email`, `role` y `created_at`. Sobre un volumen nuevo el
registro fallaba por validación de esquema. Además creaba `schedules`,
`audit_log` y `configuration`, que el backend nunca usó.

## Reglas que la base de datos respalda por sí misma

Un validador o un índice no reemplazan a la regla de negocio, que sigue estando
en el backend. Son una segunda barrera para que un error de programación no
llegue a corromper los datos.

| Regla | Cómo la respalda la base de datos |
|---|---|
| RN01 El dominio del correo determina el rol | El patrón del campo `email` solo admite los tres dominios institucionales |
| RN02 El documento es la credencial | `documento` es único y el patrón de `password` exige el formato cifrado, de modo que no se pueda guardar en claro |
| RN03 Bloques de dos horas en horas pares | `hour` es una enumeración con las seis horas; no admite ninguna otra |
| RN04 Reserva para el día siguiente | La disponibilidad se guarda por fecha, así que el aforo de una jornada no se mezcla con el de otra |
| RN05 Una reserva por estudiante por día | Índice único parcial sobre correo y fecha, limitado a las reservas en estado `ACTIVA` |
| RN06 Sin sobrecupo | `cupos_disponibles` no admite valores negativos, así que un descuento de más es rechazado. Un índice único sobre fecha y bloque impide crear dos veces la misma jornada |

## Tipos numéricos

`mongosh` guarda un número suelto como decimal, y los validadores exigen
enteros. Por eso los scripts de esta carpeta usan `NumberInt()` en los campos
enteros. El backend en Python ya escribe enteros de 32 bits, de modo que las dos
capas guardan exactamente el mismo tipo.

## Pendiente

- Las colecciones `slots` y `disponibilidad` se llaman `bloques` y
  `disponibilidad` en el modelo de análisis v2.0. El nombre de la primera queda
  pendiente de unificar.

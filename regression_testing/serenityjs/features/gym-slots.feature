# language: es

Característica: Pruebas de regresión del gimnasio
  Como estudiante o usuario autorizado
  Quiero validar las operaciones del sistema de reservas
  Para comprobar que se cumplen los requisitos funcionales

  # RF06 — Consultar horarios y cupos (2 casos)
  Escenario: Consultar los seis horarios del día siguiente (RF06_C2)
    Cuando consulto los horarios del gimnasio
    Entonces la respuesta debe ser exitosa
    Y deben aparecer seis horarios
    Y cada horario debe informar sus cupos disponibles y totales

  Escenario: Consultar horarios sin incluir bloques fuera del catálogo (RF06_C1)
    Cuando consulto los horarios del gimnasio
    Entonces la respuesta debe ser exitosa
    Y no deben aparecer bloques fuera del catálogo

  # RF07 — Reservar mañana (9 casos)
  Escenario: Rechazar una reserva cuando faltan los datos obligatorios (RF07_C1)
    Cuando intento reservar sin proporcionar los datos obligatorios
    Entonces la respuesta de la reserva debe ser un error 400

  Escenario: Rechazar la reserva cuando el estudiante no existe (RF07_C2)
    Cuando intento reservar con un correo de estudiante inexistente
    Entonces la respuesta de la reserva debe ser un error 404

  Escenario: Rechazar la reserva cuando el usuario no es estudiante (RF07_C3)
    Cuando intento reservar con un usuario que no es estudiante
    Entonces la respuesta de la reserva debe ser un error 403

  Escenario: Rechazar la reserva cuando el estudiante tiene una penalización vigente (RF07_C4)
    Cuando intento reservar con un estudiante penalizado
    Entonces la respuesta de la reserva debe ser un error 403

  Escenario: Procesar una reserva con una penalización vencida (RF07_C5)
    Cuando intento reservar con un estudiante cuya penalización ha vencido
    Entonces la respuesta debe indicar que la solicitud continuó después de revisar la penalización

  Escenario: Rechazar la reserva cuando el horario no existe (RF07_C6)
    Cuando intento reservar en un horario inexistente
    Entonces la respuesta de la reserva debe ser un error 404

  Escenario: Rechazar una reserva duplicada (RF07_C7)
    Dado que un estudiante tiene una reserva activa para mañana
    Cuando intenta reservar nuevamente el mismo día
    Entonces la respuesta de la reserva debe indicar que existe una reserva duplicada

  Escenario: Rechazar la reserva cuando no hay cupos disponibles (RF07_C8)
    Cuando intento reservar en un horario sin cupos disponibles
    Entonces la respuesta de la reserva debe indicar que no hay cupos

  Escenario: Crear una reserva correctamente (RF07_C9)
    Cuando realizo una reserva válida
    Entonces la reserva debe crearse correctamente

  # RF08 — Consultar reservas activas (2 casos)
  Escenario: Rechazar la consulta de reservas cuando falta el correo (RF08_C1)
    Cuando consulto mis reservas sin proporcionar el correo
    Entonces la respuesta de la consulta de reservas debe ser un error 400

  Escenario: Consultar reservas con un correo válido (RF08_C2)
    Cuando consulto mis reservas con un correo válido
    Entonces la respuesta de la consulta de reservas debe ser exitosa
    Y la consulta debe devolver una lista de reservas

  # RF09 — Cancelar reserva (4 casos)
  Escenario: Rechazar la cancelación con un identificador inválido (RF09_C1)
    Cuando intento cancelar una reserva con un identificador inválido
    Entonces la respuesta de cancelación debe ser un error 400

  Escenario: Rechazar la cancelación de una reserva inexistente (RF09_C2)
    Cuando intento cancelar una reserva inexistente
    Entonces la respuesta de cancelación debe ser un error 404

  Escenario: Rechazar la cancelación de una reserva que ya no está activa (RF09_C3)
    Cuando intento cancelar una reserva que ya está cancelada
    Entonces la respuesta de cancelación debe ser un error 409

  Escenario: Cancelar una reserva activa y liberar el cupo (RF09_C4)
    Dado que existe una reserva activa para cancelar
    Cuando cancelo la reserva
    Entonces la reserva debe cancelarse y liberarse el cupo

  # RF10 — Buscar reserva por documento (4 casos)
  Escenario: Rechazar la búsqueda de un estudiante si quien consulta no está autorizado (RF10_C1)
    Cuando busco un estudiante con un usuario no autorizado
    Entonces la respuesta de búsqueda debe ser un error 403

  Escenario: Rechazar la búsqueda cuando el documento está vacío (RF10_C2)
    Cuando busco un estudiante con el documento vacío
    Entonces la respuesta de búsqueda debe ser un error 400

  Escenario: Rechazar la búsqueda cuando el estudiante no existe (RF10_C3)
    Cuando busco un estudiante con un documento inexistente
    Entonces la respuesta de búsqueda debe ser un error 404

  Escenario: Buscar un estudiante autorizado y devolver su reserva (RF10_C4)
    Dado que el estudiante E2E tiene una reserva activa
    Cuando busco al estudiante E2E con un usuario autorizado
    Entonces la respuesta debe incluir la reserva del estudiante

  # RF14 — Consultar historial (3 casos)
  Escenario: Rechazar la consulta del historial cuando falta el correo (RF14_C1)
    Cuando consulto el historial sin proporcionar el correo
    Entonces la respuesta del historial debe ser un error 400

  Escenario: Consultar el historial completo con un correo válido (RF14_C2)
    Cuando consulto el historial con un correo válido
    Entonces la respuesta del historial debe ser exitosa
    Y el historial debe devolver una lista de reservas

  Escenario: Consultar únicamente las reservas pasadas (RF14_C3)
    Cuando consulto el historial de reservas pasadas con un correo válido
    Entonces el historial debe incluir únicamente reservas pasadas

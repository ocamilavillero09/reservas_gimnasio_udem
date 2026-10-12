
# language: es

Característica: Pruebas de regresión del gimnasio
  Como estudiante o usuario autorizado
  Quiero validar las operaciones del sistema de reservas
  Para comprobar que se cumplen los requisitos funcionales

  # RF06
  Escenario: Consultar los seis horarios del día siguiente (RF06_C2)
    Cuando consulto los horarios del gimnasio
    Entonces la respuesta debe ser exitosa
    Y deben aparecer seis horarios
    Y cada horario debe informar sus cupos disponibles y totales

  Escenario: Consultar horarios sin incluir bloques fuera del catálogo (RF06_C1)
    Cuando consulto los horarios del gimnasio
    Entonces la respuesta debe ser exitosa
    Y no deben aparecer bloques fuera del catálogo

  # RF07
  Escenario: Rechazar una reserva cuando faltan los datos obligatorios (RF07_C1)
    Cuando intento reservar sin proporcionar los datos obligatorios
    Entonces la respuesta de la reserva debe ser un error 400

  Escenario: Rechazar una reserva duplicada (RF07_C7)
    Dado que un estudiante tiene una reserva activa para mañana
    Cuando intenta reservar nuevamente el mismo día
    Entonces la respuesta de la reserva debe indicar que existe una reserva duplicada

  # RF08
  Escenario: Rechazar la consulta de reservas cuando falta el correo (RF08_C1)
    Cuando consulto mis reservas sin proporcionar el correo
    Entonces la respuesta de la consulta de reservas debe ser un error 400

  Escenario: Consultar reservas con un correo válido (RF08_C2)
    Cuando consulto mis reservas con un correo válido
    Entonces la respuesta de la consulta de reservas debe ser exitosa

  # RF09
  Escenario: Rechazar la cancelación con un identificador inválido (RF09_C1)
    Cuando intento cancelar una reserva con un identificador inválido
    Entonces la respuesta de cancelación debe ser un error 400

  Escenario: Cancelar una reserva activa y liberar el cupo (RF09_C4)
    Dado que existe una reserva activa para cancelar
    Cuando cancelo la reserva
    Entonces la reserva debe cancelarse y liberarse el cupo

  # RF10
  Escenario: Rechazar la búsqueda de un estudiante si quien consulta no está autorizado (RF10_C1)
    Cuando busco un estudiante con un usuario no autorizado
    Entonces la respuesta de búsqueda debe ser un error 403

  Escenario: Buscar un estudiante autorizado y devolver su reserva (RF10_C4)
    Cuando busco un estudiante con un usuario autorizado
    Entonces la respuesta debe incluir la reserva del estudiante

  # RF14
  Escenario: Rechazar la consulta del historial cuando falta el correo (RF14_C1)
    Cuando consulto el historial sin proporcionar el correo
    Entonces la respuesta del historial debe ser un error 400

  Escenario: Consultar el historial completo con un correo válido (RF14_C2)
    Cuando consulto el historial con un correo válido
    Entonces la respuesta del historial debe ser exitosa

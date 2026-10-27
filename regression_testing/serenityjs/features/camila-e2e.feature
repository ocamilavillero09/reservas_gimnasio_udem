# language: es

@camila
Característica: E2E de navegador - asistencia, cierre de jornada, registro diario y buzón
  Como entrenador, administradora o estudiante del gimnasio UdeM
  Quiero usar la interfaz web
  Para comprobar los requisitos RF11, RF12, RF13, RF16, RF20 y RF21

  # RF11 — Registrar asistencia
  @rf11 @rf12 @rf16
  Escenario: Registrar la asistencia de una estudiante con reserva de hoy (RF11)
    Dado que Laura tiene una reserva de hoy a las 06:00
    Y que Tomás inició sesión en el panel del gimnasio
    Cuando registra la asistencia del estudiante con documento "1000000003"
    Entonces debe aparecer el aviso "Asistencia registrada para las 06:00"
    Y la reserva de Laura debe quedar "COMPLETADA"
    Y no debe quedar ninguna reserva sin asistencia
    Y el registro diario debe mostrar 1 asistencias

  @rf11
  Escenario: Buscar un documento que no está registrado (RF11 error)
    Dado que Tomás inició sesión en el panel del gimnasio
    Cuando busca en el panel al estudiante con documento "9999999999"
    # El error del servidor llega como aviso emergente, no bajo el campo.
    Entonces debe aparecer el aviso "No hay ningún estudiante registrado con el documento 9999999999"

  @rf11
  Escenario: Buscar a una estudiante que no tiene reserva activa (RF11 alterno)
    Dado que Tomás inició sesión en el panel del gimnasio
    Cuando busca en el panel al estudiante con documento "1000000003"
    Entonces debe ver a "Laura Estudiante" en el resultado
    Y debe ver el aviso de estudiante sin reserva "no tiene ninguna reserva activa"

  # RF12 — Reservas sin asistencia registrada
  @rf12
  Escenario: Ver a la estudiante pendiente con su documento y sus inasistencias (RF12)
    Dado que Laura tiene una reserva de hoy a las 06:00
    Y que Laura ya acumula 2 inasistencias
    Y que Tomás inició sesión en el panel del gimnasio
    Entonces debe ver 1 reservas sin asistencia
    Y el pendiente debe mostrar el documento "1000000003"
    Y el pendiente debe indicar que le "faltan 3"

  @rf12
  Escenario: Jornada sin reservas pendientes (RF12 alterno)
    Dado que Tomás inició sesión en el panel del gimnasio
    Entonces debe ver el aviso de jornada sin pendientes "No hay estudiantes pendientes"

  # RF13 — Procesar las inasistencias al cerrar la jornada
  @rf13 @rf16
  Escenario: Cerrar la jornada confirmando el cierre (RF13)
    Dado que Laura tiene una reserva de hoy a las 06:00
    Y que Tomás inició sesión en el panel del gimnasio
    Cuando cierra la jornada y confirma
    Entonces el navegador debió pedir confirmación con "Se marcarán 1 inasistencias"
    Y debe aparecer el aviso "Se procesaron 1 inasistencias"
    Y Laura debe acumular 1 inasistencias
    Y el registro diario debe mostrar 1 inasistencias

  @rf13
  Escenario: Arrepentirse de cerrar la jornada (RF13 alterno)
    Dado que Laura tiene una reserva de hoy a las 06:00
    Y que Tomás inició sesión en el panel del gimnasio
    Cuando intenta cerrar la jornada y se arrepiente
    Entonces debe ver 1 reservas sin asistencia
    Y Laura debe acumular 0 inasistencias

  @rf13
  Escenario: La administradora ve los pendientes pero no cierra la jornada (RF13 error de permisos)
    Dado que Laura tiene una reserva de hoy a las 06:00
    Y que Ana inició sesión en el panel del gimnasio
    Entonces debe ver 1 reservas sin asistencia
    Y debe ver la nota "Solo el entrenador cierra la jornada"
    Y no debe ver el botón para cerrar la jornada

  # RF16 — Registro diario
  @rf16
  Escenario: El registro diario ofrece descargar el PDF del día (RF16)
    Dado que Tomás inició sesión en el panel del gimnasio
    Entonces el registro diario debe mostrar 0 asistencias
    Y el enlace del PDF debe apuntar a "/reports/daily/entrenador.pdf"

  # RF20 — Reportar una falla o sugerencia
  @rf20
  Escenario: La estudiante envía un reporte al administrador (RF20)
    Dado que Laura entró a la aplicación
    Cuando envía al administrador el mensaje "La hora del bloque no se ve bien en el celular."
    Entonces debe aparecer el aviso "Tu reporte llegó al administrador"
    Y el buzón debe guardar 1 mensajes

  @rf20
  Escenario: No se puede enviar un mensaje vacío (RF20 alterno)
    Dado que Laura entró a la aplicación
    Cuando abre el formulario de reportes y escribe solo espacios
    Entonces el botón de enviar debe estar deshabilitado
    Y el buzón debe guardar 0 mensajes

  # RF21 — Consultar y depurar el buzón
  @rf21
  Escenario: La administradora lee y borra un mensaje del buzón (RF21)
    Dado que Laura dejó en el buzón el mensaje "No carga el historial."
    Y que Ana entró a la aplicación
    Cuando abre el buzón de sugerencias
    Entonces el buzón debe mostrar 1 mensajes
    Y debe ver en el buzón el mensaje "No carga el historial."
    Cuando borra el primer mensaje y confirma
    Entonces debe aparecer el aviso "Mensaje borrado del buzón"
    Y debe ver el aviso de buzón vacío "Todavía no hay mensajes"
    Y el buzón debe guardar 0 mensajes

  @rf20 @rf21
  Escenario: Recorrido completo del buzón entre estudiante y administradora (RF20 + RF21)
    Dado que Laura entró a la aplicación
    Y envía al administrador el mensaje "Sugiero agregar un bloque a las 18:00."
    Cuando Ana inicia sesión y abre el buzón de sugerencias
    Entonces debe ver en el buzón el mensaje "Sugiero agregar un bloque a las 18:00."

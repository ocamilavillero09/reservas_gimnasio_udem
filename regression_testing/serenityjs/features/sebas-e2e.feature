# language: es

@sebas-e2e
Característica: E2E de navegador - reservas del estudiante y búsqueda del entrenador
  Como estudiante o entrenador del gimnasio UdeM
  Quiero usar la interfaz web
  Para comprobar de punta a punta RF06, RF07, RF08, RF09 y RF10

  # RF06 y RF07 — Consultar los bloques y reservar para mañana
  @rf06 @rf07
  Escenario: Reservar el bloque de las 06:00 desde el panel (RF07 exitoso)
    Dado que Laura entró como estudiante
    Cuando reserva el bloque 1 y confirma
    Entonces su contador de reservas de mañana debe mostrar "1/1"
    Y el bloque 1 debe quedar marcado como reservado
    Y la reserva de mañana de Laura debe quedar "ACTIVA" en la base de datos

  # RF08 y RF09 — Consultar y cancelar la reserva
  @rf08 @rf09
  Escenario: Consultar y cancelar la reserva activa desde Mis reservas (RF08 y RF09 exitoso)
    Dado que Laura tiene una reserva para mañana en el bloque 1
    Y que Laura entró como estudiante
    Cuando abre sus reservas
    Entonces debe ver su reserva de las "06:00" en estado "Activa"
    Cuando cancela la reserva y confirma
    Entonces debe ver el aviso de reservas vacías "Sin reservas activas"
    Y la reserva de mañana de Laura debe quedar "CANCELADA" en la base de datos

  # RF10 — Buscar la reserva de un estudiante por su documento
  @rf10
  Escenario: El entrenador encuentra la reserva activa de una estudiante (RF10 exitoso)
    Dado que Laura tiene una reserva para mañana en el bloque 1
    Y que Tomás entró como entrenador
    Cuando consulta en el buscador el documento "1000000003"
    Entonces debe aparecer la estudiante "Laura Estudiante" con su reserva de las "06:00"

  @rf10
  Escenario: El entrenador escribe un documento con formato inválido (RF10 error)
    Dado que Tomás entró como entrenador
    Cuando consulta en el buscador el documento "abc"
    Entonces debe ver bajo el buscador el error "El documento tiene 10 dígitos, sin letras, puntos ni espacios."

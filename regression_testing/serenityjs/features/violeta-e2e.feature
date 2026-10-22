# language: es

@violeta
Característica: E2E de navegador - registro, sesión, perfiles e inasistencias
  Como persona usuaria del gimnasio UdeM
  Quiero usar la interfaz web
  Para comprobar los requisitos RF01, RF02, RF03, RF04, RF05 y RF15

  # RF01
  @rf01 @borrar-cuenta-nueva
  Escenario: Registrar una cuenta nueva con correo institucional (RF01)
    Cuando una persona nueva se registra con un correo institucional único
    Entonces debe ver el título "Registro exitoso"

  @rf01
  Esquema del escenario: Rechazar el registro con el dominio <dominio> (RF01 alterno)
    Cuando una persona intenta registrarse con el correo "<correo>"
    Entonces debe ver el aviso de dominio "⚠ Ese dominio no es institucional"
    Y debe ver un mensaje de error en el formulario
    Y no debe ver el título de registro exitoso

    Ejemplos:
      | dominio     | correo              |
      | gmail.com   | externa@gmail.com   |
      | hotmail.com | externa@hotmail.com |
      | outlook.com | externa@outlook.com |

  # RF02
  @rf02
  Escenario: Iniciar sesión como estudiante (RF02)
    Cuando Ana inicia sesión con sus credenciales
    Entonces debe ver el botón de perfil
    Y no debe ver el botón de enviar del login

  @rf02
  Esquema del escenario: Rechazar el inicio de sesión con <caso> (RF02 alterno)
    Cuando Ana inicia sesión con el documento "<documento>"
    Entonces debe ver un mensaje de error en el formulario
    Y no debe ver el botón de perfil

    Ejemplos:
      | caso                      | documento  |
      | documento inexistente     | 9876543210 |
      | documento de otra persona | 1003456789 |

  # RF03
  @rf03 @restaurar-perfil-ana
  Escenario: Actualizar los datos del perfil de estudiante (RF03)
    Dado que Ana inició sesión
    Cuando actualiza su perfil con edad "20", peso "66", altura "170" y objetivo "Ganar fuerza"
    Entonces debe ver el aviso "Perfil actualizado."
    Y debe ver el título del perfil "Mi perfil"

  @rf03
  Escenario: Rechazar una edad fuera de rango en el perfil (RF03 alterno)
    Dado que Ana inició sesión
    Cuando actualiza su perfil con edad "5"
    Entonces debe ver un aviso que menciona "edad"

  # RF04
  @rf04
  Escenario: El entrenador ve los datos de su perfil (RF04)
    Dado que Diego inició sesión
    Cuando abre su perfil
    Entonces debe ver el título del perfil "Mi perfil"
    Y debe ver el rol "Entrenador"
    Y debe ver el documento "7009998881"

  @rf04
  Escenario: El entrenador no edita datos de entrenamiento (RF04 alterno)
    Dado que Diego inició sesión
    Cuando abre su perfil
    Entonces no debe ver el campo de edad
    Y no debe ver el botón de guardar perfil

  # RF05
  @rf05
  Escenario: La administradora ve los datos de su perfil (RF05)
    Dado que Elena inició sesión
    Cuando abre su perfil
    Entonces debe ver el rol que contiene "Administrador principal"
    Y debe ver el documento "3005554442"

  @rf05
  Escenario: La administradora no edita datos de entrenamiento (RF05 alterno)
    Dado que Elena inició sesión
    Cuando abre su perfil
    Entonces debe ver el botón de usuarios
    Y no debe ver el campo de edad

  # RF15
  @rf15
  Escenario: Reporte de inasistencias de una estudiante sin penalización (RF15)
    Dado que Ana inició sesión
    Cuando abre su perfil
    Entonces debe ver el reporte de inasistencias
    Y el contador de inasistencias debe ser "0"
    Y no debe ver el aviso de penalización

  @rf15
  Escenario: Reporte de inasistencias de una estudiante penalizada (RF15 alterno)
    Dado que Clara inició sesión
    Cuando abre su perfil
    Entonces el contador de inasistencias debe ser "5"
    Y debe ver el aviso de penalización que contiene "PENALIZADA"

  @rf15
  Escenario: El entrenador consulta a un estudiante penalizado (RF15 alterno)
    Dado que Diego inició sesión
    Cuando busca al estudiante con documento "1003456789"
    Entonces debe ver el nombre encontrado "Clara Ospina"
    Y debe ver el estado encontrado "PENALIZADO"

# Atributos `data-cy` del frontend

Convención: `data-cy="<pantalla>-<elemento>"` en kebab-case. Los atributos son aditivos: no
reemplazan ningún `id`, `name`, `class` ni texto existente, y los `id` que usan Screenpy,
SerenityJS y Katalon siguen intactos.

Uso en Cypress: `cy.get('[data-cy="login-submit"]')`.

Cobertura: todas las pantallas del frontend. RF01 registro, RF02 login, RF03 a RF05 perfil,
RF06 y RF07 disponibilidad y reserva (Dashboard), RF08 y RF09 mis reservas, RF14 historial,
RF15 reporte de inasistencias, RF16 reporte diario del entrenador, RF20 buzón (envío desde el
historial), RF21 a RF23 panel del administrador, y el resto del panel del entrenador.

Cuando un elemento se repite en una lista, el `data-cy` lleva la clave del dato y no un
índice: `<id>` es el id del bloque, de la reserva o del mensaje, y `<correo>` el correo de la
cuenta. Ejemplo: `cy.get('[data-cy="dashboard-horario-3-reservar"]')`. Para recorrer todos los
elementos de una lista usa el prefijo: `cy.get('[data-cy^="dashboard-horario-"][data-cy$="-reservar"]')`.

## Login y registro — `Login.jsx` (RF01, RF02)

Es una sola pantalla con dos pestañas. Algunos `data-cy` cambian según la pestaña activa.

| Pantalla | Elemento | data-cy |
|---|---|---|
| Login/Registro | Contenedor de la pantalla | `login-contenedor` |
| Login/Registro | Pestaña "Iniciar sesión" | `login-tab-login` |
| Login/Registro | Pestaña "Registrarse" | `login-tab-registro` |
| Login | Formulario | `login-formulario` |
| Registro | Formulario | `registro-formulario` |
| Registro | Nombre completo | `registro-nombre` |
| Login | Correo | `login-email` |
| Registro | Correo | `registro-email` |
| Login | Documento (contraseña) | `login-documento` |
| Registro | Documento | `registro-documento` |
| Registro | Aviso del rol según el dominio (RN01) | `registro-aviso-dominio` |
| Login | Mensaje de error | `login-error` |
| Registro | Mensaje de error | `registro-error` |
| Login | Botón "Ingresar" | `login-submit` |
| Registro | Botón "Crear cuenta" | `registro-submit` |
| Registro exitoso | Contenedor | `registro-exitoso-contenedor` |
| Registro exitoso | Título "¡Registro exitoso!" | `registro-exitoso-titulo` |
| Registro exitoso | Botón "Ir a iniciar sesión" | `registro-ir-login` |

## Navegación — `Navbar.jsx`

| Pantalla | Elemento | data-cy |
|---|---|---|
| Navbar | Barra | `nav-principal` |
| Navbar | Enlace "Reservar" (estudiante) | `nav-reservar` |
| Navbar | Enlace "Mis reservas" (estudiante) | `nav-mis-reservas` |
| Navbar | Enlace "Historial" (estudiante) | `nav-historial` |
| Navbar | Enlace "Panel" (entrenador y admin) | `nav-panel` |
| Navbar | Enlace "Usuarios" (admin) | `nav-usuarios` |
| Navbar | Enlace "Perfil" | `nav-perfil` |
| Navbar | Bloque del usuario | `nav-usuario` |
| Navbar | Nombre del usuario | `nav-usuario-nombre` |
| Navbar | Rol del usuario | `nav-usuario-rol` |
| Navbar | Botón "Salir" | `nav-salir` |

## Mensajes — `App.jsx`

| Pantalla | Elemento | data-cy |
|---|---|---|
| Toast (todas) | Texto del mensaje de éxito, error o alerta | `toast-mensaje` |

## Perfil — `ProfileView.jsx` (RF03 estudiante, RF04 entrenador, RF05 administrador)

La pantalla es la misma para los tres roles, por eso comparten los `data-cy`. Para validar el
rol: `perfil-rol`. `perfil-principal` solo aparece si el administrador es el principal.

| Pantalla | Elemento | data-cy |
|---|---|---|
| Perfil | Contenedor | `perfil-contenedor` |
| Perfil | Título "Mi perfil" | `perfil-titulo` |
| Perfil | Tarjeta "Mis datos" | `perfil-datos` |
| Perfil | Nombre (valor) | `perfil-nombre` |
| Perfil | Correo (valor) | `perfil-correo` |
| Perfil | Documento (valor) | `perfil-documento` |
| Perfil | Rol asignado (valor) | `perfil-rol` |
| Perfil | Leyenda "Administrador principal" | `perfil-principal` |
| Perfil | Estado de la cuenta (valor) | `perfil-estado` |
| Perfil | Fila de cada dato | `<dato>-fila`, p. ej. `perfil-rol-fila` |
| Perfil (estudiante) | Formulario de entrenamiento | `perfil-formulario` |
| Perfil (estudiante) | Edad | `perfil-edad` |
| Perfil (estudiante) | Peso | `perfil-peso` |
| Perfil (estudiante) | Altura | `perfil-altura` |
| Perfil (estudiante) | Objetivo de entrenamiento | `perfil-meta` |
| Perfil (estudiante) | Botón "Guardar perfil" | `perfil-guardar` |
| Perfil (entrenador y admin) | Nota de solo lectura | `perfil-nota-solo-lectura` |

### Inasistencias del estudiante en "Mi perfil"

Este es el bloque que usan las pruebas RF15 de Screenpy y SerenityJS.

| Pantalla | Elemento | data-cy |
|---|---|---|
| Perfil | Contenedor del reporte | `perfil-inasistencias-contenedor` |
| Perfil | Título "Mis inasistencias y penalizaciones" | `perfil-inasistencias-titulo` |
| Perfil | Rejilla de contadores | `perfil-inasistencias-contadores` |
| Perfil | Contador "Inasistencias" (número) | `perfil-inasistencias-contador` |
| Perfil | Contador "Me faltan" (número) | `perfil-inasistencias-restantes` |
| Perfil | Contador "Asistencias" (número) | `perfil-inasistencias-asistencias` |
| Perfil | Tarjeta de cada contador | `<contador>-tarjeta`, p. ej. `perfil-inasistencias-contador-tarjeta` |
| Perfil | Aviso de cuenta penalizada | `perfil-inasistencias-penalizada` |
| Perfil | Alerta de inasistencias | `perfil-inasistencias-alerta` |
| Perfil | Detalle de inasistencias (lista) | `perfil-inasistencias-tabla` |
| Perfil | Cada inasistencia | `perfil-inasistencias-fila` |

## Panel del entrenador — `TrainerPanel.jsx`

### Reporte de inasistencias (RF15): pendientes y "Cerrar jornada"

| Pantalla | Elemento | data-cy |
|---|---|---|
| Panel | Título "Panel del gimnasio" | `panel-titulo` |
| Panel | Tarjeta "Sin asistencia registrada" | `reporte-inasistencias-contenedor` |
| Panel (entrenador) | Botón "Cerrar jornada" | `reporte-inasistencias-cerrar-jornada` |
| Panel | Estado "Cargando pendientes…" | `reporte-inasistencias-cargando` |
| Panel | Estado vacío "No hay estudiantes pendientes" | `reporte-inasistencias-vacio` |
| Panel | Aviso de error al cargar (con "Reintentar") | `reporte-inasistencias-error` |
| Panel | Filtro de pendientes | `reporte-inasistencias-filtro` |
| Panel | Tabla de pendientes | `reporte-inasistencias-tabla` |
| Panel | Fila de cada pendiente | `reporte-inasistencias-fila` |
| Panel | Botón "Registrar asistencia" de la fila | `reporte-inasistencias-registrar-asistencia` |

### Buscar estudiante por documento

Esta búsqueda la usa el test `test_rf15_entrenador_busca_estudiante_penalizado`.

| Pantalla | Elemento | data-cy |
|---|---|---|
| Panel | Formulario de búsqueda | `buscar-formulario` |
| Panel | Documento del estudiante | `buscar-documento` |
| Panel | Botón "Buscar" | `buscar-submit` |
| Panel | Error de validación del documento | `buscar-error` |
| Panel | Tarjeta del resultado | `buscar-resultado` |
| Panel | Nombre del estudiante encontrado | `buscar-resultado-nombre` |
| Panel | Estado (ACTIVO o PENALIZADO) | `buscar-resultado-estado` |
| Panel | Inasistencias del estudiante | `buscar-resultado-inasistencias` |
| Panel | Mensaje "no tiene ninguna reserva activa" | `buscar-resultado-sin-reserva` |
| Panel | Cada reserva encontrada | `buscar-resultado-reserva` |
| Panel | Botón "Registrar asistencia" (reserva de hoy) | `buscar-registrar-asistencia` |

### Resto del panel del entrenador y del administrador

El administrador usa el mismo `TrainerPanel.jsx` desde "Panel"; solo cambia que no ve el botón
"Cerrar jornada". Los mismos `data-cy` sirven para los dos roles. `<id>` es el id del bloque.

| Pantalla | Elemento | data-cy |
|---|---|---|
| Panel | Contenedor de la pantalla | `entrenador-contenedor` |
| Panel | Rol y nombre ("Entrenador · Nombre") | `entrenador-subtitulo` |
| Panel (RF06, RF07, RF12) | Tarjeta "Bloques horarios y cupos" | `entrenador-horarios-contenedor` |
| Panel | Título de la tarjeta | `entrenador-horarios-titulo` |
| Panel | Fecha de la disponibilidad | `entrenador-horarios-fecha` |
| Panel | Total "N ocupados / M cupos" | `entrenador-horarios-ocupacion` |
| Panel | Rejilla de bloques | `entrenador-horarios-lista` |
| Panel | Cada bloque | `entrenador-horario-<id>` |
| Panel | Hora del bloque | `entrenador-horario-<id>-hora` |
| Panel | Texto "N ocupados · M libres" | `entrenador-horario-<id>-ocupacion` |
| Panel | Barra de aforo (pista) | `entrenador-horario-<id>-barra` |
| Panel | Barra de aforo (relleno) | `entrenador-horario-<id>-barra-nivel` |
| Panel | Texto "N% de aforo" | `entrenador-horario-<id>-porcentaje` |

### Buscar estudiante: elementos que faltaban

Se suman a los de la tabla "Buscar estudiante por documento".

| Pantalla | Elemento | data-cy |
|---|---|---|
| Panel | Tarjeta "Registrar asistencia" | `buscar-contenedor` |
| Panel | Título "Registrar asistencia" | `buscar-titulo` |
| Panel | Documento y correo del estudiante | `buscar-resultado-contacto` |
| Panel | Bloque de cada reserva (hora y fecha) | `buscar-resultado-reserva-bloque` |
| Panel | Fecha de cada reserva | `buscar-resultado-reserva-fecha` |
| Panel | Marca "HOY" | `buscar-resultado-reserva-hoy` |
| Panel | Botón "Registrar asistencia" deshabilitado (reserva de otro día) | `buscar-registrar-asistencia-deshabilitado` |
| Panel | Aviso "Se registra el día de la reserva." | `buscar-resultado-reserva-aviso` |

### Reporte de inasistencias: elementos que faltaban

Se suman a los de la tabla "Reporte de inasistencias (RF15)". Los de la fila (`-nombre`,
`-correo`, etc.) se repiten una vez por fila. La fila (`reporte-inasistencias-fila`) no lleva
la clave porque ya traía su `data-cy`, así que se busca dentro de ella con `.within()`.

| Pantalla | Elemento | data-cy |
|---|---|---|
| Panel | Título "Sin asistencia registrada" | `reporte-inasistencias-titulo` |
| Panel | Descripción con la fecha | `reporte-inasistencias-descripcion` |
| Panel | Nota sobre el cierre de jornada | `reporte-inasistencias-nota` |
| Panel | Encabezado de la tabla | `reporte-inasistencias-encabezado` |
| Panel | Cuerpo de la tabla | `reporte-inasistencias-cuerpo` |
| Panel | Nombre del estudiante (fila) | `reporte-inasistencias-nombre` |
| Panel | Correo (fila) | `reporte-inasistencias-correo` |
| Panel | Documento (fila) | `reporte-inasistencias-documento` |
| Panel | Bloque (fila) | `reporte-inasistencias-bloque` |
| Panel | Fecha del bloque (fila) | `reporte-inasistencias-fecha` |
| Panel | Celda de inasistencias (fila) | `reporte-inasistencias-contador` |
| Panel | "faltan N" (fila) | `reporte-inasistencias-restantes` |
| Panel | Texto del aviso de error | `reporte-inasistencias-error-mensaje` |
| Panel | Botón "Reintentar" del aviso de error | `reporte-inasistencias-error-reintentar` |

### Reporte general diario (RF16)

| Pantalla | Elemento | data-cy |
|---|---|---|
| Panel | Tarjeta "Reporte general diario" | `entrenador-reporte-diario-contenedor` |
| Panel | Título | `entrenador-reporte-diario-titulo` |
| Panel | Fecha del reporte | `entrenador-reporte-diario-fecha` |
| Panel | Enlace "Generar PDF" | `entrenador-reporte-diario-pdf` |
| Panel | Aviso de error al cargar | `entrenador-reporte-diario-error` |
| Panel | Texto del aviso de error | `entrenador-reporte-diario-error-mensaje` |
| Panel | Botón "Reintentar" del aviso | `entrenador-reporte-diario-error-reintentar` |
| Panel | Rejilla de totales | `entrenador-reporte-diario-totales` |
| Panel | Total "Asistencias" (tarjeta) | `entrenador-reporte-diario-asistencias` |
| Panel | Total "Asistencias" (número) | `entrenador-reporte-diario-asistencias-valor` |
| Panel | Total "Cancelaciones" (tarjeta) | `entrenador-reporte-diario-cancelaciones` |
| Panel | Total "Cancelaciones" (número) | `entrenador-reporte-diario-cancelaciones-valor` |
| Panel | Total "Inasistencias" (tarjeta) | `entrenador-reporte-diario-inasistencias` |
| Panel | Total "Inasistencias" (número) | `entrenador-reporte-diario-inasistencias-valor` |
| Panel | Total "Estudiantes penalizados" (tarjeta) | `entrenador-reporte-diario-penalizados` |
| Panel | Total "Estudiantes penalizados" (número) | `entrenador-reporte-diario-penalizados-valor` |
| Panel | Bloque de la lista de penalizados | `entrenador-reporte-diario-penalizados-lista` |
| Panel | Título de la lista de penalizados | `entrenador-reporte-diario-penalizados-titulo` |
| Panel | Cada penalizado | `entrenador-reporte-diario-penalizado-<correo>` |
| Panel | Nombre del penalizado (incluye el documento) | `entrenador-reporte-diario-penalizado-<correo>-nombre` |
| Panel | Documento del penalizado | `entrenador-reporte-diario-penalizado-<correo>-documento` |
| Panel | Número de inasistencias del penalizado | `entrenador-reporte-diario-penalizado-<correo>-inasistencias` |

## Disponibilidad y reserva — `Dashboard.jsx` (RF06, RF07)

Pantalla "Reservar" del estudiante. `<id>` es el id del bloque horario.

| Pantalla | Elemento | data-cy |
|---|---|---|
| Dashboard | Contenedor de la pantalla | `dashboard-contenedor` |
| Dashboard | Saludo "Hola, Nombre" | `dashboard-saludo` |
| Dashboard | Fecha de hoy | `dashboard-fecha-hoy` |
| Dashboard | Banner "Estás reservando para mañana" | `dashboard-banner-fecha` |
| Dashboard | Fecha de la reserva (RN03) | `dashboard-fecha-reserva` |
| Dashboard | Rejilla de estadísticas | `dashboard-estadisticas` |
| Dashboard | Tarjeta "Cupos disponibles" | `dashboard-cupos-disponibles` |
| Dashboard | Número de cupos disponibles | `dashboard-cupos-disponibles-valor` |
| Dashboard | Texto "Cupos disponibles" | `dashboard-cupos-disponibles-etiqueta` |
| Dashboard | Tarjeta "Mi reserva de mañana" | `dashboard-mi-reserva` |
| Dashboard | Valor "0/1" o "1/1" | `dashboard-mi-reserva-valor` |
| Dashboard | Texto "Mi reserva de mañana" | `dashboard-mi-reserva-etiqueta` |
| Dashboard | Tarjeta de inasistencias | `dashboard-inasistencias` |
| Dashboard | Número de inasistencias | `dashboard-inasistencias-valor` |
| Dashboard | Texto "Inasistencias (límite N)" | `dashboard-inasistencias-etiqueta` |
| Dashboard | Título "Disponibilidad en tiempo real" | `dashboard-titulo-disponibilidad` |
| Dashboard | Marca "En vivo" | `dashboard-en-vivo` |
| Dashboard | Rejilla de bloques | `dashboard-horarios` |
| Dashboard | Tarjeta de cada bloque | `dashboard-horario-<id>` |
| Dashboard | Insignia "✓ Reservado" | `dashboard-horario-<id>-reservado` |
| Dashboard | Hora del bloque | `dashboard-horario-<id>-hora` |
| Dashboard | Barra de disponibilidad (pista) | `dashboard-horario-<id>-barra` |
| Dashboard | Barra de disponibilidad (relleno) | `dashboard-horario-<id>-barra-nivel` |
| Dashboard | Texto "N / M cupos" | `dashboard-horario-<id>-cupos` |
| Dashboard | Número de cupos libres | `dashboard-horario-<id>-disponibles` |
| Dashboard | Estado (Disponible, Casi lleno, Sin cupos) | `dashboard-horario-<id>-estado` |
| Dashboard | Botón "Reservar cupo" (o su versión deshabilitada) | `dashboard-horario-<id>-reservar` |

### Modal "Confirmar reserva"

| Pantalla | Elemento | data-cy |
|---|---|---|
| Modal de reserva | Fondo y contenedor | `dashboard-reserva-modal` |
| Modal de reserva | Título "Confirmar reserva" | `dashboard-reserva-titulo` |
| Modal de reserva | Texto "Bloque de las …" | `dashboard-reserva-bloque` |
| Modal de reserva | Hora del bloque | `dashboard-reserva-hora` |
| Modal de reserva | Fecha de la reserva | `dashboard-reserva-fecha` |
| Modal de reserva | Aviso "Política de asistencia" | `dashboard-reserva-politica` |
| Modal de reserva | Botón "Cancelar" | `dashboard-reserva-cancelar` |
| Modal de reserva | Botón "Confirmar ✓" | `dashboard-reserva-confirmar` |

## Mis reservas — `MyReservations.jsx` (RF08, RF09)

`<id>` es el id de la reserva.

| Pantalla | Elemento | data-cy |
|---|---|---|
| Mis reservas | Contenedor de la pantalla | `mis-reservas-contenedor` |
| Mis reservas | Título "Mis reservas" | `mis-reservas-titulo` |
| Mis reservas | Subtítulo "Tu reserva de mañana" | `mis-reservas-subtitulo` |
| Mis reservas | Fecha en el subtítulo | `mis-reservas-fecha` |
| Mis reservas (sin reservas) | Tarjeta de estado vacío | `mis-reservas-vacio` |
| Mis reservas (sin reservas) | Título "Sin reservas activas" | `mis-reservas-vacio-titulo` |
| Mis reservas (sin reservas) | Mensaje "No tienes ninguna reserva…" | `mis-reservas-vacio-mensaje` |
| Mis reservas (sin reservas) | Botón "Ir a reservar →" | `mis-reservas-ir-reservar` |
| Mis reservas | Lista de reservas | `mis-reservas-lista` |
| Mis reservas | Recordatorio de cancelar (RF08) | `mis-reservas-recordatorio` |
| Mis reservas | Tarjeta de cada reserva | `mis-reservas-reserva-<id>` |
| Mis reservas | Hora | `mis-reservas-reserva-<id>-hora` |
| Mis reservas | Fecha | `mis-reservas-reserva-<id>-fecha` |
| Mis reservas | Insignia "● Activa" | `mis-reservas-reserva-<id>-estado` |
| Mis reservas | Insignia "📅 Para mañana" | `mis-reservas-reserva-<id>-para-manana` |
| Mis reservas | Botón "Cancelar" | `mis-reservas-reserva-<id>-cancelar` |

### Modal "¿Cancelar reserva?" (RF09)

| Pantalla | Elemento | data-cy |
|---|---|---|
| Modal de cancelación | Fondo y contenedor | `mis-reservas-cancelar-modal` |
| Modal de cancelación | Título "¿Cancelar reserva?" | `mis-reservas-cancelar-titulo` |
| Modal de cancelación | Texto "Bloque de las …" | `mis-reservas-cancelar-bloque` |
| Modal de cancelación | Hora del bloque | `mis-reservas-cancelar-hora` |
| Modal de cancelación | Aviso "El cupo será liberado" | `mis-reservas-cancelar-aviso` |
| Modal de cancelación | Botón "Mantener" | `mis-reservas-cancelar-mantener` |
| Modal de cancelación | Botón "Sí, cancelar" | `mis-reservas-cancelar-confirmar` |

## Historial — `HistoryView.jsx` (RF14, y RF20 en la misma pantalla)

`<id>` es el id de la reserva del historial. El estado de cada fila es el texto de la insignia:
"Asistió", "Cancelada" o "No asistió".

| Pantalla | Elemento | data-cy |
|---|---|---|
| Historial | Contenedor de la pantalla | `historial-contenedor` |
| Historial | Título "Mi historial" | `historial-titulo` |
| Historial | Subtítulo "Tus entrenamientos pasados" | `historial-subtitulo` |
| Historial (sin datos) | Tarjeta "Aún no tienes historial." | `historial-vacio` |
| Historial | Lista de entrenamientos | `historial-lista` |
| Historial | Fila de cada entrenamiento | `historial-fila-<id>` |
| Historial | Hora y fecha de la fila | `historial-fila-<id>-bloque` |
| Historial | Fecha de la fila ("· AAAA-MM-DD") | `historial-fila-<id>-fecha` |
| Historial | Insignia de estado de la fila | `historial-fila-<id>-estado` |

### Reportar una falla o sugerencia (RF20)

El mensaje de éxito o error aparece en el toast (`toast-mensaje`).

| Pantalla | Elemento | data-cy |
|---|---|---|
| Historial | Tarjeta del reporte | `historial-reporte-contenedor` |
| Historial | Título "Reportar una falla o sugerencia" | `historial-reporte-titulo` |
| Historial | Descripción | `historial-reporte-descripcion` |
| Historial | Formulario | `historial-reporte-formulario` |
| Historial | Mensaje (textarea) | `historial-reporte-mensaje` |
| Historial | Contador "N/2000" | `historial-reporte-contador` |
| Historial | Botón "Enviar al administrador" | `historial-reporte-enviar` |

## Panel del administrador — `AdminPanel.jsx` (RF21, RF22, RF23)

Es la pantalla "Usuarios" del administrador. `<correo>` es el correo de la cuenta, `<id>` el
id del mensaje del buzón y `<dominio>` el dominio institucional (por ejemplo `@udem.edu.co`).
Los botones "Retirar rol" y "Restaurar" solo existen para el administrador principal.

| Pantalla | Elemento | data-cy |
|---|---|---|
| Admin | Contenedor de la pantalla | `admin-contenedor` |
| Admin | Título "Gestión de usuarios" | `admin-titulo` |
| Admin | Subtítulo (tipo de administrador y correo) | `admin-subtitulo` |
| Admin | Aviso "Solo el administrador principal…" | `admin-aviso-no-principal` |

### Crear usuario (RF22)

| Pantalla | Elemento | data-cy |
|---|---|---|
| Admin | Tarjeta "Crear usuario" | `admin-crear-contenedor` |
| Admin | Título | `admin-crear-titulo` |
| Admin | Descripción | `admin-crear-descripcion` |
| Admin | Rejilla de dominios | `admin-dominios` |
| Admin | Tarjeta de cada dominio | `admin-dominio-<dominio>` |
| Admin | Insignia del rol del dominio | `admin-dominio-<dominio>-rol` |
| Admin | Texto del dominio | `admin-dominio-<dominio>-texto` |
| Admin | Formulario | `admin-crear-formulario` |
| Admin | Nombre completo | `admin-crear-nombre` |
| Admin | Correo | `admin-crear-email` |
| Admin | Documento | `admin-crear-documento` |
| Admin | Aviso del rol detectado | `admin-crear-aviso-rol` |
| Admin | Botón "Crear usuario" | `admin-crear-submit` |

### Usuarios registrados (RF23)

| Pantalla | Elemento | data-cy |
|---|---|---|
| Admin | Tarjeta "Usuarios registrados" | `admin-usuarios-contenedor` |
| Admin | Título con el total | `admin-usuarios-titulo` |
| Admin | Resumen por rol | `admin-usuarios-resumen` |
| Admin (sin datos) | "Sin usuarios para mostrar." | `admin-usuarios-vacio` |
| Admin | Fila de cada usuario | `admin-usuario-<correo>` |
| Admin | Nombre | `admin-usuario-<correo>-nombre` |
| Admin | Marca "★ PRINCIPAL" | `admin-usuario-<correo>-principal` |
| Admin | Correo y documento | `admin-usuario-<correo>-correo` |
| Admin | Marca "PENALIZADO" | `admin-usuario-<correo>-penalizado` |
| Admin | Insignia del rol | `admin-usuario-<correo>-rol` |
| Admin | Botón "Retirar rol" | `admin-usuario-<correo>-retirar-rol` |
| Admin | Botón "Restaurar" | `admin-usuario-<correo>-restaurar` |

### Buzón de sugerencias (RF21)

| Pantalla | Elemento | data-cy |
|---|---|---|
| Admin | Tarjeta del buzón | `admin-buzon-contenedor` |
| Admin | Título "Buzón de sugerencias" | `admin-buzon-titulo` |
| Admin | Contador de mensajes | `admin-buzon-total` |
| Admin | Descripción | `admin-buzon-descripcion` |
| Admin | Aviso "No se pudo cargar el buzón." | `admin-buzon-error` |
| Admin | Texto del aviso de error | `admin-buzon-error-mensaje` |
| Admin | Botón "Reintentar" | `admin-buzon-reintentar` |
| Admin (sin datos) | "Todavía no hay mensajes." | `admin-buzon-vacio` |
| Admin | Lista de mensajes | `admin-buzon-lista` |
| Admin | Tarjeta de cada mensaje | `admin-buzon-mensaje-<id>` |
| Admin | Nombre del autor | `admin-buzon-mensaje-<id>-autor` |
| Admin | Fecha | `admin-buzon-mensaje-<id>-fecha` |
| Admin | Correo del autor | `admin-buzon-mensaje-<id>-correo` |
| Admin | Texto del mensaje | `admin-buzon-mensaje-<id>-texto` |
| Admin | Botón "Borrar" | `admin-buzon-mensaje-<id>-borrar` |

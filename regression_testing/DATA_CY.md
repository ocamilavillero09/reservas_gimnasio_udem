# Atributos `data-cy` del frontend

Convención: `data-cy="<pantalla>-<elemento>"` en kebab-case. Los atributos son aditivos: no
reemplazan ningún `id`, `name`, `class` ni texto existente, y los `id` que usan Screenpy,
SerenityJS y Katalon siguen intactos.

Uso en Cypress: `cy.get('[data-cy="login-submit"]')`.

Cobertura: RF01 registro, RF02 login, RF03 perfil estudiante, RF04 perfil entrenador,
RF05 perfil administrador y RF15 reporte de inasistencias.

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

## No incluido

`AdminPanel.jsx` (RF21 a RF23), Dashboard, MyReservations e HistoryView quedaron fuera del
alcance de esta entrega.

import { By, PageElement, PageElements } from '@serenity-js/web';

// Direcciones configurables: por defecto, el sistema levantado con docker compose.
export const URL_FRONT = process.env.FRONT_URL || 'http://localhost:5173';
export const URL_API = process.env.API_URL || 'http://localhost:8000/api';

const cy = (descripcion: string, valor: string) =>
  PageElement.located(By.css(`[data-cy="${valor}"]`)).describedAs(descripcion);

const porId = (descripcion: string, id: string) =>
  PageElement.located(By.id(id)).describedAs(descripcion);

// Login
export const LOGIN_CORREO = porId('campo correo', 'login-correo');
export const LOGIN_DOCUMENTO = porId('campo documento (contraseña)', 'login-documento');
export const LOGIN_ENVIAR = porId('botón ingresar', 'login-enviar');

// Navegación y avisos
export const NAV_PANEL = cy('botón Panel', 'nav-panel');
export const NAV_HISTORIAL = cy('botón Historial', 'nav-historial');
export const NAV_USUARIOS = cy('botón Usuarios', 'nav-usuarios');
export const NAV_PERFIL = cy('botón Perfil', 'nav-perfil');
export const PANEL_TITULO = cy('título del panel', 'panel-titulo');
export const AVISO = cy('mensaje del aviso', 'toast-mensaje');

// RF11 — Buscar al estudiante y registrar su asistencia
export const BUSCAR_DOCUMENTO = cy('campo documento del estudiante', 'buscar-documento');
export const BUSCAR_BOTON = cy('botón Buscar', 'buscar-submit');
export const RESULTADO_NOMBRE = cy('nombre del estudiante encontrado', 'buscar-resultado-nombre');
export const RESULTADO_SIN_RESERVA = cy('aviso de estudiante sin reserva', 'buscar-resultado-sin-reserva');
export const REGISTRAR_ASISTENCIA = cy('botón Registrar asistencia', 'buscar-registrar-asistencia');

// RF12 — Reservas sin asistencia registrada
export const PENDIENTES_VACIO = cy('aviso de jornada sin pendientes', 'reporte-inasistencias-vacio');
export const PENDIENTES_FILAS = PageElements.located(By.css('[data-cy="reporte-inasistencias-fila"]'))
  .describedAs('filas de reservas pendientes');
export const PENDIENTE_DOCUMENTO = cy('documento del pendiente', 'reporte-inasistencias-documento');
export const PENDIENTE_RESTANTES = cy('inasistencias que le faltan', 'reporte-inasistencias-restantes');

// RF13 — Cerrar la jornada
export const CERRAR_JORNADA = cy('botón Cerrar jornada', 'reporte-inasistencias-cerrar-jornada');
export const NOTA_CIERRE = cy('nota sobre quién cierra la jornada', 'reporte-inasistencias-nota');

// RF16 — Registro diario
export const TOTAL_ASISTENCIAS = cy('total de asistencias', 'entrenador-reporte-diario-asistencias-valor');
export const TOTAL_INASISTENCIAS = cy('total de inasistencias', 'entrenador-reporte-diario-inasistencias-valor');
export const ENLACE_PDF = cy('enlace Generar PDF', 'entrenador-reporte-diario-pdf');

// RF20 — Reportar una falla o sugerencia
export const MENSAJE_SUGERENCIA = cy('campo del mensaje', 'historial-reporte-mensaje');
export const ENVIAR_SUGERENCIA = cy('botón Enviar al administrador', 'historial-reporte-enviar');

// RF21 — Buzón del administrador
export const BUZON_TOTAL = cy('contador del buzón', 'admin-buzon-total');
export const BUZON_VACIO = cy('aviso de buzón vacío', 'admin-buzon-vacio');
export const BUZON_TEXTOS = PageElements.located(By.css('[data-cy^="admin-buzon-mensaje-"][data-cy$="-texto"]'))
  .describedAs('mensajes del buzón');
export const BUZON_BORRAR = PageElement.located(By.css('[data-cy^="admin-buzon-mensaje-"][data-cy$="-borrar"]'))
  .describedAs('botón Borrar del primer mensaje');

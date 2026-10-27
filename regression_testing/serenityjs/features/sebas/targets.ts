import { By, PageElement } from '@serenity-js/web';

const cy = (descripcion: string, valor: string) =>
  PageElement.located(By.css(`[data-cy="${valor}"]`)).describedAs(descripcion);

const cyTermina = (descripcion: string, inicio: string, fin: string) =>
  PageElement.located(By.css(`[data-cy^="${inicio}"][data-cy$="${fin}"]`)).describedAs(descripcion);

export const HORARIOS = cy('lista de bloques horarios', 'dashboard-horarios');
export const RESERVAR_BLOQUE = (slotId: number) =>
  cy(`botón Reservar cupo del bloque ${slotId}`, `dashboard-horario-${slotId}-reservar`);
export const BLOQUE_RESERVADO = (slotId: number) =>
  cy(`etiqueta Reservado del bloque ${slotId}`, `dashboard-horario-${slotId}-reservado`);
export const CONFIRMAR_RESERVA = cy('botón Confirmar de la ventana de reserva', 'dashboard-reserva-confirmar');
export const MI_RESERVA = cy('contador Mi reserva de mañana', 'dashboard-mi-reserva-valor');


export const NAV_MIS_RESERVAS = cy('botón Mis reservas', 'nav-mis-reservas');
export const RESERVA_HORA = cyTermina('hora de la reserva', 'mis-reservas-reserva-', '-hora');
export const RESERVA_ESTADO = cyTermina('estado de la reserva', 'mis-reservas-reserva-', '-estado');
export const RESERVA_CANCELAR = cyTermina('botón Cancelar reserva', 'mis-reservas-reserva-', '-cancelar');
export const CONFIRMAR_CANCELACION = cy('botón Sí, cancelar', 'mis-reservas-cancelar-confirmar');
export const SIN_RESERVAS = cy('título sin reservas activas', 'mis-reservas-vacio-titulo');


export const BUSCADOR = cy('buscador de estudiantes', 'buscar-contenedor');
export const BUSCAR_DOCUMENTO = cy('campo documento del estudiante', 'buscar-documento');
export const BUSCAR_BOTON = cy('botón Buscar', 'buscar-submit');
export const BUSCAR_ERROR = cy('error del buscador', 'buscar-error');
export const RESULTADO_NOMBRE = cy('nombre del estudiante encontrado', 'buscar-resultado-nombre');
export const RESULTADO_BLOQUE = cy('bloque de la reserva encontrada', 'buscar-resultado-reserva-bloque');

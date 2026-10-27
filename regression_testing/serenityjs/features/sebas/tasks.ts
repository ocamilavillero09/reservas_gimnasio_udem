import { Duration, Task, Wait } from '@serenity-js/core';
import { Click, Enter, isVisible } from '@serenity-js/web';

import * as t from './targets';

const esperar = (elemento: typeof t.HORARIOS) => Wait.upTo(Duration.ofSeconds(10)).until(elemento, isVisible());


export const ReservarElBloque = {
  conId: (slotId: number) =>
    Task.where(
      `#actor reserva el bloque ${slotId} y confirma`,
      esperar(t.RESERVAR_BLOQUE(slotId)),
      Click.on(t.RESERVAR_BLOQUE(slotId)),
      esperar(t.CONFIRMAR_RESERVA),
      Click.on(t.CONFIRMAR_RESERVA),
    ),
};


export const AbrirMisReservas = () =>
  Task.where('#actor abre Mis reservas', esperar(t.NAV_MIS_RESERVAS), Click.on(t.NAV_MIS_RESERVAS));


export const CancelarLaReserva = () =>
  Task.where(
    '#actor cancela su reserva y confirma',
    esperar(t.RESERVA_CANCELAR),
    Click.on(t.RESERVA_CANCELAR),
    esperar(t.CONFIRMAR_CANCELACION),
    Click.on(t.CONFIRMAR_CANCELACION),
  );

export const BuscarElDocumento = {
  de: (documento: string) =>
    Task.where(
      `#actor busca en el panel el documento ${documento}`,
      esperar(t.BUSCAR_DOCUMENTO),
      Enter.theValue(documento).into(t.BUSCAR_DOCUMENTO),
      Click.on(t.BUSCAR_BOTON),
    ),
};

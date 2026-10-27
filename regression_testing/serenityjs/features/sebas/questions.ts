import { Question } from '@serenity-js/core';
import { Text } from '@serenity-js/web';

import { ConsultarLaBaseDeDatos } from '../camila/abilities';
import { mañanaBogota } from './interactions';
import * as t from './targets';

// Lo que el actor ve en la pantalla
export const MiReservaDeMañana = () => Text.of(t.MI_RESERVA);
export const HoraDeLaReserva = () => Text.of(t.RESERVA_HORA);
export const EstadoDeLaReserva = () => Text.of(t.RESERVA_ESTADO);
export const TituloSinReservas = () => Text.of(t.SIN_RESERVAS);
export const NombreEncontrado = () => Text.of(t.RESULTADO_NOMBRE);
export const BloqueEncontrado = () => Text.of(t.RESULTADO_BLOQUE);
export const ErrorDelBuscador = () => Text.of(t.BUSCAR_ERROR);

// Lo que quedó en la base de datos: el efecto de la acción, no solo la pantalla
export const EstadoDeLaReservaDeMañana = {
  de: (email: string) =>
    Question.about(`el estado de la reserva de mañana de ${email}`, async (actor) => {
      const db = await ConsultarLaBaseDeDatos.as(actor).db();
      const reserva = await db
        .collection('reservations')
        .find({ email, reserva_date: mañanaBogota() })
        .sort({ created_at: -1 })
        .limit(1)
        .next();
      return String(reserva?.estado ?? 'SIN RESERVA');
    }),
};

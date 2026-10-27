import { Question } from '@serenity-js/core';
import { ModalDialog, Text } from '@serenity-js/web';

import { ConsultarLaBaseDeDatos } from './abilities';
import * as t from './targets';

// Lo que el actor ve en la pantalla
export const Aviso = () => Text.of(t.AVISO);
export const NombreEncontrado = () => Text.of(t.RESULTADO_NOMBRE);
export const AvisoSinReserva = () => Text.of(t.RESULTADO_SIN_RESERVA);
export const AvisoSinPendientes = () => Text.of(t.PENDIENTES_VACIO);
export const DocumentoDelPendiente = () => Text.of(t.PENDIENTE_DOCUMENTO);
export const InasistenciasRestantes = () => Text.of(t.PENDIENTE_RESTANTES);
export const NotaDeCierre = () => Text.of(t.NOTA_CIERRE);
export const TotalDeAsistencias = () => Text.of(t.TOTAL_ASISTENCIAS);
export const TotalDeInasistencias = () => Text.of(t.TOTAL_INASISTENCIAS);
export const ContadorDelBuzon = () => Text.of(t.BUZON_TOTAL);
export const AvisoDeBuzonVacio = () => Text.of(t.BUZON_VACIO);
export const MensajesDelBuzon = () => Text.ofAll(t.BUZON_TEXTOS);
export const MensajeDeConfirmacion = () => ModalDialog.lastDialogMessage();

// Lo que quedó en la base de datos: el efecto de la acción, no solo la pantalla
export const InasistenciasAcumuladas = {
  de: (email: string) =>
    Question.about(`las inasistencias acumuladas de ${email}`, async (actor) => {
      const db = await ConsultarLaBaseDeDatos.as(actor).db();
      const usuario = await db.collection('users').findOne({ email });
      return Number(usuario?.no_show_count ?? 0);
    }),
};

export const MensajesGuardados = () =>
  Question.about('los mensajes guardados en el buzón', async (actor) => {
    const db = await ConsultarLaBaseDeDatos.as(actor).db();
    return db.collection('suggestions').countDocuments({});
  });

export const EstadoDeLaReservaDeHoy = {
  de: (email: string) =>
    Question.about(`el estado de la reserva de hoy de ${email}`, async (actor) => {
      const db = await ConsultarLaBaseDeDatos.as(actor).db();
      const reserva = await db.collection('reservations').findOne({ email }, { sort: { created_at: -1 } });
      return String(reserva?.estado ?? '');
    }),
};

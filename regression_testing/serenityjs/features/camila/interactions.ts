import { Interaction } from '@serenity-js/core';

import { ConsultarLaBaseDeDatos } from './abilities';
import { URL_API } from './targets';

// Fecha de hoy en la zona del gimnasio (America/Bogota), como la calcula el backend.
export const hoyBogota = () => new Date().toLocaleDateString('en-CA', { timeZone: 'America/Bogota' });

export interface Cuenta {
  name: string;
  email: string;
  documento: string;
}

/** Deja la base como recién instalada: sin usuarios, reservas ni mensajes. */
export const LimpiarLaBaseDeDatos = () =>
  Interaction.where('#actor deja la base de datos sin usuarios, reservas ni mensajes', async (actor) => {
    const db = await ConsultarLaBaseDeDatos.as(actor).db();
    await Promise.all(['users', 'reservations', 'suggestions', 'disponibilidad', 'login_intentos']
      .map((c) => db.collection(c).deleteMany({})));
  });

/** Registra la cuenta por la API (RF01), igual que lo haría la persona. */
export const RegistrarPorLaApi = {
  laCuenta: (cuenta: Cuenta) =>
    Interaction.where(`#actor registra la cuenta ${cuenta.email}`, async () => {
      const respuesta = await fetch(`${URL_API}/auth/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cuenta),
      });
      if (respuesta.status !== 201) {
        throw new Error(`No se pudo registrar ${cuenta.email}: ${respuesta.status} ${await respuesta.text()}`);
      }
    }),
};

/** Siembra una reserva ACTIVA de hoy en el bloque de las 06:00. */
export const SembrarReservaDeHoy = {
  para: (email: string) =>
    Interaction.where(`#actor siembra una reserva de hoy a las 06:00 para ${email}`, async (actor) => {
      const db = await ConsultarLaBaseDeDatos.as(actor).db();
      const fecha = hoyBogota();
      await db.collection('reservations').insertOne({
        email, slotId: 1, hour: '06:00', reserva_date: fecha, date: fecha,
        estado: 'ACTIVA', created_by: email, created_at: new Date(),
      });
    }),
};

/** Fija el contador de inasistencias de un estudiante (RN08). */
export const FijarInasistencias = {
  de: (email: string, cantidad: number) =>
    Interaction.where(`#actor deja a ${email} con ${cantidad} inasistencias`, async (actor) => {
      const db = await ConsultarLaBaseDeDatos.as(actor).db();
      await db.collection('users').updateOne({ email }, { $set: { no_show_count: cantidad } });
    }),
};

/** Deja un mensaje en el buzón por la API, con la sesión del estudiante (RF20). */
export const DejarMensajeEnElBuzon = {
  de: (cuenta: Cuenta, mensaje: string) =>
    Interaction.where(`#actor deja en el buzón el mensaje "${mensaje}"`, async () => {
      const login = await fetch(`${URL_API}/auth/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cuenta.email, documento: cuenta.documento }),
      });
      const { token } = await login.json();
      const respuesta = await fetch(`${URL_API}/suggestions/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ email: cuenta.email, mensaje }),
      });
      if (respuesta.status !== 201) throw new Error(`No se guardó el mensaje: ${respuesta.status}`);
    }),
};

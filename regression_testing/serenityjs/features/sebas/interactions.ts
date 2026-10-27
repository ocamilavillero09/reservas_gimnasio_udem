import { Interaction } from '@serenity-js/core';

import { ConsultarLaBaseDeDatos } from '../camila/abilities';
import { Cuenta } from '../camila/interactions';
import { URL_API } from '../camila/targets';

// La API solo deja reservar para mañana (RN04), en la zona del gimnasio.
export const mañanaBogota = () =>
  new Date(Date.now() + 86_400_000).toLocaleDateString('en-CA', { timeZone: 'America/Bogota' });

/** Registra la cuenta por la API (RF01) si todavía no existe. */
export const AsegurarLaCuenta = {
  de: (cuenta: Cuenta) =>
    Interaction.where(`#actor se asegura de que exista la cuenta ${cuenta.email}`, async () => {
      const respuesta = await fetch(`${URL_API}/auth/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cuenta),
      });
      if (![201, 409].includes(respuesta.status)) {
        throw new Error(`No se pudo registrar ${cuenta.email}: ${respuesta.status} ${await respuesta.text()}`);
      }
    }),
};

/** Quita las reservas activas de la cuenta y le devuelve el cupo a cada bloque. */
export const QuitarLasReservasActivas = {
  de: (email: string) =>
    Interaction.where(`#actor deja a ${email} sin reservas activas`, async (actor) => {
      const db = await ConsultarLaBaseDeDatos.as(actor).db();
      const activas = await db.collection('reservations').find({ email, estado: 'ACTIVA' }).toArray();
      for (const r of activas) {
        await db.collection('disponibilidad').updateOne(
          { fecha: r.reserva_date, slotId: r.slotId },
          { $inc: { cupos_disponibles: 1 } },
        );
      }
      await db.collection('reservations').deleteMany({ email, estado: 'ACTIVA' });
      await db.collection('login_intentos').deleteMany({ email });
    }),
};

/** Reserva para mañana por la API con la sesión del estudiante (RF07). */
export const ReservarPorLaApi = {
  para: (cuenta: Cuenta, slotId: number) =>
    Interaction.where(`#actor reserva por la API el bloque ${slotId} para ${cuenta.email}`, async () => {
      const login = await fetch(`${URL_API}/auth/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cuenta.email, documento: cuenta.documento }),
      });
      const { token } = await login.json();
      const respuesta = await fetch(`${URL_API}/reservations/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ email: cuenta.email, slotId }),
      });
      if (respuesta.status !== 201) {
        throw new Error(`No se pudo crear la reserva: ${respuesta.status} ${await respuesta.text()}`);
      }
    }),
};

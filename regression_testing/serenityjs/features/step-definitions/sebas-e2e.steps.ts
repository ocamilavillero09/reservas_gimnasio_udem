import { Given, Then, When } from '@cucumber/cucumber';
import { Ensure, equals, includes } from '@serenity-js/assertions';
import { actorCalled, actorInTheSpotlight, Duration, Wait } from '@serenity-js/core';
import { isVisible } from '@serenity-js/web';

import { cuentaDe } from '../camila/actors';
// Registra el Before de @sebas-e2e: navegador, base de datos y datos de partida.
import '../sebas/actors';
import { IniciarSesion } from '../camila/tasks';
import { ReservarPorLaApi } from '../sebas/interactions';
import * as q from '../sebas/questions';
import * as t from '../sebas/targets';
import { AbrirMisReservas, BuscarElDocumento, CancelarLaReserva, ReservarElBloque } from '../sebas/tasks';

const espera = (elemento: typeof t.HORARIOS) => Wait.upTo(Duration.ofSeconds(10)).until(elemento, isVisible());

// ── Preparación ──────────────────────────────────────────────────────────────
Given('que {word} tiene una reserva para mañana en el bloque {int}', async (nombre: string, slotId: number) => {
  await actorCalled('Preparador').attemptsTo(ReservarPorLaApi.para(cuentaDe(nombre), slotId));
});

Given('que {word} entró como estudiante', async (nombre: string) => {
  await actorCalled(nombre).attemptsTo(IniciarSesion.como(cuentaDe(nombre)), espera(t.HORARIOS));
});

Given('que {word} entró como entrenador', async (nombre: string) => {
  await actorCalled(nombre).attemptsTo(IniciarSesion.como(cuentaDe(nombre)), espera(t.BUSCADOR));
});

// ── RF06 y RF07 ──────────────────────────────────────────────────────────────
When('reserva el bloque {int} y confirma', async (slotId: number) => {
  await actorInTheSpotlight().attemptsTo(ReservarElBloque.conId(slotId));
});

Then('su contador de reservas de mañana debe mostrar {string}', async (valor: string) => {
  await actorInTheSpotlight().attemptsTo(Ensure.eventually(q.MiReservaDeMañana(), equals(valor)));
});

Then('el bloque {int} debe quedar marcado como reservado', async (slotId: number) => {
  await actorInTheSpotlight().attemptsTo(Ensure.eventually(t.BLOQUE_RESERVADO(slotId), isVisible()));
});

Then('la reserva de mañana de {word} debe quedar {string} en la base de datos', async (nombre: string, estado: string) => {
  await actorInTheSpotlight().attemptsTo(
    Ensure.eventually(q.EstadoDeLaReservaDeMañana.de(cuentaDe(nombre).email), equals(estado)),
  );
});

// ── RF08 y RF09 ──────────────────────────────────────────────────────────────
When('abre sus reservas', async () => {
  await actorInTheSpotlight().attemptsTo(AbrirMisReservas());
});

Then('debe ver su reserva de las {string} en estado {string}', async (hora: string, estado: string) => {
  await actorInTheSpotlight().attemptsTo(
    Ensure.eventually(q.HoraDeLaReserva(), equals(hora)),
    Ensure.eventually(q.EstadoDeLaReserva(), includes(estado)),
  );
});

When('cancela la reserva y confirma', async () => {
  await actorInTheSpotlight().attemptsTo(CancelarLaReserva());
});

Then('debe ver el aviso de reservas vacías {string}', async (texto: string) => {
  await actorInTheSpotlight().attemptsTo(Ensure.eventually(q.TituloSinReservas(), equals(texto)));
});

// ── RF10 ─────────────────────────────────────────────────────────────────────
When('consulta en el buscador el documento {string}', async (documento: string) => {
  await actorInTheSpotlight().attemptsTo(BuscarElDocumento.de(documento));
});

Then('debe aparecer la estudiante {string} con su reserva de las {string}', async (nombre: string, hora: string) => {
  await actorInTheSpotlight().attemptsTo(
    Ensure.eventually(q.NombreEncontrado(), equals(nombre)),
    Ensure.eventually(q.BloqueEncontrado(), includes(hora)),
  );
});

Then('debe ver bajo el buscador el error {string}', async (texto: string) => {
  await actorInTheSpotlight().attemptsTo(Ensure.eventually(q.ErrorDelBuscador(), equals(texto)));
});

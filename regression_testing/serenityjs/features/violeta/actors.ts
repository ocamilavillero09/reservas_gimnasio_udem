import { After, AfterAll, Before } from '@cucumber/cucumber';
import { actorCalled, Cast, engage } from '@serenity-js/core';
import { BrowseTheWebWithPlaywright } from '@serenity-js/playwright';
import { execFileSync } from 'node:child_process';
import { Browser, chromium } from 'playwright';

import { EditarPerfil, IniciarSesion } from './tasks';

const CONTENEDOR_DB = 'reservas_gimnasio_udem-database-1';

let browser: Browser | undefined;

// Estado compartido entre los pasos de un escenario (se reinicia en cada uno)
export const estado: { cuentaNueva?: { correo: string; documento: string } } = {};

export const CUENTAS = {
  ana: { correo: 'ana.demo@soyudemedellin.edu.co', documento: '1001234567' },
  clara: { correo: 'clara.demo@soyudemedellin.edu.co', documento: '1003456789' }, // penalizada
  diego: { correo: 'diego.demo@udem.edu.co', documento: '7009998881' }, // entrenador
  elena: { correo: 'elena.demo@udemedellin.edu.co', documento: '3005554442' }, // administradora
} as const;

// Valores originales de Ana en la base: se restauran tras RF03
export const PERFIL_ANA = { edad: '19', peso: '65', altura: '165', meta: 'Ganar resistencia' };

Before({ tags: '@violeta' }, async () => {
  estado.cuentaNueva = undefined;
  browser ??= await chromium.launch({ headless: process.env.HEADLESS !== 'false' });
  const navegador = browser;
  engage(Cast.where(actor => actor.whoCan(BrowseTheWebWithPlaywright.using(navegador, { viewport: { width: 1280, height: 1600 } }))));
});

After({ tags: '@restaurar-perfil-ana' }, async () => {
  await actorCalled('Restaurador').attemptsTo(
    IniciarSesion.con(CUENTAS.ana.correo, CUENTAS.ana.documento),
    EditarPerfil.con(PERFIL_ANA),
  );
});

After({ tags: '@borrar-cuenta-nueva' }, async () => {
  if (!estado.cuentaNueva) return;
  execFileSync('docker', [
    'exec', CONTENEDOR_DB, 'mongosh', 'gym_udem', '--quiet',
    '--eval', `db.users.deleteOne({email:'${estado.cuentaNueva.correo}'})`,
  ]);
});

AfterAll(async () => {
  await browser?.close();
});

import { After, AfterAll, Before } from '@cucumber/cucumber';
import { actorCalled, Cast, engage } from '@serenity-js/core';
import { BrowseTheWebWithPlaywright } from '@serenity-js/playwright';
import { Browser, chromium } from 'playwright';

import { ConsultarLaBaseDeDatos } from '../camila/abilities';
import { CUENTAS } from '../camila/actors';
import { AsegurarLaCuenta, QuitarLasReservasActivas } from './interactions';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const MONGO_DB = process.env.MONGO_DB || 'gym_udem';

let browser: Browser | undefined;
const bases: ConsultarLaBaseDeDatos[] = [];

// Navegador: Chromium de Playwright por defecto. En Windows sin Chromium
// instalado sirve Edge con PW_CHANNEL=msedge, o una ruta con CHROME_PATH.
const lanzar = () =>
  chromium.launch({
    headless: process.env.HEADLESS !== 'false',
    ...(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {}),
    ...(process.env.PW_CHANNEL ? { channel: process.env.PW_CHANNEL } : {}),
  });

// Cada actor usa el navegador y puede consultar la base de datos de pruebas.
// Solo se tocan las cuentas de Laura y Tomás: no se vacía la base.
Before({ tags: '@sebas-e2e' }, async () => {
  browser ??= await lanzar();
  const navegador = browser;
  engage(Cast.where((actor) => {
    const base = ConsultarLaBaseDeDatos.en(MONGO_URI, MONGO_DB);
    bases.push(base);
    return actor.whoCan(BrowseTheWebWithPlaywright.using(navegador, { viewport: { width: 1280, height: 1400 } }), base);
  }));

  await actorCalled('Preparador').attemptsTo(
    AsegurarLaCuenta.de(CUENTAS.laura),
    AsegurarLaCuenta.de(CUENTAS.tomas),
    QuitarLasReservasActivas.de(CUENTAS.laura.email),
  );
});

After({ tags: '@sebas-e2e' }, async () => {
  await Promise.all(bases.splice(0).map((b) => b.cerrar()));
});

AfterAll(async () => {
  await browser?.close();
});

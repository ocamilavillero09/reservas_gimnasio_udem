import { After, AfterAll, Before } from '@cucumber/cucumber';
import { actorCalled, Cast, engage } from '@serenity-js/core';
import { BrowseTheWebWithPlaywright } from '@serenity-js/playwright';
import { Browser, chromium } from 'playwright';

import { ConsultarLaBaseDeDatos } from './abilities';
import { Cuenta, LimpiarLaBaseDeDatos, RegistrarPorLaApi } from './interactions';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const MONGO_DB = process.env.MONGO_DB || 'gym_udem';

// Las mismas cuentas que usan las pruebas de Cypress (cypress/fixtures/usuarios.json).
// El primer administrador registrado queda como administrador principal.
export const CUENTAS = {
  ana: { name: 'Ana Administradora', email: 'ana.admin@udemedellin.edu.co', documento: '1000000001' },
  tomas: { name: 'Tomás Entrenador', email: 'tomas.coach@udem.edu.co', documento: '1000000002' },
  laura: { name: 'Laura Estudiante', email: 'laura.est@soyudemedellin.edu.co', documento: '1000000003' },
  mateo: { name: 'Mateo Estudiante', email: 'mateo.est@soyudemedellin.edu.co', documento: '1000000004' },
} satisfies Record<string, Cuenta>;

export type NombreDeCuenta = keyof typeof CUENTAS;
// "Tomás" en el escenario es la cuenta `tomas`: se comparan sin tildes.
export const cuentaDe = (nombre: string): Cuenta => {
  const clave = nombre.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() as NombreDeCuenta;
  if (!CUENTAS[clave]) throw new Error(`No hay una cuenta de prueba llamada ${nombre}`);
  return CUENTAS[clave];
};

let browser: Browser | undefined;
const bases: ConsultarLaBaseDeDatos[] = [];

// Cada actor puede usar el navegador y consultar la base de datos de pruebas.
Before({ tags: '@camila' }, async () => {
  browser ??= await chromium.launch({ headless: process.env.HEADLESS !== 'false' });
  const navegador = browser;
  engage(Cast.where((actor) => {
    const base = ConsultarLaBaseDeDatos.en(MONGO_URI, MONGO_DB);
    bases.push(base);
    return actor.whoCan(
      BrowseTheWebWithPlaywright.using(navegador, { viewport: { width: 1280, height: 1400 } }),
      base,
    );
  }));

  // Cada escenario parte de un estado conocido: base limpia y las cuatro cuentas.
  await actorCalled('Preparador').attemptsTo(
    LimpiarLaBaseDeDatos(),
    ...Object.values(CUENTAS).map((c) => RegistrarPorLaApi.laCuenta(c)),
  );
});

After({ tags: '@camila' }, async () => {
  await Promise.all(bases.splice(0).map((b) => b.cerrar()));
});

AfterAll(async () => {
  await browser?.close();
});

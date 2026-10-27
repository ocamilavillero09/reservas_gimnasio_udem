import { AfterAll, BeforeAll, setDefaultTimeout } from '@cucumber/cucumber';
import { Cast, configure } from '@serenity-js/core';
import { CallAnApi } from '@serenity-js/rest';
import { Photographer, TakePhotosOfInteractions } from '@serenity-js/web';

setDefaultTimeout(30_000);

BeforeAll(() => {
  configure({
    actors: Cast.where(actor =>
      actor.whoCan(CallAnApi.at(process.env.API_BASE || 'http://localhost:8000'))
    ),
    crew: [
      '@serenity-js/console-reporter',
      ['@serenity-js/html-reporter', { specDirectory: './features' }],
      // Evidencia: una captura del navegador por cada interacción.
      Photographer.whoWill(TakePhotosOfInteractions),
    ],
  });
});

AfterAll(() => {
  // No hay un servidor de demostración que cerrar.
});

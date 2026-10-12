import { AfterAll, BeforeAll, setDefaultTimeout } from '@cucumber/cucumber';
import { Cast, configure } from '@serenity-js/core';
import { CallAnApi } from '@serenity-js/rest';

setDefaultTimeout(30_000);

BeforeAll(() => {
  configure({
    actors: Cast.where(actor =>
      actor.whoCan(CallAnApi.at('http://localhost:8000'))
    ),
    crew: [
      '@serenity-js/console-reporter',
      ['@serenity-js/html-reporter', { specDirectory: './features' }],
    ],
  });
});

AfterAll(() => {
  // No hay un servidor de demostración que cerrar.
});

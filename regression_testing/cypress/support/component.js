// Vite resuelve esta librería con el alias definido en cypress.config.js.
import 'cypress-mochawesome-reporter/register';
import { mount } from 'cypress/react18';

Cypress.Commands.add('mount', mount);

// Respuesta simulada de la API para las pruebas de componentes: el componente
// se prueba aislado, sin backend, controlando exactamente qué recibe.
Cypress.Commands.add('simularApi', (method, ruta, respuesta, alias) => {
  // Se compara solo la ruta, sin la query (?actor_email=...), que se verifica
  // aparte cuando importa.
  const intercept = cy.intercept({ method, pathname: `/api${ruta}` }, respuesta);
  return alias ? intercept.as(alias) : intercept;
});

// Configuración de Cypress solo para las pruebas de componentes de Violeta.
// Es la de cypress.config.js con una única diferencia: el archivo de soporte
// pasa por el puente de cypress-puente/, para que funcione en Windows.
import { defineConfig } from 'cypress';
import base from './cypress.config.js';

export default defineConfig({
  ...base,
  component: {
    ...base.component,
    supportFile: 'cypress-puente/component.js',
  },
});

// Puente para Windows: Cypress arma mal la dirección del archivo de soporte
// cuando está fuera de frontend/ (queda "/__cypress/srcC:/..."). Con este
// archivo dentro de frontend/ la dirección sale bien, y aquí se carga el
// soporte de verdad.
import '../../regression_testing/cypress/support/component.js';

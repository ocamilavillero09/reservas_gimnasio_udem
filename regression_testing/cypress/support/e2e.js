// Las pruebas viven fuera de frontend/, así que la librería se importa por ruta
// relativa desde su node_modules (Node no la encontraría subiendo directorios).
import '../../../frontend/node_modules/cypress-mochawesome-reporter/register';
import '../../../frontend/node_modules/cypress-axe';
import './commands';
import './ux';

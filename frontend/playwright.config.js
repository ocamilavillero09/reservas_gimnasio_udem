import { Module } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, devices } from '@playwright/test';

// Las pruebas end-to-end están en tests/e2e/, en la raíz del repositorio, y ahí
// no hay node_modules: Node lo busca subiendo desde el fichero que importa y no
// encuentra nada. Se le añade el node_modules de frontend/ a la ruta de
// búsqueda antes de que Playwright cargue los ficheros de prueba.
process.env.NODE_PATH = [
  fileURLToPath(new URL('./node_modules', import.meta.url)),
  process.env.NODE_PATH,
].filter(Boolean).join(path.delimiter);
Module._initPaths();

// E2E contra el stack completo (frontend + backend + mongo) levantado con
// docker compose. La app dev sirve en :5173 y llama al backend en :8000/api.
const BASE_URL = process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:5173';

export default defineConfig({
  testDir: '../tests/e2e',
  timeout: 30_000,
  expect: { timeout: 10_000 },
  fullyParallel: false,
  retries: process.env.CI ? 1 : 0,
  reporter: 'list',
  use: {
    baseURL: BASE_URL,
    headless: true,
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});

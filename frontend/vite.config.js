import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// Las pruebas viven en tests/ (raíz del repositorio), fuera de frontend/. Node
// busca node_modules subiendo desde el fichero que importa, y desde tests/ no
// hay ninguno, así que las librerías se apuntan a mano al node_modules de
// frontend/. Sin esto, las pruebas no resuelven ni React ni Testing Library.
const modulos = (nombre) =>
  fileURLToPath(new URL(`./node_modules/${nombre}`, import.meta.url));

// RNF2 — Aplicación Web Progresiva (PWA): instalable desde el móvil sin tiendas.
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['logo-udem.png'],
      manifest: {
        name: 'Gimnasio UdeM — Reservas',
        short_name: 'Gym UdeM',
        description: 'Reserva tu cupo en el gimnasio de la Universidad de Medellín.',
        theme_color: '#CC0000',
        background_color: '#F4F4F6',
        display: 'standalone',
        start_url: '/',
        icons: [
          { src: 'logo-udem.png', sizes: '192x192', type: 'image/png', purpose: 'any maskable' },
          { src: 'logo-udem.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' },
        ],
      },
    }),
  ],
  server: {
    host: true,
    port: 5173,
    // Las pruebas viven fuera de frontend/, en tests/ (raíz del repositorio).
    // Vite solo sirve ficheros dentro de su raíz, así que hay que dejarle leer
    // el directorio padre o no encuentra los ficheros de prueba.
    fs: { allow: ['..'] },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    // Solo para las pruebas: el build de producción resuelve React como
    // siempre, sin pasar por estos alias.
    alias: [
      { find: /^react$/, replacement: modulos('react') },
      { find: /^react\/(.*)$/, replacement: modulos('react/$1') },
      { find: /^react-dom$/, replacement: modulos('react-dom') },
      { find: /^react-dom\/(.*)$/, replacement: modulos('react-dom/$1') },
      { find: /^@testing-library\/(.*)$/, replacement: modulos('@testing-library/$1') },
    ],
    setupFiles: '../tests/frontend/setup.js',
    css: false,
    // Las pruebas están en tests/ (raíz), no dentro de src/. Vitest solo corre
    // los *.test.*; los *.spec.* de tests/e2e son de Playwright.
    include: ['../tests/frontend/**/*.test.{js,jsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      // Se mide el código de la aplicación, que sigue viviendo en src/.
      // `all` hace que aparezcan también los ficheros que ninguna prueba
      // importa: sin esto el informe solo mostraría lo ya cubierto.
      all: true,
      include: ['src/**/*.{js,jsx}'],
      exclude: ['src/index.jsx'],
    },
  },
});

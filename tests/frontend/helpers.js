import { vi } from 'vitest';

// Simula la respuesta del servidor. Lo comparten api.test.js y nousadas.test.js
// para no tener dos copias del mismo simulador.
export function mockFetch(responseData, ok = true) {
  global.fetch = vi.fn(() =>
    Promise.resolve({ ok, json: () => Promise.resolve(responseData) })
  );
}

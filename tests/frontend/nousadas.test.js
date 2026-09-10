// Pruebas de los requisitos que no entran en esta entrega.
//
// El plan reparte los requisitos entre tres personas: RF01 a RF05 (acceso y
// perfiles), RF06 a RF10 (reservas), y RF11 a RF16 junto con RF20 y RF21
// (asistencia, registro diario y buzón). Lo que queda fuera de ese reparto se
// prueba aquí, aparte de api.test.js, para que ese archivo contenga solo lo que
// el equipo presenta. Se siguen ejecutando con el resto: `npm test` las recoge.
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { adminApi, registroDiarioApi } from '../../frontend/src/services/Nousadas';
import { mockFetch } from './helpers';

describe('Nousadas', () => {
  beforeEach(() => vi.restoreAllMocks());

  it('crearAdministrador da de alta la cuenta con POST a /admin/users/ (RF22)', async () => {
    mockFetch({ message: 'Usuario creado con rol ADMIN.', role: 'ADMIN' }, true);
    const res = await adminApi.crearAdministrador({
      actor_email: 'jefe@udemedellin.edu.co',
      name: 'Nueva Admin',
      email: 'nueva@udemedellin.edu.co',
      documento: '3005554442',
    });
    expect(res.role).toBe('ADMIN');
    const [url, opts] = global.fetch.mock.calls[0];
    expect(url).toContain('/admin/users/');
    expect(opts.method).toBe('POST');
  });

  it('descargarRegistroEntrenador apunta al PDF del registro diario (RF18)', () => {
    expect(registroDiarioApi.descargarRegistroEntrenador('coach@udem.edu.co')).toContain('/reports/daily/entrenador.pdf?actor_email=');
  });

  it('retirarAdministrador quita el rol de administrador (RF23)', async () => {
    mockFetch({ message: 'Se retiró el rol.', role: 'SIN_ROL' });
    await adminApi.retirarAdministrador('otra@udemedellin.edu.co', 'retirar', 'jefe@udemedellin.edu.co');
    const [url, opts] = global.fetch.mock.calls[0];
    expect(url).toContain('/admin/users/otra%40udemedellin.edu.co/');
    expect(opts.method).toBe('PATCH');
    expect(JSON.parse(opts.body).accion).toBe('retirar');
  });
});

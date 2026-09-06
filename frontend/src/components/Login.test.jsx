import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './Login';

// RNF06 — Los dominios institucionales ya no están escritos en la interfaz:
// llegan del backend por el punto de configuración. La prueba los sirve como
// lo haría el servidor, de modo que si el backend cambiara un dominio, aquí
// no habría una copia vieja que lo tapara.
const CONFIG = {
  dominios: [
    { dominio: '@soyudemedellin.edu.co', rol: 'ESTUDIANTE', etiqueta: 'Estudiante' },
    { dominio: '@udem.edu.co', rol: 'ENTRENADOR', etiqueta: 'Entrenador' },
    { dominio: '@udemedellin.edu.co', rol: 'ADMIN', etiqueta: 'Administrador' },
  ],
  no_show_limite: 5,
  no_show_alerta: 2,
};

beforeEach(() => {
  vi.resetModules();
  global.fetch = vi.fn(() =>
    Promise.resolve({ ok: true, json: () => Promise.resolve(CONFIG) }));
});

describe('Login', () => {
  it('muestra las pestañas de iniciar sesión y registrarse', () => {
    render(<Login onLogin={() => {}} />);
    expect(screen.getByText('Iniciar sesión')).toBeInTheDocument();
    expect(screen.getByText('Registrarse')).toBeInTheDocument();
  });

  it('al cambiar a Registrarse aparece el campo Nombre completo', () => {
    render(<Login onLogin={() => {}} />);
    fireEvent.click(screen.getByText('Registrarse'));
    expect(screen.getByPlaceholderText(/María García/i)).toBeInTheDocument();
  });

  it('anuncia los dominios institucionales que informa el backend', async () => {
    render(<Login onLogin={() => {}} />);
    await waitFor(() =>
      expect(screen.getByText('@soyudemedellin.edu.co')).toBeInTheDocument());
    expect(screen.getByText('@udem.edu.co')).toBeInTheDocument();
    expect(screen.getByText('@udemedellin.edu.co')).toBeInTheDocument();
  });

  it('pide el documento de identidad como contraseña (RF01/RF02)', () => {
    render(<Login onLogin={() => {}} />);
    expect(screen.getByText('Documento de identidad')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Ej: 1001234567')).toBeInTheDocument();
    expect(screen.getByText(/Tu documento de identidad es tu contraseña/i)).toBeInTheDocument();
  });

  it('al escribir el correo en el registro indica el rol que se asignará', async () => {
    render(<Login onLogin={() => {}} />);
    fireEvent.click(screen.getByText('Registrarse'));
    const correo = await screen.findByPlaceholderText(/nombre@soyudemedellin/i);
    fireEvent.change(correo, { target: { value: 'jefa@udemedellin.edu.co' } });
    await waitFor(() =>
      expect(screen.getByText(/Entrarás como ADMINISTRADOR/i)).toBeInTheDocument());
  });
});

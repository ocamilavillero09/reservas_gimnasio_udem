import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AdminPanel from '../../frontend/src/components/AdminPanel';

// Panel del administrador: RF21 (buzón) y RF22 y RF23 (cuentas de
// administrador). La configuración llega del backend como en producción, así
// que los dominios y la longitud del documento no están copiados aquí.
const CONFIG = {
  dominios: [
    { dominio: '@soyudemedellin.edu.co', rol: 'ESTUDIANTE', etiqueta: 'Estudiante' },
    { dominio: '@udem.edu.co', rol: 'ENTRENADOR', etiqueta: 'Entrenador' },
    { dominio: '@udemedellin.edu.co', rol: 'ADMIN', etiqueta: 'Administrador' },
  ],
  documento_longitud: 10,
};

const USUARIOS = [
  { name: 'Jefa', email: 'jefe@udemedellin.edu.co', role: 'ADMIN', es_principal: true, documento: '3005554442', estado: 'ACTIVO' },
  { name: 'Segunda Admin', email: 'segunda@udemedellin.edu.co', role: 'ADMIN', es_principal: false, documento: '3001112223', estado: 'ACTIVO' },
  { name: 'Juan Perez', email: 'juan.perez@soyudemedellin.edu.co', role: 'ESTUDIANTE', documento: '1001234567', estado: 'PENALIZADO' },
];

const BUZON = {
  total: 1,
  mensajes: [{
    id: 'abc123', autor_nombre: 'Ana', autor_email: 'ana@soyudemedellin.edu.co',
    mensaje: 'El botón de cancelar queda tapado.', fecha: '2026-09-12T10:30:00',
  }],
};

const PRINCIPAL = { name: 'Jefa', email: 'jefe@udemedellin.edu.co', role: 'ADMIN', es_principal: true };
const NO_PRINCIPAL = { name: 'Segunda Admin', email: 'segunda@udemedellin.edu.co', role: 'ADMIN', es_principal: false };

const respuesta = (data, ok = true) => Promise.resolve({ ok, json: () => Promise.resolve(data) });

// Simula el backend según la ruta y el método. `crear` permite forzar la
// respuesta del alta de usuario para probar el camino de error.
function servidor({ crear } = {}) {
  global.fetch = vi.fn((url, opciones = {}) => {
    const ruta = String(url);
    const metodo = opciones.method || 'GET';
    if (ruta.includes('/config/')) return respuesta(CONFIG);
    if (ruta.includes('/suggestions/inbox/')) return respuesta(BUZON);
    if (metodo === 'GET' && ruta.includes('/admin/users/')) return respuesta(USUARIOS);
    if (metodo === 'POST' && ruta.includes('/admin/users/')) {
      return crear ?? respuesta({ message: 'Usuario creado con rol ENTRENADOR.', role: 'ENTRENADOR' });
    }
    if (metodo === 'DELETE') return respuesta({ message: 'Mensaje borrado del buzón.', total: 0 });
    if (metodo === 'PATCH') return respuesta({ message: 'Se retiró el rol de administrador.' });
    return respuesta({});
  });
}

const llamadas = (metodo) =>
  global.fetch.mock.calls.filter(([, opciones = {}]) => (opciones.method || 'GET') === metodo);

describe('AdminPanel', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    servidor();
  });

  it('se muestra con los usuarios y el buzón', async () => {
    // Si el panel lanzara un error al pintarse, ninguno de estos textos aparecería.
    render(<AdminPanel user={PRINCIPAL} showToast={() => {}} />);
    expect(screen.getByText('Gestión de usuarios')).toBeInTheDocument();
    expect(await screen.findByText('Juan Perez')).toBeInTheDocument();
    expect(screen.getByText('★ PRINCIPAL')).toBeInTheDocument();
    expect(screen.getByText('PENALIZADO')).toBeInTheDocument();
    expect(await screen.findByText('El botón de cancelar queda tapado.')).toBeInTheDocument();
  });

  it('RF22 — un administrador no principal ve el aviso y no puede enviar un correo de administrador', async () => {
    render(<AdminPanel user={NO_PRINCIPAL} showToast={() => {}} />);
    const correo = await screen.findByPlaceholderText('correo@udemedellin.edu.co');
    fireEvent.change(correo, { target: { value: 'nueva@udemedellin.edu.co' } });

    expect(screen.getByText(/Este correo crearía un administrador/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Crear usuario' })).toBeDisabled();
  });

  it('RF22 — el administrador principal sí puede crear un administrador', async () => {
    render(<AdminPanel user={PRINCIPAL} showToast={() => {}} />);
    const correo = await screen.findByPlaceholderText('correo@udemedellin.edu.co');
    fireEvent.change(correo, { target: { value: 'nueva@udemedellin.edu.co' } });

    expect(screen.getByText(/Este correo creará un usuario con rol ADMINISTRADOR/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Crear usuario' })).toBeEnabled();
  });

  it('avisa cuando el correo no es de ningún dominio institucional', async () => {
    render(<AdminPanel user={PRINCIPAL} showToast={() => {}} />);
    const correo = await screen.findByPlaceholderText('correo@udemedellin.edu.co');
    fireEvent.change(correo, { target: { value: 'alguien@gmail.com' } });
    expect(screen.getByText(/no pertenece a ninguno de los tres dominios/)).toBeInTheDocument();
  });

  it('RN02 — el documento solo admite dígitos y la longitud que publica el backend', async () => {
    render(<AdminPanel user={PRINCIPAL} showToast={() => {}} />);
    const documento = await screen.findByPlaceholderText('Documento de identidad (10 dígitos)');
    expect(documento).toHaveAttribute('maxlength', '10');

    fireEvent.change(documento, { target: { value: '10a0-12.34 567' } });
    expect(documento).toHaveValue('1001234567');
  });

  it('crea el usuario, avisa y limpia el formulario', async () => {
    const showToast = vi.fn();
    render(<AdminPanel user={PRINCIPAL} showToast={showToast} />);
    const correo = await screen.findByPlaceholderText('correo@udemedellin.edu.co');

    fireEvent.change(screen.getByPlaceholderText('Nombre completo'), { target: { value: 'Coach Nuevo' } });
    fireEvent.change(correo, { target: { value: 'Coach@udem.edu.co' } });
    fireEvent.change(screen.getByPlaceholderText('Documento de identidad (10 dígitos)'), { target: { value: '7009998881' } });
    fireEvent.click(screen.getByRole('button', { name: 'Crear usuario' }));

    await waitFor(() => expect(showToast).toHaveBeenCalledWith('Usuario creado con rol ENTRENADOR.', 'success'));
    const [, opciones] = llamadas('POST')[0];
    expect(JSON.parse(opciones.body)).toMatchObject({
      actor_email: PRINCIPAL.email, name: 'Coach Nuevo', email: 'coach@udem.edu.co', documento: '7009998881',
    });
    expect(screen.getByPlaceholderText('Nombre completo')).toHaveValue('');
  });

  it('muestra el error del servidor si el alta falla', async () => {
    servidor({ crear: respuesta({ error: 'Ya existe una cuenta con este correo.' }, false) });
    const showToast = vi.fn();
    render(<AdminPanel user={PRINCIPAL} showToast={showToast} />);
    const correo = await screen.findByPlaceholderText('correo@udemedellin.edu.co');

    fireEvent.change(screen.getByPlaceholderText('Nombre completo'), { target: { value: 'Repetido' } });
    fireEvent.change(correo, { target: { value: 'coach@udem.edu.co' } });
    fireEvent.change(screen.getByPlaceholderText('Documento de identidad (10 dígitos)'), { target: { value: '7009998881' } });
    fireEvent.click(screen.getByRole('button', { name: 'Crear usuario' }));

    await waitFor(() => expect(showToast).toHaveBeenCalledWith('Ya existe una cuenta con este correo.', 'error'));
  });

  it('RF21 — borra un mensaje del buzón después de confirmarlo', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    const showToast = vi.fn();
    render(<AdminPanel user={PRINCIPAL} showToast={showToast} />);

    fireEvent.click(await screen.findByRole('button', { name: 'Borrar' }));

    await waitFor(() => expect(showToast).toHaveBeenCalledWith('Mensaje borrado del buzón.', 'success'));
    const [url] = llamadas('DELETE')[0];
    expect(url).toContain('/suggestions/abc123/?actor_email=');
  });

  it('RF21 — si no se confirma, el mensaje no se borra', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(false);
    render(<AdminPanel user={PRINCIPAL} showToast={() => {}} />);

    fireEvent.click(await screen.findByRole('button', { name: 'Borrar' }));
    expect(llamadas('DELETE')).toHaveLength(0);
  });

  it('RF23 — el principal retira el rol a otro administrador', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    const showToast = vi.fn();
    render(<AdminPanel user={PRINCIPAL} showToast={showToast} />);

    fireEvent.click(await screen.findByRole('button', { name: 'Retirar rol' }));

    await waitFor(() => expect(showToast).toHaveBeenCalledWith('Se retiró el rol de administrador.', 'warning'));
    const [url] = llamadas('PATCH')[0];
    expect(url).toContain('/admin/users/segunda%40udemedellin.edu.co/');
  });

  it('RF23 — un administrador no principal no ve el botón de retirar el rol', async () => {
    render(<AdminPanel user={NO_PRINCIPAL} showToast={() => {}} />);
    await screen.findByText('Juan Perez');
    expect(screen.queryByRole('button', { name: 'Retirar rol' })).not.toBeInTheDocument();
  });
});

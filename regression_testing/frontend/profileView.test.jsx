import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProfileView from '../../frontend/src/components/ProfileView';

// Perfil: RF03 (datos de entrenamiento del estudiante), RF04 y RF05 (perfil
// de solo lectura del entrenador y del administrador) y RF15 (reporte de
// inasistencias). Los rangos válidos llegan del backend, como en producción.
const CONFIG = {
  perfil_rangos: {
    edad: { minimo: 10, maximo: 100 },
    peso: { minimo: 20, maximo: 300 },
    altura: { minimo: 100, maximo: 250 },
  },
  no_show_alerta: 2,
};

const ESTUDIANTE = { name: 'Juan Perez', email: 'juan.perez@soyudemedellin.edu.co', role: 'ESTUDIANTE', documento: '1001234567', estado: 'ACTIVO' };
const ENTRENADOR = { name: 'Coach', email: 'coach@udem.edu.co', role: 'ENTRENADOR', documento: '7009998881', estado: 'ACTIVO' };

const PERFIL = { ...ESTUDIANTE, edad: 20, peso: 65, altura: 170, meta: 'Resistencia' };

const REPORTE = {
  no_show_count: 1, no_show_limite: 5, inasistencias_restantes: 4, total_asistencias: 3,
  estado: 'ACTIVO', alerta_inasistencias: null, penalizado_hasta: null,
  inasistencias: [{ id: 'r1', hour: '06:00', date: 'lunes 7 de septiembre de 2026' }],
};

const respuesta = (data, ok = true) => Promise.resolve({ ok, json: () => Promise.resolve(data) });

// Simula el backend. `reporte` y `guardar` permiten probar la penalización y
// el error al guardar sin repetir todo el simulador.
function servidor({ reporte = REPORTE, guardar } = {}) {
  global.fetch = vi.fn((url, opciones = {}) => {
    const ruta = String(url);
    const metodo = opciones.method || 'GET';
    if (ruta.includes('/config/')) return respuesta(CONFIG);
    if (ruta.includes('/reports/personal/')) return respuesta(reporte);
    if (ruta.includes('/users/entrenador/')) return respuesta(ENTRENADOR);
    if (metodo === 'PUT' && ruta.includes('/users/profile/')) {
      return guardar ?? respuesta({ ...PERFIL, ...JSON.parse(opciones.body) });
    }
    if (ruta.includes('/users/profile/')) return respuesta(PERFIL);
    return respuesta({});
  });
}

// Espera a que el perfil cargue: si se escribiera antes, la carga pisaría lo escrito.
const cargado = () => screen.findByDisplayValue('Resistencia');

describe('ProfileView', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    servidor();
  });

  it('RF03 — carga los datos de entrenamiento del estudiante', async () => {
    render(<ProfileView user={ESTUDIANTE} showToast={() => {}} />);
    await cargado();
    expect(screen.getByLabelText('Edad (años)')).toHaveValue('20');
    expect(screen.getByLabelText('Peso (kg)')).toHaveValue('65');
    expect(screen.getByLabelText('Altura (cm)')).toHaveValue('170');
  });

  it('RF03 — muestra bajo cada campo el rango que acepta el backend', async () => {
    render(<ProfileView user={ESTUDIANTE} showToast={() => {}} />);
    expect(await screen.findByText('Entre 10 y 100 años.')).toBeInTheDocument();
    expect(screen.getByText('Entre 20 y 300 kg.')).toBeInTheDocument();
    expect(screen.getByText('Entre 100 y 250 cm.')).toBeInTheDocument();
  });

  it('RF03 — la edad no admite la letra e, el signo menos ni caracteres especiales', async () => {
    render(<ProfileView user={ESTUDIANTE} showToast={() => {}} />);
    await cargado();
    const edad = screen.getByLabelText('Edad (años)');
    fireEvent.change(edad, { target: { value: 'e-2a5!' } });
    expect(edad).toHaveValue('25');
  });

  it('RF03 — el peso no admite negativos ni la e, y deja un solo decimal', async () => {
    render(<ProfileView user={ESTUDIANTE} showToast={() => {}} />);
    await cargado();
    const peso = screen.getByLabelText('Peso (kg)');
    fireEvent.change(peso, { target: { value: '-6e5.55kg' } });
    expect(peso).toHaveValue('65.5');
  });

  it('RF03 — la altura no admite negativos, la e ni más de tres cifras', async () => {
    render(<ProfileView user={ESTUDIANTE} showToast={() => {}} />);
    await cargado();
    const altura = screen.getByLabelText('Altura (cm)');
    fireEvent.change(altura, { target: { value: '-1,7e0' } });
    expect(altura).toHaveValue('170');
    fireEvent.change(altura, { target: { value: '12345' } });
    expect(altura).toHaveValue('123');
  });

  it('RF03 — guarda los datos como números y avisa', async () => {
    const showToast = vi.fn();
    render(<ProfileView user={ESTUDIANTE} showToast={showToast} />);
    await cargado();

    fireEvent.change(screen.getByLabelText('Edad (años)'), { target: { value: '25' } });
    fireEvent.change(screen.getByLabelText('Peso (kg)'), { target: { value: '70.5' } });
    fireEvent.click(screen.getByRole('button', { name: 'Guardar perfil' }));

    await waitFor(() => expect(showToast).toHaveBeenCalledWith('Perfil actualizado.', 'success'));
    const put = global.fetch.mock.calls.find(([, o = {}]) => o.method === 'PUT');
    expect(JSON.parse(put[1].body)).toMatchObject({ email: ESTUDIANTE.email, edad: 25, peso: 70.5, altura: 170 });
  });

  it('RF03 — si el servidor rechaza el dato, muestra su mensaje', async () => {
    servidor({ guardar: respuesta({ error: 'La edad debe estar entre 10 y 100.' }, false) });
    const showToast = vi.fn();
    render(<ProfileView user={ESTUDIANTE} showToast={showToast} />);
    await cargado();

    fireEvent.click(screen.getByRole('button', { name: 'Guardar perfil' }));
    await waitFor(() => expect(showToast).toHaveBeenCalledWith('La edad debe estar entre 10 y 100.', 'error'));
  });

  it('RF15 — muestra el reporte de inasistencias con su detalle', async () => {
    render(<ProfileView user={ESTUDIANTE} showToast={() => {}} />);
    expect(await screen.findByText(/Mis inasistencias y penalizaciones/)).toBeInTheDocument();
    expect(screen.getByText('Detalle de mis inasistencias')).toBeInTheDocument();
    expect(screen.getByText('lunes 7 de septiembre de 2026')).toBeInTheDocument();
  });

  it('RF15 — avisa cuando la cuenta está penalizada', async () => {
    servidor({ reporte: { ...REPORTE, no_show_count: 5, inasistencias_restantes: 0, estado: 'PENALIZADO', penalizado_hasta: '2026-09-20' } });
    render(<ProfileView user={ESTUDIANTE} showToast={() => {}} />);
    expect(await screen.findByText('PENALIZADA')).toBeInTheDocument();
  });

  it('RF15 — muestra la alerta cuando se acerca al límite', async () => {
    servidor({ reporte: { ...REPORTE, no_show_count: 3, inasistencias_restantes: 2, alerta_inasistencias: 'Te quedan 2 inasistencias.' } });
    render(<ProfileView user={ESTUDIANTE} showToast={() => {}} />);
    expect(await screen.findByText(/Te quedan 2 inasistencias/)).toBeInTheDocument();
  });

  it('RF04 — el entrenador ve sus datos pero no el formulario de entrenamiento', async () => {
    render(<ProfileView user={ENTRENADOR} showToast={() => {}} />);
    expect(await screen.findByText('7009998881')).toBeInTheDocument();
    expect(screen.getByText('Entrenador')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Guardar perfil' })).not.toBeInTheDocument();
    const rutas = global.fetch.mock.calls.map(([url]) => String(url));
    expect(rutas.some((r) => r.includes('/users/entrenador/'))).toBe(true);
    expect(rutas.some((r) => r.includes('/reports/personal/'))).toBe(false);
  });
});

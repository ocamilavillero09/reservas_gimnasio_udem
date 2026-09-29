import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Dashboard from '../../frontend/src/components/Dashboard';
import MyReservations from '../../frontend/src/components/MyReservations';

// Módulo de reservas del estudiante: RF06 y RF07 (Dashboard) y RF08 y RF09
// (MyReservations). La configuración de negocio llega del backend (RNF06), así
// que se simula su respuesta en vez de copiar aquí el umbral de inasistencias.
const api = vi.hoisted(() => ({
  configApi: { consultarConfiguracion: vi.fn() },
}));
vi.mock('../../frontend/src/services/api', () => api);

const ESTUDIANTE = {
  name: 'Juan Pérez', email: 'juan.perez@soyudemedellin.edu.co', role: 'ESTUDIANTE',
  no_show_count: 1, no_show_limite: 5, inasistencias_restantes: 4,
};
const FECHA = { fecha: '2026-09-16', label: 'miércoles 16 de septiembre de 2026' };
const BLOQUES = [
  { id: 1, hour: '06:00', available: 20, total: 20 },
  { id: 2, hour: '08:00', available: 3, total: 20 },
  { id: 3, hour: '10:00', available: 0, total: 20 },
];

// Botón de reservar de la tarjeta del bloque que empieza a esa hora.
const botonDe = (hora) =>
  screen.getByText(hora).parentElement.querySelector('button');

describe('RF06 / RF07 — Dashboard', () => {
  let onReserve;

  beforeEach(() => {
    vi.clearAllMocks();
    onReserve = vi.fn();
    api.configApi.consultarConfiguracion.mockResolvedValue({ no_show_alerta: 2 });
  });

  const tablero = (props = {}) => render(
    <Dashboard slots={BLOQUES} user={ESTUDIANTE} reservaFecha={FECHA}
               reservations={[]} onReserve={onReserve} {...props} />,
  );

  it('RF06 — muestra cada bloque con sus cupos y el total disponible', () => {
    tablero();
    expect(screen.getByText('Hola, Juan 👋')).toBeInTheDocument();
    expect(screen.getByText('miércoles 16 de septiembre de 2026')).toBeInTheDocument();
    expect(screen.getByText('23')).toBeInTheDocument();          // 20 + 3 + 0 cupos
    expect(screen.getByText('0/1')).toBeInTheDocument();
    expect(screen.getAllByText('Bloque')).toHaveLength(3);
  });

  it('RF06 — clasifica los bloques en disponible, casi lleno y sin cupos', () => {
    tablero();
    expect(screen.getByText('● Disponible')).toBeInTheDocument();
    expect(screen.getByText('● Casi lleno')).toBeInTheDocument();
    expect(screen.getByText('● Sin cupos')).toBeInTheDocument();
  });

  it('RF06 — un bloque sin cupos no se puede reservar', () => {
    tablero();
    const agotado = botonDe('10:00');
    expect(agotado).toHaveTextContent('Sin cupos');
    expect(agotado).toBeDisabled();
    expect(botonDe('06:00')).toBeEnabled();
  });

  it('RF07 — reservar pide confirmación con la fecha de mañana y, al confirmar, reserva ese bloque', () => {
    tablero();
    fireEvent.click(botonDe('06:00'));

    expect(screen.getByText('Confirmar reserva')).toBeInTheDocument();
    expect(screen.getAllByText('miércoles 16 de septiembre de 2026')).toHaveLength(2);
    fireEvent.click(screen.getByRole('button', { name: 'Confirmar ✓' }));

    expect(onReserve).toHaveBeenCalledWith(BLOQUES[0]);
    expect(screen.queryByText('Confirmar reserva')).not.toBeInTheDocument();
  });

  it('RF07 — cancelar la confirmación no reserva', () => {
    tablero();
    fireEvent.click(botonDe('08:00'));
    fireEvent.click(screen.getByRole('button', { name: 'Cancelar' }));

    expect(onReserve).not.toHaveBeenCalled();
    expect(screen.queryByText('Confirmar reserva')).not.toBeInTheDocument();
  });

  it('RF07 — sin fecha todavía, el modal muestra "el día siguiente"', () => {
    tablero({ reservaFecha: null });
    expect(screen.getByText('Cargando fecha...')).toBeInTheDocument();
    fireEvent.click(botonDe('06:00'));
    expect(screen.getByText('el día siguiente')).toBeInTheDocument();
  });

  it('RN05 — con una reserva ya hecha, ese bloque aparece reservado y los demás bloqueados', () => {
    tablero({ reservations: [{ id: 'r1', slotId: 1, hour: '06:00' }] });

    expect(screen.getByText('✓ Reservado')).toBeInTheDocument();
    expect(botonDe('06:00')).toHaveTextContent('✓ Ya reservado');
    expect(botonDe('08:00')).toHaveTextContent('Ya reservaste este día');
    expect(botonDe('08:00')).toBeDisabled();
    expect(screen.getByText('1/1')).toBeInTheDocument();
  });

  it('RN08 — muestra el límite de inasistencias y lo resalta cerca del umbral del backend', async () => {
    tablero({ user: { ...ESTUDIANTE, no_show_count: 3, inasistencias_restantes: 2 } });

    const valor = screen.getByText('Inasistencias (límite 5)').previousElementSibling;
    expect(valor).toHaveTextContent('3');
    await waitFor(() => expect(valor).toHaveStyle({ color: '#B45309' }));
  });

  it('RN08 — sin límite informado la tarjeta no inventa un número', () => {
    tablero({ user: { name: 'Ana' } });
    expect(screen.getByText('Inasistencias')).toBeInTheDocument();
    expect(screen.getByText('Hola, Ana 👋')).toBeInTheDocument();
  });

  it('el efecto de pasar el mouse solo aplica a bloques disponibles', () => {
    tablero();
    const disponible = botonDe('06:00').parentElement;
    fireEvent.mouseEnter(disponible);
    expect(disponible.style.transform).toBe('translateY(-5px)');
    fireEvent.mouseLeave(disponible);
    expect(disponible.style.transform).toBe('translateY(0)');

    const agotado = botonDe('10:00').parentElement;
    fireEvent.mouseEnter(agotado);
    expect(agotado.style.transform).not.toBe('translateY(-5px)');
  });
});

describe('RF08 / RF09 — MyReservations', () => {
  let onCancel;
  let onNavigate;
  const RESERVA = { id: 'r1', slotId: 2, hour: '08:00', date: 'miércoles 16 de septiembre de 2026' };

  beforeEach(() => {
    onCancel = vi.fn();
    onNavigate = vi.fn();
  });

  const mias = (reservations, reservaFecha = FECHA) => render(
    <MyReservations reservations={reservations} reservaFecha={reservaFecha}
                    onCancel={onCancel} onNavigate={onNavigate} />,
  );

  it('RF08 — sin reservas muestra el estado vacío y lleva a reservar', () => {
    mias([]);
    expect(screen.getByText('Sin reservas activas')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Ir a reservar →' }));
    expect(onNavigate).toHaveBeenCalledWith('dashboard');
  });

  it('RF08 — lista la reserva activa de mañana con su fecha', () => {
    mias([RESERVA]);
    expect(screen.getByText('08:00')).toBeInTheDocument();
    expect(screen.getByText('● Activa')).toBeInTheDocument();
    expect(screen.getByText(/· miércoles 16 de septiembre de 2026/)).toBeInTheDocument();
    expect(screen.getByText(/debes cancelar tu reserva/)).toBeInTheDocument();
  });

  it('RF08 — sin la fecha todavía no muestra la etiqueta', () => {
    mias([RESERVA], null);
    expect(screen.queryByText(/· miércoles/)).not.toBeInTheDocument();
  });

  it('RF09 — cancelar pide confirmación y, al confirmar, cancela esa reserva', () => {
    mias([RESERVA]);
    fireEvent.click(screen.getByRole('button', { name: 'Cancelar' }));

    expect(screen.getByText('¿Cancelar reserva?')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Sí, cancelar' }));

    expect(onCancel).toHaveBeenCalledWith('r1');
    expect(screen.queryByText('¿Cancelar reserva?')).not.toBeInTheDocument();
  });

  it('RF09 — "Mantener" cierra la confirmación sin cancelar', () => {
    mias([RESERVA]);
    fireEvent.click(screen.getByRole('button', { name: 'Cancelar' }));
    fireEvent.click(screen.getByRole('button', { name: 'Mantener' }));

    expect(onCancel).not.toHaveBeenCalled();
    expect(screen.queryByText('¿Cancelar reserva?')).not.toBeInTheDocument();
  });
});

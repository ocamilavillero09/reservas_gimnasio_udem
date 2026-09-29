import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import TrainerPanel from '../../frontend/src/components/TrainerPanel';
import HistoryView from '../../frontend/src/components/HistoryView';
import AdminPanel from '../../frontend/src/components/AdminPanel';

// Pruebas unitarias de caja blanca — Camila (frontend).
//
// Requisitos: RF11, RF12, RF13, RF16, RF20 y RF21. Cada `describe` corresponde
// a un diagrama front_RF*.drawio y cada `it` a una fila de la tabla de caminos
// de caja-blanca-camila.docx; el nombre lleva los nodos del camino.
//
// El cliente HTTP se reemplaza por funciones simuladas: se prueba la lógica del
// componente, no el backend.

const api = vi.hoisted(() => ({
  attendanceApi: {
    buscarReserva: vi.fn(),
    registrarAsistencia: vi.fn(),
    consultarReservas: vi.fn(),
    procesarInasistencia: vi.fn(),
  },
  reportsApi: { verRegistroEntrenador: vi.fn() },
  slotsApi: { consultarHorarios: vi.fn() },
  reservationsApi: { verHistorial: vi.fn() },
  buzonApi: { falloSugerencia: vi.fn(), consultarBuzon: vi.fn(), eliminarSugerencia: vi.fn() },
  configApi: { consultarConfiguracion: vi.fn() },
}));
const nousadas = vi.hoisted(() => ({
  registroDiarioApi: {
    verRegistroAdministrador: vi.fn(),
    descargarRegistroEntrenador: vi.fn(() => '#pdf'),
    descargarRegistroAdministrador: vi.fn(() => '#pdf'),
  },
  adminApi: { listarUsuarios: vi.fn(), crearAdministrador: vi.fn(), retirarAdministrador: vi.fn() },
}));

vi.mock('../../frontend/src/services/api', () => api);
vi.mock('../../frontend/src/services/Nousadas', () => nousadas);

const ENTRENADOR = { name: 'Coach', email: 'coach@udem.edu.co', role: 'ENTRENADOR' };
const ADMIN = { name: 'Jefa', email: 'jefe@udemedellin.edu.co', role: 'ADMIN', es_principal: true };
const ESTUDIANTE = { name: 'Juan Pérez', email: 'juan.perez@soyudemedellin.edu.co', role: 'ESTUDIANTE' };

const SIN_PENDIENTES = { fecha_label: 'martes 15 de septiembre de 2026', no_show_limite: 5, total: 0, pendientes: [] };
const pendiente = (id, name) => ({
  id, name, email: `${id}@soyudemedellin.edu.co`, documento: '1001234567',
  hour: '06:00', date: 'martes 15 de septiembre de 2026', no_show_count: 1, inasistencias_restantes: 4,
});
const CON_PENDIENTES = { ...SIN_PENDIENTES, total: 2, pendientes: [pendiente('p1', 'Juan Pérez'), pendiente('p2', 'Ana Gómez')] };

const REGISTRO = {
  fecha_label: 'martes 15 de septiembre de 2026',
  totales: { asistencias: 3, cancelaciones: 1, inasistencias: 2, estudiantes_penalizados: 0 },
  penalizados: [],
};

// Valor que muestra la tarjeta de totales de RF16 con esa etiqueta.
const total = (etiqueta) =>
  screen.getAllByText(etiqueta).find((el) => el.previousElementSibling)?.previousElementSibling.textContent;

let showToast;
let onChanged;

beforeEach(() => {
  vi.clearAllMocks();
  showToast = vi.fn();
  onChanged = vi.fn();
  api.slotsApi.consultarHorarios.mockResolvedValue({ slots: [] });
  api.attendanceApi.consultarReservas.mockResolvedValue(SIN_PENDIENTES);
  api.reportsApi.verRegistroEntrenador.mockResolvedValue(REGISTRO);
  nousadas.registroDiarioApi.verRegistroAdministrador.mockResolvedValue(REGISTRO);
  api.reservationsApi.verHistorial.mockResolvedValue([]);
  api.configApi.consultarConfiguracion.mockResolvedValue({ dominios: [], documento_longitud: 10 });
  nousadas.adminApi.listarUsuarios.mockResolvedValue([]);
  api.buzonApi.consultarBuzon.mockResolvedValue({ total: 0, mensajes: [] });
  vi.spyOn(window, 'confirm').mockReturnValue(true);
});

const panel = (user = ENTRENADOR) =>
  render(<TrainerPanel user={user} onChanged={onChanged} showToast={showToast} />);

// ── RF11 — registrarAsistencia · front_RF11_registrarAsistencia.drawio ─────
describe('RF11 — registrarAsistencia (TrainerPanel)', () => {
  beforeEach(() => {
    api.attendanceApi.consultarReservas.mockResolvedValue(CON_PENDIENTES);
  });

  it('camino 1-2-3-4-9: la API responde con error y se muestra el mensaje del servidor', async () => {
    api.attendanceApi.registrarAsistencia.mockRejectedValue(new Error('El bloque de las 12:00 todavía no empieza.'));
    panel();
    fireEvent.click((await screen.findAllByRole('button', { name: 'Asistió' }))[0]);

    await waitFor(() =>
      expect(showToast).toHaveBeenCalledWith('El bloque de las 12:00 todavía no empieza.', 'error'));
    expect(api.attendanceApi.registrarAsistencia).toHaveBeenCalledWith({ actor_email: ENTRENADOR.email, reservation_id: 'p1' });
    expect(onChanged).not.toHaveBeenCalled();
  });

  it('camino 1-2-3-5-6-8-9: registro exitoso con notificación, limpia la búsqueda y refresca el panel', async () => {
    api.attendanceApi.buscarReserva.mockResolvedValue({
      estudiante: { name: 'Juan Pérez', documento: '1001234567', email: 'juan@x.co', estado: 'ACTIVO', no_show_count: 0, no_show_limite: 5 },
      tiene_reserva: true,
      reservas: [{ id: 'r1', hour: '06:00', date: 'martes 15', es_de_hoy: true }],
    });
    api.attendanceApi.registrarAsistencia.mockResolvedValue({ notificacion: 'Asistencia registrada para las 06:00 del martes 15.' });
    panel();

    const campo = screen.getByPlaceholderText('Documento de identidad del estudiante');
    fireEvent.change(campo, { target: { value: '1001234567' } });
    fireEvent.click(screen.getByRole('button', { name: 'Buscar' }));
    fireEvent.click(await screen.findByRole('button', { name: 'Registrar asistencia' }));

    await waitFor(() =>
      expect(showToast).toHaveBeenCalledWith('Asistencia registrada para las 06:00 del martes 15.', 'success'));
    expect(screen.queryByRole('button', { name: 'Registrar asistencia' })).not.toBeInTheDocument();
    expect(campo).toHaveValue('');
    expect(onChanged).toHaveBeenCalledTimes(1);
    expect(api.attendanceApi.consultarReservas).toHaveBeenCalledTimes(2);
  });

  it('camino 1-2-3-5-7-8-9: respuesta sin notificación muestra "Asistencia registrada."', async () => {
    api.attendanceApi.registrarAsistencia.mockResolvedValue({});
    panel();
    fireEvent.click((await screen.findAllByRole('button', { name: 'Asistió' }))[0]);

    await waitFor(() => expect(showToast).toHaveBeenCalledWith('Asistencia registrada.', 'success'));
    expect(onChanged).toHaveBeenCalledTimes(1);
    expect(api.attendanceApi.consultarReservas).toHaveBeenCalledTimes(2);
  });
});

// ── RF12 — pendientes · front_RF12_pendientes.drawio ───────────────────────
describe('RF12 — pendientes (TrainerPanel)', () => {
  const sinPendientes = /No hay estudiantes pendientes/;

  it('camino 1-2-3-4-6-8-9-10-13: entrenador y la petición falla', async () => {
    api.attendanceApi.consultarReservas.mockRejectedValue(new Error('Backend caído'));
    panel();
    await waitFor(() => expect(api.attendanceApi.consultarReservas).toHaveBeenCalled());

    expect(screen.getByText(sinPendientes)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cerrar jornada' })).toBeInTheDocument();
  });

  it('camino 1-2-3-5-6-7-9-10-13: administrador sin pendientes', async () => {
    panel(ADMIN);
    expect(await screen.findByText(sinPendientes)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Cerrar jornada' })).not.toBeInTheDocument();
  });

  it('camino 1-2-3-5-6-8-9-10-13: entrenador sin pendientes', async () => {
    panel();
    expect(await screen.findByText(/· martes 15 de septiembre de 2026\./)).toBeInTheDocument();
    expect(screen.getByText(sinPendientes)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cerrar jornada' })).toBeInTheDocument();
  });

  it('camino 1-2-3-5-6-8-9-11-12-11-13: entrenador con pendientes ve una fila y un botón "Asistió" por estudiante', async () => {
    api.attendanceApi.consultarReservas.mockResolvedValue(CON_PENDIENTES);
    panel();

    expect(await screen.findByText('Ana Gómez')).toBeInTheDocument();
    const filas = within(screen.getByRole('table')).getAllByRole('row').slice(1);
    expect(filas).toHaveLength(2);
    expect(screen.getAllByRole('button', { name: 'Asistió' })).toHaveLength(2);
    expect(screen.getByRole('button', { name: 'Cerrar jornada' })).toBeInTheDocument();
  });

  it('camino 1-2-3-5-6-7-9-11-12-11-13: administrador con pendientes ve la tabla sin "Cerrar jornada"', async () => {
    api.attendanceApi.consultarReservas.mockResolvedValue(CON_PENDIENTES);
    panel(ADMIN);

    expect(await screen.findByText('Ana Gómez')).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Cerrar jornada' })).not.toBeInTheDocument();
  });
});

// ── RF13 — procesarInasistencias · front_RF13_procesarInasistencias.drawio ──
describe('RF13 — procesarInasistencias (TrainerPanel)', () => {
  const cerrarJornada = async () => {
    panel();
    const boton = screen.getByRole('button', { name: 'Cerrar jornada' });
    await waitFor(() => expect(api.attendanceApi.consultarReservas).toHaveBeenCalled());
    return boton;
  };

  it('camino 1-2-3-4-14: sin pendientes avisa y no llama a la API', async () => {
    const boton = await cerrarJornada();
    await screen.findByText(/No hay estudiantes pendientes/);
    fireEvent.click(boton);

    expect(showToast).toHaveBeenCalledWith('No hay inasistencias pendientes por procesar.', 'info');
    expect(window.confirm).not.toHaveBeenCalled();
    expect(api.attendanceApi.procesarInasistencia).not.toHaveBeenCalled();
  });

  it('camino 1-2-3-5-14: el entrenador cancela la confirmación y no cambia nada', async () => {
    api.attendanceApi.consultarReservas.mockResolvedValue(CON_PENDIENTES);
    window.confirm.mockReturnValue(false);
    const boton = await cerrarJornada();
    await screen.findByText('Ana Gómez');
    fireEvent.click(boton);

    expect(window.confirm).toHaveBeenCalledWith(expect.stringContaining('Se marcarán 2 inasistencias'));
    expect(api.attendanceApi.procesarInasistencia).not.toHaveBeenCalled();
    expect(showToast).not.toHaveBeenCalled();
  });

  it('camino 1-2-3-5-6-7-8-13-14: la API responde con error y el botón vuelve a habilitarse', async () => {
    api.attendanceApi.consultarReservas.mockResolvedValue(CON_PENDIENTES);
    api.attendanceApi.procesarInasistencia.mockRejectedValue(new Error('Solo el entrenador puede cerrar la jornada.'));
    const boton = await cerrarJornada();
    await screen.findByText('Ana Gómez');
    fireEvent.click(boton);

    await waitFor(() =>
      expect(showToast).toHaveBeenCalledWith('Solo el entrenador puede cerrar la jornada.', 'error'));
    expect(screen.getByRole('button', { name: 'Cerrar jornada' })).toBeEnabled();
    expect(onChanged).not.toHaveBeenCalled();
  });

  it('camino 1-2-3-5-6-7-9-11-12-13-14: cierre sin penalizados muestra un aviso de éxito y refresca', async () => {
    api.attendanceApi.consultarReservas.mockResolvedValue(CON_PENDIENTES);
    api.attendanceApi.procesarInasistencia.mockResolvedValue({ message: 'Se procesaron 2 inasistencias.', total_penalizados: 0 });
    const boton = await cerrarJornada();
    await screen.findByText('Ana Gómez');
    fireEvent.click(boton);

    await waitFor(() => expect(showToast).toHaveBeenCalledWith('Se procesaron 2 inasistencias.', 'success'));
    expect(api.attendanceApi.procesarInasistencia).toHaveBeenCalledWith(ENTRENADOR.email);
    expect(onChanged).toHaveBeenCalledTimes(1);
    expect(api.attendanceApi.consultarReservas).toHaveBeenCalledTimes(2);
  });

  it('camino 1-2-3-5-6-7-9-10-12-13-14: cierre con penalizados muestra un aviso de advertencia', async () => {
    api.attendanceApi.consultarReservas.mockResolvedValue(CON_PENDIENTES);
    const mensaje = 'Se procesaron 2 inasistencias. Estudiantes penalizados: Juan Pérez.';
    api.attendanceApi.procesarInasistencia.mockResolvedValue({ message: mensaje, total_penalizados: 1 });
    const boton = await cerrarJornada();
    await screen.findByText('Ana Gómez');
    fireEvent.click(boton);

    await waitFor(() => expect(showToast).toHaveBeenCalledWith(mensaje, 'warning'));
    expect(onChanged).toHaveBeenCalledTimes(1);
  });
});

// ── RF16 — registroDiario · front_RF16_registroDiario.drawio ───────────────
describe('RF16 — registroDiario (TrainerPanel)', () => {
  it('camino 1-2-4-5-6-8-9-10-12-13-14-15-14-16: registro con penalizados', async () => {
    api.reportsApi.verRegistroEntrenador.mockResolvedValue({
      ...REGISTRO,
      totales: { ...REGISTRO.totales, estudiantes_penalizados: 1 },
      penalizados: [{ name: 'Juan Pérez', email: 'juan@x.co', documento: '1001234567', no_show_count: 5 }],
    });
    panel();

    expect(await screen.findByText('5 inasistencias')).toBeInTheDocument();
    expect(screen.getByText('martes 15 de septiembre de 2026')).toBeInTheDocument();
    expect(total('Asistencias')).toBe('3');
    expect(total('Estudiantes penalizados')).toBe('1');
    expect(screen.getAllByText('Estudiantes penalizados')).toHaveLength(2);   // tarjeta + lista
  });

  it('camino 1-2-4-5-6-8-9-10-12-13-16: registro sin penalizados no muestra la lista', async () => {
    panel();

    expect(await screen.findByText('martes 15 de septiembre de 2026')).toBeInTheDocument();
    expect(total('Asistencias')).toBe('3');
    expect(total('Cancelaciones')).toBe('1');
    expect(total('Inasistencias')).toBe('2');
    expect(screen.getAllByText('Estudiantes penalizados')).toHaveLength(1);   // solo la tarjeta
  });

  it('camino 1-2-4-5-6-7-9-11-12-13-16: la petición falla y se muestra "Actividad del día" con totales en 0', async () => {
    api.reportsApi.verRegistroEntrenador.mockRejectedValue(new Error('Backend caído'));
    panel();
    await waitFor(() => expect(api.reportsApi.verRegistroEntrenador).toHaveBeenCalledWith(ENTRENADOR.email));

    expect(screen.getByText('Actividad del día')).toBeInTheDocument();
    expect(total('Asistencias')).toBe('0');
    expect(total('Inasistencias')).toBe('0');
  });

  it('camino 1-2-4-5-6-8-9-11-12-13-16: la respuesta llega sin fecha_label', async () => {
    api.reportsApi.verRegistroEntrenador.mockResolvedValue({ ...REGISTRO, fecha_label: undefined });
    panel();

    await waitFor(() => expect(total('Asistencias')).toBe('3'));
    expect(screen.getByText('Actividad del día')).toBeInTheDocument();
  });

  it('camino 1-2-3-5-6-8-9-10-12-13-16: el administrador usa verRegistroAdministrador', async () => {
    panel(ADMIN);

    expect(await screen.findByText('martes 15 de septiembre de 2026')).toBeInTheDocument();
    expect(nousadas.registroDiarioApi.verRegistroAdministrador).toHaveBeenCalledWith(ADMIN.email);
    expect(api.reportsApi.verRegistroEntrenador).not.toHaveBeenCalled();
    expect(total('Asistencias')).toBe('3');
  });

  it('camino 1-2-3-5-6-7-9-11-12-13-16: el registro del administrador falla', async () => {
    nousadas.registroDiarioApi.verRegistroAdministrador.mockRejectedValue(new Error('Backend caído'));
    panel(ADMIN);
    await waitFor(() => expect(nousadas.registroDiarioApi.verRegistroAdministrador).toHaveBeenCalled());

    expect(screen.getByText('Actividad del día')).toBeInTheDocument();
    expect(total('Asistencias')).toBe('0');
  });
});

// ── RF20 — enviarReporte · front_RF20_enviarReporte.drawio ─────────────────
describe('RF20 — enviarReporte (HistoryView)', () => {
  const vista = () => render(<HistoryView user={ESTUDIANTE} showToast={showToast} />);
  const campo = () => screen.getByPlaceholderText('Cuéntanos qué pasó o qué mejorarías');
  const enviar = () => screen.getByRole('button', { name: /Enviar al administrador|Enviando/ });

  it('camino 1-2-3-13: con el campo vacío o solo espacios el botón queda deshabilitado', async () => {
    vista();
    expect(enviar()).toBeDisabled();
    fireEvent.change(campo(), { target: { value: '    ' } });
    expect(enviar()).toBeDisabled();
    expect(api.buzonApi.falloSugerencia).not.toHaveBeenCalled();
  });

  it('camino 1-2-4-5-6-7-12-13: la API responde con error y el botón vuelve a habilitarse', async () => {
    api.buzonApi.falloSugerencia.mockRejectedValue(new Error('El mensaje no puede superar los 2000 caracteres.'));
    vista();
    fireEvent.change(campo(), { target: { value: 'Falla en el login' } });
    fireEvent.click(enviar());

    await waitFor(() =>
      expect(showToast).toHaveBeenCalledWith('El mensaje no puede superar los 2000 caracteres.', 'error'));
    expect(enviar()).toBeEnabled();
    expect(campo()).toHaveValue('Falla en el login');
  });

  it('camino 1-2-4-5-6-8-9-11-12-13: respuesta con notificación y el campo queda vacío', async () => {
    api.buzonApi.falloSugerencia.mockResolvedValue({ notificacion: 'Tu reporte llegó al administrador. Gracias por avisar.' });
    vista();
    fireEvent.change(campo(), { target: { value: 'Falla en el login' } });
    fireEvent.click(enviar());

    await waitFor(() =>
      expect(showToast).toHaveBeenCalledWith('Tu reporte llegó al administrador. Gracias por avisar.', 'success'));
    expect(api.buzonApi.falloSugerencia).toHaveBeenCalledWith({ email: ESTUDIANTE.email, mensaje: 'Falla en el login' });
    expect(campo()).toHaveValue('');
  });

  it('camino 1-2-4-5-6-8-10-11-12-13: respuesta sin notificación muestra "Mensaje enviado."', async () => {
    api.buzonApi.falloSugerencia.mockResolvedValue({});
    vista();
    fireEvent.change(campo(), { target: { value: 'Una mejora' } });
    fireEvent.click(enviar());

    await waitFor(() => expect(showToast).toHaveBeenCalledWith('Mensaje enviado.', 'success'));
    expect(campo()).toHaveValue('');
  });
});

// ── RF21 — cargarBuzon · front_RF21_cargarBuzon.drawio ─────────────────────
const BUZON = {
  total: 2,
  mensajes: [
    { id: 'm1', autor_nombre: 'Juan Pérez', autor_email: 'juan@x.co', mensaje: 'El botón no responde.', fecha: '2026-09-15T10:30:00' },
    { id: 'm2', autor_nombre: 'Ana Gómez', autor_email: 'ana@x.co', mensaje: 'Agreguen modo oscuro.', fecha: '2026-09-14T09:00:00' },
  ],
};
const buzonPanel = () => render(<AdminPanel user={ADMIN} showToast={showToast} />);
const tituloBuzon = () => screen.getByRole('heading', { name: /Buzón de sugerencias/ });

describe('RF21 — cargarBuzon (AdminPanel)', () => {
  it('camino 1-2-3-4-6-8-9-12: la petición falla, sin contador y "Todavía no hay mensajes."', async () => {
    api.buzonApi.consultarBuzon.mockRejectedValue(new Error('Solo el administrador puede consultar el buzón.'));
    buzonPanel();
    await waitFor(() => expect(api.buzonApi.consultarBuzon).toHaveBeenCalledWith(ADMIN.email));

    expect(screen.getByText('Todavía no hay mensajes.')).toBeInTheDocument();
    expect(tituloBuzon()).toHaveTextContent(/^💬 Buzón de sugerencias$/);
  });

  it('camino 1-2-3-5-6-8-9-12: buzón vacío, sin contador y "Todavía no hay mensajes."', async () => {
    buzonPanel();
    expect(await screen.findByText('Todavía no hay mensajes.')).toBeInTheDocument();
    expect(tituloBuzon()).toHaveTextContent(/^💬 Buzón de sugerencias$/);
    expect(screen.queryByRole('button', { name: 'Borrar' })).not.toBeInTheDocument();
  });

  it('camino 1-2-3-5-6-7-8-10-11-10-12: buzón con mensajes, contador y una tarjeta con "Borrar" por mensaje', async () => {
    api.buzonApi.consultarBuzon.mockResolvedValue(BUZON);
    buzonPanel();

    expect(await screen.findByText('El botón no responde.')).toBeInTheDocument();
    expect(screen.getByText('Agreguen modo oscuro.')).toBeInTheDocument();
    expect(tituloBuzon()).toHaveTextContent('2');
    expect(screen.getAllByRole('button', { name: 'Borrar' })).toHaveLength(2);
    expect(screen.queryByText('Todavía no hay mensajes.')).not.toBeInTheDocument();
  });
});

// ── RF21 — borrarMensaje · front_RF21_borrarMensaje.drawio ─────────────────
describe('RF21 — borrarMensaje (AdminPanel)', () => {
  const borrarPrimero = async () => {
    api.buzonApi.consultarBuzon.mockResolvedValue(BUZON);
    buzonPanel();
    fireEvent.click((await screen.findAllByRole('button', { name: 'Borrar' }))[0]);
  };

  it('camino 1-2-8: el administrador cancela y el mensaje sigue en el buzón', async () => {
    window.confirm.mockReturnValue(false);
    await borrarPrimero();

    expect(window.confirm).toHaveBeenCalledWith(expect.stringContaining('Juan Pérez'));
    expect(api.buzonApi.eliminarSugerencia).not.toHaveBeenCalled();
    expect(screen.getByText('El botón no responde.')).toBeInTheDocument();
  });

  it('camino 1-2-3-4-5-8: la API responde con error y se muestra el mensaje del servidor', async () => {
    api.buzonApi.eliminarSugerencia.mockRejectedValue(new Error('Mensaje no encontrado.'));
    await borrarPrimero();

    await waitFor(() => expect(showToast).toHaveBeenCalledWith('Mensaje no encontrado.', 'error'));
    expect(api.buzonApi.consultarBuzon).toHaveBeenCalledTimes(1);
  });

  it('camino 1-2-3-4-6-7-8: borrado exitoso avisa y recarga el buzón', async () => {
    api.buzonApi.eliminarSugerencia.mockResolvedValue({ message: 'Mensaje borrado del buzón.', total: 1 });
    await borrarPrimero();

    await waitFor(() => expect(showToast).toHaveBeenCalledWith('Mensaje borrado del buzón.', 'success'));
    expect(api.buzonApi.eliminarSugerencia).toHaveBeenCalledWith('m1', ADMIN.email);
    expect(api.buzonApi.consultarBuzon).toHaveBeenCalledTimes(2);
  });
});

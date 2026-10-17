import { useCallback, useEffect, useState } from 'react';
import { attendanceApi, reportsApi, slotsApi } from '../services/api';
// RF17, RF18 y RF19 no entran en esta entrega de pruebas y viven aparte.
import { registroDiarioApi } from '../services/Nousadas';
import { useConfig } from '../services/config';

const RED = '#CC0000';
const inputStyle = { width: '100%', padding: '12px 16px', border: '1.5px solid #E5E7EB', borderRadius: 10, fontSize: 14, backgroundColor: '#FAFAFA' };
const card = { backgroundColor: 'white', borderRadius: 18, padding: 26, boxShadow: '0 2px 14px rgba(0,0,0,0.07)', marginBottom: 24 };
const btn = { padding: '10px 18px', border: 'none', borderRadius: 10, background: RED, color: 'white', fontWeight: 800, fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap' };
const btnGhost = { padding: '10px 18px', border: '1.5px solid #E5E7EB', borderRadius: 10, background: 'white', fontWeight: 700, fontSize: 13, cursor: 'pointer', whiteSpace: 'nowrap' };

/**
 * Panel del Entrenador / Administrador.
 *
 * Este perfil NO reserva cupos (RF12): solo consulta y gestiona la operación.
 *   RF06/RF07/RF12  Bloques horarios establecidos y sus cupos
 *   RF11/HU11       Buscar la reserva de un estudiante por su DOCUMENTO
 *   RF13/HU12       Registrar la asistencia del estudiante
 *   RF14/HU13-HU15  Estudiantes con reserva y sin asistencia registrada
 *   RF15/HU14-HU16  Procesar de forma general las inasistencias de la jornada
 *   RF19/HU17-HU18  Reporte general diario
 *   RF20/HU19-HU20  El reporte general diario en PDF, para imprimir
 */
export default function TrainerPanel({ user, reservaFecha, onChanged, showToast }) {
  const [documento, setDocumento] = useState('');
  const [busqueda, setBusqueda] = useState(null);       // RF11
  const [pendientes, setPendientes] = useState(null);   // RF14
  const [diario, setDiario] = useState(null);           // RF19
  const [bloques, setBloques] = useState([]);           // RF06
  const [procesando, setProcesando] = useState(false);
  const [buscando, setBuscando] = useState(false);          // H-01
  const [errorDocumento, setErrorDocumento] = useState(''); // H-04
  const [filtro, setFiltro] = useState('');                 // H-07
  // DEF-05 / DEF-06 — Si una carga falla se dice, en vez de mostrar el estado
  // vacío ("no hay pendientes", totales en cero) como si fuera un dato real.
  const [errorPendientes, setErrorPendientes] = useState(false);
  const [errorDiario, setErrorDiario] = useState(false);
  const config = useConfig();

  const esAdmin = user.role === 'ADMIN';

  const refrescar = useCallback(() => {
    // RF06 — Es la MISMA consulta que hace el estudiante. Lo único que cambia
    // es que aquí no se ofrece la acción de reservar (RN10).
    slotsApi.consultarHorarios().then((r) => setBloques(r.slots ?? [])).catch(() => {});
    attendanceApi.consultarReservas(user.email)
      .then((r) => { setPendientes(r); setErrorPendientes(false); })
      .catch(() => setErrorPendientes(true));
    // RF16 para el entrenador, RF17 para el administrador: son dos requisitos
    // distintos porque son dos actores distintos.
    const verRegistro = esAdmin ? registroDiarioApi.verRegistroAdministrador
                                : reportsApi.verRegistroEntrenador;
    verRegistro(user.email)
      .then((r) => { setDiario(r); setErrorDiario(false); })
      .catch(() => setErrorDiario(true));
  }, [user.email, esAdmin]);

  useEffect(refrescar, [refrescar]);

  // ── RF11 / HU11 — Buscar al estudiante por su documento de identidad ─────
  const buscar = async (e) => {
    e.preventDefault();
    setBusqueda(null);
    // H-04 — Se avisa en el mismo campo si el documento no tiene la forma de
    // una cédula, sin ir al servidor. Se limpia igual que lo hace el backend.
    const limpio = documento.trim().replace(/[.\s-]/g, '');
    const largo = config?.documento_longitud;
    if (!limpio) { setErrorDocumento('Escribe el documento de identidad del estudiante.'); return; }
    if (largo && !new RegExp(`^\\d{${largo}}$`).test(limpio)) {
      setErrorDocumento(`El documento tiene ${largo} dígitos, sin letras, puntos ni espacios.`);
      return;
    }
    setErrorDocumento('');
    setBuscando(true);                                     // H-01
    try {
      setBusqueda(await attendanceApi.buscarReserva(limpio, user.email));
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setBuscando(false);
    }
  };

  // ── RF13 / HU12 — Registrar la asistencia del estudiante ────────────────
  const registrarAsistencia = async (reservationId) => {
    try {
      const r = await attendanceApi.registrarAsistencia({
        actor_email: user.email,
        reservation_id: reservationId,
      });
      showToast(r.notificacion || 'Asistencia registrada.', 'success');
      setBusqueda(null);
      setDocumento('');
      onChanged?.();
      refrescar();
    } catch (err) { showToast(err.message, 'error'); }
  };

  // ── RF13 — Cerrar la jornada. Solo el entrenador, que es quien estuvo en
  //           el gimnasio y puede dar fe de quién asistió.
  const procesarInasistencias = async () => {
    // Sin la lista de pendientes no se sabe qué se va a cerrar: no se dice
    // "no hay pendientes" cuando en realidad no se pudieron consultar.
    if (errorPendientes) {
      showToast('No se pudieron consultar los pendientes. Usa "Reintentar" antes de cerrar la jornada.', 'error');
      return;
    }
    const total = pendientes?.total ?? 0;
    if (total === 0) { showToast('No hay inasistencias pendientes por procesar.', 'info'); return; }
    // H-08 / H-10 — La confirmación dice a quién afecta, a quién va a penalizar
    // y si todavía hay bloques en curso: la acción no se puede deshacer.
    const lista = pendientes.pendientes ?? [];
    const nombres = lista.slice(0, 8).map((p) => `• ${p.name} (${p.hour})`).join('\n')
      + (lista.length > 8 ? `\n• y ${lista.length - 8} más` : '');
    const limite = pendientes.no_show_limite;
    const penalizados = limite ? lista.filter((p) => p.no_show_count + 1 >= limite) : [];
    const avisoPenalizados = penalizados.length
      ? `\n\n${penalizados.length === 1 ? 'Quedará penalizado' : 'Quedarán penalizados'} por llegar a ${limite} inasistencias: `
        + penalizados.map((p) => p.name).join(', ') + '.'
      : '';
    const fin = config?.bloques?.[config.bloques.length - 1]?.hora_fin;
    const ahora = new Date().toLocaleTimeString('en-GB', { timeZone: 'America/Bogota', hour: '2-digit', minute: '2-digit' });
    const avisoHora = fin && ahora < fin
      ? `\n\nAtención: la jornada todavía no termina (el último bloque acaba a las ${fin}).`
      : '';
    if (!window.confirm(
      `Se marcarán ${total} inasistencias y se aplicarán las penalizaciones correspondientes.\n\n`
      + `Estudiantes sin asistencia:\n${nombres}${avisoPenalizados}${avisoHora}\n\nEsta acción no se puede deshacer. ¿Continuar?`
    )) return;
    setProcesando(true);
    try {
      const r = await attendanceApi.procesarInasistencia(user.email);
      showToast(r.message, r.total_penalizados > 0 ? 'warning' : 'success');
      onChanged?.();
      refrescar();
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setProcesando(false);
    }
  };

  // Los ocupados se deducen del aforo y de los cupos libres que informa RF06.
  const totalCupos      = bloques.reduce((s, b) => s + b.total, 0);
  const totalReservados = bloques.reduce((s, b) => s + (b.total - b.available), 0);
  const t = diario?.totales;

  return (
    <div data-cy="entrenador-contenedor" style={{ maxWidth: 860, margin: '0 auto', padding: '36px 24px', animation: 'fadeUp 0.4s ease' }}>
      <h2 id="panel-titulo" data-cy="panel-titulo" style={{ fontSize: 30, fontWeight: 900, marginBottom: 4 }}>Panel del gimnasio</h2>
      <p data-cy="entrenador-subtitulo" style={{ color: '#666666', fontSize: 15, marginBottom: 28 }}>
        {esAdmin ? 'Administrador' : 'Entrenador'} · {user.name}
      </p>

      {/* ── RF06 / RF07 / RF12 — Bloques horarios y sus cupos ──────────────── */}
      <div data-cy="entrenador-horarios-contenedor" style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16, flexWrap: 'wrap', gap: 10 }}>
          <div>
            <h3 data-cy="entrenador-horarios-titulo" style={{ fontSize: 18, fontWeight: 800 }}><span aria-hidden="true">🕒</span> Bloques horarios y cupos</h3>
            <p data-cy="entrenador-horarios-fecha" style={{ fontSize: 13, color: '#595959', marginTop: 4, textTransform: 'capitalize' }}>
              Disponibilidad para mañana{reservaFecha?.label ? ` · ${reservaFecha.label}` : ''}
            </p>
          </div>
          <span data-cy="entrenador-horarios-ocupacion" style={{ background: '#FEE2E2', color: RED, fontSize: 13, fontWeight: 800, padding: '8px 16px', borderRadius: 20 }}>
            {totalReservados} ocupados / {totalCupos} cupos
          </span>
        </div>
        <div data-cy="entrenador-horarios-lista" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px,1fr))', gap: 12 }}>
          {bloques.map((b) => {
            const ocupados = b.total - b.available;
            const pct = b.total ? Math.round((ocupados / b.total) * 100) : 0;
            return (
              <div data-cy={`entrenador-horario-${b.id}`} key={b.id} style={{ border: '1px solid #eee', borderRadius: 12, padding: 14 }}>
                <div data-cy={`entrenador-horario-${b.id}-hora`} style={{ fontWeight: 900, fontSize: 20 }}>{b.hour}</div>
                <div data-cy={`entrenador-horario-${b.id}-ocupacion`} style={{ fontSize: 13, color: '#666', margin: '4px 0' }}>
                  {ocupados} ocupados · {b.available} libres
                </div>
                <div data-cy={`entrenador-horario-${b.id}-barra`} style={{ height: 6, background: '#F0F0F0', borderRadius: 6, overflow: 'hidden', marginTop: 6 }}>
                  <div data-cy={`entrenador-horario-${b.id}-barra-nivel`} style={{ height: '100%', width: `${pct}%`, background: pct >= 80 ? '#dc2626' : '#16a34a' }} />
                </div>
                <div data-cy={`entrenador-horario-${b.id}-porcentaje`} style={{ fontSize: 12, color: '#666666', marginTop: 6 }}>{pct}% de aforo</div>
              </div>
            );
          })}
        </div>
        <p style={{ fontSize: 12, color: '#666666', marginTop: 14 }}>
          Los entrenadores y administradores consultan la disponibilidad; las reservas son
          exclusivas de los estudiantes.
        </p>
      </div>

      {/* ── RF11 / RF13 — Buscar por documento y registrar asistencia ─────── */}
      <div data-cy="buscar-contenedor" style={card}>
        <h3 data-cy="buscar-titulo" style={{ fontSize: 18, fontWeight: 800, marginBottom: 6 }}><span aria-hidden="true">🪪</span> Registrar asistencia</h3>
        <p style={{ fontSize: 13, color: '#595959', marginBottom: 16 }}>
          Busca al estudiante por su documento de identidad para verificar si tiene reserva.
        </p>
        <form data-cy="buscar-formulario" onSubmit={buscar} style={{ display: 'flex', gap: 10, marginBottom: errorDocumento ? 6 : 16 }}>
          <input
            type="text"
            placeholder="Documento de identidad del estudiante"
            aria-label="Documento de identidad del estudiante"
            data-cy="buscar-documento"
            aria-invalid={errorDocumento ? 'true' : 'false'}
            aria-describedby={errorDocumento ? 'error-documento' : undefined}
            value={documento}
            onChange={(e) => { setDocumento(e.target.value); setErrorDocumento(''); }}
            style={{ ...inputStyle, borderColor: errorDocumento ? '#DC2626' : '#E5E7EB' }}
            inputMode="numeric"
            required
          />
          <button type="submit" disabled={buscando} data-cy="buscar-submit" style={{ ...btnGhost, opacity: buscando ? 0.6 : 1 }}>
            {buscando ? 'Buscando…' : 'Buscar'}
          </button>
        </form>
        {errorDocumento && (
          <p id="error-documento" data-cy="buscar-error" role="alert" style={{ color: '#B91C1C', fontSize: 13, fontWeight: 600, marginBottom: 16 }}>
            {errorDocumento}
          </p>
        )}

        {busqueda && (
          <div data-cy="buscar-resultado" style={{ border: '1px solid #eee', borderRadius: 12, padding: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8, marginBottom: 10 }}>
              <div>
                <p data-cy="buscar-resultado-nombre" style={{ fontWeight: 800, fontSize: 15 }}>{busqueda.estudiante.name}</p>
                <p data-cy="buscar-resultado-contacto" style={{ fontSize: 12, color: '#666666' }}>
                  Doc. {busqueda.estudiante.documento} · {busqueda.estudiante.email}
                </p>
              </div>
              <span data-cy="buscar-resultado-estado" style={{
                fontSize: 11, fontWeight: 800, padding: '4px 12px', borderRadius: 20, height: 'fit-content',
                background: busqueda.estudiante.estado === 'PENALIZADO' ? '#FEE2E2' : '#DCFCE7',
                color: busqueda.estudiante.estado === 'PENALIZADO' ? '#991B1B' : '#15803D',
              }}>
                {busqueda.estudiante.estado}
              </span>
            </div>
            <p data-cy="buscar-resultado-inasistencias" style={{ fontSize: 12, color: '#595959', marginBottom: 12 }}>
              Inasistencias: {busqueda.estudiante.no_show_count} de {busqueda.estudiante.no_show_limite}
            </p>

            {!busqueda.tiene_reserva ? (
              <p data-cy="buscar-resultado-sin-reserva" style={{ color: '#991B1B', fontSize: 14, fontWeight: 700 }}>
                ⚠ Este estudiante no tiene ninguna reserva activa.
              </p>
            ) : busqueda.reservas.map((r) => (
              <div key={r.id} data-cy="buscar-resultado-reserva" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, padding: '12px 0', borderTop: '1px solid #F0F0F0', flexWrap: 'wrap' }}>
                <span data-cy="buscar-resultado-reserva-bloque" style={{ fontWeight: 700 }}>
                  {r.hour}
                  <span data-cy="buscar-resultado-reserva-fecha" style={{ color: '#666666', fontWeight: 400, fontSize: 13 }}> · {r.date}</span>
                  {r.es_de_hoy && (
                    <span data-cy="buscar-resultado-reserva-hoy" style={{ marginLeft: 8, fontSize: 11, fontWeight: 800, color: '#15803D' }}>HOY</span>
                  )}
                </span>
                {r.es_de_hoy ? (
                  <button onClick={() => registrarAsistencia(r.id)} data-cy="buscar-registrar-asistencia" style={btn}>
                    Registrar asistencia
                  </button>
                ) : (
                  // H-02 — Una reserva de otro día no se puede registrar hoy: el
                  // botón queda deshabilitado y se explica por qué, en vez de
                  // dejar que el entrenador lo pulse y reciba un error.
                  <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                    <button data-cy="buscar-registrar-asistencia-deshabilitado" disabled aria-describedby={`aviso-${r.id}`} style={{ ...btn, background: '#E5E7EB', color: '#4B5563', cursor: 'not-allowed' }}>
                      Registrar asistencia
                    </button>
                    <span data-cy="buscar-resultado-reserva-aviso" id={`aviso-${r.id}`} style={{ fontSize: 12, color: '#595959' }}>
                      Se registra el día de la reserva.
                    </span>
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── RF14 / RF15 — Sin asistencia registrada + proceso general ──────── */}
      <div data-cy="reporte-inasistencias-contenedor" style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10, marginBottom: 6 }}>
          <div>
            <h3 data-cy="reporte-inasistencias-titulo" style={{ fontSize: 18, fontWeight: 800 }}><span aria-hidden="true">⏳</span> Sin asistencia registrada</h3>
            <p data-cy="reporte-inasistencias-descripcion" style={{ fontSize: 13, color: '#595959', marginTop: 4 }}>
              Estudiantes con reserva que no han registrado asistencia
              {pendientes?.fecha_label ? ` · ${pendientes.fecha_label}` : ''}.
            </p>
          </div>
          {/* RF13 — Cerrar la jornada es del entrenador. El administrador
              consulta las pendientes (RF12) pero no las procesa. */}
          {!esAdmin && (
            <button onClick={procesarInasistencias} disabled={procesando} data-cy="reporte-inasistencias-cerrar-jornada" style={{ ...btn, opacity: procesando ? 0.6 : 1 }}>
              {procesando ? 'Procesando...' : 'Cerrar jornada'}
            </button>
          )}
        </div>
        <p data-cy="reporte-inasistencias-nota" style={{ fontSize: 12, color: '#666666', marginBottom: 16 }}>
          {esAdmin
            ? 'Solo el entrenador cierra la jornada. Aquí puedes supervisar quiénes quedan pendientes.'
            : pendientes?.no_show_limite
              ? `Al cerrar la jornada se registra la inasistencia de cada uno y se penaliza a quien llegue a ${pendientes.no_show_limite} inasistencias.`
              : 'Al cerrar la jornada se registra la inasistencia de cada uno y se aplican las penalizaciones que correspondan.'}
        </p>

        {errorPendientes ? (
          <Aviso dataCy="reporte-inasistencias-error" onReintentar={refrescar}>No se pudieron cargar los estudiantes pendientes.</Aviso>
        ) : !pendientes ? (
          <p data-cy="reporte-inasistencias-cargando" style={{ color: '#666666', fontSize: 14 }}>Cargando pendientes…</p>
        ) : pendientes.total === 0 ? (
          <p data-cy="reporte-inasistencias-vacio" style={{ color: '#666666', fontSize: 14 }}>
            No hay estudiantes pendientes: todas las reservas de la jornada están procesadas.
          </p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            {/* H-07 — Con muchos pendientes, encontrar a uno era recorrer la tabla. */}
            <input
              type="search"
              aria-label="Filtrar pendientes"
              data-cy="reporte-inasistencias-filtro"
              placeholder="Filtrar por nombre, correo o documento"
              value={filtro}
              onChange={(e) => setFiltro(e.target.value)}
              style={{ ...inputStyle, marginBottom: 12 }}
            />
            <table data-cy="reporte-inasistencias-tabla" style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 520 }}>
              <thead data-cy="reporte-inasistencias-encabezado">
                <tr style={{ textAlign: 'left', color: '#595959' }}>
                  <th style={{ padding: '8px 6px' }}>Estudiante</th>
                  <th style={{ padding: '8px 6px' }}>Documento</th>
                  <th style={{ padding: '8px 6px' }}>Bloque</th>
                  <th style={{ padding: '8px 6px', textAlign: 'center' }}>Inasistencias</th>
                  <th style={{ padding: '8px 6px' }} />
                </tr>
              </thead>
              <tbody data-cy="reporte-inasistencias-cuerpo">
                {pendientes.pendientes.filter((p) => {
                  const f = filtro.trim().toLowerCase();
                  return !f || [p.name, p.email, p.documento].some((v) => (v || '').toLowerCase().includes(f));
                }).map((p) => (
                  <tr key={p.id} data-cy="reporte-inasistencias-fila" style={{ borderTop: '1px solid #F0F0F0' }}>
                    <td style={{ padding: '10px 6px' }}>
                      <div data-cy="reporte-inasistencias-nombre" style={{ fontWeight: 700 }}>{p.name}</div>
                      <div data-cy="reporte-inasistencias-correo" style={{ color: '#666666', fontSize: 12 }}>{p.email}</div>
                    </td>
                    <td data-cy="reporte-inasistencias-documento" style={{ padding: '10px 6px' }}>{p.documento}</td>
                    <td data-cy="reporte-inasistencias-bloque" style={{ padding: '10px 6px' }}>{p.hour}<div data-cy="reporte-inasistencias-fecha" style={{ color: '#666666', fontSize: 12 }}>{p.date}</div></td>
                    <td data-cy="reporte-inasistencias-contador" style={{ padding: '10px 6px', textAlign: 'center', fontWeight: 800 }}>
                      {p.no_show_count}
                      <div data-cy="reporte-inasistencias-restantes" style={{ fontSize: 10, fontWeight: 500, color: '#666666' }}>
                        faltan {p.inasistencias_restantes}
                      </div>
                    </td>
                    <td style={{ padding: '10px 6px', textAlign: 'right' }}>
                      {/* H-06 — Antes decía "Asistió": la misma acción tenía dos nombres. */}
                      <button onClick={() => registrarAsistencia(p.id)} data-cy="reporte-inasistencias-registrar-asistencia" style={{ ...btnGhost, color: '#15803d', borderColor: '#86efac' }}>
                        Registrar asistencia
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ── RF19 / RF20 — Reporte general diario y su impresión en PDF ─────── */}
      <div data-cy="entrenador-reporte-diario-contenedor" style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 10, marginBottom: 16 }}>
          <div>
            <h3 data-cy="entrenador-reporte-diario-titulo" style={{ fontSize: 18, fontWeight: 800 }}><span aria-hidden="true">📄</span> Reporte general diario</h3>
            <p data-cy="entrenador-reporte-diario-fecha" style={{ fontSize: 13, color: '#595959', marginTop: 4, textTransform: 'capitalize' }}>
              {diario?.fecha_label || 'Actividad del día'}
            </p>
          </div>
          <a
            data-cy="entrenador-reporte-diario-pdf"
            href={(esAdmin ? registroDiarioApi.descargarRegistroAdministrador
                           : registroDiarioApi.descargarRegistroEntrenador)(user.email)}
            target="_blank"
            rel="noreferrer"
            style={{ ...btn, textDecoration: 'none', display: 'inline-block' }}
          >
            <span aria-hidden="true">🖨️</span> Generar PDF
          </a>
        </div>

        {errorDiario ? (
          <Aviso dataCy="entrenador-reporte-diario-error" onReintentar={refrescar}>No se pudo cargar el registro del día. Los totales no están disponibles.</Aviso>
        ) : (
          <div data-cy="entrenador-reporte-diario-totales" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px,1fr))', gap: 12, marginBottom: 18 }}>
            <Total dataCy="entrenador-reporte-diario-asistencias" label="Asistencias" value={t?.asistencias ?? '—'} color="#15803D" />
            <Total dataCy="entrenador-reporte-diario-cancelaciones" label="Cancelaciones" value={t?.cancelaciones ?? '—'} color="#4B5563" />
            <Total dataCy="entrenador-reporte-diario-inasistencias" label="Inasistencias" value={t?.inasistencias ?? '—'} color="#B45309" />
            <Total dataCy="entrenador-reporte-diario-penalizados" label="Estudiantes penalizados" value={t?.estudiantes_penalizados ?? '—'} color={RED} />
          </div>
        )}

        {diario?.penalizados?.length > 0 && (
          <div data-cy="entrenador-reporte-diario-penalizados-lista">
            <p data-cy="entrenador-reporte-diario-penalizados-titulo" style={{ fontSize: 13, fontWeight: 700, color: '#555', marginBottom: 8 }}>
              Estudiantes penalizados
            </p>
            {diario.penalizados.map((p) => (
              <div data-cy={`entrenador-reporte-diario-penalizado-${p.email}`} key={p.email} style={{ display: 'flex', justifyContent: 'space-between', gap: 10, padding: '8px 0', borderBottom: '1px solid #F0F0F0', fontSize: 13 }}>
                <span data-cy={`entrenador-reporte-diario-penalizado-${p.email}-nombre`} style={{ fontWeight: 700 }}>{p.name}<span data-cy={`entrenador-reporte-diario-penalizado-${p.email}-documento`} style={{ color: '#666666', fontWeight: 400 }}> · doc. {p.documento}</span></span>
                <span data-cy={`entrenador-reporte-diario-penalizado-${p.email}-inasistencias`} style={{ color: RED, fontWeight: 800 }}>{p.no_show_count} inasistencias</span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

// DEF-05 / DEF-06 — Aviso de error con opción de reintentar.
function Aviso({ children, onReintentar, dataCy }) {
  return (
    <div role="alert" data-cy={dataCy} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: 12, padding: '12px 16px', marginBottom: 12 }}>
      <span data-cy={`${dataCy}-mensaje`} style={{ color: '#991B1B', fontSize: 14, fontWeight: 600 }}>{children}</span>
      <button data-cy={`${dataCy}-reintentar`} onClick={onReintentar} style={{ padding: '8px 14px', border: '1.5px solid #991B1B', borderRadius: 10, background: 'white', color: '#991B1B', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
        Reintentar
      </button>
    </div>
  );
}

function Total({ label, value, color, dataCy }) {
  return (
    <div data-cy={dataCy} style={{ border: '1px solid #eee', borderRadius: 12, padding: 16, textAlign: 'center' }}>
      <p data-cy={`${dataCy}-valor`} style={{ fontSize: 32, fontWeight: 900, color, lineHeight: 1 }}>{value}</p>
      <p style={{ fontSize: 12, fontWeight: 700, color: '#555', marginTop: 8 }}>{label}</p>
    </div>
  );
}

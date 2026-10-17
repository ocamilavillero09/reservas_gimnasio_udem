import { useCallback, useEffect, useState } from 'react';
import { buzonApi } from '../services/api';
// RF22 y RF23 no entran en esta entrega de pruebas y viven aparte.
import { adminApi } from '../services/Nousadas';
import { useConfig, rolDeCorreo } from '../services/config';

const RED = '#CC0000';
const inputStyle = { width: '100%', padding: '12px 16px', border: '1.5px solid #E5E7EB', borderRadius: 10, fontSize: 14, backgroundColor: '#FAFAFA' };
const card = { backgroundColor: 'white', borderRadius: 18, padding: 26, boxShadow: '0 2px 14px rgba(0,0,0,0.07)', marginBottom: 24 };

const ROLE_BADGE = {
  ESTUDIANTE: { bg: '#DBEAFE', fg: '#1D4ED8', label: 'Estudiante' },
  ENTRENADOR: { bg: '#DCFCE7', fg: '#15803D', label: 'Entrenador' },
  ADMIN:      { bg: '#FEE2E2', fg: '#991B1B', label: 'Administrador' },
  SIN_ROL:    { bg: '#E5E7EB', fg: '#4B5563', label: 'Rol retirado' },
};

/**
 * Panel del ADMINISTRADOR.
 *
 *   RF21 — Consultar el buzón de sugerencias. Es el único rol con acceso.
 *   RF22 — El administrador principal crea cuentas con rol de administrador.
 *          El rol se deduce del dominio del correo (RN01).
 *   RF23 — El administrador principal retira el rol. La cuenta NO se borra:
 *          queda sin rol y conserva su historial.
 */
// DEF-04 — Fecha y hora en la zona del gimnasio, con el mismo formato de antes
// (AAAA-MM-DD HH:MM). El backend guarda en UTC.
function fechaColombia(iso) {
  const fecha = new Date(iso);
  if (Number.isNaN(fecha.getTime())) return iso;
  return fecha.toLocaleString('sv-SE', { timeZone: 'America/Bogota' }).slice(0, 16);
}

export default function AdminPanel({ user, showToast }) {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [documento, setDocumento] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [buzon, setBuzon] = useState(null);   // RF21
  const [errorBuzon, setErrorBuzon] = useState(false);   // DEF-07

  const cargar = useCallback(() => {
    adminApi.listarUsuarios(user.email).then(setUsers).catch(() => setUsers([]));
    // RF21 — La bandeja de reportes que envían los estudiantes.
    buzonApi.consultarBuzon(user.email)
      .then((b) => { setBuzon(b); setErrorBuzon(false); })
      .catch(() => { setBuzon(null); setErrorBuzon(true); });
  }, [user.email]);

  useEffect(cargar, [cargar]);

  const crear = async (e) => {
    e.preventDefault();
    setEnviando(true);
    try {
      const r = await adminApi.crearAdministrador({
        actor_email: user.email,
        name: name.trim(),
        email: email.trim().toLowerCase(),
        documento: documento.trim(),
      });
      showToast(r.message, 'success');
      setName(''); setEmail(''); setDocumento('');
      cargar();
    } catch (err) {
      showToast(err.message, 'error');
    } finally {
      setEnviando(false);
    }
  };

  // RF22 — Retirar o restaurar el rol de administrador de otra cuenta.
  const cambiarRol = async (objetivo, accion) => {
    const verbo = accion === 'retirar' ? 'retirar el rol de administrador a' : 'restaurar el rol de administrador a';
    if (!window.confirm(`¿Seguro que deseas ${verbo} ${objetivo.name}?`)) return;
    try {
      const r = await adminApi.retirarAdministrador(objetivo.email, accion, user.email);
      showToast(r.message, accion === 'retirar' ? 'warning' : 'success');
      cargar();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // RF21 — Borrar del buzón un mensaje ya atendido, para que la bandeja deje
  // ver los que faltan. El borrado es definitivo, así que se confirma antes.
  const borrarMensaje = async (m) => {
    if (!window.confirm(`¿Borrar del buzón el mensaje de ${m.autor_nombre}? No se puede deshacer.`)) return;
    try {
      const r = await buzonApi.eliminarSugerencia(m.id, user.email);
      showToast(r.message, 'success');
      cargar();
    } catch (err) {
      showToast(err.message, 'error');
    }
  };

  // RN01 — Los dominios los define el backend; la interfaz solo los muestra (RNF06).
  const config = useConfig();
  const dominioAdmin = config?.dominios?.find((d) => d.rol === 'ADMIN');
  const rolDetectado = rolDeCorreo(config, email)?.rol ?? null;
  const largoDocumento = config?.documento_longitud;
  // Solo el administrador principal gestiona las cuentas de administrador.
  // Tiene que declararse antes de usarse: una constante leída antes de su
  // declaración lanza un error al pintar, y el panel entero no se muestra.
  const esPrincipal = user.es_principal ?? false;
  // RF22 — Solo el principal crea administradores. Antes el formulario daba el
  // visto bueno en verde y el rechazo llegaba del servidor después de llenarlo
  // todo. Ahora se avisa en el mismo campo y el botón queda bloqueado.
  const intentaCrearAdmin = rolDetectado === 'ADMIN' && !esPrincipal;
  const porRol = (rol) => users.filter((u) => u.role === rol).length;

  return (
    <div data-cy="admin-contenedor" style={{ maxWidth: 820, margin: '0 auto', padding: '36px 24px', animation: 'fadeUp 0.4s ease' }}>
      <h2 data-cy="admin-titulo" style={{ fontSize: 30, fontWeight: 900, marginBottom: 4 }}>Gestión de usuarios</h2>
      <p data-cy="admin-subtitulo" style={{ color: '#666666', fontSize: 15, marginBottom: 28 }}>
        {esPrincipal ? 'Administrador principal' : 'Administrador'} · {user.email}
      </p>

      {!esPrincipal && (
        <div data-cy="admin-aviso-no-principal" style={{ background: '#FFF7ED', border: '1.5px solid #F59E0B', borderRadius: 12, padding: '14px 16px', marginBottom: 20 }}>
          <p style={{ fontSize: 13, color: '#78350F', margin: 0, lineHeight: 1.6 }}>
            ⚠️ Solo el <strong>administrador principal</strong> puede crear cuentas de administrador
            y retirarles el rol. Desde aquí puedes consultar los usuarios y crear estudiantes o entrenadores.
          </p>
        </div>
      )}

      {/* Crear usuario (incluye nuevos administradores) */}
      <div data-cy="admin-crear-contenedor" style={card}>
        <h3 data-cy="admin-crear-titulo" style={{ fontSize: 18, fontWeight: 800, marginBottom: 6 }}>➕ Crear usuario</h3>
        <p data-cy="admin-crear-descripcion" style={{ color: '#595959', fontSize: 13, marginBottom: 18, lineHeight: 1.6 }}>
          El rol se asigna automáticamente según el dominio del correo (RN01). Para crear
          otro <strong>administrador</strong> (RF22), usa un correo del dominio
          administrativo{dominioAdmin ? <strong> {dominioAdmin.dominio}</strong> : null}.
          El documento de identidad será su contraseña de ingreso.
        </p>

        <div data-cy="admin-dominios" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: 10, marginBottom: 20 }}>
          {(config?.dominios ?? []).map((d) => {
            const b = ROLE_BADGE[d.rol];
            return (
              <div data-cy={`admin-dominio-${d.dominio}`} key={d.dominio} style={{ border: '1px solid #eee', borderRadius: 12, padding: '12px 14px' }}>
                <span data-cy={`admin-dominio-${d.dominio}-rol`} style={{ background: b.bg, color: b.fg, fontSize: 11, fontWeight: 800, padding: '3px 10px', borderRadius: 20 }}>
                  {b.label}
                </span>
                <p data-cy={`admin-dominio-${d.dominio}-texto`} style={{ fontSize: 12, color: '#555', marginTop: 8, wordBreak: 'break-all' }}>{d.dominio}</p>
              </div>
            );
          })}
        </div>

        <form data-cy="admin-crear-formulario" onSubmit={crear} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <input data-cy="admin-crear-nombre" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre completo" style={inputStyle} required />
          <input
            data-cy="admin-crear-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={dominioAdmin ? `correo${dominioAdmin.dominio}` : 'Correo institucional'}
            style={inputStyle}
            autoCapitalize="none"
            required
          />
          <input
            data-cy="admin-crear-documento"
            type="text"
            value={documento}
            // RN02 — La cédula son dígitos y nada más.
            onChange={(e) => setDocumento(e.target.value.replace(/\D/g, ''))}
            placeholder={largoDocumento
              ? `Documento de identidad (${largoDocumento} dígitos)`
              : 'Documento de identidad'}
            style={inputStyle}
            inputMode="numeric"
            maxLength={largoDocumento}
            required
          />

          {email && (
            <p data-cy="admin-crear-aviso-rol" style={{ fontSize: 13, color: (rolDetectado && !intentaCrearAdmin) ? '#15803D' : '#991B1B', margin: 0 }}>
              {!rolDetectado
                ? '⚠ El correo no pertenece a ninguno de los tres dominios institucionales.'
                : intentaCrearAdmin
                  ? '⚠ Este correo crearía un administrador, y eso solo puede hacerlo el administrador principal.'
                  : `✓ Este correo creará un usuario con rol ${ROLE_BADGE[rolDetectado].label.toUpperCase()}.`}
            </p>
          )}

          <button data-cy="admin-crear-submit" type="submit" disabled={enviando || intentaCrearAdmin} style={{
            padding: 13, border: 'none', borderRadius: 12, background: RED, color: 'white',
            fontWeight: 800,
            cursor: (enviando || intentaCrearAdmin) ? 'not-allowed' : 'pointer',
            opacity: (enviando || intentaCrearAdmin) ? 0.7 : 1,
          }}>
            {enviando ? 'Creando...' : 'Crear usuario'}
          </button>
        </form>
      </div>

      {/* Listado de usuarios */}
      <div data-cy="admin-usuarios-contenedor" style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, flexWrap: 'wrap', gap: 8 }}>
          <h3 data-cy="admin-usuarios-titulo" style={{ fontSize: 18, fontWeight: 800 }}>👥 Usuarios registrados ({users.length})</h3>
          <span data-cy="admin-usuarios-resumen" style={{ fontSize: 12, color: '#595959' }}>
            {porRol('ESTUDIANTE')} estudiantes · {porRol('ENTRENADOR')} profesores · {porRol('ADMIN')} administradores
          </span>
        </div>

        {users.length === 0 ? (
          <p data-cy="admin-usuarios-vacio" style={{ color: '#666666', fontSize: 14 }}>Sin usuarios para mostrar.</p>
        ) : users.map((u) => {
          const b = ROLE_BADGE[u.role] || { bg: '#eee', fg: '#555', label: u.role };
          return (
            <div data-cy={`admin-usuario-${u.email}`} key={u.email} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: '1px solid #F0F0F0' }}>
              <div style={{ minWidth: 0 }}>
                <p data-cy={`admin-usuario-${u.email}-nombre`} style={{ fontWeight: 700, fontSize: 14 }}>
                  {u.name}
                  {u.es_principal && (
                    <span data-cy={`admin-usuario-${u.email}-principal`} style={{ marginLeft: 8, fontSize: 10, fontWeight: 800, color: RED }}>★ PRINCIPAL</span>
                  )}
                </p>
                <p data-cy={`admin-usuario-${u.email}-correo`} style={{ fontSize: 12, color: '#666666', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {u.email} · doc. {u.documento || '—'}
                </p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
                {u.estado === 'PENALIZADO' && (
                  <span data-cy={`admin-usuario-${u.email}-penalizado`} style={{ fontSize: 11, fontWeight: 800, color: RED }}>PENALIZADO</span>
                )}
                <span data-cy={`admin-usuario-${u.email}-rol`} style={{ background: b.bg, color: b.fg, fontSize: 11, fontWeight: 800, padding: '4px 12px', borderRadius: 20 }}>
                  {b.label}
                </span>
                {/* RF22 — Retirar o restaurar el rol de administrador */}
                {esPrincipal && !u.es_principal && u.role === 'ADMIN' && (
                  <button data-cy={`admin-usuario-${u.email}-retirar-rol`} onClick={() => cambiarRol(u, 'retirar')} style={{
                    padding: '6px 12px', border: '1.5px solid #fca5a5', borderRadius: 8,
                    background: 'white', color: RED, fontSize: 11, fontWeight: 800, cursor: 'pointer',
                  }}>
                    Retirar rol
                  </button>
                )}
                {esPrincipal && u.role === 'SIN_ROL' && (
                  <button data-cy={`admin-usuario-${u.email}-restaurar`} onClick={() => cambiarRol(u, 'restaurar')} style={{
                    padding: '6px 12px', border: '1.5px solid #86efac', borderRadius: 8,
                    background: 'white', color: '#15803d', fontSize: 11, fontWeight: 800, cursor: 'pointer',
                  }}>
                    Restaurar
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* RF21 — Buzón de sugerencias. Solo el administrador lo ve. */}
      <div data-cy="admin-buzon-contenedor" style={{ ...card, marginTop: 24 }}>
        <h3 data-cy="admin-buzon-titulo" style={{ fontSize: 18, fontWeight: 800, marginBottom: 6 }}>
          <span aria-hidden="true">💬</span> Buzón de sugerencias
          {buzon?.total ? (
            <span data-cy="admin-buzon-total" style={{
              marginLeft: 10, background: '#FEE2E2', color: RED, fontSize: 12,
              fontWeight: 800, padding: '4px 10px', borderRadius: 20,
            }}>{buzon.total}</span>
          ) : null}
        </h3>
        <p data-cy="admin-buzon-descripcion" style={{ fontSize: 13, color: '#595959', marginBottom: 16 }}>
          Fallas y mejoras que reportan los estudiantes desde su historial. Borra
          los que ya hayas atendido para no perder de vista los que faltan.
        </p>

        {errorBuzon ? (
          // DEF-07 — Antes un fallo de carga se mostraba como "Todavía no hay mensajes".
          <div data-cy="admin-buzon-error" role="alert" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', background: '#FEF2F2', border: '1px solid #FCA5A5', borderRadius: 12, padding: '12px 16px' }}>
            <span data-cy="admin-buzon-error-mensaje" style={{ color: '#991B1B', fontSize: 14, fontWeight: 600 }}>No se pudo cargar el buzón.</span>
            <button data-cy="admin-buzon-reintentar" onClick={cargar} style={{ padding: '8px 14px', border: '1.5px solid #991B1B', borderRadius: 10, background: 'white', color: '#991B1B', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}>
              Reintentar
            </button>
          </div>
        ) : !buzon || buzon.mensajes.length === 0 ? (
          <p data-cy="admin-buzon-vacio" style={{ color: '#666666', fontSize: 14 }}>Todavía no hay mensajes.</p>
        ) : (
          <div data-cy="admin-buzon-lista" style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {buzon.mensajes.map((m) => (
              <div data-cy={`admin-buzon-mensaje-${m.id}`} key={m.id} style={{ border: '1px solid #eee', borderRadius: 12, padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
                  <span data-cy={`admin-buzon-mensaje-${m.id}-autor`} id={`autor-${m.id}`} style={{ fontWeight: 700, fontSize: 14 }}>{m.autor_nombre}</span>
                  {/* DEF-04 — La fecha llega en UTC; antes se cortaba el texto sin
                      convertirla y salía cinco horas adelantada. */}
                  <span data-cy={`admin-buzon-mensaje-${m.id}-fecha`} style={{ fontSize: 12, color: '#666666' }}>{fechaColombia(m.fecha)}</span>
                </div>
                <p data-cy={`admin-buzon-mensaje-${m.id}-correo`} style={{ fontSize: 12, color: '#666666', margin: '2px 0 10px' }}>{m.autor_email}</p>
                <p data-cy={`admin-buzon-mensaje-${m.id}-texto`} style={{ fontSize: 14, lineHeight: 1.6, margin: 0, whiteSpace: 'pre-wrap' }}>{m.mensaje}</p>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 12 }}>
                  {/* H-20 — Antes medía 26 px de alto con letra de 11 px y no decía
                      de quién era el mensaje para un lector de pantalla. */}
                  <button data-cy={`admin-buzon-mensaje-${m.id}-borrar`} onClick={() => borrarMensaje(m)} aria-describedby={`autor-${m.id}`} style={{
                    padding: '9px 16px', minHeight: 36, border: '1.5px solid #fca5a5', borderRadius: 8,
                    background: 'white', color: RED, fontSize: 13, fontWeight: 800, cursor: 'pointer',
                  }}>
                    Borrar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
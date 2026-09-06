import { useCallback, useEffect, useState } from 'react';
import { profileApi, reportsApi } from '../services/api';
import { useConfig } from '../services/config';

const RED = '#CC0000';
const inputStyle = { width: '100%', padding: '12px 16px', border: '1.5px solid #E5E7EB', borderRadius: 10, fontSize: 14, backgroundColor: '#FAFAFA' };
const card = { background: 'white', borderRadius: 18, padding: 26, marginBottom: 20, boxShadow: '0 2px 14px rgba(0,0,0,0.07)' };

const ROLE_LABEL = {
  ESTUDIANTE: 'Estudiante',
  ENTRENADOR: 'Entrenador',
  ADMIN: 'Administrador',
  SIN_ROL: 'Sin rol asignado',
};

/**
 * Mi perfil. La pantalla es una sola, pero detrás hay tres requisitos distintos
 * porque son tres actores distintos:
 *
 *   RF03 — El estudiante consulta y actualiza su edad, peso, altura y objetivo
 *          de entrenamiento.
 *   RF04 — El entrenador consulta su nombre, documento y rol. Solo lectura.
 *   RF05 — El administrador consulta lo mismo, más si es el principal. Solo
 *          lectura.
 *   RF15 — El estudiante consulta su reporte de inasistencias y penalizaciones.
 */
export default function ProfileView({ user, showToast }) {
  const config = useConfig();
  const [edad, setEdad] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [meta, setMeta] = useState('');
  const [datos, setDatos] = useState(null);
  const [reporte, setReporte] = useState(null);

  // Cada rol tiene su propio requisito y su propia consulta: RF03 para el
  // estudiante, RF04 para el entrenador y RF05 para el administrador.
  const cargar = useCallback(() => {
    const consulta =
      user.role === 'ENTRENADOR' ? profileApi.consultarEntrenador
      : user.role === 'ADMIN'    ? profileApi.consultarAdministrador
      : profileApi.consultarPerfil;

    consulta(user.email).then((p) => {
      setDatos(p);
      setEdad(p.edad ?? '');
      setPeso(p.peso ?? '');
      setAltura(p.altura ?? '');
      setMeta(p.meta ?? '');
    }).catch(() => {});
  }, [user.email, user.role]);

  useEffect(cargar, [cargar]);

  const esEstudiante = (datos?.role ?? user.role) === 'ESTUDIANTE';

  // RF18 — Reporte personal de inasistencias y penalizaciones.
  useEffect(() => {
    if (!esEstudiante) return;
    reportsApi.verInasistencias(user.email).then(setReporte).catch(() => {});
  }, [user.email, esEstudiante, datos]);

  const save = async (e) => {
    e.preventDefault();
    try {
      const actualizado = await profileApi.actualizarPerfil({
        email: user.email,
        edad: edad === '' ? null : Number(edad),
        peso: peso === '' ? null : Number(peso),
        altura: altura === '' ? null : Number(altura),
        meta,
      });
      setDatos(actualizado);
      showToast('Perfil actualizado.', 'success');
    } catch (err) { showToast(err.message, 'error'); }
  };

  const inasistenciasRestantes = reporte?.inasistencias_restantes ?? datos?.inasistencias_restantes ?? 0;
  // El umbral desde el que se avisa lo fija el backend (RNF06).
  const umbralAviso = config?.no_show_alerta;
  const penalizado = (reporte?.estado ?? datos?.estado) === 'PENALIZADO';

  return (
    <div style={{ maxWidth: 620, margin: '0 auto', padding: '36px 24px', animation: 'fadeUp 0.4s ease' }}>
      <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 4 }}>Mi perfil</h2>
      <p style={{ color: '#999', fontSize: 15, marginBottom: 28 }}>
        Datos de tu cuenta en el sistema de reservas
      </p>

      {/* RF05 — Nombre, documento de identidad y rol asignado (todos los roles) */}
      <div style={card}>
        <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 16 }}>🪪 Mis datos</h3>
        <Dato label="Nombre" valor={datos?.name ?? user.name} />
        <Dato label="Correo institucional" valor={datos?.email ?? user.email} />
        <Dato label="Documento de identidad" valor={datos?.documento || user.documento || '—'} />
        <Dato
          label="Rol asignado"
          valor={ROLE_LABEL[datos?.role ?? user.role] || (datos?.role ?? user.role)}
          extra={datos?.es_principal ? 'Administrador principal' : null}
        />
        <Dato label="Estado de la cuenta" valor={datos?.estado ?? user.estado} />
      </div>

      {/* RF18 / HU08 — Mis inasistencias y penalizaciones */}
      {esEstudiante && reporte && (
        <div style={{ ...card, border: penalizado ? '1.5px solid #DC2626' : '1.5px solid transparent' }}>
          <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 6 }}>
            🚦 Mis inasistencias y penalizaciones
          </h3>
          <p style={{ fontSize: 13, color: '#777', marginBottom: 16 }}>
            La cuenta se penaliza al llegar a {reporte.no_show_limite} inasistencias.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px,1fr))', gap: 14 }}>
            <Contador
              label="Inasistencias"
              value={reporte.no_show_count}
              sub={`de ${reporte.no_show_limite} permitidas`}
              alerta={reporte.no_show_count > 0}
            />
            <Contador
              label="Me faltan"
              value={inasistenciasRestantes}
              sub="para la penalización"
              alerta={umbralAviso !== undefined && inasistenciasRestantes <= umbralAviso}
            />
            <Contador
              label="Asistencias"
              value={reporte.total_asistencias}
              sub="entrenamientos cumplidos"
            />
          </div>

          {penalizado ? (
            <div style={{ marginTop: 18, background: '#FEE2E2', border: '1.5px solid #DC2626', borderRadius: 12, padding: '14px 16px' }}>
              <p style={{ fontSize: 13, lineHeight: 1.6, color: '#991B1B', margin: 0 }}>
                🚫 Tu cuenta está <strong>PENALIZADA</strong> y no puedes reservar
                {reporte.penalizado_hasta ? ` hasta el ${reporte.penalizado_hasta}` : ''}.
              </p>
            </div>
          ) : reporte.alerta_inasistencias && (
            <div style={{ marginTop: 18, background: '#FFF7ED', border: '1.5px solid #F59E0B', borderRadius: 12, padding: '14px 16px' }}>
              <p style={{ fontSize: 13, lineHeight: 1.6, color: '#78350F', margin: 0 }}>
                ⚠️ {reporte.alerta_inasistencias}
              </p>
            </div>
          )}

          {reporte.inasistencias.length > 0 && (
            <div style={{ marginTop: 18 }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#555', marginBottom: 8 }}>
                Detalle de mis inasistencias
              </p>
              {reporte.inasistencias.map((i) => (
                <div key={i.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F0F0F0', fontSize: 13 }}>
                  <span style={{ fontWeight: 700 }}>{i.hour}</span>
                  <span style={{ color: '#999' }}>{i.date}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* RF03 — Información personal de entrenamiento (solo estudiantes) */}
      {esEstudiante ? (
        <form onSubmit={save} style={{ ...card, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 800 }}>🏋️ Mi información de entrenamiento</h3>
            <p style={{ fontSize: 13, color: '#777', marginTop: 4 }}>
              Mantén actualizados tu edad, peso, altura y objetivo.
            </p>
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#555' }}>Edad (años)</label>
            <input type="number" min="1" value={edad} onChange={(e) => setEdad(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#555' }}>Peso (kg)</label>
            <input type="number" value={peso} onChange={(e) => setPeso(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#555' }}>Altura (cm)</label>
            <input type="number" value={altura} onChange={(e) => setAltura(e.target.value)} style={inputStyle} />
          </div>
          <div>
            <label style={{ fontSize: 13, fontWeight: 600, color: '#555' }}>Objetivo de entrenamiento</label>
            <input type="text" value={meta} onChange={(e) => setMeta(e.target.value)} placeholder="Ej: Ganar resistencia" style={inputStyle} />
          </div>
          <button type="submit" style={{ padding: 13, border: 'none', borderRadius: 12, background: RED, color: 'white', fontWeight: 800, cursor: 'pointer' }}>
            Guardar perfil
          </button>
        </form>
      ) : (
        <div style={card}>
          <p style={{ fontSize: 13, color: '#777', lineHeight: 1.7, margin: 0 }}>
            Los entrenadores y administradores consultan aquí su nombre, documento de identidad
            y rol asignado. La información de entrenamiento (edad, peso, altura y objetivo) es
            exclusiva del perfil del estudiante.
          </p>
        </div>
      )}
    </div>
  );
}

function Dato({ label, valor, extra }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, padding: '10px 0', borderBottom: '1px solid #F0F0F0' }}>
      <span style={{ fontSize: 13, color: '#777' }}>{label}</span>
      <span style={{ fontSize: 14, fontWeight: 700, textAlign: 'right', wordBreak: 'break-all' }}>
        {valor || '—'}
        {extra && (
          <span style={{ display: 'block', fontSize: 11, fontWeight: 800, color: RED }}>{extra}</span>
        )}
      </span>
    </div>
  );
}

function Contador({ label, value, sub, alerta }) {
  return (
    <div style={{ border: `1px solid ${alerta ? '#FCD34D' : '#eee'}`, background: alerta ? '#FFFBEB' : 'white', borderRadius: 12, padding: 14 }}>
      <p style={{ fontSize: 28, fontWeight: 900, color: alerta ? '#B45309' : '#1A1A1A', lineHeight: 1 }}>{value}</p>
      <p style={{ fontSize: 12, fontWeight: 700, color: '#555', marginTop: 6 }}>{label}</p>
      <p style={{ fontSize: 11, color: '#999', marginTop: 2 }}>{sub}</p>
    </div>
  );
}

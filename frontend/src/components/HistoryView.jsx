import { useEffect, useState } from 'react';
import { reservationsApi, buzonApi } from '../services/api';

const RED = '#CC0000';

const BADGE = {
  COMPLETADA: { bg: '#dcfce7', fg: '#15803d', label: 'Asistió' },
  CANCELADA:  { bg: '#e5e7eb', fg: '#4b5563', label: 'Cancelada' },
  NO_SHOW:    { bg: '#fee2e2', fg: '#991b1b', label: 'No asistió' },
};

// RF14 — Ver mi historial · RF20 — Reportar una falla o enviar una sugerencia.
export default function HistoryView({ user, showToast }) {
  const [history, setHistory] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    reservationsApi.verHistorial(user.email).then(setHistory).catch(() => setHistory([]));
  }, [user.email]);

  // RF20 — El mensaje llega al administrador, que es el único que lee el buzón.
  const enviarReporte = async (e) => {
    e.preventDefault();
    setEnviando(true);
    try {
      const r = await buzonApi.falloSugerencia({ email: user.email, mensaje });
      showToast(r.notificacion || 'Mensaje enviado.', 'success');
      setMensaje('');
    } catch (err) { showToast(err.message, 'error'); }
    finally { setEnviando(false); }
  };

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '36px 24px', animation: 'fadeUp 0.4s ease' }}>
      <h2 style={{ fontSize: 30, fontWeight: 900, marginBottom: 4 }}>Mi historial</h2>
      <p style={{ color: '#999', fontSize: 15, marginBottom: 28 }}>Tus entrenamientos pasados</p>

      {history.length === 0 ? (
        <div style={{ background: 'white', borderRadius: 18, padding: 40, textAlign: 'center', boxShadow: '0 2px 14px rgba(0,0,0,0.07)' }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📖</div>
          <p style={{ color: '#999' }}>Aún no tienes historial.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 32 }}>
          {history.map((h) => {
            const b = BADGE[h.estado] || { bg: '#eee', fg: '#555', label: h.estado };
            return (
              <div key={h.id} style={{ background: 'white', borderRadius: 14, padding: '16px 20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700 }}>{h.hour} <span style={{ color: '#999', fontWeight: 400, fontSize: 13 }}>· {h.date}</span></span>
                <span style={{ background: b.bg, color: b.fg, fontSize: 12, fontWeight: 800, padding: '4px 12px', borderRadius: 20 }}>{b.label}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* RF20 — Reportar una falla o enviar una sugerencia al administrador */}
      <div style={{ background: 'white', borderRadius: 18, padding: 26, boxShadow: '0 2px 14px rgba(0,0,0,0.07)' }}>
        <h3 style={{ fontSize: 18, fontWeight: 800, marginBottom: 6 }}>💬 Reportar una falla</h3>
        <p style={{ fontSize: 13, color: '#777', marginBottom: 16 }}>
          ¿Encontraste un problema en la aplicación o se te ocurre una mejora? Escríbelo aquí
          y le llegará al administrador del sistema.
        </p>
        <form onSubmit={enviarReporte} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <textarea
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            placeholder="Cuéntanos qué pasó o qué mejorarías"
            rows={4}
            maxLength={2000}
            required
            style={{ padding: 12, border: '1.5px solid #E5E7EB', borderRadius: 10, fontSize: 14, fontFamily: 'inherit' }}
          />
          <button
            type="submit"
            disabled={enviando || mensaje.trim() === ''}
            style={{
              padding: 13, border: 'none', borderRadius: 12,
              background: enviando || mensaje.trim() === '' ? '#F5F5F5' : RED,
              color: enviando || mensaje.trim() === '' ? '#999' : 'white',
              fontWeight: 800, cursor: enviando || mensaje.trim() === '' ? 'not-allowed' : 'pointer',
            }}
          >
            {enviando ? 'Enviando…' : 'Enviar al administrador'}
          </button>
        </form>
      </div>
    </div>
  );
}

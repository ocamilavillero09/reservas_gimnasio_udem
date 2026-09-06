// ============================================================================
//  ÍNDICES — creación y verificación
// ----------------------------------------------------------------------------
//      mongosh mongodb://localhost:27017 database/indexes.js
//
//  createIndex es idempotente: si el índice ya existe con la misma definición,
//  no hace nada. Ejecutar este script de nuevo es seguro.
// ============================================================================

db = db.getSiblingDB('gym_udem');

// ── users ───────────────────────────────────────────────────────────────────
// El correo identifica la cuenta y el documento es la credencial y el dato de
// búsqueda del entrenador (RN02). Los dos tienen que ser únicos.
db.users.createIndex({ email: 1 },     { unique: true, name: 'idx_users_email_unico' });
db.users.createIndex({ documento: 1 }, { unique: true, name: 'idx_users_documento_unico' });
db.users.createIndex({ role: 1, estado: 1 }, { name: 'idx_users_rol_estado' });

// ── slots ───────────────────────────────────────────────────────────────────
db.slots.createIndex({ slotId: 1 }, { unique: true, name: 'idx_slots_id_unico' });

// ── disponibilidad ──────────────────────────────────────────────────────────
// Un solo documento por jornada y bloque. El indice unico hace que la propia
// base impida crear dos veces la disponibilidad del mismo dia, aunque dos
// peticiones simultaneas lo intenten a la vez.
db.disponibilidad.createIndex(
  { fecha: 1, slotId: 1 },
  { unique: true, name: 'idx_disponibilidad_jornada_bloque' }
);

// ── reservations ────────────────────────────────────────────────────────────
// Índice único PARCIAL: solo cuenta las reservas en estado ACTIVA. Con él, la
// regla de una reserva por estudiante y por día (RN05) queda respaldada por la
// propia base de datos y no solo por la validación del backend. Un estudiante
// puede tener muchas reservas canceladas o completadas del mismo día, pero
// activa solo una.
db.reservations.createIndex(
  { email: 1, reserva_date: 1 },
  { unique: true, partialFilterExpression: { estado: 'ACTIVA' }, name: 'idx_reservas_una_activa_por_dia' }
);
// Cierre de jornada y reporte diario: se filtra por fecha y estado (RF12, RF16).
db.reservations.createIndex({ reserva_date: 1, estado: 1 }, { name: 'idx_reservas_jornada' });
// Historial del estudiante, de la más reciente a la más antigua (RF14).
db.reservations.createIndex({ email: 1, created_at: -1 }, { name: 'idx_reservas_historial' });
// Detalle por bloque dentro del registro diario (RF16, RF17).
db.reservations.createIndex({ slotId: 1, estado: 1 }, { name: 'idx_reservas_bloque' });

// ── suggestions ─────────────────────────────────────────────────────────────
db.suggestions.createIndex({ created_at: -1 }, { name: 'idx_sugerencias_recientes' });

print('\nIndices por coleccion:');
['users', 'slots', 'disponibilidad', 'reservations', 'suggestions'].forEach(function (c) {
  print('\n  ' + c);
  db.getCollection(c).getIndexes().forEach(function (i) {
    print('    - ' + i.name + '  ' + JSON.stringify(i.key) + (i.unique ? '  [unico]' : ''));
  });
});

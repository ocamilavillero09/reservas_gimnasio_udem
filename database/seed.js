// ============================================================================
//  DATOS DE PRUEBA — solo para desarrollo
// ----------------------------------------------------------------------------
//      mongosh mongodb://localhost:27017 database/seed.js
//
//  Carga un juego de datos con el que probar la aplicación sin registrar todo
//  a mano. Borra y vuelve a crear ÚNICAMENTE las cuentas de demostración, que
//  son las que llevan el sufijo .demo en el correo. No toca ningún otro dato.
//
//  Advertencia honesta: estos documentos se insertan directamente y no pasan
//  por las reglas de negocio del backend. Están construidos para ser
//  consistentes entre sí, pero cargarlos no prueba que las reglas funcionen.
//  Para eso están las pruebas del backend.
//
//  Las contraseñas son el documento de identidad de cada persona, cifrado con
//  el mismo algoritmo que usa el backend (PBKDF2, 100.000 iteraciones).
// ============================================================================

db = db.getSiblingDB('gym_udem');

// ── Personas de demostración ────────────────────────────────────────────────
// El correo determina el rol (RN01). El documento es la contraseña (RN02).
var PERSONAS = [
  { name: 'Ana Restrepo',   email: 'ana.demo@soyudemedellin.edu.co',   documento: '1001234567',
    password: 'a1d1af6309debd88a81f8ca08368909da080378217fd2f920dea547d6db8ee6c:77aa700ea85c2e2858917cf8997db84688cb6dc5cbf040f3231b94b40ed3c535',
    role: 'ESTUDIANTE', estado: 'ACTIVO', no_show_count: 0,
    edad: 21, peso: 62, altura: 165, meta: 'Ganar resistencia' },

  { name: 'Bruno Cardona',  email: 'bruno.demo@soyudemedellin.edu.co', documento: '1002345678',
    password: '193a3415bda3d86712d3612c2e5bf149021d0812f55d974d0862941b5d18e9f8:b6a77bc93227563e412fd57a5b68c98c8afb40258df8e56a8d5f63ab3162a8ad',
    role: 'ESTUDIANTE', estado: 'ACTIVO', no_show_count: 3,
    edad: 23, peso: 78, altura: 181, meta: 'Aumentar masa muscular' },

  // Cuenta penalizada: llegó al límite de cinco inasistencias (RN08 y RN09).
  { name: 'Clara Ospina',   email: 'clara.demo@soyudemedellin.edu.co', documento: '1003456789',
    password: 'd35f1d804f12d1aa412362ac90c0753bebb614114aa88b2730f27a0cbd33b579:83c1a4ad46c73be79531383cd41927c5d6a89381664236883398d529c6cf3e21',
    role: 'ESTUDIANTE', estado: 'PENALIZADO', no_show_count: 5,
    edad: 20, peso: 55, altura: 160, meta: 'Mejorar condicion fisica' },

  { name: 'Diego Marulanda', email: 'diego.demo@udem.edu.co',          documento: '7009998881',
    password: '1c8c90713c9c7d0ab0f41819905a7a5de08525ab3c60387aa1e498223d5b52c8:cd7f3092e714b0b0a2b152fd286961cc8674467a558f024228602004439669ff',
    role: 'ENTRENADOR', estado: 'ACTIVO', no_show_count: 0 },

  // Primera cuenta ADMIN: es la del administrador principal (RF22 y RF23).
  { name: 'Elena Zapata',   email: 'elena.demo@udemedellin.edu.co',    documento: '3005554442',
    password: '6ba0f5f49f392b5c69325f69b3709ede91fe2e5c46d1e026d6053f39ace05455:db632c2525c869b764067f3a89ada5a6b2be505de655aeb5700c992f1241b69d',
    role: 'ADMIN', estado: 'ACTIVO', no_show_count: 0, es_principal: true }
];

// ── Limpieza acotada: solo lo que este mismo archivo crea ───────────────────
var correosDemo = PERSONAS.map(function (p) { return p.email; });
var borradas = db.reservations.deleteMany({ email: { $in: correosDemo } }).deletedCount;
var borradosU = db.users.deleteMany({ email: { $in: correosDemo } }).deletedCount;
var borradasS = db.suggestions.deleteMany({ autor_email: { $in: correosDemo } }).deletedCount;
print('Limpieza de datos de demostracion: ' + borradosU + ' cuentas, ' +
      borradas + ' reservas, ' + borradasS + ' sugerencias.');

// ── Cuentas ─────────────────────────────────────────────────────────────────
var ahora = new Date();
db.users.insertMany(PERSONAS.map(function (p) {
  return {
    name: p.name,
    email: p.email,
    documento: p.documento,
    password: p.password,
    role: p.role,
    estado: p.estado,
    es_principal: p.es_principal === true,
    no_show_count: NumberInt(p.no_show_count),
    cancel_count: NumberInt(0),
    penalizado_hasta: p.estado === 'PENALIZADO'
      ? new Date(ahora.getTime() + 5 * 24 * 60 * 60 * 1000)
      : null,
    created_at: ahora,
    edad:   p.edad   !== undefined ? NumberInt(p.edad) : null,
    peso:   p.peso   !== undefined ? NumberInt(p.peso) : null,
    altura: p.altura !== undefined ? NumberInt(p.altura) : null,
    meta:   p.meta   !== undefined ? p.meta : null
  };
}));

// ── Bloques horarios ────────────────────────────────────────────────────────
// Se recrean solo si faltan, para no pisar el aforo de una base ya en uso.
var HORAS     = ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00'];
var HORAS_FIN = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'];
var AFORO = NumberInt(20);
if (db.slots.countDocuments({}) === 0) {
  db.slots.insertMany(HORAS.map(function (hora, i) {
    return { slotId: NumberInt(i + 1), hour: hora, hora_fin: HORAS_FIN[i], total: AFORO };
  }));
  print('Bloques horarios creados: 6');
} else {
  print('Bloques horarios ya existentes: ' + db.slots.countDocuments({}));
}

// ── Reservas ────────────────────────────────────────────────────────────────
// Las reservas son siempre para el dia siguiente (RN04) y solo una por
// estudiante y por dia (RN05).
function isoMasDias(dias) {
  var d = new Date();
  d.setDate(d.getDate() + dias);
  return d.toISOString().slice(0, 10);
}
var manana = isoMasDias(1);
var ayer   = isoMasDias(-1);

db.reservations.insertMany([
  // Reservas activas de mañana: dos estudiantes en el bloque de las 06:00.
  { email: 'ana.demo@soyudemedellin.edu.co',   slotId: NumberInt(1), hour: '06:00',
    reserva_date: manana, date: manana, estado: 'ACTIVA',
    created_by: 'ana.demo@soyudemedellin.edu.co', created_at: ahora },
  { email: 'bruno.demo@soyudemedellin.edu.co', slotId: NumberInt(1), hour: '06:00',
    reserva_date: manana, date: manana, estado: 'ACTIVA',
    created_by: 'bruno.demo@soyudemedellin.edu.co', created_at: ahora },

  // Jornada de ayer, ya cerrada: una asistencia, una cancelacion y una inasistencia.
  { email: 'ana.demo@soyudemedellin.edu.co',   slotId: NumberInt(2), hour: '08:00',
    reserva_date: ayer, date: ayer, estado: 'COMPLETADA',
    created_by: 'ana.demo@soyudemedellin.edu.co', created_at: ahora,
    completed_at: ahora, registrada_por: 'diego.demo@udem.edu.co' },
  { email: 'bruno.demo@soyudemedellin.edu.co', slotId: NumberInt(3), hour: '10:00',
    reserva_date: ayer, date: ayer, estado: 'CANCELADA',
    created_by: 'bruno.demo@soyudemedellin.edu.co', created_at: ahora, cancelled_at: ahora },
  { email: 'clara.demo@soyudemedellin.edu.co', slotId: NumberInt(4), hour: '12:00',
    reserva_date: ayer, date: ayer, estado: 'NO_SHOW',
    created_by: 'clara.demo@soyudemedellin.edu.co', created_at: ahora }
]);

// ── Disponibilidad de las jornadas sembradas ────────────────────────────────
// Cada jornada arranca con el aforo completo y se descuentan las reservas
// activas que se acaban de crear, para que el contador cuadre con los datos.
[manana, ayer].forEach(function (fecha) {
  db.slots.find({}).sort({ slotId: 1 }).toArray().forEach(function (b) {
    var activas = db.reservations.countDocuments({
      reserva_date: fecha, slotId: b.slotId, estado: 'ACTIVA'
    });
    db.disponibilidad.updateOne(
      { fecha: fecha, slotId: b.slotId },
      { $set: {
          fecha: fecha,
          slotId: b.slotId,
          cupos_disponibles: NumberInt(b.total - activas),
          aforo_maximo: b.total
      } },
      { upsert: true }
    );
  });
});

// ── Buzón de sugerencias ────────────────────────────────────────────────────
db.suggestions.insertMany([
  { autor_email: 'ana.demo@soyudemedellin.edu.co', autor_nombre: 'Ana Restrepo',
    mensaje: 'Al cancelar una reserva desde el celular el boton queda tapado por el teclado.',
    created_at: ahora },
  { autor_email: 'bruno.demo@soyudemedellin.edu.co', autor_nombre: 'Bruno Cardona',
    mensaje: 'Estaria bueno ver cuantos cupos quedan sin tener que entrar a cada bloque.',
    created_at: new Date(ahora.getTime() - 3600 * 1000) }
]);

// ── Resumen ─────────────────────────────────────────────────────────────────
print('');
print('Datos de prueba cargados:');
print('  cuentas ......... ' + db.users.countDocuments({ email: { $in: correosDemo } }));
print('  bloques ......... ' + db.slots.countDocuments({}));
print('  disponibilidad .. ' + db.disponibilidad.countDocuments({}) + ' (2 jornadas x 6 bloques)');
print('  reservas ........ ' + db.reservations.countDocuments({ email: { $in: correosDemo } }));
print('  sugerencias ..... ' + db.suggestions.countDocuments({ autor_email: { $in: correosDemo } }));
print('');
print('Credenciales de acceso (el documento es la contrasena):');
PERSONAS.forEach(function (p) {
  print('  ' + p.role.padEnd(11) + ' ' + p.email + '   documento: ' + p.documento);
});

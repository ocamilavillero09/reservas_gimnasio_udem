// ============================================================================
//  DATOS PARA LAS PRUEBAS E2E (screenpy) — solo para desarrollo
// ----------------------------------------------------------------------------
//      Get-Content database/seed_e2e.js -Raw | docker compose exec -T database mongosh --quiet
//
//  Crea los datos que necesitan las pruebas de regression_testing/screenpy/
//  test_gym_slots.py y que de otro modo solo existen en la base de quien las
//  escribio. Borra y vuelve a crear UNICAMENTE los correos de PERSONAS_E2E y la
//  reserva RESERVA_CANCELADA_ID. No toca las cuentas .demo (seed.js) ni ningun
//  otro dato.
//
//  Es idempotente: se puede correr todas las veces que haga falta.
//
//  El campo `cifrado` NO es una contrasena: es el documento de identidad de
//  cada persona pasado por PBKDF2 con 100.000 iteraciones y su propia sal, el
//  mismo algoritmo que usa el backend (ver seed.js).
// ============================================================================

db = db.getSiblingDB('gym_udem');

// ── Personas que usan las pruebas ───────────────────────────────────────────
// El correo determina el rol (RN01). El documento es la contrasena (RN02).
var PERSONAS_E2E = [
  // Estudiante de las pruebas de reserva, cancelacion y busqueda por documento.
  { name: 'Estudiante E2E Uno',   email: '1@soyudemedellin.edu.co',  documento: '1111111111',
    cifrado: '78c1a7d040d9af88db8d2c0f24b3ad8a4bac77a59b22571ad96a78ffbd001288:3c0dd6ead9c679538171534d2885f94d5e48ddd9e114c2ff7b65ebfe7d981b49',
    role: 'ESTUDIANTE', estado: 'ACTIVO' },

  // Segundo estudiante: la prueba de "sin cupos" no puede reutilizar al primero
  // porque chocaria con la regla de una reserva por dia (RN05).
  { name: 'Estudiante E2E Dos',   email: 'es@soyudemedellin.edu.co', documento: '2222222222',
    cifrado: '3fd5f261cb051eb968876419a80adf72be7753cff3897851b054363fa77fccba:e411134b3eda04a28bd45d3a437cab3e786d240b7266c9c14f0d495c7215cb5e',
    role: 'ESTUDIANTE', estado: 'ACTIVO' },

  // La prueba de penalizacion la marca como PENALIZADO y luego la reactiva
  // directamente en la base; aqui arranca activa.
  { name: 'Estudiante E2E Penalizacion', email: 'prueba.e2e.penalizacion@soyudemedellin.edu.co',
    documento: '3333333333',
    cifrado: 'baa6dac58c505d15a2b22224974a8fd8c0005e84b442e1774b98d55448bbc7fb:0d4129896ae5f651030edd833ecfc97894d5b94c98e234775e7127f9b191dbf8',
    role: 'ESTUDIANTE', estado: 'ACTIVO' },

  // Entrenador: no puede reservar (RN10) y si puede buscar estudiantes (RF10).
  { name: 'Entrenador E2E',       email: '3@udem.edu.co',            documento: '4444444444',
    cifrado: '5b1aa975fb07fe65ccbe75c8e1c28357559b5267a7ea40ffcb6b0b187d63f57b:53e2abcca7c38598b8e183034ba1f90ffb2b4310f47551a269a606607ea5efbd',
    role: 'ENTRENADOR', estado: 'ACTIVO' }
];

// Reserva ya cancelada que usa la prueba "cancelar una reserva ya cancelada".
var RESERVA_CANCELADA_ID = ObjectId('6ac81dc345b1dd6d13b418da');

// ── Limpieza acotada: solo lo que este mismo archivo crea ───────────────────
var correosE2E = PERSONAS_E2E.map(function (p) { return p.email; });
var borradosU = db.users.deleteMany({ email: { $in: correosE2E } }).deletedCount;
var borradasR = db.reservations.deleteMany({ _id: RESERVA_CANCELADA_ID }).deletedCount;
print('Limpieza de datos E2E: ' + borradosU + ' cuentas, ' + borradasR + ' reservas.');

// ── Cuentas ─────────────────────────────────────────────────────────────────
var ahora = new Date();
db.users.insertMany(PERSONAS_E2E.map(function (p) {
  return {
    name: p.name,
    email: p.email,
    documento: p.documento,
    password: p.cifrado,   // el hash, tal como lo guarda el backend
    role: p.role,
    estado: p.estado,
    es_principal: false,
    no_show_count: NumberInt(0),
    penalizado_hasta: null,
    created_at: ahora,
    edad: null,
    peso: null,
    altura: null,
    meta: null
  };
}));

// ── Reserva cancelada ───────────────────────────────────────────────────────
// Del dia de ayer y ya cerrada: no ocupa cupo en ninguna jornada, asi que no
// hace falta tocar `disponibilidad`.
function isoMasDias(dias) {
  var d = new Date();
  d.setDate(d.getDate() + dias);
  return d.toISOString().slice(0, 10);
}
var ayer = isoMasDias(-1);

db.reservations.insertOne({
  _id: RESERVA_CANCELADA_ID,
  email: '1@soyudemedellin.edu.co', slotId: NumberInt(1), hour: '06:00',
  reserva_date: ayer, date: ayer, estado: 'CANCELADA',
  created_by: '1@soyudemedellin.edu.co', created_at: ahora, cancelled_at: ahora
});

// ── Resumen ─────────────────────────────────────────────────────────────────
print('');
print('Datos E2E cargados:');
print('  cuentas ......... ' + db.users.countDocuments({ email: { $in: correosE2E } }));
print('  reserva cancelada ' + db.reservations.countDocuments({ _id: RESERVA_CANCELADA_ID }));
print('');
print('Credenciales de acceso (el documento es la contrasena):');
PERSONAS_E2E.forEach(function (p) {
  print('  ' + p.role.padEnd(11) + ' ' + p.email + '   documento: ' + p.documento);
});

// ============================================================================
//  VALIDADORES DE ESQUEMA — reaplicación sobre una base de datos existente
// ----------------------------------------------------------------------------
//  init.mongodb.js solo se ejecuta sobre un volumen vacío. Si la base de datos
//  ya existe y los validadores cambiaron, este script los vuelve a aplicar sin
//  borrar los datos, usando collMod.
//
//      mongosh mongodb://localhost:27017 database/validations.js
//
//  Aquí no hay lógica de negocio: un validador solo describe qué forma debe
//  tener un documento para poder guardarse. Las reglas que deciden si una
//  reserva procede viven en el backend (RNF06).
// ============================================================================

db = db.getSiblingDB('gym_udem');

var PATRON_CORREO =
  '^[A-Za-z0-9._%+-]+@(soyudemedellin\\.edu\\.co|udem\\.edu\\.co|udemedellin\\.edu\\.co)$';
var HORAS_BLOQUE = ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00'];
var HORAS_FIN    = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00'];

var VALIDADORES = {
  users: {
    bsonType: 'object',
    required: ['name', 'email', 'documento', 'password', 'role', 'estado', 'created_at'],
    properties: {
      name:      { bsonType: 'string', minLength: 2, maxLength: 100 },
      email:     { bsonType: 'string', pattern: PATRON_CORREO },
      documento: { bsonType: 'string', minLength: 10, maxLength: 10, pattern: '^[0-9]{10}$' },
      password:  { bsonType: 'string', pattern: '^[0-9a-f]{64}:[0-9a-f]{64}$' },
      role:      { enum: ['ESTUDIANTE', 'ENTRENADOR', 'ADMIN', 'SIN_ROL'] },
      estado:    { enum: ['ACTIVO', 'PENALIZADO', 'INACTIVO'] },
      es_principal:     { bsonType: 'bool' },
      no_show_count:    { bsonType: 'int', minimum: 0 },
      penalizado_hasta: { bsonType: ['date', 'null'] },
      created_at:       { bsonType: 'date' },
      created_by:       { bsonType: 'string' },
      edad:   { bsonType: ['int', 'null'],           minimum: 10,  maximum: 100 },
      peso:   { bsonType: ['int', 'double', 'null'], minimum: 20,  maximum: 300 },
      altura: { bsonType: ['int', 'double', 'null'], minimum: 100, maximum: 250 },
      meta:   { bsonType: ['string', 'null'], maxLength: 200 }
    }
  },

  slots: {
    bsonType: 'object',
    required: ['slotId', 'hour', 'hora_fin', 'total'],
    properties: {
      slotId:   { bsonType: 'int', minimum: 1, maximum: 6 },
      hour:     { enum: HORAS_BLOQUE },
      hora_fin: { enum: HORAS_FIN },
      total:    { bsonType: 'int', minimum: 1 }
    }
  },

  disponibilidad: {
    bsonType: 'object',
    required: ['fecha', 'slotId', 'cupos_disponibles', 'aforo_maximo'],
    properties: {
      fecha:             { bsonType: 'string', pattern: '^\\d{4}-\\d{2}-\\d{2}$' },
      slotId:            { bsonType: 'int', minimum: 1, maximum: 6 },
      cupos_disponibles: { bsonType: 'int', minimum: 0 },
      aforo_maximo:      { bsonType: 'int', minimum: 1 }
    }
  },

  reservations: {
    bsonType: 'object',
    required: ['email', 'slotId', 'hour', 'reserva_date', 'estado', 'created_at'],
    properties: {
      email:        { bsonType: 'string', pattern: PATRON_CORREO },
      slotId:       { bsonType: 'int', minimum: 1, maximum: 6 },
      hour:         { enum: HORAS_BLOQUE },
      reserva_date: { bsonType: 'string', pattern: '^\\d{4}-\\d{2}-\\d{2}$' },
      date:         { bsonType: 'string' },
      estado:       { enum: ['ACTIVA', 'CANCELADA', 'COMPLETADA', 'NO_SHOW'] },
      created_by:   { bsonType: 'string' },
      created_at:   { bsonType: 'date' },
      cancelled_at: { bsonType: ['date', 'null'] },
      completed_at: { bsonType: ['date', 'null'] },
      registrada_por: { bsonType: ['string', 'null'] }
    }
  },

  suggestions: {
    bsonType: 'object',
    required: ['autor_email', 'autor_nombre', 'mensaje', 'created_at'],
    properties: {
      autor_email:  { bsonType: 'string', pattern: PATRON_CORREO },
      autor_nombre: { bsonType: 'string', minLength: 2, maxLength: 100 },
      mensaje:      { bsonType: 'string', minLength: 1, maxLength: 2000 },
      created_at:   { bsonType: 'date' }
    }
  }
};

Object.keys(VALIDADORES).forEach(function (coleccion) {
  if (!db.getCollectionNames().includes(coleccion)) {
    db.createCollection(coleccion);
    print('Coleccion creada: ' + coleccion);
  }
  db.runCommand({
    collMod: coleccion,
    validator: { $jsonSchema: VALIDADORES[coleccion] },
    validationLevel: 'strict',
    validationAction: 'error'
  });
  print('Validador aplicado: ' + coleccion);
});

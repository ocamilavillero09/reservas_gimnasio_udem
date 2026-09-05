// ============================================================================
//  INICIALIZACIÓN DE LA BASE DE DATOS — Sistema de reservas del gimnasio UdeM
// ----------------------------------------------------------------------------
//  MongoDB ejecuta este script automáticamente al arrancar el contenedor sobre
//  un volumen vacío. Crea las colecciones con su validación de esquema y sus
//  índices.
//
//  RESPONSABILIDAD DE ESTA CAPA (RNF06):
//  Aquí solo hay estructura: colecciones, validadores, índices y consultas de
//  lectura. Ninguna función de este directorio crea, modifica ni decide sobre
//  una reserva. Toda la lógica de negocio vive en el backend, en Python.
//
//  Los campos declarados aquí son EXACTAMENTE los que escribe el backend.
// ============================================================================

db = db.getSiblingDB('gym_udem');

// Los tres dominios institucionales que reconoce el sistema (RN01).
// El dominio decide el rol, por eso el patrón se valida también aquí.
var PATRON_CORREO =
  '^[A-Za-z0-9._%+-]+@(soyudemedellin\\.edu\\.co|udem\\.edu\\.co|udemedellin\\.edu\\.co)$';

// Los seis bloques de dos horas en horas pares (RN03).
var HORAS_BLOQUE = ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00'];

// ============================================================================
//  COLECCIÓN users — personas del sistema, sin importar su rol
// ============================================================================
db.createCollection('users', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'email', 'documento', 'password', 'role', 'estado', 'created_at'],
      properties: {
        name: {
          bsonType: 'string', minLength: 2, maxLength: 100,
          description: 'Nombre completo (RF01).'
        },
        email: {
          bsonType: 'string', pattern: PATRON_CORREO,
          description: 'Correo institucional. Su dominio determina el rol (RN01).'
        },
        documento: {
          bsonType: 'string', minLength: 6, maxLength: 20, pattern: '^[A-Za-z0-9]+$',
          description: 'Documento normalizado, sin puntos ni espacios. Es el dato de busqueda del entrenador (RN02).'
        },
        password: {
          bsonType: 'string', pattern: '^[0-9a-f]{64}:[0-9a-f]{64}$',
          description: 'Documento cifrado con PBKDF2, en formato sal:clave (RN02). Nunca en claro.'
        },
        role: {
          enum: ['ESTUDIANTE', 'ENTRENADOR', 'ADMIN', 'SIN_ROL'],
          description: 'SIN_ROL es una cuenta a la que se le retiro el rol de administrador (RF23).'
        },
        estado: {
          enum: ['ACTIVO', 'PENALIZADO', 'INACTIVO'],
          description: 'PENALIZADO impide reservar mientras dure la penalizacion (RN09).'
        },
        es_principal:     { bsonType: 'bool',   description: 'Cuenta del administrador principal (RF22 y RF23).' },
        no_show_count:    { bsonType: 'int',    minimum: 0, description: 'Inasistencias acumuladas (RN08).' },
        cancel_count:     { bsonType: 'int',    minimum: 0, description: 'Cancelaciones acumuladas. Se retira al eliminar la penalizacion por cancelaciones.' },
        penalizado_hasta: { bsonType: ['date', 'null'], description: 'Fin de la penalizacion vigente (RN09).' },
        created_at:       { bsonType: 'date',   description: 'Momento del registro.' },
        created_by:       { bsonType: 'string', description: 'Correo del administrador que creo la cuenta (RF22).' },
        // Perfil físico del estudiante (RF03). Se agrega despues del registro.
        edad:   { bsonType: ['int', 'null'],            minimum: 10,  maximum: 100 },
        peso:   { bsonType: ['int', 'double', 'null'],  minimum: 20,  maximum: 300 },
        altura: { bsonType: ['int', 'double', 'null'],  minimum: 100, maximum: 250 },
        meta:   { bsonType: ['string', 'null'], maxLength: 200, description: 'Objetivo de entrenamiento (RF03).' }
      }
    }
  },
  validationLevel: 'strict',
  validationAction: 'error'
});

// ============================================================================
//  COLECCIÓN slots — catálogo de bloques horarios con su aforo
// ============================================================================
db.createCollection('slots', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['slotId', 'hour', 'available', 'total'],
      properties: {
        slotId:    { bsonType: 'int', minimum: 1, maximum: 6, description: 'Identificador del bloque, del 1 al 6.' },
        hour:      { enum: HORAS_BLOQUE, description: 'Hora par de inicio. No existen horas intermedias (RN03).' },
        available: { bsonType: 'int', minimum: 0, description: 'Cupos libres. Es el campo del descuento condicionado (RN06).' },
        total:     { bsonType: 'int', minimum: 1, description: 'Aforo maximo del bloque.' }
      }
    }
  },
  validationLevel: 'strict',
  validationAction: 'error'
});

// ============================================================================
//  COLECCIÓN reservations — vincula a un estudiante con un bloque y una fecha
// ============================================================================
db.createCollection('reservations', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['email', 'slotId', 'hour', 'reserva_date', 'estado', 'created_at'],
      properties: {
        email:        { bsonType: 'string', pattern: PATRON_CORREO, description: 'Estudiante que reservo.' },
        slotId:       { bsonType: 'int', minimum: 1, maximum: 6 },
        hour:         { enum: HORAS_BLOQUE, description: 'Hora de inicio del bloque reservado (RN03).' },
        reserva_date: { bsonType: 'string', pattern: '^\\d{4}-\\d{2}-\\d{2}$', description: 'Jornada reservada, en formato ISO. Siempre es el dia siguiente (RN04).' },
        date:         { bsonType: 'string', description: 'La misma fecha escrita en palabras, para la interfaz.' },
        estado:       { enum: ['ACTIVA', 'CANCELADA', 'COMPLETADA', 'NO_SHOW'], description: 'Desenlace de la reserva.' },
        created_by:   { bsonType: 'string' },
        created_at:   { bsonType: 'date' },
        cancelled_at: { bsonType: ['date', 'null'], description: 'Momento de la cancelacion (RF09).' },
        completed_at: { bsonType: ['date', 'null'], description: 'Momento del registro de asistencia (RF11).' },
        registrada_por: { bsonType: ['string', 'null'], description: 'Entrenador que registro la asistencia (RF11).' }
      }
    }
  },
  validationLevel: 'strict',
  validationAction: 'error'
});

// ============================================================================
//  COLECCIÓN suggestions — buzón de sugerencias (RF20 y RF21)
// ============================================================================
db.createCollection('suggestions', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['autor_email', 'autor_nombre', 'mensaje', 'created_at'],
      properties: {
        autor_email:  { bsonType: 'string', pattern: PATRON_CORREO, description: 'Estudiante que envio el mensaje (RF20).' },
        autor_nombre: { bsonType: 'string', minLength: 2, maxLength: 100 },
        mensaje:      { bsonType: 'string', minLength: 1, maxLength: 2000, description: 'Reporte de falla o sugerencia de mejora.' },
        created_at:   { bsonType: 'date', description: 'Momento del envio. Ordena la bandeja del administrador (RF21).' }
      }
    }
  },
  validationLevel: 'strict',
  validationAction: 'error'
});

// ============================================================================
//  ÍNDICES
// ============================================================================

// users — el correo y el documento identifican a la persona y deben ser unicos.
db.users.createIndex({ email: 1 },     { unique: true, name: 'idx_users_email_unico' });
db.users.createIndex({ documento: 1 }, { unique: true, name: 'idx_users_documento_unico' });
db.users.createIndex({ role: 1, estado: 1 }, { name: 'idx_users_rol_estado' });

// slots — se consulta por el identificador del bloque.
db.slots.createIndex({ slotId: 1 }, { unique: true, name: 'idx_slots_id_unico' });

// reservations — una sola reserva ACTIVA por estudiante y fecha (RN05).
// El indice parcial hace que la propia base de datos respalde la regla: aunque
// el backend fallara, MongoDB rechazaria la segunda reserva activa del dia.
db.reservations.createIndex(
  { email: 1, reserva_date: 1 },
  { unique: true, partialFilterExpression: { estado: 'ACTIVA' }, name: 'idx_reservas_una_activa_por_dia' }
);
db.reservations.createIndex({ reserva_date: 1, estado: 1 }, { name: 'idx_reservas_jornada' });
db.reservations.createIndex({ email: 1, created_at: -1 },   { name: 'idx_reservas_historial' });
db.reservations.createIndex({ slotId: 1, estado: 1 },       { name: 'idx_reservas_bloque' });

// suggestions — la bandeja se lee de la mas reciente a la mas antigua (RF21).
db.suggestions.createIndex({ created_at: -1 }, { name: 'idx_sugerencias_recientes' });

// ============================================================================
//  DATOS INICIALES — los seis bloques horarios del gimnasio (RN03)
// ============================================================================
// NumberInt es obligatorio: mongosh guardaria un 20 suelto como decimal y el
// validador exige enteros. El backend en Python ya escribe enteros de 32 bits,
// asi que de este modo las dos capas guardan exactamente el mismo tipo.
var AFORO = NumberInt(20);

db.slots.insertMany(HORAS_BLOQUE.map(function (hora, i) {
  return {
    slotId:    NumberInt(i + 1),
    hour:      hora,
    available: AFORO,
    total:     AFORO
  };
}));

print('Base de datos gym_udem inicializada.');
print('Colecciones: users, slots, reservations, suggestions');
print('Bloques horarios cargados: ' + db.slots.countDocuments({}));

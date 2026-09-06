// ============================================================================
//  CONSULTAS DE INSPECCIÓN — SOLO LECTURA
// ----------------------------------------------------------------------------
//      mongosh mongodb://localhost:27017 database/queries.js
//
//  Este archivo sirve para mirar el estado de la base de datos durante el
//  desarrollo y para verificar a mano lo que el backend reporta.
//
//  QUÉ NO HAY AQUÍ, Y POR QUÉ (RNF06):
//  Ninguna función de este archivo escribe. No hay crear reserva, no hay
//  cancelar, no hay decidir si alguien puede reservar. Esas son reglas de
//  negocio y viven en un solo lugar, el backend en Python. Si estuvieran
//  también aquí habría dos implementaciones de la misma regla y nada
//  garantizaría que dijeran lo mismo. De hecho, la versión anterior de este
//  archivo permitía dos reservas activas por persona, que contradice la RN05.
//
//  Todas las funciones devuelven datos. Ninguna los modifica.
// ============================================================================

db = db.getSiblingDB('gym_udem');

// ── Utilidades de fecha ─────────────────────────────────────────────────────

/** Fecha de hoy en formato ISO, que es como se guarda reserva_date. */
function hoyISO() {
  return new Date().toISOString().slice(0, 10);
}

/** Fecha del día siguiente, que es la única para la que se reserva (RN04). */
function mananaISO() {
  var d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

// ── Disponibilidad ──────────────────────────────────────────────────────────

/** El catálogo de los seis bloques, ordenado por hora (RN03). */
function verBloques() {
  return db.slots.find({}, { _id: 0 }).sort({ slotId: 1 }).toArray();
}

/** Cupos libres de una jornada, bloque por bloque (RF06). */
function verDisponibilidad(fechaISO) {
  var fecha = fechaISO || mananaISO();
  var horas = {};
  db.slots.find({}).forEach(function (b) { horas[b.slotId] = b.hour; });
  return db.disponibilidad.find({ fecha: fecha }, { _id: 0 }).sort({ slotId: 1 })
    .toArray().map(function (d) {
      return {
        bloque: horas[d.slotId],
        aforo: d.aforo_maximo,
        cupos_libres: d.cupos_disponibles,
        ocupados: d.aforo_maximo - d.cupos_disponibles
      };
    });
}

/**
 * Contraste entre el contador de cupos y las reservas activas que hay de verdad.
 * Sirve para detectar si algún cupo quedó descuadrado: si `available` más las
 * reservas activas no da el aforo total, hay una inconsistencia que revisar.
 */
function verificarAforo(fechaISO) {
  var fecha = fechaISO || mananaISO();
  var horas = {};
  db.slots.find({}).forEach(function (b) { horas[b.slotId] = b.hour; });
  return db.disponibilidad.find({ fecha: fecha }).sort({ slotId: 1 }).toArray().map(function (d) {
    var activas = db.reservations.countDocuments({
      slotId: d.slotId, reserva_date: fecha, estado: 'ACTIVA'
    });
    return {
      bloque: horas[d.slotId],
      aforo: d.aforo_maximo,
      cupos_libres: d.cupos_disponibles,
      reservas_activas: activas,
      cuadra: (d.cupos_disponibles + activas) === d.aforo_maximo
    };
  });
}

// ── Usuarios ────────────────────────────────────────────────────────────────

/** Cuántas cuentas hay de cada rol y en qué estado están. */
function usuariosPorRol() {
  return db.users.aggregate([
    { $group: { _id: { rol: '$role', estado: '$estado' }, total: { $sum: 1 } } },
    { $sort: { '_id.rol': 1, '_id.estado': 1 } }
  ]).toArray();
}

/** Ficha de una persona por su documento de identidad, sin la credencial (RF10). */
function buscarPorDocumento(documento) {
  return db.users.findOne(
    { documento: String(documento) },
    { password: 0 }
  );
}

/** Estudiantes con la cuenta penalizada y hasta cuándo lo están (RN09). */
function penalizados() {
  return db.users.find(
    { estado: 'PENALIZADO' },
    { _id: 0, name: 1, email: 1, documento: 1, no_show_count: 1, penalizado_hasta: 1 }
  ).sort({ penalizado_hasta: 1 }).toArray();
}

/** Quiénes están cerca del límite de inasistencias, sin haberlo alcanzado (RN08). */
function cercaDelLimite(limite) {
  var tope = limite || 5;
  return db.users.find(
    { role: 'ESTUDIANTE', no_show_count: { $gte: tope - 2, $lt: tope } },
    { _id: 0, name: 1, email: 1, no_show_count: 1 }
  ).sort({ no_show_count: -1 }).toArray();
}

// ── Reservas ────────────────────────────────────────────────────────────────

/** Reservas de una jornada, opcionalmente filtradas por estado. */
function reservasDeLaJornada(fechaISO, estado) {
  var filtro = { reserva_date: fechaISO || hoyISO() };
  if (estado) filtro.estado = estado;
  return db.reservations.find(filtro, { _id: 0 }).sort({ hour: 1, email: 1 }).toArray();
}

/** Reservas de la jornada que siguen activas: nadie les registró asistencia (RF12). */
function sinAsistenciaRegistrada(fechaISO) {
  return reservasDeLaJornada(fechaISO, 'ACTIVA');
}

/** Historial completo de un estudiante, de la más reciente a la más antigua (RF14). */
function historialDe(email) {
  return db.reservations.find({ email: email }, { _id: 0 })
    .sort({ created_at: -1 }).toArray();
}

/** Totales de la jornada por estado: el mismo resumen del registro diario (RF16). */
function resumenDelDia(fechaISO) {
  var fecha = fechaISO || hoyISO();
  var porEstado = db.reservations.aggregate([
    { $match: { reserva_date: fecha } },
    { $group: { _id: '$estado', total: { $sum: 1 } } }
  ]).toArray();
  var resumen = { fecha: fecha, ACTIVA: 0, COMPLETADA: 0, CANCELADA: 0, NO_SHOW: 0 };
  porEstado.forEach(function (e) { resumen[e._id] = e.total; });
  return resumen;
}

/** Ocupación por bloque en una jornada, para ver a qué horas se llena el gimnasio. */
function ocupacionPorBloque(fechaISO) {
  var fecha = fechaISO || hoyISO();
  return db.reservations.aggregate([
    { $match: { reserva_date: fecha, estado: { $in: ['ACTIVA', 'COMPLETADA', 'NO_SHOW'] } } },
    { $group: { _id: '$hour', total: { $sum: 1 } } },
    { $sort: { _id: 1 } }
  ]).toArray();
}

// ── Comprobaciones de integridad ────────────────────────────────────────────

/**
 * Busca estudiantes con más de una reserva ACTIVA el mismo día. El resultado
 * debe estar siempre vacío: lo impiden la regla RN05 en el backend y el índice
 * único parcial de la base de datos. Si aparece algo, hay un problema serio.
 */
function reservasDuplicadas() {
  return db.reservations.aggregate([
    { $match: { estado: 'ACTIVA' } },
    { $group: { _id: { email: '$email', fecha: '$reserva_date' }, total: { $sum: 1 } } },
    { $match: { total: { $gt: 1 } } }
  ]).toArray();
}

/** Reservas cuyo correo no corresponde a ninguna cuenta registrada. */
function reservasHuerfanas() {
  var correos = db.users.distinct('email');
  return db.reservations.find({ email: { $nin: correos } }, { _id: 0 }).toArray();
}

// ── Buzón de sugerencias ────────────────────────────────────────────────────

/** Mensajes del buzón, del más reciente al más antiguo (RF21). */
function verBuzon(limite) {
  return db.suggestions.find({}, { _id: 0 })
    .sort({ created_at: -1 }).limit(limite || 20).toArray();
}

// ── Resumen al ejecutar el archivo ──────────────────────────────────────────

print('Consultas de inspeccion disponibles (solo lectura):');
print('');
print('  Disponibilidad');
print('    verBloques()                     el catalogo de los seis bloques');
print('    verDisponibilidad(fecha)         cupos libres de una jornada');
print('    verificarAforo(fecha)            contrasta el contador con las reservas reales');
print('');
print('  Usuarios');
print('    usuariosPorRol()                 cuentas por rol y estado');
print('    buscarPorDocumento(documento)    ficha de una persona, sin la credencial');
print('    penalizados()                    cuentas penalizadas y hasta cuando');
print('    cercaDelLimite(limite)           quienes estan por alcanzar el limite');
print('');
print('  Reservas');
print('    reservasDeLaJornada(fecha, est)  reservas de un dia');
print('    sinAsistenciaRegistrada(fecha)   las que siguen activas');
print('    historialDe(correo)              historial de un estudiante');
print('    resumenDelDia(fecha)             totales por estado');
print('    ocupacionPorBloque(fecha)        a que horas se llena el gimnasio');
print('');
print('  Integridad');
print('    reservasDuplicadas()             debe devolver siempre una lista vacia');
print('    reservasHuerfanas()              reservas sin cuenta asociada');
print('');
print('  Buzon');
print('    verBuzon(limite)                 mensajes del mas reciente al mas antiguo');
print('');
print('Estado actual: ' + JSON.stringify(resumenDelDia()));

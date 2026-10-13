// Crea una reserva ACTIVA para Kata en la jornada de mañana (America/Bogota).
// Idempotente: si ya tiene una reserva ACTIVA para esa fecha, no hace nada.
//
// Uso:
//   Get-Content database/reserva_kata.js -Raw | docker compose exec -T database mongosh --quiet

const gym = db.getSiblingDB('gym_udem');
const EMAIL = 'kata@soyudemedellin.edu.co';

// Bogotá está en UTC-5 todo el año (sin horario de verano).
const manana = new Date(Date.now() - 5 * 3600 * 1000 + 24 * 3600 * 1000);
const fechaIso = manana.toISOString().slice(0, 10);
const DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
const MESES = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio',
  'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
const fechaLabel =
  `${DIAS[manana.getUTCDay()]} ${manana.getUTCDate()} de ` +
  `${MESES[manana.getUTCMonth()]} de ${manana.getUTCFullYear()}`;

// asegurar_disponibilidad: crea cada bloque con el aforo completo solo si no existe.
gym.slots.find({}).sort({ slotId: 1 }).forEach((b) => {
  gym.disponibilidad.updateOne(
    { fecha: fechaIso, slotId: b.slotId },
    { $setOnInsert: {
      fecha: fechaIso,
      slotId: b.slotId,
      cupos_disponibles: b.total,
      aforo_maximo: b.total,
    } },
    { upsert: true }
  );
});

const existente = gym.reservations.findOne(
  { email: EMAIL, estado: 'ACTIVA', reserva_date: fechaIso }
);

if (existente) {
  print(`YA EXISTE: id=${existente._id} fecha=${fechaIso} bloque=${existente.hour}`);
} else {
  let hecho = false;
  const bloques = gym.slots.find({}).sort({ slotId: 1 }).toArray();
  for (const b of bloques) {
    // tomar_cupo: comprobar y descontar en una sola operación condicionada.
    const tomado = gym.disponibilidad.findOneAndUpdate(
      { fecha: fechaIso, slotId: b.slotId, cupos_disponibles: { $gt: 0 } },
      { $inc: { cupos_disponibles: -1 } }
    );
    if (!tomado) continue;
    const r = gym.reservations.insertOne({
      email: EMAIL,
      slotId: b.slotId,
      hour: b.hour,
      reserva_date: fechaIso,
      date: fechaLabel,
      estado: 'ACTIVA',
      created_by: EMAIL,
      created_at: new Date(),
    });
    print(`CREADA: id=${r.insertedId} fecha=${fechaIso} (${fechaLabel}) bloque=${b.hour}`);
    hecho = true;
    break;
  }
  if (!hecho) print(`SIN CUPOS en ninguna franja para ${fechaIso}`);
}

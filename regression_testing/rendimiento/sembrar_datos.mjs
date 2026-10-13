// Datos de volumen para las pruebas de carga.
//
// Simula un semestre en uso: 1500 estudiantes, 60 días de historial y la
// jornada de hoy con el gimnasio lleno (6 bloques × 20 cupos = 120 reservas
// activas). BORRA la base indicada antes de sembrar: úsese solo contra una base
// de pruebas.
//
//   node regression_testing/rendimiento/sembrar_datos.mjs
//   MONGO_URI=mongodb://localhost:27017 MONGO_DB=gym_udem node ...
//
// Escribe usuarios.json con las credenciales que usa el script de k6.
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const AQUI = path.dirname(fileURLToPath(import.meta.url));
// El driver de MongoDB se toma del node_modules de frontend/.
const require = createRequire(path.join(AQUI, '../../frontend/package.json'));
const { MongoClient } = require('mongodb');

const URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const DB = process.env.MONGO_DB || 'gym_udem';
const ESTUDIANTES = 1500;
const CON_LOGIN = 100;          // estudiantes con contraseña real (el hash PBKDF2 es lento a propósito)
const DIAS_HISTORIAL = 60;
const BLOQUES = [['06:00', 1], ['08:00', 2], ['10:00', 3], ['12:00', 4], ['14:00', 5], ['16:00', 6]];
const AFORO = 20;

// Mismo formato que backend/api/db.py: sal (32 bytes) : PBKDF2-SHA256, 100 000 iteraciones.
function hashDocumento(documento) {
  const sal = crypto.randomBytes(32);
  const clave = crypto.pbkdf2Sync(documento, sal, 100_000, 32, 'sha256');
  return `${sal.toString('hex')}:${clave.toString('hex')}`;
}
const HASH_FALSO = `${'0'.repeat(64)}:${'0'.repeat(64)}`;

const fechaBogota = (dias) =>
  new Date(Date.now() + dias * 86400000).toLocaleDateString('en-CA', { timeZone: 'America/Bogota' });

const cliente = await MongoClient.connect(URI);
const db = cliente.db(DB);
await Promise.all(['users', 'reservations', 'suggestions', 'disponibilidad']
  .map((c) => db.collection(c).deleteMany({})));

const ahora = new Date();
const usuarios = [];
const credenciales = { estudiantes: [], entrenadores: [], admin: null };

for (let i = 0; i < ESTUDIANTES; i++) {
  const documento = String(1100000000 + i);
  const email = `est${i}@soyudemedellin.edu.co`;
  usuarios.push({
    name: `Estudiante ${i}`, email, documento, role: 'ESTUDIANTE', estado: 'ACTIVO',
    es_principal: false, no_show_count: i % 4, penalizado_hasta: null, created_at: ahora,
    password: i < CON_LOGIN ? hashDocumento(documento) : HASH_FALSO,
  });
  if (i < CON_LOGIN) credenciales.estudiantes.push({ email, documento });
}
for (let i = 0; i < 5; i++) {
  const documento = String(1200000000 + i);
  const email = `coach${i}@udem.edu.co`;
  usuarios.push({ name: `Entrenador ${i}`, email, documento, role: 'ENTRENADOR', estado: 'ACTIVO',
    es_principal: false, no_show_count: 0, penalizado_hasta: null, created_at: ahora, password: hashDocumento(documento) });
  credenciales.entrenadores.push({ email, documento });
}
usuarios.push({ name: 'Admin Principal', email: 'admin@udemedellin.edu.co', documento: '1300000000',
  role: 'ADMIN', estado: 'ACTIVO', es_principal: true, no_show_count: 0, penalizado_hasta: null,
  created_at: ahora, password: hashDocumento('1300000000') });
credenciales.admin = { email: 'admin@udemedellin.edu.co', documento: '1300000000' };
await db.collection('users').insertMany(usuarios);

// Historial: cada día pasado, el gimnasio a ~85 % con un reparto de desenlaces.
const reservas = [];
let n = 0;
for (let d = -DIAS_HISTORIAL; d <= 0; d++) {
  const fecha = fechaBogota(d);
  for (const [hour, slotId] of BLOQUES) {
    const cupos = d === 0 ? AFORO : Math.round(AFORO * 0.85);
    for (let k = 0; k < cupos; k++, n++) {
      const est = (n * 7) % ESTUDIANTES;      // reparte las reservas entre todos
      const estado = d === 0 ? 'ACTIVA' : ['COMPLETADA', 'COMPLETADA', 'COMPLETADA', 'CANCELADA', 'NO_SHOW'][n % 5];
      reservas.push({ email: `est${est}@soyudemedellin.edu.co`, slotId, hour, reserva_date: fecha, date: fecha,
        estado, created_by: `est${est}@soyudemedellin.edu.co`, created_at: new Date(ahora - (1 - d) * 86400000) });
    }
  }
}
// El índice único impide dos reservas ACTIVAS del mismo estudiante en un día: se
// insertan sin orden y se ignoran los choques.
await db.collection('reservations').insertMany(reservas, { ordered: false }).catch(() => {});

const hoy = fechaBogota(0);
const activasHoy = await db.collection('reservations').find({ reserva_date: hoy, estado: 'ACTIVA' }).toArray();
const docPorEmail = Object.fromEntries(usuarios.map((u) => [u.email, u.documento]));
credenciales.documentos_con_reserva_hoy = activasHoy.map((r) => docPorEmail[r.email]);

const sugerencias = Array.from({ length: 300 }, (_, i) => ({
  autor_email: `est${i}@soyudemedellin.edu.co`, autor_nombre: `Estudiante ${i}`,
  mensaje: `Sugerencia de prueba número ${i}: ${'texto '.repeat(20)}`,
  created_at: new Date(ahora - i * 3600000),
}));
await db.collection('suggestions').insertMany(sugerencias);

fs.writeFileSync(path.join(AQUI, 'usuarios.json'), JSON.stringify(credenciales, null, 1));
console.log({
  usuarios: await db.collection('users').countDocuments(),
  reservas: await db.collection('reservations').countDocuments(),
  activas_hoy: activasHoy.length,
  sugerencias: await db.collection('suggestions').countDocuments(),
});
await cliente.close();

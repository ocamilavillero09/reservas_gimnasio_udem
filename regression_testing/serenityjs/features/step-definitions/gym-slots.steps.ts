import { After, Before, Given, When, Then } from '@cucumber/cucumber';
import { actorCalled, Cast, engage } from '@serenity-js/core';
import { GetRequest, PostRequest, DeleteRequest, LastResponse, Send, CallAnApi } from '@serenity-js/rest';
import { Ensure, equals } from '@serenity-js/assertions';
import { Db, MongoClient, ObjectId } from 'mongodb';

const API = process.env.API_URL || 'http://localhost:8000/api';
const API_SLOTS = `${API}/slots/`;
const API_RESERVAS = `${API}/reservations/`;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017';
const MONGO_DB = process.env.MONGO_DB || 'gym_udem';

const CUENTAS = {
  e2e1: { name: 'Estudiante E2E Uno', email: '1@soyudemedellin.edu.co', documento: '1111111111' },
  e2e2: { name: 'Estudiante E2E Dos', email: 'es@soyudemedellin.edu.co', documento: '2222222222' },
  penalizacion: {
    name: 'Estudiante E2E Penalizacion',
    email: 'prueba.e2e.penalizacion@soyudemedellin.edu.co',
    documento: '3333333333',
  },
  entrenador: { name: 'Entrenador E2E', email: '3@udem.edu.co', documento: '4444444444' },
};
type Cuenta = (typeof CUENTAS)[keyof typeof CUENTAS];

const SLOT_PRUEBAS = 1;
const SLOT_AGOTADO = 6;
const RESERVA_CANCELADA_SEED = '6ac81dc345b1dd6d13b418da';

const mañana = () =>
  new Date(Date.now() + 86_400_000).toLocaleDateString('en-CA', { timeZone: 'America/Bogota' });
const ayer = () =>
  new Date(Date.now() - 86_400_000).toLocaleDateString('en-CA', { timeZone: 'America/Bogota' });

async function conDb<T>(fn: (db: Db) => Promise<T>): Promise<T> {
  const cliente = new MongoClient(MONGO_URI);
  await cliente.connect();
  try {
    return await fn(cliente.db(MONGO_DB));
  } finally {
    await cliente.close();
  }
}


const tokens = new Map<string, string>();

async function tokenDe(cuenta: Cuenta): Promise<string> {
  const guardado = tokens.get(cuenta.email);
  if (guardado) return guardado;
  const respuesta = await fetch(`${API}/auth/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: cuenta.email, documento: cuenta.documento }),
  });
  const { token } = (await respuesta.json()) as { token?: string };
  if (!token) throw new Error(`No se pudo iniciar sesión como ${cuenta.email}: ${respuesta.status}`);
  tokens.set(cuenta.email, token);
  return token;
}

const conSesion = async (cuenta: Cuenta) => ({ headers: { Authorization: `Bearer ${await tokenDe(cuenta)}` } });


Before({ tags: '@sebas' }, async () => {
  engage(Cast.where((actor) => actor.whoCan(CallAnApi.at(API))));
  tokens.clear();

  for (const cuenta of Object.values(CUENTAS)) {
    const respuesta = await fetch(`${API}/auth/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cuenta),
    });
    if (![201, 409].includes(respuesta.status)) {
      throw new Error(`No se pudo registrar ${cuenta.email}: ${respuesta.status} ${await respuesta.text()}`);
    }
  }

  await conDb(async (db) => {
    const correos = Object.values(CUENTAS).map((c) => c.email);
   
    const activas = await db.collection('reservations').find({ email: { $in: correos }, estado: 'ACTIVA' }).toArray();
    for (const r of activas) {
      await db.collection('disponibilidad').updateOne(
        { fecha: r.reserva_date, slotId: r.slotId },
        { $inc: { cupos_disponibles: 1 } },
      );
    }
    await db.collection('reservations').deleteMany({ email: { $in: correos }, estado: 'ACTIVA' });
    await db.collection('users').updateMany(
      { email: { $in: correos } },
      { $set: { estado: 'ACTIVO', penalizado_hasta: null, no_show_count: 0 } },
    );
    await db.collection('login_intentos').deleteMany({ email: { $in: correos } });

    const fecha = ayer();
    await db.collection('reservations').replaceOne(
      { _id: new ObjectId(RESERVA_CANCELADA_SEED) },
      {
        email: CUENTAS.e2e1.email, slotId: SLOT_PRUEBAS, hour: '06:00', reserva_date: fecha, date: fecha,
        estado: 'CANCELADA', created_by: CUENTAS.e2e1.email, created_at: new Date(), cancelled_at: new Date(),
      },
      { upsert: true },
    );
  });
});


let cuposOriginalesAgotado: number | undefined;
After({ tags: '@sebas' }, async () => {
  if (cuposOriginalesAgotado === undefined) return;
  const cupos = cuposOriginalesAgotado;
  cuposOriginalesAgotado = undefined;
  await conDb((db) =>
    db.collection('disponibilidad').updateOne({ fecha: mañana(), slotId: SLOT_AGOTADO }, { $set: { cupos_disponibles: cupos } }),
  );
});

function prepararPenalizacion(modo: 'vigente' | 'vencida'): Promise<unknown> {
  const horas = modo === 'vigente' ? 24 : -24;
  return conDb((db) =>
    db.collection('users').updateOne(
      { email: CUENTAS.penalizacion.email },
      { $set: { estado: 'PENALIZADO', penalizado_hasta: new Date(Date.now() + horas * 3_600_000) } },
    ),
  );
}

let idReservaDuplicada: string | undefined;
let idReservaCancelar: string | undefined;
let cuposAntesCancelar: number | undefined;
let idReservaBusqueda: string | undefined;

const actor = () => actorCalled('Estudiante');

async function body(): Promise<any> {
  return actor().answer(LastResponse.body());
}

async function postReserva(cuenta: Cuenta, slotId: number | string, email = cuenta.email): Promise<any> {
  await actor().attemptsTo(
    Send.a(PostRequest.to(API_RESERVAS).with({ email, slotId }).using(await conSesion(cuenta))),
  );
  return body();
}

async function cancelar(cuenta: Cuenta, id: string): Promise<void> {
  await actor().attemptsTo(Send.a(DeleteRequest.to(`${API_RESERVAS}${id}/`).using(await conSesion(cuenta))));
}

async function consultar(cuenta: Cuenta, ruta: string): Promise<void> {
  await actor().attemptsTo(Send.a(GetRequest.to(`${API}${ruta}`).using(await conSesion(cuenta))));
}


When('consulto los horarios del gimnasio', async () => {
  await actor().attemptsTo(Send.a(GetRequest.to(API_SLOTS)));
});

Then('la respuesta debe ser exitosa', async () => {
  await actor().attemptsTo(Ensure.that(LastResponse.status(), equals(200)));
});

Then('deben aparecer seis horarios', async () => {
  const respuesta = await body();
  await actor().attemptsTo(Ensure.that(respuesta.slots.length, equals(6)));
});

Then('cada horario debe informar sus cupos disponibles y totales', async () => {
  const respuesta = await body();
  if (!Array.isArray(respuesta.slots)) throw new Error('La propiedad slots no es una lista.');
  for (const horario of respuesta.slots) {
    if (typeof horario.available !== 'number' || horario.available < 0) {
      throw new Error(`Cupos disponibles inválidos para el horario ${horario.id}.`);
    }
    if (typeof horario.total !== 'number' || horario.total <= 0) {
      throw new Error(`Aforo total inválido para el horario ${horario.id}.`);
    }
  }
});

Then('no deben aparecer bloques fuera del catálogo', async () => {
  const respuesta = await body();
  const permitidos = new Set([1, 2, 3, 4, 5, 6]);
  for (const horario of respuesta.slots) {
    if (!permitidos.has(Number(horario.id))) {
      throw new Error(`El horario ${horario.id} no pertenece al catálogo.`);
    }
  }
});

// RF07
When('intento reservar sin proporcionar los datos obligatorios', async () => {
  await actor().attemptsTo(Send.a(PostRequest.to(API_RESERVAS).with({}).using(await conSesion(CUENTAS.e2e1))));
});

Then('la respuesta de la reserva debe ser un error {int}', async (status: number) => {
  await actor().attemptsTo(Ensure.that(LastResponse.status(), equals(status)));
});


When('intento reservar sin sesión con un correo de estudiante inexistente', async () => {
  await actor().attemptsTo(
    Send.a(PostRequest.to(API_RESERVAS).with({ email: 'estudiante.inexistente.e2e@soyudemedellin.edu.co', slotId: SLOT_PRUEBAS })),
  );
});

When('intento reservar con un usuario que no es estudiante', async () => {
  await postReserva(CUENTAS.entrenador, SLOT_PRUEBAS);
});

When('intento reservar con un estudiante penalizado', async () => {
  await prepararPenalizacion('vigente');
  await postReserva(CUENTAS.penalizacion, SLOT_PRUEBAS);
});

When('intento reservar con un estudiante cuya penalización ha vencido', async () => {
  await prepararPenalizacion('vencida');
  await postReserva(CUENTAS.penalizacion, SLOT_PRUEBAS);
});

Then('la respuesta debe indicar que la solicitud continuó después de revisar la penalización', async () => {
  const status = await actor().answer(LastResponse.status());
  const respuesta = await body();
  if (![201, 409].includes(status)) {
    throw new Error(`Se esperaba que el flujo continuara después de revisar la penalización; se recibió HTTP ${status}.`);
  }
  if (status === 201 && respuesta.id) await cancelar(CUENTAS.penalizacion, String(respuesta.id));
});

When('intento reservar en un horario inexistente', async () => {
  await postReserva(CUENTAS.e2e1, 999999);
});

Given('que un estudiante tiene una reserva activa para mañana', async () => {
  const respuesta = await postReserva(CUENTAS.e2e1, SLOT_PRUEBAS);
  if (!respuesta.id) throw new Error(`No se pudo crear la reserva previa para RF07_C7: ${JSON.stringify(respuesta)}`);
  idReservaDuplicada = String(respuesta.id);
});

When('intenta reservar nuevamente el mismo día', async () => {
  await postReserva(CUENTAS.e2e1, SLOT_PRUEBAS);
});

Then('la respuesta de la reserva debe indicar que existe una reserva duplicada', async () => {
  const respuesta = await body();
  try {
    await actor().attemptsTo(Ensure.that(LastResponse.status(), equals(409)));
    await actor().attemptsTo(Ensure.that(respuesta.tipo, equals('RESERVA_DUPLICADA')));
  } finally {
    if (idReservaDuplicada) {
      await cancelar(CUENTAS.e2e1, idReservaDuplicada);
      idReservaDuplicada = undefined;
    }
  }
});

When('intento reservar en un horario sin cupos disponibles', async () => {

  await actor().attemptsTo(Send.a(GetRequest.to(API_SLOTS)));
  cuposOriginalesAgotado = await conDb(async (db) => {
    const filtro = { fecha: mañana(), slotId: SLOT_AGOTADO };
    const actual = await db.collection('disponibilidad').findOne(filtro);
    await db.collection('disponibilidad').updateOne(filtro, { $set: { cupos_disponibles: 0 } });
    return Number(actual?.cupos_disponibles ?? 20);
  });
  await postReserva(CUENTAS.e2e1, SLOT_AGOTADO);
});

Then('la respuesta de la reserva debe indicar que no hay cupos', async () => {
  const respuesta = await body();
  await actor().attemptsTo(Ensure.that(LastResponse.status(), equals(409)));
  await actor().attemptsTo(Ensure.that(respuesta.tipo, equals('SIN_CUPOS')));
});

When('realizo una reserva válida', async () => {
  await postReserva(CUENTAS.e2e2, SLOT_PRUEBAS);
});

Then('la reserva debe crearse correctamente', async () => {
  const respuesta = await body();
  await actor().attemptsTo(Ensure.that(LastResponse.status(), equals(201)));
  await actor().attemptsTo(Ensure.that(respuesta.tipo, equals('RESERVA_CONFIRMADA')));
  if (!respuesta.id) throw new Error('La respuesta de creación no incluye el id de reserva.');
  await cancelar(CUENTAS.e2e2, String(respuesta.id));
});

// RF08
When('consulto mis reservas sin proporcionar el correo', async () => {
  await consultar(CUENTAS.e2e1, '/reservations/');
});

Then('la respuesta de la consulta de reservas debe ser un error 400', async () => {
  await actor().attemptsTo(Ensure.that(LastResponse.status(), equals(400)));
});

Then('la respuesta de la consulta de reservas debe ser exitosa', async () => {
  await actor().attemptsTo(Ensure.that(LastResponse.status(), equals(200)));
});

When('consulto mis reservas con un correo válido', async () => {
  await consultar(CUENTAS.e2e1, `/reservations/?email=${encodeURIComponent(CUENTAS.e2e1.email)}`);
});

Then('la consulta debe devolver una lista de reservas', async () => {
  const respuesta = await body();
  if (!Array.isArray(respuesta)) throw new Error('La consulta de reservas debe devolver una lista.');
});

// RF09
When('intento cancelar una reserva con un identificador inválido', async () => {
  await cancelar(CUENTAS.e2e1, 'id-invalido');
});

Then('la respuesta de cancelación debe ser un error 400', async () => {
  await actor().attemptsTo(Ensure.that(LastResponse.status(), equals(400)));
});

When('intento cancelar una reserva inexistente', async () => {
  await cancelar(CUENTAS.e2e1, '6f0000000000000000000001');
});

Then('la respuesta de cancelación debe ser un error 404', async () => {
  await actor().attemptsTo(Ensure.that(LastResponse.status(), equals(404)));
});

When('intento cancelar una reserva que ya está cancelada', async () => {
  await cancelar(CUENTAS.e2e1, RESERVA_CANCELADA_SEED);
});

Then('la respuesta de cancelación debe ser un error 409', async () => {
  await actor().attemptsTo(Ensure.that(LastResponse.status(), equals(409)));
});

Given('que existe una reserva activa para cancelar', async () => {
  await actor().attemptsTo(Send.a(GetRequest.to(API_SLOTS)));
  const horarios = await body();
  const horario = horarios.slots.find((s: any) => Number(s.id) === SLOT_PRUEBAS && Number(s.available) > 0);
  if (!horario) throw new Error('No hay cupo disponible en el horario de prueba 1.');
  cuposAntesCancelar = Number(horario.available);
  const respuesta = await postReserva(CUENTAS.e2e1, SLOT_PRUEBAS);
  if (!respuesta.id) throw new Error(`No se pudo preparar la reserva para cancelar: ${JSON.stringify(respuesta)}`);
  idReservaCancelar = String(respuesta.id);
});

When('cancelo la reserva', async () => {
  if (!idReservaCancelar) throw new Error('No se preparó una reserva para cancelar.');
  await cancelar(CUENTAS.e2e1, idReservaCancelar);
});

Then('la reserva debe cancelarse y liberarse el cupo', async () => {
  const respuesta = await body();
  await actor().attemptsTo(Ensure.that(LastResponse.status(), equals(200)));
  await actor().attemptsTo(Ensure.that(respuesta.tipo, equals('RESERVA_CANCELADA')));
  await actor().attemptsTo(Send.a(GetRequest.to(API_SLOTS)));
  const horarios = await body();
  const horario = horarios.slots.find((s: any) => Number(s.id) === SLOT_PRUEBAS);
  if (!horario || cuposAntesCancelar === undefined || Number(horario.available) !== cuposAntesCancelar) {
    throw new Error('La cancelación no restauró los cupos disponibles al valor previo.');
  }
  idReservaCancelar = undefined;
  cuposAntesCancelar = undefined;
});


When('busco un estudiante con un usuario no autorizado', async () => {
  await consultar(
    CUENTAS.e2e1,
    `/students/lookup/?documento=${CUENTAS.e2e2.documento}&actor_email=${encodeURIComponent(CUENTAS.e2e1.email)}`,
  );
});

Then('la respuesta de búsqueda debe ser un error 403', async () => {
  await actor().attemptsTo(Ensure.that(LastResponse.status(), equals(403)));
});

When('busco un estudiante con el documento vacío', async () => {
  await consultar(CUENTAS.entrenador, `/students/lookup/?documento=&actor_email=${encodeURIComponent(CUENTAS.entrenador.email)}`);
});

Then('la respuesta de búsqueda debe ser un error 400', async () => {
  await actor().attemptsTo(Ensure.that(LastResponse.status(), equals(400)));
});

When('busco un estudiante con un documento inexistente', async () => {
  await consultar(CUENTAS.entrenador, `/students/lookup/?documento=9999999999&actor_email=${encodeURIComponent(CUENTAS.entrenador.email)}`);
});

Then('la respuesta de búsqueda debe ser un error 404', async () => {
  await actor().attemptsTo(Ensure.that(LastResponse.status(), equals(404)));
});

Given('que el estudiante E2E tiene una reserva activa', async () => {
  const respuesta = await postReserva(CUENTAS.e2e2, SLOT_PRUEBAS);
  if (!respuesta.id) throw new Error(`No se pudo crear reserva para RF10_C4: ${JSON.stringify(respuesta)}`);
  idReservaBusqueda = String(respuesta.id);
});

When('busco al estudiante E2E con un usuario autorizado', async () => {
  await consultar(
    CUENTAS.entrenador,
    `/students/lookup/?documento=${CUENTAS.e2e2.documento}&actor_email=${encodeURIComponent(CUENTAS.entrenador.email)}`,
  );
});

Then('la respuesta debe incluir la reserva del estudiante', async () => {
  const respuesta = await body();
  try {
    await actor().attemptsTo(Ensure.that(LastResponse.status(), equals(200)));
    if (respuesta.tiene_reserva !== true || !Array.isArray(respuesta.reservas) || respuesta.reservas.length < 1) {
      throw new Error('La búsqueda autorizada no devolvió una reserva activa.');
    }
  } finally {
    if (idReservaBusqueda) {
      await cancelar(CUENTAS.e2e2, idReservaBusqueda);
      idReservaBusqueda = undefined;
    }
  }
});


When('consulto el historial sin proporcionar el correo', async () => {
  await consultar(CUENTAS.e2e1, '/reservations/history/');
});

Then('la respuesta del historial debe ser un error 400', async () => {
  await actor().attemptsTo(Ensure.that(LastResponse.status(), equals(400)));
});

Then('la respuesta del historial debe ser exitosa', async () => {
  await actor().attemptsTo(Ensure.that(LastResponse.status(), equals(200)));
});

When('consulto el historial con un correo válido', async () => {
  await consultar(CUENTAS.e2e1, `/reservations/history/?email=${encodeURIComponent(CUENTAS.e2e1.email)}`);
});

Then('el historial debe devolver una lista de reservas', async () => {
  const historial = await body();
  if (!Array.isArray(historial)) throw new Error('El historial completo debe devolver una lista.');
});

When('consulto el historial de reservas pasadas con un correo válido', async () => {
  await consultar(CUENTAS.e2e1, `/reservations/history/?email=${encodeURIComponent(CUENTAS.e2e1.email)}&solo=pasadas`);
});

Then('el historial debe incluir únicamente reservas pasadas', async () => {
  const historial = await body();
  if (!Array.isArray(historial)) throw new Error('El historial pasado debe ser una lista.');
  if (historial.some((r: any) => r.estado === 'ACTIVA')) {
    throw new Error('El filtro solo=pasadas devolvió una reserva ACTIVA.');
  }
});

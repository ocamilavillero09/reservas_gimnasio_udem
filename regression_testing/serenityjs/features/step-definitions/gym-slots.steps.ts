import { Given, When, Then } from '@cucumber/cucumber';
import { actorCalled } from '@serenity-js/core';
import {GetRequest,PostRequest,DeleteRequest,LastResponse,Send,} from '@serenity-js/rest';
import { Ensure, equals } from '@serenity-js/assertions';
import { execFileSync } from 'node:child_process';

const API = 'http://localhost:8000/api';
const API_SLOTS = `${API}/slots/`;
const API_RESERVAS = `${API}/reservations/`;
const EMAIL_E2E1 = '1@soyudemedellin.edu.co';
const EMAIL_E2E2 = 'es@soyudemedellin.edu.co';
const EMAIL_PENALIZACION = 'prueba.e2e.penalizacion@soyudemedellin.edu.co';
const EMAIL_PENALIZACION_E2E = 'prueba.e2e.penalizacion@soyudemedellin.edu.co';
const EMAIL_ENTRENADOR = '3@udem.edu.co';
const DOCUMENTO_E2E1 = '1111111111';
const DOCUMENTO_E2E2 = '1111111111';
const SLOT_PRUEBAS = 1;
const RESERVA_CANCELADA_SEED = '6ac81dc345b1dd6d13b418da';

function prepararPenalizacion(modo: 'vigente' | 'vencida'): void {
    const script = `
        const email = 'prueba.e2e.penalizacion@soyudemedellin.edu.co';
        const usuario = db.users.findOne({ email });

        if (!usuario) {
            throw new Error('No existe la cuenta E2E de penalización');
        }

        const horas = ${modo === 'vigente' ? '24' : '-24'};

        db.users.updateOne(
            { email },
            {
                $set: {
                    estado: 'PENALIZADO',
                    penalizado_hasta: new Date(Date.now() + horas * 60 * 60 * 1000)
                }
            }
        );

        print('Penalización preparada: ${modo}');
    `;

    execFileSync(
        'docker',
        [
            'compose', 'exec', '-T', 'database',
            'mongosh', 'gym_udem', '--quiet', '--eval', script,
        ],
        { stdio: 'inherit' },
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

async function postReserva(email: string, slotId: number | string): Promise<any> {
    await actor().attemptsTo(
        Send.a(PostRequest.to(API_RESERVAS).with({ email, slotId })),
    );
    return body();
}

// RF06
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
    await actor().attemptsTo(Send.a(PostRequest.to(API_RESERVAS).with({})));
});

Then('la respuesta de la reserva debe ser un error {int}', async (status: number) => {
    await actor().attemptsTo(Ensure.that(LastResponse.status(), equals(status)));
});

When('intento reservar con un correo de estudiante inexistente', async () => {
    await postReserva('estudiante.inexistente.e2e@example.com', SLOT_PRUEBAS);
});

When('intento reservar con un usuario que no es estudiante', async () => {
    await postReserva(EMAIL_ENTRENADOR, SLOT_PRUEBAS);
});


When('intento reservar con un estudiante penalizado', async () => {
    prepararPenalizacion('vigente');
    await postReserva(EMAIL_PENALIZACION, SLOT_PRUEBAS);
});

When('intento reservar con un estudiante cuya penalización ha vencido', async () => {
    prepararPenalizacion('vencida');
    await postReserva(EMAIL_PENALIZACION_E2E, SLOT_PRUEBAS);
});


Then('la respuesta debe indicar que la solicitud continuó después de revisar la penalización', async () => {
    const status = await actor().answer(LastResponse.status());
    const respuesta = await body();
    if (![201, 409].includes(status)) {
        throw new Error(`Se esperaba que el flujo continuara después de revisar la penalización; se recibió HTTP ${status}. Verifica el fixture E2E.`);
    }
    // Si se creó una reserva, eliminarla para no contaminar los escenarios siguientes.
    if (status === 201 && respuesta.id) {
        await actor().attemptsTo(Send.a(DeleteRequest.to(`${API_RESERVAS}${respuesta.id}/`)));
    }
});

When('intento reservar en un horario inexistente', async () => {
    await postReserva(EMAIL_E2E1, 999999);
});

Given('que un estudiante tiene una reserva activa para mañana', async () => {
    const respuesta = await postReserva(EMAIL_E2E1, SLOT_PRUEBAS);
    if (!respuesta.id) {
        throw new Error(`No se pudo crear la reserva previa para RF07_C7: ${JSON.stringify(respuesta)}`);
    }
    idReservaDuplicada = String(respuesta.id);
});

When('intenta reservar nuevamente el mismo día', async () => {
    await postReserva(EMAIL_E2E1, SLOT_PRUEBAS);
});

Then('la respuesta de la reserva debe indicar que existe una reserva duplicada', async () => {
    const respuesta = await body();
    try {
        await actor().attemptsTo(Ensure.that(LastResponse.status(), equals(409)));
        await actor().attemptsTo(Ensure.that(respuesta.tipo, equals('RESERVA_DUPLICADA')));
    } finally {
        if (idReservaDuplicada) {
            await actor().attemptsTo(Send.a(DeleteRequest.to(`${API_RESERVAS}${idReservaDuplicada}/`)));
            idReservaDuplicada = undefined;
        }
    }
});


When('intento reservar en un horario sin cupos disponibles', async () => {
    const respuestaHorarios = await (async () => {
        await actor().attemptsTo(Send.a(GetRequest.to(API_SLOTS)));
        return body();
    })();

    const agotado = respuestaHorarios.slots.find(
        (s: any) => Number(s.available) === 0
    );

    if (!agotado) {
        throw new Error(
            'El escenario necesita preparar un horario con cero cupos antes de reservar.'
        );
    }

    await postReserva(EMAIL_E2E1, agotado.id);
});

Then('la respuesta de la reserva debe indicar que no hay cupos', async () => {
    const respuesta = await body();
    await actor().attemptsTo(Ensure.that(LastResponse.status(), equals(409)));
    await actor().attemptsTo(Ensure.that(respuesta.tipo, equals('SIN_CUPOS')));
});

When('realizo una reserva válida', async () => {
    await postReserva(EMAIL_E2E2, SLOT_PRUEBAS);
});

Then('la reserva debe crearse correctamente', async () => {
    const respuesta = await body();
    await actor().attemptsTo(Ensure.that(LastResponse.status(), equals(201)));
    await actor().attemptsTo(Ensure.that(respuesta.tipo, equals('RESERVA_CONFIRMADA')));
    if (!respuesta.id) throw new Error('La respuesta de creación no incluye el id de reserva.');
    // Limpieza para que la ejecución repetida no deje una reserva activa.
    await actor().attemptsTo(Send.a(DeleteRequest.to(`${API_RESERVAS}${respuesta.id}/`)));
});

// RF08
When('consulto mis reservas sin proporcionar el correo', async () => {
    await actor().attemptsTo(Send.a(GetRequest.to(API_RESERVAS)));
});

Then('la respuesta de la consulta de reservas debe ser un error 400', async () => {
    await actor().attemptsTo(Ensure.that(LastResponse.status(), equals(400)));
});

Then('la respuesta de la consulta de reservas debe ser exitosa', async () => {
    await actor().attemptsTo(Ensure.that(LastResponse.status(), equals(200)));
});


When('consulto mis reservas con un correo válido', async () => {
    await actor().attemptsTo(Send.a(GetRequest.to(`${API_RESERVAS}?email=${encodeURIComponent(EMAIL_E2E1)}`)));
});

Then('la consulta debe devolver una lista de reservas', async () => {
    const respuesta = await body();
    if (!Array.isArray(respuesta)) throw new Error('La consulta de reservas debe devolver una lista.');
});

// RF09
When('intento cancelar una reserva con un identificador inválido', async () => {
    await actor().attemptsTo(Send.a(DeleteRequest.to(`${API_RESERVAS}id-invalido/`)));
});

Then('la respuesta de cancelación debe ser un error 400', async () => {
    await actor().attemptsTo(Ensure.that(LastResponse.status(), equals(400)));
});

When('intento cancelar una reserva inexistente', async () => {
    await actor().attemptsTo(Send.a(DeleteRequest.to(`${API_RESERVAS}6f0000000000000000000001/`)));
});

Then('la respuesta de cancelación debe ser un error 404', async () => {
    await actor().attemptsTo(Ensure.that(LastResponse.status(), equals(404)));
});

When('intento cancelar una reserva que ya está cancelada', async () => {
    // Usa el identificador de la reserva cancelada que prepara seed_e2e.js.
    await actor().attemptsTo(Send.a(DeleteRequest.to(`${API_RESERVAS}${RESERVA_CANCELADA_SEED}/`)));
});

Then('la respuesta de cancelación debe ser un error 409', async () => {
    await actor().attemptsTo(Ensure.that(LastResponse.status(), equals(409)));
});

Given('que existe una reserva activa para cancelar', async () => {
    const horarios = await (async () => {
        await actor().attemptsTo(Send.a(GetRequest.to(API_SLOTS)));
        return body();
    })();
    const horario = horarios.slots.find((s: any) => Number(s.id) === SLOT_PRUEBAS && Number(s.available) > 0);
    if (!horario) throw new Error('No hay cupo disponible en el horario de prueba 1.');
    cuposAntesCancelar = Number(horario.available);
    const respuesta = await postReserva(EMAIL_E2E1, SLOT_PRUEBAS);
    if (!respuesta.id) throw new Error(`No se pudo preparar la reserva para cancelar: ${JSON.stringify(respuesta)}`);
    idReservaCancelar = String(respuesta.id);
});

When('cancelo la reserva', async () => {
    if (!idReservaCancelar) throw new Error('No se preparó una reserva para cancelar.');
    await actor().attemptsTo(Send.a(DeleteRequest.to(`${API_RESERVAS}${idReservaCancelar}/`)));
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

// RF10
When('busco un estudiante con un usuario no autorizado', async () => {
    await actor().attemptsTo(Send.a(GetRequest.to(`${API}/students/lookup/?documento=${DOCUMENTO_E2E1}&actor_email=usuario-invalido%40example.com`)));
});

Then('la respuesta de búsqueda debe ser un error 403', async () => {
    await actor().attemptsTo(Ensure.that(LastResponse.status(), equals(403)));
});

When('busco un estudiante con el documento vacío', async () => {
    await actor().attemptsTo(Send.a(GetRequest.to(`${API}/students/lookup/?documento=&actor_email=${encodeURIComponent(EMAIL_ENTRENADOR)}`)));
});

Then('la respuesta de búsqueda debe ser un error 400', async () => {
    await actor().attemptsTo(Ensure.that(LastResponse.status(), equals(400)));
});

When('busco un estudiante con un documento inexistente', async () => {
    await actor().attemptsTo(Send.a(GetRequest.to(`${API}/students/lookup/?documento=9999999999&actor_email=${encodeURIComponent(EMAIL_ENTRENADOR)}`)));
});

Then('la respuesta de búsqueda debe ser un error 404', async () => {
    await actor().attemptsTo(Ensure.that(LastResponse.status(), equals(404)));
});

Given('que el estudiante E2E tiene una reserva activa', async () => {
    const respuesta = await postReserva(EMAIL_E2E2, SLOT_PRUEBAS);
    if (!respuesta.id) throw new Error(`No se pudo crear reserva para RF10_C4: ${JSON.stringify(respuesta)}`);
    idReservaBusqueda = String(respuesta.id);
});

When('busco al estudiante E2E con un usuario autorizado', async () => {
    await actor().attemptsTo(Send.a(GetRequest.to(`${API}/students/lookup/?documento=${DOCUMENTO_E2E2}&actor_email=${encodeURIComponent(EMAIL_ENTRENADOR)}`)));
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
            await actor().attemptsTo(Send.a(DeleteRequest.to(`${API_RESERVAS}${idReservaBusqueda}/`)));
            idReservaBusqueda = undefined;
        }
    }
});

// RF14
When('consulto el historial sin proporcionar el correo', async () => {
    await actor().attemptsTo(Send.a(GetRequest.to(`${API}/reservations/history/`)));
});

Then('la respuesta del historial debe ser un error 400', async () => {
    await actor().attemptsTo(Ensure.that(LastResponse.status(), equals(400)));
});

Then('la respuesta del historial debe ser exitosa', async () => {
    await actor().attemptsTo(Ensure.that(LastResponse.status(), equals(200)));
});

When('consulto el historial con un correo válido', async () => {
    await actor().attemptsTo(Send.a(GetRequest.to(`${API}/reservations/history/?email=${encodeURIComponent(EMAIL_E2E1)}`)));
});

Then('el historial debe devolver una lista de reservas', async () => {
    const historial = await body();
    if (!Array.isArray(historial)) throw new Error('El historial completo debe devolver una lista.');
});

When('consulto el historial de reservas pasadas con un correo válido', async () => {
    await actor().attemptsTo(Send.a(GetRequest.to(`${API}/reservations/history/?email=${encodeURIComponent(EMAIL_E2E1)}&solo=pasadas`)));
});

Then('el historial debe incluir únicamente reservas pasadas', async () => {
    const historial = await body();
    if (!Array.isArray(historial)) throw new Error('El historial pasado debe ser una lista.');
    if (historial.some((r: any) => r.estado === 'ACTIVA')) {
        throw new Error('El filtro solo=pasadas devolvió una reserva ACTIVA.');
    }
});

import { Given, When, Then } from '@cucumber/cucumber';
import { actorCalled } from '@serenity-js/core';
import { GetRequest, PostRequest, DeleteRequest, LastResponse, Send } from '@serenity-js/rest';
import { Ensure, equals } from '@serenity-js/assertions';

const API_URL = 'http://localhost:8000/api/slots/';

When('consulto los horarios del gimnasio', async () => {
    await actorCalled('Estudiante').attemptsTo(
        Send.a(GetRequest.to(API_URL)),
    );
});

Then('la respuesta debe ser exitosa', async () => {
    await actorCalled('Estudiante').attemptsTo(
        Ensure.that(LastResponse.status(), equals(200)),
    );
});

Then('deben aparecer seis horarios', async () => {
    const respuesta = await actorCalled('Estudiante').answer(LastResponse.body());
    await actorCalled('Estudiante').attemptsTo(
        Ensure.that(respuesta.slots.length, equals(6)),
    );
});

Then('cada horario debe informar sus cupos disponibles y totales', async () => {
    const respuesta = await actorCalled('Estudiante').answer(LastResponse.body());

    for (const horario of respuesta.slots) {
        if (typeof horario.available !== 'number' || horario.available < 0) {
            throw new Error('Los cupos disponibles deben ser un número no negativo');
        }

        if (typeof horario.total !== 'number' || horario.total <= 0) {
            throw new Error('El total de cupos debe ser mayor que cero');
        }
    }
});

  
When('intento reservar sin proporcionar los datos obligatorios', async () => {
    await actorCalled('Estudiante').attemptsTo(
        Send.a(
            PostRequest.to('http://localhost:8000/api/reservations/')
                .with({})
        ),
    );
});

Then('la respuesta de la reserva debe ser un error 400', async () => {
    await actorCalled('Estudiante').attemptsTo(
        Ensure.that(LastResponse.status(), equals(400)),
    );
});

  
When('consulto mis reservas sin proporcionar el correo', async () => {
    await actorCalled('Estudiante').attemptsTo(
        Send.a(
            GetRequest.to('http://localhost:8000/api/reservations/'),
        ),
    );
});

Then('la respuesta de la consulta de reservas debe ser un error 400', async () => {
    await actorCalled('Estudiante').attemptsTo(
        Ensure.that(LastResponse.status(), equals(400)),
    );
});

  
When('intento cancelar una reserva con un identificador inválido', async () => {
    await actorCalled('Estudiante').attemptsTo(
        Send.a(
            DeleteRequest.to('http://localhost:8000/api/reservations/id-invalido/'),
        ),
    );
});

Then('la respuesta de cancelación debe ser un error 400', async () => {
    await actorCalled('Estudiante').attemptsTo(
        Ensure.that(LastResponse.status(), equals(400)),
    );
});

  
When('busco un estudiante con un usuario no autorizado', async () => {
    await actorCalled('Estudiante').attemptsTo(
        Send.a(
            GetRequest.to(
                'http://localhost:8000/api/students/lookup/?documento=1001234567&actor_email=usuario-invalido%40example.com'
            ),
        ),
    );
});

Then('la respuesta de búsqueda debe ser un error 403', async () => {
    await actorCalled('Estudiante').attemptsTo(
        Ensure.that(LastResponse.status(), equals(403)),
    );
});


  
When('consulto el historial sin proporcionar el correo', async () => {
    await actorCalled('Estudiante').attemptsTo(
        Send.a(
            GetRequest.to('http://localhost:8000/api/reservations/history/'),
        ),
    );
});

Then('la respuesta del historial debe ser un error 400', async () => {
    await actorCalled('Estudiante').attemptsTo(
        Ensure.that(LastResponse.status(), equals(400)),
    );
});


const API_RESERVAS = 'http://localhost:8000/api/reservations/';
const EMAIL_PRUEBAS = 'es@soyudemedellin.edu.co';
const SLOT_PRUEBAS = 1;

let idReservaDuplicada: string | undefined;
let idReservaCancelar: string | undefined;
let cuposAntesCancelar: number | undefined;

Given('que un estudiante tiene una reserva activa para mañana', async () => {
    const actor = actorCalled('Estudiante');

    await actor.attemptsTo(
        Send.a(
            PostRequest.to(API_RESERVAS).with({
                email: EMAIL_PRUEBAS,
                slotId: SLOT_PRUEBAS,
            }),
        ),
    );

    const respuesta = await actor.answer(LastResponse.body());

    if (respuesta.id === undefined) {
        throw new Error(
            `No se pudo crear la reserva inicial: ${JSON.stringify(respuesta)}`,
        );
    }

    idReservaDuplicada = String(respuesta.id);
});

When('intenta reservar nuevamente el mismo día', async () => {
    await actorCalled('Estudiante').attemptsTo(
        Send.a(
            PostRequest.to(API_RESERVAS).with({
                email: EMAIL_PRUEBAS,
                slotId: SLOT_PRUEBAS,
            }),
        ),
    );
});

Then('la respuesta de la reserva debe indicar que existe una reserva duplicada', async () => {
    const actor = actorCalled('Estudiante');

    try {
        await actor.attemptsTo(
            Ensure.that(LastResponse.status(), equals(409)),
        );

        const respuesta = await actor.answer(LastResponse.body());

        await actor.attemptsTo(
            Ensure.that(respuesta.tipo, equals('RESERVA_DUPLICADA')),
        );
    } finally {
        if (idReservaDuplicada) {
            await actor.attemptsTo(
                Send.a(
                    DeleteRequest.to(
                        `${API_RESERVAS}${idReservaDuplicada}/`,
                    ),
                ),
            );

            idReservaDuplicada = undefined;
        }
    }
});

When('consulto mis reservas con un correo válido', async () => {
    await actorCalled('Estudiante').attemptsTo(
        Send.a(
            GetRequest.to(
                `${API_RESERVAS}?email=${encodeURIComponent(EMAIL_PRUEBAS)}`,
            ),
        ),
    );
});

Then('la respuesta de la consulta de reservas debe ser exitosa', async () => {
    await actorCalled('Estudiante').attemptsTo(
        Ensure.that(LastResponse.status(), equals(200)),
    );
});

Given('que existe una reserva activa para cancelar', async () => {
    const actor = actorCalled('Estudiante');

    const horarios = await actorCalled('Estudiante').attemptsTo(
        Send.a(GetRequest.to(API_URL)),
    );

    const respuestaHorarios = await actor.answer(LastResponse.body());
    const horario = respuestaHorarios.slots.find(
        (slot: { id: number; available: number }) =>
            slot.id === SLOT_PRUEBAS && slot.available > 0,
    );

    if (!horario) {
        throw new Error('No hay cupos disponibles para preparar RF09.');
    }

    cuposAntesCancelar = horario.available;

    await actor.attemptsTo(
        Send.a(
            PostRequest.to(API_RESERVAS).with({
                email: EMAIL_PRUEBAS,
                slotId: SLOT_PRUEBAS,
            }),
        ),
    );

    const respuestaReserva = await actor.answer(LastResponse.body());

    if (respuestaReserva.id === undefined) {
        throw new Error(
            `No se pudo crear la reserva para cancelar: ${JSON.stringify(respuestaReserva)}`,
        );
    }

    idReservaCancelar = String(respuestaReserva.id);
});

When('cancelo la reserva', async () => {
    if (!idReservaCancelar) {
        throw new Error('No existe una reserva preparada para cancelar.');
    }

    await actorCalled('Estudiante').attemptsTo(
        Send.a(
            DeleteRequest.to(`${API_RESERVAS}${idReservaCancelar}/`),
        ),
    );
});

Then('la reserva debe cancelarse y liberarse el cupo', async () => {
    const actor = actorCalled('Estudiante');

    await actor.attemptsTo(
        Ensure.that(LastResponse.status(), equals(200)),
    );

    const respuesta = await actor.answer(LastResponse.body());

    await actor.attemptsTo(
        Ensure.that(respuesta.tipo, equals('RESERVA_CANCELADA')),
    );

    await actor.attemptsTo(
        Send.a(GetRequest.to(API_URL)),
    );

    const horarios = await actor.answer(LastResponse.body());
    const horario = horarios.slots.find(
        (slot: { id: number }) => slot.id === SLOT_PRUEBAS,
    );

    if (
        !horario ||
        cuposAntesCancelar === undefined ||
        horario.available !== cuposAntesCancelar
    ) {
        throw new Error('La cancelación no restauró los cupos originales.');
    }

    idReservaCancelar = undefined;
    cuposAntesCancelar = undefined;
});

When('busco un estudiante con un usuario autorizado', async () => {
    await actorCalled('Estudiante').attemptsTo(
        Send.a(
            GetRequest.to(
                'http://localhost:8000/api/students/lookup/?documento=1111111111&actor_email=3%40udem.edu.co',
            ),
        ),
    );
});

Then('la respuesta debe incluir la reserva del estudiante', async () => {
    const actor = actorCalled('Estudiante');

    await actor.attemptsTo(
        Ensure.that(LastResponse.status(), equals(200)),
    );

    const respuesta = await actor.answer(LastResponse.body());

    if (
        respuesta.tiene_reserva !== true ||
        !Array.isArray(respuesta.reservas) ||
        respuesta.reservas.length === 0
    ) {
        throw new Error('La respuesta no incluye la reserva del estudiante.');
    }
});

When('consulto el historial con un correo válido', async () => {
    await actorCalled('Estudiante').attemptsTo(
        Send.a(
            GetRequest.to(
                `http://localhost:8000/api/reservations/history/?email=${encodeURIComponent(EMAIL_PRUEBAS)}`,
            ),
        ),
    );
});

Then('la respuesta del historial debe ser exitosa', async () => {
    await actorCalled('Estudiante').attemptsTo(
        Ensure.that(LastResponse.status(), equals(200)),
    );

    const historial = await actorCalled('Estudiante').answer(LastResponse.body());

    if (!Array.isArray(historial)) {
        throw new Error('El historial debe devolver una lista de reservas.');
    }
});

Then('no deben aparecer bloques fuera del catálogo', async () => {
    const respuesta = await actorCalled('Estudiante').answer(LastResponse.body());
    const idsPermitidos = new Set([1, 2, 3, 4, 5, 6]);

    for (const horario of respuesta.slots) {
        if (!idsPermitidos.has(horario.id)) {
            throw new Error(
                `El horario ${horario.id} no pertenece al catálogo.`,
            );
        }
    }
});


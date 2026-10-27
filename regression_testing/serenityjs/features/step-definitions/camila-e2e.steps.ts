import { Given, Then, When } from '@cucumber/cucumber';
import { containAtLeastOneItemThat, Ensure, equals, includes, isPresent, not } from '@serenity-js/assertions';
import { actorCalled, actorInTheSpotlight, Duration, Wait } from '@serenity-js/core';
import { Attribute, Click, Enter, isEnabled, isVisible } from '@serenity-js/web';

import { cuentaDe } from '../camila/actors';
import { DejarMensajeEnElBuzon, FijarInasistencias, SembrarReservaDeHoy } from '../camila/interactions';
import * as q from '../camila/questions';
import * as t from '../camila/targets';
import {
  AbrirElBuzon, AbrirElPanel, BorrarElPrimerMensaje, BuscarEstudiante, CerrarLaJornada,
  EnviarSugerencia, IniciarSesion, RegistrarAsistencia,
} from '../camila/tasks';

const espera = (elemento: typeof t.AVISO) => Wait.upTo(Duration.ofSeconds(10)).until(elemento, isVisible());

// ── Preparación ──────────────────────────────────────────────────────────────
Given('que {word} tiene una reserva de hoy a las 06:00', async (nombre: string) => {
  await actorCalled('Preparador').attemptsTo(SembrarReservaDeHoy.para(cuentaDe(nombre).email));
});

Given('que {word} ya acumula {int} inasistencias', async (nombre: string, cantidad: number) => {
  await actorCalled('Preparador').attemptsTo(FijarInasistencias.de(cuentaDe(nombre).email, cantidad));
});

Given('que {word} dejó en el buzón el mensaje {string}', async (nombre: string, mensaje: string) => {
  await actorCalled('Preparador').attemptsTo(DejarMensajeEnElBuzon.de(cuentaDe(nombre), mensaje));
});

Given('que {word} inició sesión en el panel del gimnasio', async (nombre: string) => {
  await actorCalled(nombre).attemptsTo(IniciarSesion.como(cuentaDe(nombre)), AbrirElPanel());
});

Given('que {word} entró a la aplicación', async (nombre: string) => {
  await actorCalled(nombre).attemptsTo(IniciarSesion.como(cuentaDe(nombre)), espera(t.NAV_PERFIL));
});

// ── RF11 ─────────────────────────────────────────────────────────────────────
When('registra la asistencia del estudiante con documento {string}', async (documento: string) => {
  await actorInTheSpotlight().attemptsTo(RegistrarAsistencia.delEstudianteConDocumento(documento));
});

When('busca en el panel al estudiante con documento {string}', async (documento: string) => {
  await actorInTheSpotlight().attemptsTo(BuscarEstudiante.conDocumento(documento));
});

Then('debe ver a {string} en el resultado', async (nombre: string) => {
  await actorInTheSpotlight().attemptsTo(espera(t.RESULTADO_NOMBRE), Ensure.eventually(q.NombreEncontrado(), includes(nombre)));
});

Then('debe ver el aviso de estudiante sin reserva {string}', async (texto: string) => {
  await actorInTheSpotlight().attemptsTo(
    Ensure.eventually(q.AvisoSinReserva(), includes(texto)),
    Ensure.that(t.REGISTRAR_ASISTENCIA, not(isPresent())),
  );
});

Then('la reserva de {word} debe quedar {string}', async (nombre: string, estado: string) => {
  await actorInTheSpotlight().attemptsTo(Ensure.eventually(q.EstadoDeLaReservaDeHoy.de(cuentaDe(nombre).email), equals(estado)));
});

// ── RF12 ─────────────────────────────────────────────────────────────────────
Then('debe ver {int} reservas sin asistencia', async (cantidad: number) => {
  await actorInTheSpotlight().attemptsTo(Ensure.eventually(t.PENDIENTES_FILAS.count(), equals(cantidad)));
});

Then('no debe quedar ninguna reserva sin asistencia', async () => {
  await actorInTheSpotlight().attemptsTo(Ensure.eventually(t.PENDIENTES_VACIO, isVisible()));
});

Then('el pendiente debe mostrar el documento {string}', async (documento: string) => {
  await actorInTheSpotlight().attemptsTo(Ensure.eventually(q.DocumentoDelPendiente(), includes(documento)));
});

Then('el pendiente debe indicar que le {string}', async (texto: string) => {
  await actorInTheSpotlight().attemptsTo(Ensure.eventually(q.InasistenciasRestantes(), includes(texto)));
});

Then('debe ver el aviso de jornada sin pendientes {string}', async (texto: string) => {
  await actorInTheSpotlight().attemptsTo(Ensure.eventually(q.AvisoSinPendientes(), includes(texto)));
});

// ── RF13 ─────────────────────────────────────────────────────────────────────
When('cierra la jornada y confirma', async () => {
  await actorInTheSpotlight().attemptsTo(Ensure.eventually(t.PENDIENTES_FILAS.count(), equals(1)), CerrarLaJornada.confirmando());
});

When('intenta cerrar la jornada y se arrepiente', async () => {
  await actorInTheSpotlight().attemptsTo(Ensure.eventually(t.PENDIENTES_FILAS.count(), equals(1)), CerrarLaJornada.cancelando());
});

Then('el navegador debió pedir confirmación con {string}', async (texto: string) => {
  await actorInTheSpotlight().attemptsTo(Ensure.eventually(q.MensajeDeConfirmacion(), includes(texto)));
});

Then('{word} debe acumular {int} inasistencias', async (nombre: string, cantidad: number) => {
  await actorInTheSpotlight().attemptsTo(Ensure.eventually(q.InasistenciasAcumuladas.de(cuentaDe(nombre).email), equals(cantidad)));
});

Then('debe ver la nota {string}', async (texto: string) => {
  await actorInTheSpotlight().attemptsTo(Ensure.eventually(q.NotaDeCierre(), includes(texto)));
});

Then('no debe ver el botón para cerrar la jornada', async () => {
  await actorInTheSpotlight().attemptsTo(Ensure.that(t.CERRAR_JORNADA, not(isPresent())));
});

// ── RF16 ─────────────────────────────────────────────────────────────────────
Then('el registro diario debe mostrar {int} asistencias', async (cantidad: number) => {
  await actorInTheSpotlight().attemptsTo(Ensure.eventually(q.TotalDeAsistencias(), equals(String(cantidad))));
});

Then('el registro diario debe mostrar {int} inasistencias', async (cantidad: number) => {
  await actorInTheSpotlight().attemptsTo(Ensure.eventually(q.TotalDeInasistencias(), equals(String(cantidad))));
});

Then('el enlace del PDF debe apuntar a {string}', async (ruta: string) => {
  await actorInTheSpotlight().attemptsTo(
    Ensure.eventually(Attribute.called('href').of(t.ENLACE_PDF), includes(ruta)),
    // Desde la autenticación con token, el enlace lleva la sesión (VUL-01).
    Ensure.eventually(Attribute.called('href').of(t.ENLACE_PDF), includes('token=')),
  );
});

// ── RF20 ─────────────────────────────────────────────────────────────────────
When('envía al administrador el mensaje {string}', async (mensaje: string) => {
  await actorInTheSpotlight().attemptsTo(EnviarSugerencia.conElMensaje(mensaje), espera(t.AVISO));
});

When('abre el formulario de reportes y escribe solo espacios', async () => {
  await actorInTheSpotlight().attemptsTo(Click.on(t.NAV_HISTORIAL), Enter.theValue('    ').into(t.MENSAJE_SUGERENCIA));
});

Then('el botón de enviar debe estar deshabilitado', async () => {
  await actorInTheSpotlight().attemptsTo(Ensure.that(t.ENVIAR_SUGERENCIA, not(isEnabled())));
});

Then('el buzón debe guardar {int} mensajes', async (cantidad: number) => {
  await actorInTheSpotlight().attemptsTo(Ensure.eventually(q.MensajesGuardados(), equals(cantidad)));
});

// ── RF21 ─────────────────────────────────────────────────────────────────────
When('abre el buzón de sugerencias', async () => {
  await actorInTheSpotlight().attemptsTo(AbrirElBuzon());
});

When('{word} inicia sesión y abre el buzón de sugerencias', async (nombre: string) => {
  await actorCalled(nombre).attemptsTo(IniciarSesion.como(cuentaDe(nombre)), AbrirElBuzon());
});

When('borra el primer mensaje y confirma', async () => {
  await actorInTheSpotlight().attemptsTo(BorrarElPrimerMensaje());
});

Then('el buzón debe mostrar {int} mensajes', async (cantidad: number) => {
  await actorInTheSpotlight().attemptsTo(Ensure.eventually(q.ContadorDelBuzon(), equals(String(cantidad))));
});

Then('debe ver en el buzón el mensaje {string}', async (mensaje: string) => {
  await actorInTheSpotlight().attemptsTo(Ensure.eventually(q.MensajesDelBuzon(), containAtLeastOneItemThat(includes(mensaje))));
});

Then('debe ver el aviso de buzón vacío {string}', async (texto: string) => {
  await actorInTheSpotlight().attemptsTo(Ensure.eventually(q.AvisoDeBuzonVacio(), includes(texto)));
});

// ── Común ────────────────────────────────────────────────────────────────────
Then('debe aparecer el aviso {string}', async (texto: string) => {
  await actorInTheSpotlight().attemptsTo(espera(t.AVISO), Ensure.eventually(q.Aviso(), includes(texto)));
});

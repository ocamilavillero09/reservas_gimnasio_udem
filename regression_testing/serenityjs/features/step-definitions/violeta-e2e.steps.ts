import { Given, Then, When } from '@cucumber/cucumber';
import { equals, Ensure, includes, not } from '@serenity-js/assertions';
import { actorCalled, actorInTheSpotlight, Duration, Wait } from '@serenity-js/core';
import { isVisible } from '@serenity-js/web';

import { CUENTAS, estado } from '../violeta/actors';
import * as q from '../violeta/questions';
import * as t from '../violeta/targets';
import { AbrirPerfil, BuscarEstudiante, EditarPerfil, IniciarSesion, RegistrarCuenta } from '../violeta/tasks';

const nombreCuenta = (nombre: string) => nombre.toLowerCase() as keyof typeof CUENTAS;
const espera = (elemento: typeof t.NAV_PERFIL) => Wait.upTo(Duration.ofSeconds(8)).until(elemento, isVisible());

// ── RF01 — Registro ──────────────────────────────────────────────────────────
When('una persona nueva se registra con un correo institucional único', async () => {
  const sufijo = Date.now();
  estado.cuentaNueva = {
    correo: `nueva.e2e.${sufijo}@soyudemedellin.edu.co`,
    documento: String(1_000_000_000 + (sufijo % 9_000_000_000)),
  };
  await actorCalled('Persona nueva').attemptsTo(
    RegistrarCuenta.con('Nueva Persona E2E', estado.cuentaNueva.correo, estado.cuentaNueva.documento),
  );
});

When('una persona intenta registrarse con el correo {string}', async (correo: string) => {
  await actorCalled('Persona externa').attemptsTo(
    RegistrarCuenta.con('Persona Externa', correo, '1234567890'),
    espera(t.LOGIN_AVISO_DOMINIO),
  );
});

Then('debe ver el título {string}', async (texto: string) => {
  await actorInTheSpotlight().attemptsTo(
    espera(t.REGISTRO_EXITOSO),
    Ensure.eventually(q.TituloDeRegistro(), includes(texto)),
  );
});

Then('debe ver el aviso de dominio {string}', async (texto: string) => {
  await actorInTheSpotlight().attemptsTo(Ensure.eventually(q.AvisoDeDominio(), equals(texto)));
});

Then('debe ver un mensaje de error en el formulario', async () => {
  await actorInTheSpotlight().attemptsTo(espera(t.LOGIN_ERROR), Ensure.that(t.LOGIN_ERROR, isVisible()));
});

Then('no debe ver el título de registro exitoso', async () => {
  await actorInTheSpotlight().attemptsTo(Ensure.eventually(t.REGISTRO_EXITOSO, not(isVisible())));
});

// ── RF02 — Inicio de sesión ──────────────────────────────────────────────────
When('Ana inicia sesión con sus credenciales', async () => {
  await actorCalled('Ana').attemptsTo(IniciarSesion.con(CUENTAS.ana.correo, CUENTAS.ana.documento));
});

When('Ana inicia sesión con el documento {string}', async (documento: string) => {
  await actorCalled('Ana').attemptsTo(IniciarSesion.con(CUENTAS.ana.correo, documento));
});

Then('debe ver el botón de perfil', async () => {
  await actorInTheSpotlight().attemptsTo(espera(t.NAV_PERFIL), Ensure.that(t.NAV_PERFIL, isVisible()));
});

Then('no debe ver el botón de enviar del login', async () => {
  await actorInTheSpotlight().attemptsTo(Ensure.eventually(t.LOGIN_ENVIAR, not(isVisible())));
});

Then('no debe ver el botón de perfil', async () => {
  await actorInTheSpotlight().attemptsTo(Ensure.eventually(t.NAV_PERFIL, not(isVisible())));
});

// ── Sesión previa (RF03, RF04, RF05, RF15) ───────────────────────────────────
Given('que {word} inició sesión', async (nombre: string) => {
  const cuenta = CUENTAS[nombreCuenta(nombre)];
  await actorCalled(nombre).attemptsTo(IniciarSesion.con(cuenta.correo, cuenta.documento), espera(t.NAV_PERFIL));
});

When('abre su perfil', async () => {
  await actorInTheSpotlight().attemptsTo(AbrirPerfil(), espera(t.PERFIL_TITULO));
});

// ── RF03 — Perfil del estudiante ─────────────────────────────────────────────
When(
  'actualiza su perfil con edad {string}, peso {string}, altura {string} y objetivo {string}',
  async (edad: string, peso: string, altura: string, meta: string) => {
    await actorInTheSpotlight().attemptsTo(EditarPerfil.con({ edad, peso, altura, meta }));
  },
);

When('actualiza su perfil con edad {string}', async (edad: string) => {
  await actorInTheSpotlight().attemptsTo(EditarPerfil.con({ edad }));
});

Then('debe ver el aviso {string}', async (texto: string) => {
  await actorInTheSpotlight().attemptsTo(espera(t.TOAST_MENSAJE), Ensure.eventually(q.Aviso(), equals(texto)));
});

Then('debe ver un aviso que menciona {string}', async (texto: string) => {
  await actorInTheSpotlight().attemptsTo(espera(t.TOAST_MENSAJE), Ensure.eventually(q.Aviso(), includes(texto)));
});

Then('debe ver el título del perfil {string}', async (texto: string) => {
  await actorInTheSpotlight().attemptsTo(Ensure.eventually(q.TituloDelPerfil(), equals(texto)));
});

// ── RF04 / RF05 — Perfiles de entrenador y administrador ─────────────────────
Then('debe ver el rol {string}', async (rol: string) => {
  await actorInTheSpotlight().attemptsTo(espera(t.PERFIL_ROL), Ensure.eventually(q.RolAsignado(), equals(rol)));
});

Then('debe ver el rol que contiene {string}', async (texto: string) => {
  await actorInTheSpotlight().attemptsTo(
    espera(t.PERFIL_ROL),
    Ensure.eventually(q.RolAsignado(), includes('Administrador')),
    Ensure.eventually(q.RolAsignado(), includes(texto)),
  );
});

Then('debe ver el documento {string}', async (documento: string) => {
  await actorInTheSpotlight().attemptsTo(
    espera(t.PERFIL_DOCUMENTO),
    Ensure.eventually(q.DocumentoDelPerfil(), equals(documento)),
  );
});

Then('no debe ver el campo de edad', async () => {
  await actorInTheSpotlight().attemptsTo(Ensure.eventually(t.PERFIL_EDAD, not(isVisible())));
});

Then('no debe ver el botón de guardar perfil', async () => {
  await actorInTheSpotlight().attemptsTo(Ensure.eventually(t.PERFIL_GUARDAR, not(isVisible())));
});

Then('debe ver el botón de usuarios', async () => {
  await actorInTheSpotlight().attemptsTo(espera(t.NAV_USUARIOS), Ensure.that(t.NAV_USUARIOS, isVisible()));
});

// ── RF15 — Reporte de inasistencias ──────────────────────────────────────────
Then('debe ver el reporte de inasistencias', async () => {
  await actorInTheSpotlight().attemptsTo(espera(t.REPORTE_TITULO), Ensure.that(t.REPORTE_TITULO, isVisible()));
});

Then('el contador de inasistencias debe ser {string}', async (cantidad: string) => {
  await actorInTheSpotlight().attemptsTo(
    espera(t.REPORTE_INASISTENCIAS),
    Ensure.eventually(q.InasistenciasDelReporte(), equals(cantidad)),
  );
});

Then('no debe ver el aviso de penalización', async () => {
  await actorInTheSpotlight().attemptsTo(Ensure.eventually(t.REPORTE_AVISO_PENALIZADA, not(isVisible())));
});

Then('debe ver el aviso de penalización que contiene {string}', async (texto: string) => {
  await actorInTheSpotlight().attemptsTo(
    espera(t.REPORTE_AVISO_PENALIZADA),
    Ensure.eventually(q.AvisoDePenalizacion(), includes(texto)),
  );
});

When('busca al estudiante con documento {string}', async (documento: string) => {
  await actorInTheSpotlight().attemptsTo(BuscarEstudiante.conDocumento(documento), espera(t.BUSCAR_RESULTADO_ESTADO));
});

Then('debe ver el nombre encontrado {string}', async (nombre: string) => {
  await actorInTheSpotlight().attemptsTo(Ensure.eventually(q.NombreEncontrado(), equals(nombre)));
});

Then('debe ver el estado encontrado {string}', async (estadoEsperado: string) => {
  await actorInTheSpotlight().attemptsTo(Ensure.eventually(q.EstadoEncontrado(), equals(estadoEsperado)));
});

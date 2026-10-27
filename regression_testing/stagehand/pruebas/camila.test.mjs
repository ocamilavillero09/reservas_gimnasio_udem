// Pruebas con Stagehand sobre RF11, RF12, RF13, RF16, RF20 y RF21.
//
// Cada caso usa las tres capacidades de Stagehand:
//   observe()  localiza elementos y devuelve selectores reales (sin hacer nada);
//   act()      ejecuta una acción descrita en lenguaje natural;
//   extract()  lee datos de la página y los valida con un esquema de zod.
// Las aserciones se hacen sobre lo extraído y, además, sobre la base de datos:
// que el modelo "crea" que algo pasó no basta.
import assert from 'node:assert/strict';
import { after, before, beforeEach, describe, it } from 'node:test';

import { z } from 'zod/v4';

import {
  abrirNavegador, aceptarConfirmaciones, confirmacionesMostradas, contarSugerencias, CUENTAS,
  dejarMensaje, evidencia, iniciarSesion, leerReserva, leerUsuario, prepararBase,
  registrarResultado, sembrarReservaDeHoy,
} from '../soporte.mjs';

const { entrenador, estudiante, admin } = CUENTAS;

const PENDIENTES = z.object({
  pendientes: z.array(z.object({
    nombre: z.string(),
    documento: z.string(),
    bloque: z.string().describe('hora del bloque reservado, por ejemplo 06:00'),
  })),
});

const AVISO = z.object({ mensaje: z.string().describe('texto del aviso emergente que acaba de aparecer') });

const TOTALES = z.object({
  asistencias: z.number(),
  cancelaciones: z.number(),
  inasistencias: z.number(),
  penalizados: z.number().describe('Estudiantes penalizados'),
});

describe('Stagehand — panel del entrenador (RF11, RF12, RF13, RF16)', () => {
  let s;
  before(async () => { s = await abrirNavegador(); });
  after(async () => { await s?.cerrar(); });
  beforeEach(async () => { await prepararBase(); });

  it('SH-RF12-RF11 · Extrae el pendiente, registra su asistencia y el registro diario la cuenta', async () => {
    await sembrarReservaDeHoy(estudiante.email);
    await iniciarSesion(s, entrenador);

    // RF12 — extract: la tabla de reservas sin asistencia.
    const { data: antes } = await s.stagehand.extract(
      'extract every student listed in the "Sin asistencia registrada" table', PENDIENTES);
    assert.equal(antes.pendientes.length, 1);
    assert.match(antes.pendientes[0].nombre, /Laura/);
    assert.equal(antes.pendientes[0].documento, estudiante.documento);
    await evidencia(s.page, 'SH-RF12-01-pendiente');

    // RF11 — act: buscar por documento y registrar.
    await s.stagehand.act(`type "${estudiante.documento}" into the student identity document search field`);
    await s.stagehand.act('click the "Buscar" button');
    const { data: boton } = await s.stagehand.observe('find the "Registrar asistencia" button of the search result');
    assert.ok(boton.length > 0, 'observe debe encontrar el botón de registrar asistencia');
    await s.stagehand.act('click the "Registrar asistencia" button of the search result');

    const { data: aviso } = await s.stagehand.extract('extract the notification message shown at the top right', AVISO);
    assert.match(aviso.mensaje, /Asistencia registrada/);
    assert.equal((await leerReserva(estudiante.email)).estado, 'COMPLETADA');

    // RF16 — extract: los cuatro totales del registro diario.
    const { data: totales } = await s.stagehand.extract(
      'extract the four totals of the "Reporte general diario" card', TOTALES);
    assert.equal(totales.asistencias, 1);
    assert.equal(totales.inasistencias, 0);
    await evidencia(s.page, 'SH-RF11-RF16-registrada');

    registrarResultado('SH-RF12-RF11', { pendientesAntes: antes, observeBoton: boton, aviso, totales });
  });

  it('SH-RF11-02 · Un documento inexistente muestra el error del servidor', async () => {
    await iniciarSesion(s, entrenador);
    await s.stagehand.act('type "9999999999" into the student identity document search field');
    await s.stagehand.act('click the "Buscar" button');
    const { data: aviso } = await s.stagehand.extract('extract the error notification message', AVISO);
    assert.match(aviso.mensaje, /9999999999/);
    await evidencia(s.page, 'SH-RF11-02-inexistente');
    registrarResultado('SH-RF11-02', { aviso });
  });

  it('SH-RF13 · Cierra la jornada: confirma, procesa la inasistencia y la suma al registro', async () => {
    await sembrarReservaDeHoy(estudiante.email);
    await iniciarSesion(s, entrenador);
    await aceptarConfirmaciones(s.page);

    const { data: cerrar } = await s.stagehand.observe('find the "Cerrar jornada" button');
    assert.ok(cerrar.length > 0, 'observe debe encontrar el botón Cerrar jornada');
    await s.stagehand.act('click the "Cerrar jornada" button');

    const confirmaciones = await confirmacionesMostradas(s.page);
    assert.match(confirmaciones[0] ?? '', /Se marcarán 1 inasistencias/);
    const { data: aviso } = await s.stagehand.extract('extract the notification message shown at the top right', AVISO);
    assert.match(aviso.mensaje, /Se procesaron 1 inasistencias/);
    assert.equal((await leerUsuario(estudiante.email)).no_show_count, 1);

    const { data: totales } = await s.stagehand.extract(
      'extract the four totals of the "Reporte general diario" card', TOTALES);
    assert.equal(totales.inasistencias, 1);
    await evidencia(s.page, 'SH-RF13-cerrada');
    registrarResultado('SH-RF13', { observeCerrar: cerrar, confirmaciones, aviso, totales });
  });
});

describe('Stagehand — buzón de sugerencias (RF20, RF21)', () => {
  let s;
  before(async () => { s = await abrirNavegador(); });
  after(async () => { await s?.cerrar(); });
  beforeEach(async () => { await prepararBase(); });

  it('SH-RF20 · La estudiante envía un reporte y queda guardado', async () => {
    await iniciarSesion(s, estudiante);
    await s.stagehand.act('click the "Historial" button in the navigation bar');
    const { data: enviar } = await s.stagehand.observe('find the "Enviar al administrador" button');
    assert.ok(enviar.length > 0);
    await s.stagehand.act('type "El bloque de las 06:00 no se ve en el celular." into the report message field');
    await s.stagehand.act('click the "Enviar al administrador" button');

    const { data: aviso } = await s.stagehand.extract('extract the notification message shown at the top right', AVISO);
    assert.match(aviso.mensaje, /llegó al administrador/);
    assert.equal(await contarSugerencias(), 1);
    await evidencia(s.page, 'SH-RF20-enviado');
    registrarResultado('SH-RF20', { observeEnviar: enviar, aviso });
  });

  it('SH-RF21 · La administradora extrae el mensaje del buzón y lo borra', async () => {
    await dejarMensaje(estudiante, 'No carga el historial.');
    await iniciarSesion(s, admin);
    await aceptarConfirmaciones(s.page);
    await s.stagehand.act('click the "Usuarios" button in the navigation bar');

    const { data: buzon } = await s.stagehand.extract(
      'extract every message of the "Buzón de sugerencias" card',
      z.object({ mensajes: z.array(z.object({ autor: z.string(), correo: z.string(), texto: z.string() })) }),
    );
    assert.equal(buzon.mensajes.length, 1);
    assert.equal(buzon.mensajes[0].correo, estudiante.email);
    assert.match(buzon.mensajes[0].texto, /No carga el historial/);
    await evidencia(s.page, 'SH-RF21-01-buzon');

    await s.stagehand.act('click the "Borrar" button of the message');
    const confirmaciones = await confirmacionesMostradas(s.page);
    assert.match(confirmaciones[0] ?? '', /No se puede deshacer/);
    const { data: aviso } = await s.stagehand.extract('extract the notification message shown at the top right', AVISO);
    assert.match(aviso.mensaje, /Mensaje borrado/);
    assert.equal(await contarSugerencias(), 0);
    await evidencia(s.page, 'SH-RF21-02-borrado');
    registrarResultado('SH-RF21', { buzon, confirmaciones, aviso });
  });
});

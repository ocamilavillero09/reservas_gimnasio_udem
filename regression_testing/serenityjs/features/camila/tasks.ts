import { Duration, Task, Wait } from '@serenity-js/core';
import { Click, Enter, isVisible, ModalDialog, Navigate } from '@serenity-js/web';

import { Cuenta } from './interactions';
import * as t from './targets';

const esperar = (elemento: typeof t.PANEL_TITULO) =>
  Wait.upTo(Duration.ofSeconds(10)).until(elemento, isVisible());

export const IniciarSesion = {
  como: (cuenta: Cuenta) =>
    Task.where(
      `#actor inicia sesión como ${cuenta.email}`,
      Navigate.to(t.URL_FRONT),
      Enter.theValue(cuenta.email).into(t.LOGIN_CORREO),
      Enter.theValue(cuenta.documento).into(t.LOGIN_DOCUMENTO),
      Click.on(t.LOGIN_ENVIAR),
    ),
};

export const AbrirElPanel = () =>
  Task.where('#actor abre el panel del gimnasio', esperar(t.NAV_PANEL), Click.on(t.NAV_PANEL), esperar(t.PANEL_TITULO));

// RF11
export const BuscarEstudiante = {
  conDocumento: (documento: string) =>
    Task.where(
      `#actor busca al estudiante con documento ${documento}`,
      Enter.theValue(documento).into(t.BUSCAR_DOCUMENTO),
      Click.on(t.BUSCAR_BOTON),
    ),
};

export const RegistrarAsistencia = {
  delEstudianteConDocumento: (documento: string) =>
    Task.where(
      `#actor registra la asistencia del estudiante con documento ${documento}`,
      BuscarEstudiante.conDocumento(documento),
      esperar(t.REGISTRAR_ASISTENCIA),
      Click.on(t.REGISTRAR_ASISTENCIA),
    ),
};

// RF13 — La interfaz pide confirmación con un diálogo del navegador.
export const CerrarLaJornada = {
  confirmando: () =>
    Task.where('#actor cierra la jornada y confirma', ModalDialog.acceptNext(), Click.on(t.CERRAR_JORNADA)),
  cancelando: () =>
    Task.where('#actor intenta cerrar la jornada y se arrepiente', ModalDialog.dismissNext(), Click.on(t.CERRAR_JORNADA)),
};

// RF20
export const EnviarSugerencia = {
  conElMensaje: (mensaje: string) =>
    Task.where(
      `#actor envía al administrador el mensaje "${mensaje}"`,
      esperar(t.NAV_HISTORIAL),
      Click.on(t.NAV_HISTORIAL),
      Enter.theValue(mensaje).into(t.MENSAJE_SUGERENCIA),
      Click.on(t.ENVIAR_SUGERENCIA),
    ),
};

// RF21
export const AbrirElBuzon = () =>
  Task.where('#actor abre el buzón de sugerencias', esperar(t.NAV_USUARIOS), Click.on(t.NAV_USUARIOS), esperar(t.BUZON_TOTAL));

export const BorrarElPrimerMensaje = () =>
  Task.where('#actor borra el primer mensaje del buzón y confirma', ModalDialog.acceptNext(), Click.on(t.BUZON_BORRAR));

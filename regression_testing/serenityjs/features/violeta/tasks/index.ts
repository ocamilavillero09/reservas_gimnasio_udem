import { Task } from '@serenity-js/core';
import { Click, Enter, Navigate } from '@serenity-js/web';

import * as t from '../targets';

export const IniciarSesion = {
  con: (correo: string, documento: string) =>
    Task.where(
      `#actor inicia sesión con ${correo}`,
      Navigate.to(t.URL_FRONT),
      Enter.theValue(correo).into(t.LOGIN_CORREO),
      Enter.theValue(documento).into(t.LOGIN_DOCUMENTO),
      Click.on(t.LOGIN_ENVIAR),
    ),
};

export const RegistrarCuenta = {
  con: (nombre: string, correo: string, documento: string) =>
    Task.where(
      `#actor intenta registrar la cuenta ${correo}`,
      Navigate.to(t.URL_FRONT),
      Click.on(t.TAB_REGISTER),
      Enter.theValue(nombre).into(t.LOGIN_NOMBRE),
      Enter.theValue(correo).into(t.LOGIN_CORREO),
      Enter.theValue(documento).into(t.LOGIN_DOCUMENTO),
      Click.on(t.LOGIN_ENVIAR),
    ),
};

export interface DatosPerfil {
  edad?: string;
  peso?: string;
  altura?: string;
  meta?: string;
}

export const EditarPerfil = {
  con: (datos: DatosPerfil) => {
    const campos: Array<[typeof t.PERFIL_EDAD, string | undefined]> = [
      [t.PERFIL_EDAD, datos.edad],
      [t.PERFIL_PESO, datos.peso],
      [t.PERFIL_ALTURA, datos.altura],
      [t.PERFIL_META, datos.meta],
    ];

    return Task.where(
      '#actor edita su perfil y lo guarda',
      Click.on(t.NAV_PERFIL),
      ...campos
        .filter(([, valor]) => valor !== undefined)
        .map(([campo, valor]) => Enter.theValue(valor as string).into(campo)),
      Click.on(t.PERFIL_GUARDAR),
    );
  },
};

export const AbrirPerfil = () => Task.where('#actor abre su perfil', Click.on(t.NAV_PERFIL));

export const BuscarEstudiante = {
  conDocumento: (documento: string) =>
    Task.where(
      `#actor busca al estudiante con documento ${documento}`,
      Enter.theValue(documento).into(t.BUSCAR_DOCUMENTO),
      Click.on(t.BUSCAR_BOTON),
    ),
};

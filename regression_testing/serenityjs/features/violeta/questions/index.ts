import { Text } from '@serenity-js/web';

import * as t from '../targets';

export const Aviso = () => Text.of(t.TOAST_MENSAJE);
export const AvisoDeDominio = () => Text.of(t.LOGIN_AVISO_DOMINIO);
export const TituloDelPerfil = () => Text.of(t.PERFIL_TITULO);
export const RolAsignado = () => Text.of(t.PERFIL_ROL);
export const DocumentoDelPerfil = () => Text.of(t.PERFIL_DOCUMENTO);
export const InasistenciasDelReporte = () => Text.of(t.REPORTE_INASISTENCIAS);
export const AvisoDePenalizacion = () => Text.of(t.REPORTE_AVISO_PENALIZADA);
export const NombreEncontrado = () => Text.of(t.BUSCAR_RESULTADO_NOMBRE);
export const EstadoEncontrado = () => Text.of(t.BUSCAR_RESULTADO_ESTADO);
export const TituloDeRegistro = () => Text.of(t.REGISTRO_EXITOSO);

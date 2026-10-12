import { By, PageElement } from '@serenity-js/web';

export const URL_FRONT = 'http://localhost:5173';

const porId = (descripcion: string, id: string) =>
  PageElement.located(By.id(id)).describedAs(descripcion);

const porXpath = (descripcion: string, xpath: string) =>
  PageElement.located(By.xpath(xpath)).describedAs(descripcion);

const CAMPO_BUSQUEDA = "//input[@placeholder='Documento de identidad del estudiante']";

// Login / registro
export const TAB_REGISTER = porId('pestaña Registrarse', 'tab-register');
export const LOGIN_NOMBRE = porId('campo nombre', 'login-nombre');
export const LOGIN_CORREO = porId('campo correo', 'login-correo');
export const LOGIN_DOCUMENTO = porId('campo documento (contraseña)', 'login-documento');
export const LOGIN_ENVIAR = porId('botón enviar', 'login-enviar');
export const LOGIN_AVISO_DOMINIO = porId('aviso de dominio', 'login-aviso-dominio');
export const LOGIN_ERROR = porId('mensaje de error del login', 'login-error');
export const REGISTRO_EXITOSO = porId('título de registro exitoso', 'registro-exitoso');

// Navegación, avisos y perfil
export const NAV_PERFIL = porId('botón Perfil', 'nav-perfil');
export const TOAST_MENSAJE = porId('mensaje del aviso', 'toast-mensaje');
export const PERFIL_TITULO = porId('título del perfil', 'perfil-titulo');
export const PERFIL_EDAD = porId('campo edad', 'perfil-edad');
export const PERFIL_PESO = porId('campo peso', 'perfil-peso');
export const PERFIL_ALTURA = porId('campo altura', 'perfil-altura');
export const PERFIL_META = porId('campo objetivo', 'perfil-meta');
export const PERFIL_GUARDAR = porId('botón guardar perfil', 'perfil-guardar');

// Sin id en el frontend: XPath por texto visible
export const NAV_USUARIOS = porXpath('botón Usuarios', "//nav//button[normalize-space()='Usuarios']");
export const PERFIL_ROL = porXpath('rol asignado', "//span[text()='Rol asignado']/following-sibling::span");
export const PERFIL_DOCUMENTO = porXpath(
  'documento de identidad',
  "//span[text()='Documento de identidad']/following-sibling::span",
);

// RF15
export const REPORTE_TITULO = porXpath(
  'título del reporte de inasistencias',
  "//h3[contains(.,'Mis inasistencias y penalizaciones')]",
);
export const REPORTE_INASISTENCIAS = porXpath(
  'contador de inasistencias',
  "//p[normalize-space()='Inasistencias']/preceding-sibling::p",
);
export const REPORTE_AVISO_PENALIZADA = porXpath(
  'aviso de cuenta penalizada',
  "//strong[normalize-space()='PENALIZADA']/..",
);
export const BUSCAR_DOCUMENTO = porXpath('campo documento del estudiante', CAMPO_BUSQUEDA);
export const BUSCAR_BOTON = porXpath('botón Buscar', "//button[normalize-space()='Buscar']");
export const BUSCAR_RESULTADO_NOMBRE = porXpath(
  'nombre del estudiante encontrado',
  `(${CAMPO_BUSQUEDA}/ancestor::form/following-sibling::div//p)[1]`,
);
export const BUSCAR_RESULTADO_ESTADO = porXpath(
  'estado del estudiante encontrado',
  `(${CAMPO_BUSQUEDA}/ancestor::form/following-sibling::div//span)[1]`,
);

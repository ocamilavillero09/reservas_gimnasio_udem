from screenpy_selenium import Target
from selenium.webdriver.common.by import By

URL_FRONT = "http://localhost:5173"


def _id(descripcion: str, id_: str) -> Target:
    return Target.the(descripcion).located_by((By.ID, id_))


def _xpath(descripcion: str, xpath: str) -> Target:
    return Target.the(descripcion).located_by((By.XPATH, xpath))


# ── Login / registro (con id) ──────────────────────────────────────────────
TAB_LOGIN = _id("pestaña Iniciar sesión", "tab-login")
TAB_REGISTER = _id("pestaña Registrarse", "tab-register")
LOGIN_NOMBRE = _id("campo nombre", "login-nombre")
LOGIN_CORREO = _id("campo correo", "login-correo")
LOGIN_DOCUMENTO = _id("campo documento (contraseña)", "login-documento")
LOGIN_ENVIAR = _id("botón enviar", "login-enviar")
LOGIN_AVISO_DOMINIO = _id("aviso de dominio", "login-aviso-dominio")
LOGIN_ERROR = _id("mensaje de error del login", "login-error")
REGISTRO_EXITOSO = _id("título de registro exitoso", "registro-exitoso")

# ── Navegación, avisos y paneles (con id) ──────────────────────────────────
NAV_PERFIL = _id("botón Perfil", "nav-perfil")
TOAST_MENSAJE = _id("mensaje del aviso", "toast-mensaje")
PANEL_TITULO = _id("título del panel", "panel-titulo")
PERFIL_TITULO = _id("título del perfil", "perfil-titulo")
PERFIL_EDAD = _id("campo edad", "perfil-edad")
PERFIL_PESO = _id("campo peso", "perfil-peso")
PERFIL_ALTURA = _id("campo altura", "perfil-altura")
PERFIL_META = _id("campo objetivo", "perfil-meta")
PERFIL_GUARDAR = _id("botón guardar perfil", "perfil-guardar")

# ── Sin id en el frontend: XPath por texto visible ─────────────────────────
NAV_USUARIOS = _xpath("botón Usuarios", "//nav//button[normalize-space()='Usuarios']")
PERFIL_ROL = _xpath(
    "rol asignado", "//span[text()='Rol asignado']/following-sibling::span"
)
PERFIL_DOCUMENTO = _xpath(
    "documento de identidad",
    "//span[text()='Documento de identidad']/following-sibling::span",
)
# RF15 — reporte de inasistencias del propio estudiante
REPORTE_TITULO = _xpath(
    "título del reporte de inasistencias",
    "//h3[contains(.,'Mis inasistencias y penalizaciones')]",
)
REPORTE_INASISTENCIAS = _xpath(
    "contador de inasistencias",
    "//p[normalize-space()='Inasistencias']/preceding-sibling::p",
)
REPORTE_LIMITE = _xpath(
    "límite de inasistencias",
    "//p[normalize-space()='Inasistencias']/following-sibling::p",
)
REPORTE_AVISO_PENALIZADA = _xpath(
    "aviso de cuenta penalizada", "//strong[normalize-space()='PENALIZADA']/.."
)
# Búsqueda del entrenador por documento
BUSCAR_DOCUMENTO = _xpath(
    "campo documento del estudiante",
    "//input[@placeholder='Documento de identidad del estudiante']",
)
BUSCAR_BOTON = _xpath("botón Buscar", "//button[normalize-space()='Buscar']")
BUSCAR_RESULTADO_NOMBRE = _xpath(
    "nombre del estudiante encontrado",
    "//input[@placeholder='Documento de identidad del estudiante']"
    "/ancestor::form/following-sibling::div//p[1]",
)
BUSCAR_RESULTADO_ESTADO = _xpath(
    "estado del estudiante encontrado",
    "//input[@placeholder='Documento de identidad del estudiante']"
    "/ancestor::form/following-sibling::div//span[1]",
)

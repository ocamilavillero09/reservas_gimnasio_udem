"""Genera MATRIZ_DE_PRUEBAS.md a partir de los informes HTML de Cypress.

Por cada prueba deja su objetivo, el resultado esperado, el resultado obtenido
en la última ejecución y la evidencia (informe, captura y video).

Uso, desde la raíz del repositorio y después de correr las pruebas:
    python regression_testing/cypress/generar_matriz.py
"""
import glob
import html
import json
import os
import re
from urllib.parse import quote
from datetime import datetime

RAIZ = os.path.dirname(os.path.abspath(__file__))

# Objetivo y resultado esperado de cada caso, por su identificador.
CASOS = {
    # ── RF11 — Registrar asistencia ─────────────────────────────────────────
    'API-RF11-01': ('Verificar que el entrenador encuentre por documento la reserva del día.', '200; tiene_reserva = true y la reserva viene marcada es_de_hoy = true.'),
    'API-RF11-02': ('Verificar la búsqueda de un estudiante sin reservas.', '200; tiene_reserva = false y lista de reservas vacía.'),
    'API-RF11-03': ('Verificar el manejo de un documento inexistente.', '404 con un mensaje que incluye el documento buscado.'),
    'API-RF11-04': ('Verificar que un estudiante no consulte reservas de otros.', '403.'),
    'API-RF11-05': ('Verificar la validación del documento obligatorio en la búsqueda.', '400.'),
    'API-RF11-06': ('Verificar el registro de asistencia por id de reserva.', '200; la reserva pasa a COMPLETADA y guarda quién la registró.'),
    'API-RF11-07': ('Verificar el registro de asistencia por documento.', '200.'),
    'API-RF11-08': ('Verificar que el administrador también pueda registrar asistencias.', '200.'),
    'API-RF11-09': ('Verificar que un estudiante no pueda registrar asistencias.', '403 y la reserva sigue ACTIVA.'),
    'API-RF11-10': ('Verificar el rechazo de un actor que no existe.', '403.'),
    'API-RF11-11': ('Verificar la validación del formato del id de reserva.', '400.'),
    'API-RF11-12': ('Verificar que se exija documento o id de reserva.', '400.'),
    'API-RF11-13': ('Verificar el caso de un estudiante sin reserva activa hoy.', '404 "no tiene una reserva activa".'),
    'API-RF11-14': ('Verificar la regla RN12 para reservas futuras.', '409 "todavía no llega" y la reserva sigue ACTIVA.'),
    'API-RF11-15': ('Verificar la regla RN12 para reservas pasadas.', '409 "ya pasó".'),
    'API-RF11-16': ('Verificar que una asistencia no se registre dos veces.', 'Primer intento 200; segundo intento rechazado (404/409).'),
    'COMP-RF11-01': ('Verificar los parámetros que envía la búsqueda.', 'La petición lleva el documento sin espacios y el correo del entrenador; se pinta la tarjeta del estudiante con "HOY".'),
    'COMP-RF11-02': ('Verificar el indicador visual del estado PENALIZADO.', 'La etiqueta PENALIZADO se pinta en rojo (rgb(153, 27, 27)).'),
    'COMP-RF11-03': ('Verificar el envío y la retroalimentación al registrar.', 'Envía {actor_email, reservation_id}; aviso de éxito; limpia campo y resultado; notifica al padre.'),
    'COMP-RF11-04': ('Verificar el manejo de errores de la búsqueda.', 'Muestra el mensaje del servidor como aviso de tipo error.'),
    'COMP-RF11-05': ('Verificar la vista de un estudiante sin reserva.', 'Advertencia visible y ningún botón "Registrar asistencia".'),
    'COMP-RF11-06': ('Verificar que el documento sea obligatorio en el formulario.', 'El navegador marca el campo como requerido y no se llama a la API.'),
    'E2E-RF11-01': ('Validar el recorrido completo de registro de asistencia.', 'Encuentra al estudiante, registra, muestra la confirmación y actualiza pendientes y registro diario.'),
    'E2E-RF11-02': ('Validar el registro desde la tabla de pendientes.', 'Confirmación visible y la fila desaparece.'),
    'E2E-RF11-03': ('Validar el mensaje ante un documento inexistente.', 'Se muestra el error del servidor con el documento.'),
    'E2E-RF11-04': ('Validar la vista de un estudiante sin reserva activa.', 'Advertencia y sin botón de registro.'),
    'E2E-RF11-05': ('Validar el rechazo de una reserva de mañana desde la interfaz.', 'Se muestra "todavía no llega" y la reserva sigue ACTIVA en la base de datos.'),
    # ── RF12 — Reservas sin asistencia ──────────────────────────────────────
    'API-RF12-01': ('Verificar la respuesta sin pendientes.', '200; total 0, lista vacía y límite de inasistencias 5.'),
    'API-RF12-02': ('Verificar qué fechas entran en pendientes.', 'Incluye las de hoy y ayer (ordenadas de la más antigua), excluye las de mañana.'),
    'API-RF12-03': ('Verificar los datos de cada fila.', 'Nombre, documento, no_show_count = 3 e inasistencias_restantes = 2.'),
    'API-RF12-04': ('Verificar que solo cuenten reservas ACTIVAS.', 'Las COMPLETADAS y CANCELADAS no aparecen (total 0).'),
    'API-RF12-05': ('Verificar la integración RF11 → RF12.', 'Tras registrar la asistencia, el total pasa de 1 a 0.'),
    'API-RF12-06': ('Verificar el acceso del administrador.', '200.'),
    'API-RF12-07': ('Verificar el bloqueo a estudiantes.', '403.'),
    'API-RF12-08': ('Verificar el bloqueo sin actor.', '403.'),
    'COMP-RF12-01': ('Verificar el pintado de la tabla de pendientes.', 'Una fila con nombre, documento, bloque y "faltan 3"; texto del límite de 5.'),
    'COMP-RF12-02': ('Verificar la acción "Asistió" de cada fila.', 'Envía el id de reserva de esa fila.'),
    'E2E-RF12-01': ('Validar el estado vacío del panel.', 'Mensaje "No hay estudiantes pendientes".'),
    'E2E-RF12-02': ('Validar la tabla con datos reales.', 'Una fila con el estudiante, su documento, 06:00 y "faltan 3".'),
    # ── RF13 — Procesar inasistencias ───────────────────────────────────────
    'API-RF13-01': ('Verificar el cierre de jornada sin pendientes.', '200; 0 procesadas y mensaje "No había inasistencias pendientes".'),
    'API-RF13-02': ('Verificar el procesamiento de pendientes de hoy y de días anteriores.', 'Ambas reservas pasan a NO_SHOW y cada estudiante suma 1 inasistencia.'),
    'API-RF13-03': ('Verificar la penalización al llegar al límite (RN08).', 'Con la 5.ª inasistencia el estudiante queda PENALIZADO con fecha de fin.'),
    'API-RF13-04': ('Verificar que no se penalice antes del límite.', 'Con 4 inasistencias el estado sigue ACTIVO.'),
    'API-RF13-05': ('Verificar que no se procesen reservas que no corresponden.', 'Las de mañana siguen ACTIVAS y las COMPLETADAS no cambian.'),
    'API-RF13-06': ('Verificar que cerrar dos veces no cuente doble.', 'Segunda ejecución procesa 0 y el contador queda en 1.'),
    'API-RF13-07': ('Verificar que solo el entrenador cierre la jornada.', 'Administrador recibe 403 y la reserva sigue ACTIVA.'),
    'API-RF13-08': ('Verificar el bloqueo a estudiantes.', '403.'),
    'COMP-RF13-01': ('Verificar el cierre sin pendientes en la interfaz.', 'Aviso informativo y ninguna llamada a la API.'),
    'COMP-RF13-02': ('Verificar que cancelar la confirmación no procese.', 'Ninguna llamada a la API.'),
    'COMP-RF13-03': ('Verificar el estado de carga y el aviso con penalizados.', 'Botón "Procesando..." deshabilitado; aviso de advertencia; botón vuelve a habilitarse.'),
    'COMP-RF13-04': ('Verificar que el administrador no vea el cierre de jornada.', 'Sin botón "Cerrar jornada" y con el texto de supervisión.'),
    'E2E-RF13-01': ('Validar el cierre de jornada completo.', 'Confirmación con el número de inasistencias, mensaje de éxito, registro diario con 1 inasistencia.'),
    'E2E-RF13-02': ('Validar que cancelar no altere datos.', 'La fila sigue y el contador del estudiante queda en 0.'),
    'E2E-RF13-03': ('Validar el aviso sin pendientes.', 'Mensaje "No hay inasistencias pendientes" sin diálogo de confirmación.'),
    'E2E-RF13-04': ('Validar la penalización vista desde la interfaz.', 'Mensaje con el nombre del penalizado y "5 inasistencias" en el registro.'),
    'E2E-RF13-05': ('Validar la vista del administrador.', 'Ve los pendientes, el texto de supervisión y no ve "Cerrar jornada".'),
    # ── RF16 — Registro diario ──────────────────────────────────────────────
    'API-RF16-01': ('Verificar el registro de un día sin actividad.', '200; fecha de hoy, totales en 0 y 6 bloques.'),
    'API-RF16-02': ('Verificar el conteo por estado.', '4 reservas: 1 asistencia, 1 cancelación, 1 inasistencia, 1 pendiente; bloque 1 con 1 asistencia.'),
    'API-RF16-03': ('Verificar la lista de penalizados.', '1 penalizado con 5 inasistencias.'),
    'API-RF16-04': ('Verificar la consulta de otra fecha.', 'Ayer: 1 asistencia; hoy: 0.'),
    'API-RF16-05': ('Verificar la separación RF16 (entrenador) / RF17 (administrador).', 'Administrador recibe 403 en el registro del entrenador.'),
    'API-RF16-06': ('Verificar el bloqueo a estudiantes.', '403.'),
    'API-RF16-07': ('Verificar la generación del PDF.', '200, Content-Type application/pdf y archivo que empieza por %PDF.'),
    'COMP-RF16-01': ('Verificar el pintado de totales y penalizados.', 'Valores 3, 1, 2, 1 y el penalizado con "5 inasistencias".'),
    'COMP-RF16-02': ('Verificar el enlace del PDF según el rol.', 'Entrenador → entrenador.pdf; administrador → administrador.pdf.'),
    'COMP-PANEL-01': ('Verificar el cálculo de ocupación de bloques.', '"16 ocupados / 40 cupos", "4 libres" y "80% de aforo".'),
    'E2E-RF16-01': ('Validar la tarjeta del registro diario.', 'Cuatro totales visibles y enlace al PDF del entrenador.'),
    # ── RF20 — Enviar falla o sugerencia ────────────────────────────────────
    'API-RF20-01': ('Verificar el envío correcto de un mensaje.', '201, tipo SUGERENCIA_ENVIADA y 1 mensaje guardado.'),
    'API-RF20-02': ('Verificar el valor límite de longitud.', '2000 caracteres → 201.'),
    'API-RF20-03': ('Verificar el valor fuera del límite.', '2001 caracteres → 400 y nada guardado.'),
    'API-RF20-04': ('Verificar la validación de mensaje vacío.', 'Vacío y solo espacios → 400.'),
    'API-RF20-05': ('Verificar el correo obligatorio.', '400.'),
    'API-RF20-06': ('Verificar el rechazo de usuarios no registrados.', '404.'),
    'API-RF20-07': ('Verificar que el buzón sea solo de estudiantes.', 'Entrenador recibe 403.'),
    'COMP-RF20-01': ('Verificar la habilitación del botón de envío.', 'Deshabilitado vacío o con espacios; habilitado con texto.'),
    'COMP-RF20-02': ('Verificar el envío y la retroalimentación.', 'Envía {email, mensaje}; "Enviando…"; aviso de éxito; campo vacío.'),
    'COMP-RF20-03': ('Verificar el manejo de errores del envío.', 'Aviso de error y el texto escrito se conserva.'),
    'COMP-RF20-04': ('Verificar el límite del campo.', 'maxlength = 2000.'),
    'COMP-HIST-01': ('Verificar el estado vacío del historial.', '"Aún no tienes historial."'),
    'COMP-HIST-02': ('Verificar la traducción de estados.', 'Asistió, Cancelada y No asistió.'),
    'E2E-RF20-01': ('Validar la prevención de envíos vacíos.', 'Botón deshabilitado vacío o con espacios.'),
    'E2E-RF20-02': ('Validar el envío completo.', 'Confirmación visible, campo vacío y 1 mensaje en la base de datos.'),
    'E2E-RF20-03': ('Validar el límite en la interfaz.', 'El campo no supera 2000 caracteres.'),
    'E2E-RF20-04': ('Validar que el estudiante no acceda al buzón.', 'No existe la opción "Usuarios".'),
    'E2E-RF20-RF21': ('Validar el flujo extremo a extremo estudiante → administrador.', 'El mensaje enviado aparece en el buzón del administrador.'),
    # ── RF21 — Buzón ────────────────────────────────────────────────────────
    'API-RF21-01': ('Verificar la lectura y el orden del buzón.', '200; total 2, más reciente primero, con autor e id válido.'),
    'API-RF21-02': ('Verificar el bloqueo al entrenador.', '403.'),
    'API-RF21-03': ('Verificar el bloqueo al estudiante.', '403.'),
    'API-RF21-04': ('Verificar el borrado de un mensaje.', '200; total pasa a 1 y el mensaje ya no está.'),
    'API-RF21-05': ('Verificar el borrado repetido.', 'Primero 200, segundo 404.'),
    'API-RF21-06': ('Verificar un id con formato inválido.', '404.'),
    'API-RF21-07': ('Verificar que solo el administrador borre.', 'Entrenador y estudiante reciben 403; siguen 2 mensajes.'),
    'COMP-RF21-01': ('Verificar el pintado del buzón.', 'Contador 2, autores, correos y un botón Borrar por mensaje.'),
    'COMP-RF21-02': ('Verificar que se respeten los saltos de línea.', 'white-space: pre-wrap.'),
    'COMP-RF21-03': ('Verificar el estado vacío.', 'Sin contador y con "Todavía no hay mensajes."'),
    'COMP-RF21-04': ('Verificar la confirmación de borrado.', 'El diálogo nombra al autor y advierte que no se puede deshacer; al cancelar no hay llamada.'),
    'COMP-RF21-05': ('Verificar el borrado confirmado.', 'DELETE del mensaje correcto con el correo del admin, aviso de éxito, bandeja recargada con contador 1.'),
    'COMP-RF21-06': ('Verificar el manejo de error al borrar.', 'Aviso de error y el mensaje sigue visible.'),
    'E2E-RF21-01': ('Validar la bandeja con datos reales.', 'Contador 1, autor, correo y texto del mensaje.'),
    'E2E-RF21-02': ('Validar la cancelación del borrado.', 'El mensaje sigue en pantalla y en la base de datos.'),
    'E2E-RF21-03': ('Validar el borrado confirmado.', 'Confirmación, bandeja vacía y 0 mensajes en la base de datos.'),
    # ── Defectos ────────────────────────────────────────────────────────────
    'DEF-01': ('Detectar si el cierre de jornada acepta fechas futuras.', 'La reserva de mañana sigue ACTIVA, sin inasistencia, y la API responde 400.'),
    'DEF-02': ('Detectar si la API exige autenticación.', 'Sin credenciales, leer el buzón con el correo del admin → 401/403.'),
    'DEF-02b': ('Detectar suplantación de autor en el buzón.', 'Enviar a nombre de otro estudiante sin credenciales → 401/403.'),
    'DEF-03': ('Detectar pérdida de sesión al recargar.', 'Tras F5 con datos cargando, el usuario sigue en su panel.'),
    'DEF-04': ('Detectar la zona horaria de las fechas del buzón.', 'La hora mostrada coincide con la hora de Colombia.'),
    'DEF-04b': ('Detectar la conversión UTC → Colombia en la interfaz.', 'Un mensaje de las 20:15 UTC se muestra a las 15:15.'),
    'DEF-05': ('Detectar si los errores de carga de pendientes se ocultan.', 'Ante un error 500 no se muestra "No hay estudiantes pendientes".'),
    'DEF-06': ('Detectar si los errores del registro diario se ocultan.', 'Ante un error 500 los totales no se muestran como 0.'),
    'DEF-07': ('Detectar si los errores del buzón se ocultan.', 'Ante un error 500 no se muestra "Todavía no hay mensajes".'),
    # ── Seguridad (OWASP Top 10 2021) ───────────────────────────────────────
    'SEG-01': ('Verificar que las contraseñas no se guarden en claro (A02).', 'Hash PBKDF2 con sal (sal:hash de 64 hex) y distinto para cada cuenta.'),
    'SEG-02': ('Verificar que el login no permita enumerar usuarios (A07).', 'Mismo 401 y mismo mensaje para correo existente y no existente.'),
    'SEG-03': ('Verificar autenticación y bloqueo de cuentas desactivadas (A07).', 'Credenciales correctas → 200; cuenta INACTIVO → 403.'),
    'SEG-04': ('Verificar que solo entren correos institucionales (A01).', 'Correo @gmail.com → 400.'),
    'SEG-05': ('Verificar que el rol no se pueda asignar desde el cliente (A04).', 'Con role=ADMIN en el cuerpo, la cuenta queda ESTUDIANTE y no principal.'),
    'SEG-06': ('Verificar el control de acceso por rol en las acciones de personal (A01).', 'Cinco acciones de entrenador/administrador → 403 para un estudiante.'),
    'SEG-07': ('Verificar protección contra XSS almacenado en el buzón (A03).', 'El código se muestra como texto y no se ejecuta.'),
    'SEG-08': ('Verificar atomicidad ante peticiones simultáneas (A04).', 'De tres registros simultáneos de la misma reserva, exactamente uno tiene éxito.'),
    'VUL-01': ('Verificar que la API exija credenciales (A01).', 'Leer el buzón solo con el correo del administrador → 401/403.'),
    'VUL-02': ('Verificar que la sesión no exponga datos sin credenciales (A01).', 'GET /auth/session sin credenciales → 401/403 y sin el documento (contraseña).'),
    'VUL-03': ('Verificar que no se pueda suplantar a un estudiante en RF20 (A01).', 'Enviar a nombre de otro sin credenciales → 401/403.'),
    'VUL-04': ('Verificar que un estudiante no cancele reservas ajenas — IDOR (A01).', '401/403 y la reserva sigue ACTIVA.'),
    'VUL-05': ('Verificar que no se cierre una jornada futura (A04, RF13).', 'Fecha de mañana → 400; la reserva sigue ACTIVA y sin inasistencia.'),
    'VUL-06': ('Verificar protección contra fuerza bruta (A07).', 'Tras 5 intentos fallidos → 429, incluso con la contraseña correcta.'),
    'VUL-07': ('Verificar rechazo de inyección de operadores de MongoDB (A03).', '{"$ne": ""} en el login → 400 JSON, no 500.'),
    'VUL-08': ('Verificar validación de entradas antes de la base de datos (A03).', 'Nombre de 1 carácter → 400 con mensaje, no 500.'),
    'VUL-09': ('Verificar que los errores no expongan detalles internos (A05).', 'Sin trazas, sin lista de rutas (URLconf) ni "DEBUG = True".'),
    'VUL-10': ('Verificar cabeceras de seguridad (A05).', 'X-Content-Type-Options: nosniff, X-Frame-Options y Referrer-Policy.'),
    'VUL-11': ('Verificar la política CORS (A05).', 'Un origen ajeno no recibe Access-Control-Allow-Origin.'),
    # ── Hallazgos heurísticos ────────────────────────────────────────────────
    'H-01': ('H1 Visibilidad del estado: la búsqueda indica que está trabajando (RF11).', 'Botón "Buscando…" deshabilitado mientras responde el servidor.'),
    'H-02': ('H5 Prevención de errores: no ofrecer registrar reservas de otro día (RF11).', 'Botón deshabilitado con el texto "Se registra el día de la reserva".'),
    'H-04': ('H5 Prevención de errores: validar el documento en el formulario (RF11).', 'Mensaje "El documento tiene 10 dígitos…" sin llamar al servidor.'),
    'H-06': ('H4 Consistencia: misma acción, mismo nombre (RF12).', 'El botón de la tabla dice "Registrar asistencia" (antes "Asistió").'),
    'H-07': ('H7 Flexibilidad y eficiencia: filtrar pendientes (RF12).', 'El filtro deja solo la fila que coincide.'),
    'H-08': ('H3 Control y libertad: confirmación informada antes de penalizar (RF13).', 'El diálogo nombra a los afectados y a quién penalizará.'),
    'H-13': ('Accesibilidad 1.1.1: emojis decorativos ocultos a lectores de pantalla (RF16).', 'Los emojis de títulos y del botón PDF llevan aria-hidden.'),
    'H-15': ('H2 Coincidencia con el mundo real: nombre del formulario (RF20).', 'Título "Reportar una falla o sugerencia".'),
    'H-16': ('H1 Visibilidad del estado: contador de caracteres (RF20).', 'Se ve "4/2000" al escribir "Hola".'),
    'H-20': ('Accesibilidad 2.5.8: botón Borrar usable (RF21).', 'Alto ≥ 32 px, letra ≥ 13 px y descripción con el autor del mensaje.'),
    'H-28': ('Interfaz móvil: declarar el viewport (todas las pantallas).', 'Existe `<meta name="viewport" content="width=device-width…">`.'),
}

TIPOS = {'api': 'API', 'ui': 'E2E (interfaz)', 'componentes': 'Componente',
         'defectos-e2e': 'Defecto (E2E/API)', 'defectos-componentes': 'Defecto (componente)',
         'seguridad-controles': 'Seguridad (control)', 'seguridad-vulnerabilidades': 'Seguridad (vulnerabilidad)',
         'hallazgos': 'UX (heurística)', 'accesibilidad': 'Accesibilidad (axe)', 'interfaz': 'Interfaz'}
ORDEN_RF = ['RF11', 'RF12', 'RF13', 'RF16', 'RF20', 'RF21', 'Seguridad', 'Hallazgos', 'Accesibilidad',
            'Interfaz', 'Defectos']
# Conjuntos que se ejecutaron también sobre el código ORIGINAL (reports/antes/):
# la matriz muestra los dos resultados.
CON_ANTES = {'defectos-e2e', 'defectos-componentes', 'seguridad-controles', 'seguridad-vulnerabilidades',
             'hallazgos', 'accesibilidad', 'interfaz'}


def objetivo_generico(ident):
    if ident.startswith('A11Y-'):
        return ('Auditar la pantalla con axe-core contra WCAG 2.2 A/AA.', 'Ninguna violación de impacto crítico o serio.')
    if ident.startswith('UI-') and ident.endswith('-foco'):
        return ('Verificar que el foco del teclado se vea en los campos (WCAG 2.4.7).', 'Contorno o sombra de foco con opacidad ≥ 0,3 en cada campo.')
    if ident.startswith('UI-'):
        dispositivo = ident.rsplit('-', 1)[-1]
        return (f'Verificar la pantalla en {dispositivo} (responsive).', 'Sin desplazamiento horizontal y controles de al menos 24×24 px.')
    return None


def leer_informes(carpeta='reports'):
    filas = []
    for ruta in sorted(glob.glob(os.path.join(RAIZ, carpeta, '*', 'index.html'))):
        informe = os.path.basename(os.path.dirname(ruta))
        crudo = re.search(r'data-raw="([^"]*)"', open(ruta, encoding='utf-8').read()).group(1)
        datos = json.loads(html.unescape(crudo))
        for resultado in datos['results']:
            pila = [resultado]
            while pila:
                suite = pila.pop()
                pila.extend(suite.get('suites', []))
                for t in suite.get('tests', []):
                    filas.append({
                        'informe': informe, 'spec': os.path.basename(resultado['file']),
                        'titulo': t['title'], 'estado': t['state'], 'ms': t['duration'] or 0,
                        'error': ((t.get('err') or {}).get('message') or '').split('\n')[0],
                    })
    return filas


def buscar_captura(carpeta, ident):
    for captura in sorted(glob.glob(os.path.join(carpeta, '**', '*.png'), recursive=True)):
        nombre = os.path.basename(captura)
        if nombre.startswith(ident + '-') or nombre.startswith(ident + '.') or f'-- {ident} ' in nombre:
            # Se codifica todo (espacios, paréntesis, comas): un paréntesis sin
            # codificar corta el enlace de Markdown.
            return quote(os.path.relpath(captura, RAIZ))
    return None


def evidencias(fila, ident):
    partes = [f"[informe](reports/{fila['informe']}/index.html)"]
    captura = buscar_captura(os.path.join(RAIZ, 'evidencias', fila['informe'], 'capturas'), ident)
    if captura:
        partes.append(f'[captura]({captura})')
    if fila['informe'] in CON_ANTES:
        antes = buscar_captura(os.path.join(RAIZ, 'evidencias', 'antes', fila['informe'], 'capturas'), ident)
        if antes:
            partes.append(f'[captura antes]({antes})')
    video = os.path.join(RAIZ, 'evidencias', fila['informe'], 'videos', fila['spec'] + '.mp4')
    if os.path.exists(video):
        partes.append(f"[video]({quote(os.path.relpath(video, RAIZ))})")
    return ' · '.join(partes)


def grupo(ident):
    for prefijo, nombre in (('SEG-', 'Seguridad'), ('VUL-', 'Seguridad'), ('H-', 'Hallazgos'),
                            ('A11Y-', 'Accesibilidad'), ('UI-', 'Interfaz')):
        if ident.startswith(prefijo):
            return nombre
    if ident.startswith('DEF'):
        return 'Defectos'
    m = re.search(r'RF\d\d', ident)
    if ident.startswith('COMP-HIST'):
        return 'RF20'
    if ident.startswith('COMP-PANEL'):
        return 'RF16'
    return m.group(0) if m else 'Otros'


def main():
    filas = leer_informes()
    antes = {}
    for f in leer_informes(os.path.join('reports', 'antes')):
        antes[(f['informe'], f['titulo'].split(' · ')[0].split(' (')[0].strip())] = f
    por_grupo = {}
    for f in filas:
        ident = f['titulo'].split(' · ')[0].split(' (')[0].strip()
        f['id'] = ident
        por_grupo.setdefault(grupo(ident), []).append(f)

    total = len(filas)
    def es_defecto(f):
        return f['informe'] in CON_ANTES and f['informe'] != 'seguridad-controles'
    regresion = [f for f in filas if not es_defecto(f)]
    defectos = [f for f in filas if es_defecto(f)]
    ok = sum(f['estado'] == 'passed' for f in regresion)
    corregidos = sum(f['estado'] == 'passed' for f in defectos)

    out = [
        '# Matriz de pruebas — Cypress',
        '',
        f'Generada el {datetime.now():%Y-%m-%d %H:%M} a partir de los informes de `reports/` (código corregido) y '
        '`reports/antes/` (código original). Se vuelve a generar con `python regression_testing/cypress/generar_matriz.py`.',
        '',
        '| Conjunto | Pruebas | Resultado actual |',
        '|---|---|---|',
        f'| Regresión, API, componentes y controles de seguridad | {len(regresion)} | {ok} pasan, {len(regresion) - ok} fallan |',
        f'| Defectos, vulnerabilidades y hallazgos de UX (se ejecutaron antes y después de corregir) | {len(defectos)} | '
        f'{corregidos} corregidos, {len(defectos) - corregidos} pendientes |',
        f'| **Total** | **{total}** | |',
        '',
        'Las pruebas de defectos, vulnerabilidades y hallazgos afirman el comportamiento **correcto**: sobre el código '
        'original fallaron (esa es la evidencia del problema) y sobre el código corregido pasan. Las que siguen fallando '
        'son las vulnerabilidades que requieren autenticación (VUL-01 a VUL-04, DEF-02 y DEF-02b), documentadas como '
        'mejora propuesta en el informe de seguridad.',
        '',
    ]
    titulos = {'RF11': 'RF11 — Registrar asistencia', 'RF12': 'RF12 — Reservas sin asistencia registrada',
               'RF13': 'RF13 — Procesar inasistencias (cerrar jornada)', 'RF16': 'RF16 — Registro diario del entrenador',
               'RF20': 'RF20 — Reportar una falla o sugerencia', 'RF21': 'RF21 — Buzón de sugerencias',
               'Seguridad': 'Seguridad — controles y vulnerabilidades (OWASP Top 10)',
               'Hallazgos': 'UX — hallazgos heurísticos verificables',
               'Accesibilidad': 'Accesibilidad — axe-core (WCAG 2.2 A/AA)',
               'Interfaz': 'Interfaz — responsive y foco visible',
               'Defectos': 'Defectos encontrados en la regresión'}
    celda = lambda s: s.replace('|', '\\|').replace('\n', ' ')
    for g in ORDEN_RF + sorted(set(por_grupo) - set(ORDEN_RF)):
        if g not in por_grupo:
            continue
        out += [f'## {titulos.get(g, g)}', '',
                '| ID | Tipo | Objetivo | Resultado esperado | Resultado obtenido | Evidencia |',
                '|---|---|---|---|---|---|']
        for f in sorted(por_grupo[g], key=lambda x: (x['informe'], x['id'])):
            objetivo, esperado = CASOS.get(f['id']) or objetivo_generico(f['id']) or (f['titulo'].split(' · ', 1)[-1], '—')
            previo = antes.get((f['informe'], f['id']))
            if es_defecto(f):
                if f['estado'] == 'passed' and previo and previo['estado'] == 'passed':
                    obtenido = '✅ Pasó (también con el código original: no había problema aquí).'
                elif f['estado'] == 'passed':
                    obtenido = '✅ **Corregido.**'
                    if previo and previo['estado'] == 'failed':
                        obtenido += f" Antes falló: {previo['error'][:160]}"
                else:
                    obtenido = f"❌ **Pendiente.** {f['error'][:200]}"
            else:
                obtenido = (f"✅ Pasó ({f['ms'] / 1000:.1f} s)" if f['estado'] == 'passed'
                            else f"❌ Falló: {f['error']}")
            out.append(f"| {f['id']} | {TIPOS.get(f['informe'], f['informe'])} | {celda(objetivo)} | "
                       f"{celda(esperado)} | {celda(obtenido)} | {evidencias(f, f['id'])} |")
        out.append('')

    destino = os.path.join(RAIZ, 'MATRIZ_DE_PRUEBAS.md')
    open(destino, 'w', encoding='utf-8').write('\n'.join(out))
    faltan = sorted(i for i in {f['id'] for f in filas} - set(CASOS) if not objetivo_generico(i))
    print(f'{total} pruebas → {destino}')
    if faltan:
        print('Sin objetivo/esperado definido:', ', '.join(faltan))


if __name__ == '__main__':
    main()

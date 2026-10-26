"""RF15 (reporte de inasistencias) con Browser Use.

La IA SOLO navega y reporta lo que ve en pantalla. El veredicto lo da este
script, en codigo, con tres comprobaciones que no dependen de lo que diga la IA:
  1. Lo que la IA reporto debe EXISTIR en la pagina (se lee el DOM con la misma
     sesion del navegador). Si no esta, el veredicto es FALSO POSITIVO.
  2. Lo que reporto debe coincidir con el valor ESPERADO (el que se dejo en la
     base de datos, o el mensaje de la app en el control negativo).
  3. Si algo no cuadra, se contrasta con la API para decir de quien fue el fallo.
En el control negativo (tarea 4) el mensaje es un toast que dura 5 s: un observador
(MutationObserver) instalado antes de que actue la IA guarda todo aviso que aparezca y se
lee al terminar. Si el observador no queda instalado o se pierde, el caso es NO CONCLUYENTE
(origen SCRIPT), no un falso positivo.

Despues de cada tarea se guarda una captura donde se ve el resultado de la
busqueda (ia_browser_use/resultados/) y su ruta queda en el JSON.

Uso (desde la raiz del repo, con la app corriendo):
    ia_browser_use\\.venv\\Scripts\\python.exe ia_browser_use\\rf15_browser_use.py
    ... --headless          # sin ventana
    ... --solo 4            # solo la tarea 4

ADVERTENCIA: igual que `cy.escenarioBase()` en Cypress, antes de cada tarea se
BORRAN usuarios, reservas, buzon y disponibilidad de la base de datos y se
vuelven a crear los cuatro usuarios de fixtures/usuarios.json.
"""
import os

# Debe ir antes de importar browser_use.
os.environ.setdefault('ANONYMIZED_TELEMETRY', 'false')

import argparse
import asyncio
import json
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
from dataclasses import dataclass, field
from datetime import datetime
from pathlib import Path

from dotenv import load_dotenv
from pydantic import BaseModel, Field
from pymongo import MongoClient

from browser_use import Agent, BrowserProfile, BrowserSession, ChatGoogle

# La consola de Windows no siempre es UTF-8; asi los acentos no rompen los print.
for _flujo in (sys.stdout, sys.stderr):
    try:
        _flujo.reconfigure(encoding='utf-8')
    except Exception:  # noqa: BLE001
        pass

AQUI = Path(__file__).resolve().parent
RAIZ = AQUI.parent
FIXTURE = RAIZ / 'regression_testing' / 'cypress' / 'fixtures' / 'usuarios.json'
SALIDA = AQUI / 'resultados'

load_dotenv(AQUI / '.env')  # GOOGLE_API_KEY vive aqui; este script no la lee ni la imprime.

FRONT = os.environ.get('FRONT_URL', 'http://localhost:5173')
API = os.environ.get('API_URL', 'http://localhost:8000/api')
# Mismos valores por defecto que frontend/cypress.config.js
MONGO_URI = os.environ.get('MONGO_URI', 'mongodb://localhost:27017')
MONGO_DB = os.environ.get('MONGO_DB', 'gym_udem')
MODELO = os.environ.get('BROWSER_USE_MODEL', 'gemini-2.5-flash')
MAX_TOKENS_SALIDA = 16000  # con 8096 el modelo cortaba la respuesta ("output truncated")
LIMITE = 5  # NO_SHOW_LIMITE del backend (backend/api/db.py)

DOCUMENTO_INEXISTENTE = '9999999999'
MENSAJE_NO_EXISTE = f'No hay ningún estudiante registrado con el documento {DOCUMENTO_INEXISTENTE}.'

VEREDICTO_FALSO_POSITIVO = 'FALSO POSITIVO: la IA inventó el dato'


# -- Preparacion de la base (equivalente a escenarioBase y db:fijarInasistencias) --
def cargar_usuarios():
    return json.loads(FIXTURE.read_text(encoding='utf-8'))


def _llamar(req):
    try:
        with urllib.request.urlopen(req, timeout=20) as r:
            return r.status, json.loads(r.read() or b'{}')
    except urllib.error.HTTPError as e:
        return e.code, json.loads(e.read() or b'{}')


def _post(ruta, cuerpo):
    req = urllib.request.Request(
        f'{API}{ruta}', data=json.dumps(cuerpo).encode('utf-8'),
        headers={'Content-Type': 'application/json'}, method='POST')
    return _llamar(req)


def _get(ruta):
    return _llamar(urllib.request.Request(f'{API}{ruta}'))


def escenario_base(usuarios):
    """cy.escenarioBase(): limpiarBd + crearUsuarios(admin, entrenador, estudiante, estudiante2)."""
    cliente = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
    try:
        db = cliente[MONGO_DB]
        for coleccion in ('users', 'reservations', 'suggestions', 'disponibilidad'):
            db[coleccion].delete_many({})
    finally:
        cliente.close()
    for clave in ('admin', 'entrenador', 'estudiante', 'estudiante2'):
        estado, cuerpo = _post('/auth/register/', usuarios[clave])
        if estado != 201:
            raise RuntimeError(f'No se pudo crear {clave}: HTTP {estado} {cuerpo}')


def fijar_inasistencias(email, cantidad, campos=None):
    """db:fijarInasistencias (+ db:actualizarUsuario cuando se pasan campos)."""
    cliente = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
    try:
        cambios = {'no_show_count': cantidad, **(campos or {})}
        cliente[MONGO_DB].users.update_one({'email': email}, {'$set': cambios})
    finally:
        cliente.close()


# -- Lo que se le pide a la IA --
class Lectura(BaseModel):
    """Lo que la IA ve en pantalla. No incluye ningun veredicto."""
    nombre: str = Field(description='Nombre del estudiante tal como aparece en el resultado de la búsqueda')
    estado: str = Field(description='Texto de la insignia de estado junto al nombre (ACTIVO o PENALIZADO)')
    # Pueden ir vacíos: si la IA no ve la línea, debe poder decirlo en vez de inventar un número.
    inasistencias: int | None = Field(
        default=None,
        description='El primer número de la línea "Inasistencias: X de Y". null si NO ves esa línea; no lo adivines')
    limite: int | None = Field(
        default=None,
        description='El segundo número de la línea "Inasistencias: X de Y". null si NO ves esa línea; no lo adivines')
    texto_linea: str = Field(
        default='',
        description='La línea de inasistencias copiada tal cual, letra por letra. '
                    'Cadena vacía si NO ves esa línea; no la completes')


class LecturaNegativa(BaseModel):
    """Control negativo: lo que la IA ve cuando se busca un documento que no existe."""
    aparece_estudiante: bool = Field(
        description='true solo si en pantalla se ve una tarjeta de resultado con el nombre de un estudiante')
    mensaje_de_error: str = Field(
        description='El mensaje que muestra la aplicación, copiado tal cual, letra por letra. '
                    'Cadena vacía si no se ve ningún mensaje.')


def _prefijo_sesion():
    # Las credenciales del entrenador viajan como marcadores (sensitive_data): el
    # modelo ve los nombres, no los valores.
    return (
        f'Abre {FRONT}. Inicia sesión escribiendo en el campo de correo el valor x_correo_entrenador '
        'y en el campo de documento de identidad el valor x_documento_entrenador, y pulsa "Ingresar". '
        'Cuando entres, abre la sección "Panel" del menú superior. '
        'En el cuadro "Registrar asistencia" escribe en el campo del documento del estudiante el número '
    )


def redactar_tarea(documento):
    return (
        _prefijo_sesion() + f'{documento} y pulsa "Buscar". '
        'Espera a que aparezca la tarjeta del resultado con el nombre del estudiante; si aún no aparece, '
        'espera 2 segundos y vuelve a mirar. Haz scroll hasta ver la línea que empieza por "Inasistencias:" '
        'y cópiala letra por letra como la ves en esa pantalla. Si no ves esa línea, no la adivines ni la '
        'completes: déjala vacía. '
        'Cuando aparezca el resultado, LEE (no interpretes, no juzgues) estas cosas: '
        'el nombre del estudiante, la insignia de estado que está junto al nombre, '
        'y la línea que dice "Inasistencias: X de Y". '
        'No hagas clic en "Registrar asistencia" ni en ningún otro botón del resultado. '
        'No cambies nada en la aplicación. Termina en cuanto hayas leído esos datos y devuélvelos.'
    )


def redactar_tarea_negativa(documento):
    return (
        _prefijo_sesion() + f'{documento} y pulsa "Buscar". '
        'Mira lo que muestra la aplicación justo después de buscar: el mensaje puede salir como un aviso '
        'temporal en una esquina de la pantalla que desaparece en unos 5 segundos, así que míralo enseguida. '
        'Copia, letra por letra, el mensaje que aparezca, y di si aparece o no una tarjeta con el nombre '
        'de un estudiante. Si no aparece ningún estudiante, NO inventes uno: reporta solo lo que ves. '
        'No hagas clic en ningún otro botón ni cambies nada en la aplicación. '
        'Termina en cuanto hayas leído el mensaje y devuélvelo.'
    )


@dataclass
class Caso:
    numero: int
    titulo: str
    inasistencias: int = 0
    estado: str = 'ACTIVO'            # estado esperado de la cuenta
    campos: dict = field(default_factory=dict)  # campos extra a fijar en la base
    negativo: bool = False
    documento: str | None = None      # None -> el del estudiante de fixtures


CASOS = [
    Caso(1, 'Estudiante en 0 inasistencias', 0, 'ACTIVO'),
    # 3 es el caso que usa tu prueba E2E-RF15-04; 3 y 4 caen en el rango de alerta (faltan <= 2).
    Caso(2, 'Estudiante en alerta (3 inasistencias)', 3, 'ACTIVO'),
    # Igual que E2E-RF15-02/03: 5 inasistencias y estado PENALIZADO fijado en la base.
    Caso(3, 'Estudiante penalizada (5 inasistencias)', 5, 'PENALIZADO', {'estado': 'PENALIZADO'}),
    # Control negativo: el documento no existe; la IA no debe inventar un estudiante.
    Caso(4, 'Control negativo: documento que no existe', negativo=True, documento=DOCUMENTO_INEXISTENTE),
]


# -- Clasificacion de errores del modelo --
_ERROR_MODELO = re.compile(
    r'\b(404|503)\b\s*(NOT_FOUND|UNAVAILABLE)|status_code\W+(404|503)\b'
    r'|no longer available|high demand|output was truncated', re.I)


def error_del_modelo(errores, excepcion=None):
    """True si los errores vienen del modelo/servicio (404, 503 o salida truncada), no de la IA."""
    textos = [str(e) for e in errores if e]
    if excepcion is not None:
        textos.append(f'{type(excepcion).__name__}: {excepcion}')
        if getattr(excepcion, 'status_code', None) in (404, 503):
            return True
    return any(_ERROR_MODELO.search(t) for t in textos)


# -- Lectura de la pagina con codigo (no con la IA) --
def _norm(s):
    return re.sub(r'\s+', ' ', s or '').strip()


_JS_LEER = """() => {
  const t = (s) => {
    const e = document.querySelector('[data-cy="' + s + '"]');
    return e ? e.innerText.trim() : null;
  };
  return JSON.stringify({
    url: location.href,
    cuerpo: document.body ? document.body.innerText : '',
    hay_resultado: !!document.querySelector('[data-cy="buscar-resultado"]'),
    hay_cuadro: !!document.querySelector('[data-cy="buscar-contenedor"]'),
    nombre: t('buscar-resultado-nombre'),
    estado: t('buscar-resultado-estado'),
    linea: t('buscar-resultado-inasistencias'),
    error: t('buscar-error')
  });
}"""

_JS_SCROLL = """() => {
  const e = document.querySelector('[data-cy="buscar-resultado"]')
         || document.querySelector('[data-cy="buscar-error"]')
         || document.querySelector('[data-cy="buscar-contenedor"]');
  if (!e) return JSON.stringify(false);
  e.scrollIntoView({block: 'center'});
  return JSON.stringify(true);
}"""


# Observador de avisos temporales. El mensaje "No hay ningún estudiante registrado..." sale
# como un toast (App.jsx, data-cy="toast-mensaje") que dura 5 s; cuando el script lee la
# pagina despues, ya no esta. Este observador guarda todo texto nuevo que aparezca en el DOM:
#   window.__toasts -> texto de cada [data-cy="toast-mensaje"] (selector estable, via principal)
#   window.__avisos -> texto de cualquier nodo nuevo de <= 500 caracteres (respaldo)
_JS_OBSERVADOR = """() => {
  if (window.__observador) return true;
  window.__observador = true;
  window.__avisos = [];
  window.__toasts = [];
  const SEL = '[data-cy="toast-mensaje"]';
  const norm = (s) => (s || '').replace(/\\s+/g, ' ').trim();
  const guardar = (lista, texto) => { if (texto && texto.length <= 500 && lista.length < 500) lista.push(texto); };
  const revisar = (nodo) => {
    if (nodo.nodeType === 3) {
      guardar(window.__avisos, norm(nodo.textContent));
      const p = nodo.parentElement && nodo.parentElement.closest(SEL);
      if (p) guardar(window.__toasts, norm(p.textContent));
      return;
    }
    if (nodo.nodeType !== 1) return;
    guardar(window.__avisos, norm(nodo.textContent));
    const toasts = nodo.matches(SEL) ? [nodo] : Array.from(nodo.querySelectorAll(SEL));
    toasts.forEach((t) => guardar(window.__toasts, norm(t.textContent)));
  };
  new MutationObserver((muts) => {
    for (const m of muts) {
      if (m.type === 'childList') m.addedNodes.forEach(revisar);
      else if (m.type === 'characterData') revisar(m.target);
    }
  }).observe(document, {childList: true, subtree: true, characterData: true});
  return true;
}"""

_JS_LEER_AVISOS = """() => JSON.stringify({
  vivo: window.__observador === true,
  avisos: window.__avisos || [],
  toasts: window.__toasts || []
})"""


async def instalar_observador(sesion):
    """Instala el observador ANTES de que la IA actue y comprueba que quedo vivo.

    Se registra como script de documento nuevo (para que sobreviva si la pagina se recarga)
    y ademas se evalua en la pagina actual. Devuelve (instalado, aviso)."""
    aviso = None
    try:
        await sesion.start()
        try:
            await sesion._cdp_add_init_script(f'({_JS_OBSERVADOR})();')
        except Exception as e:  # noqa: BLE001
            aviso = f'No se pudo registrar el script de documento nuevo ({e!r}); solo queda en la página actual.'
        await sesion.navigate_to(FRONT)  # la pagina de la app ya nace con el observador
        await asyncio.sleep(1.5)
        pagina = await sesion.get_current_page()
        await pagina.evaluate(_JS_OBSERVADOR)
        estado = await leer_observador(sesion)
        return bool(estado and estado['vivo']), aviso
    except Exception as e:  # noqa: BLE001
        return False, f'No se pudo instalar el observador: {e!r}'


async def leer_observador(sesion):
    pagina = await sesion.get_current_page()
    datos = json.loads(await pagina.evaluate(_JS_LEER_AVISOS))
    if isinstance(datos, str):
        datos = json.loads(datos)
    return datos


async def leer_pagina(sesion):
    pagina = await sesion.get_current_page()
    crudo = await pagina.evaluate(_JS_LEER)
    datos = json.loads(crudo)
    if isinstance(datos, str):  # por si la herramienta codifica dos veces
        datos = json.loads(datos)
    return datos


async def guardar_captura(sesion, destino):
    """Hace scroll hasta el cuadro 'Registrar asistencia' y guarda la captura.

    Si el cuadro no esta en la pagina, guarda la pagina completa. Devuelve (ruta, aviso)."""
    try:
        pagina = await sesion.get_current_page()
        crudo = await pagina.evaluate(_JS_SCROLL)
        hubo_scroll = json.loads(crudo) is True
        await asyncio.sleep(0.6)  # deja terminar el scroll antes de capturar
        datos = await sesion.take_screenshot(full_page=not hubo_scroll)
        if isinstance(datos, str):  # por si llega en base64
            import base64
            datos = base64.b64decode(datos)
        destino.write_bytes(datos)
        if destino.stat().st_size == 0:
            return None, 'La captura quedó vacía.'
        aviso = None if hubo_scroll else 'No se encontró el cuadro "Registrar asistencia"; se guardó la página completa.'
        return str(destino), aviso
    except Exception as e:  # noqa: BLE001
        return None, f'No se pudo guardar la captura: {e!r}'


def verificar_lectura_en_pagina(lectura, pag):
    """La IA dice X; ¿X esta en la pagina? Devuelve filas {campo, ia, pagina, coincide}."""
    pares = [(int(a), int(b)) for a, b in re.findall(r'Inasistencias:\s*(\d+)\s*de\s*(\d+)', pag['cuerpo'])]
    dicho = (lectura['inasistencias'], lectura['limite'])
    return [
        {'campo': 'línea "Inasistencias: X de Y"',
         'ia': f'Inasistencias: {dicho[0]} de {dicho[1]}',
         'pagina': [f'Inasistencias: {a} de {b}' for a, b in pares],
         'coincide': dicho in pares},
        {'campo': 'texto de la línea copiado por la IA',
         'ia': lectura['texto_linea'],
         'pagina': pag['linea'],
         'coincide': bool(lectura['texto_linea']) and _norm(lectura['texto_linea']) in _norm(pag['cuerpo'])},
        {'campo': 'nombre',
         'ia': lectura['nombre'], 'pagina': pag['nombre'],
         'coincide': _norm(lectura['nombre']) == _norm(pag['nombre'])},
        {'campo': 'estado',
         'ia': lectura['estado'], 'pagina': pag['estado'],
         'coincide': _norm(lectura['estado']).upper() == _norm(pag['estado']).upper()},
    ]


def mensaje_observado(obs, pag, esperado):
    """Lo que la pagina mostro, segun el observador y no segun la IA.

    Primero el toast (selector estable); si no hubo, cualquier texto nuevo o el texto actual.
    Devuelve (texto, via): `texto` es `esperado` si estaba, o el primer toast distinto, o ''."""
    toasts = [_norm(t) for t in obs['toasts']]
    if esperado in toasts:
        return esperado, 'toast'
    if toasts:
        return toasts[0], 'toast'
    if any(esperado in _norm(a) for a in obs['avisos']) or esperado in _norm(pag['cuerpo']):
        return esperado, 'observador'
    return '', None


def verificar_negativo_en_pagina(lectura, pag, obs):
    """Lo que dijo la IA ¿lo mostro la pagina? El mensaje puede haber sido un toast ya desaparecido."""
    filas = [
        {'campo': 'aparece un estudiante',
         'ia': lectura['aparece_estudiante'], 'pagina': pag['hay_resultado'],
         'coincide': lectura['aparece_estudiante'] == pag['hay_resultado']},
    ]
    dicho = _norm(lectura['mensaje_de_error'])
    if dicho:
        toasts = [_norm(t) for t in obs['toasts']]
        via = 'toast' if dicho in toasts else 'observador'
        visto = dicho in toasts or any(dicho in _norm(a) for a in obs['avisos']) \
            or dicho in _norm(pag['cuerpo'])
        filas.append({'campo': 'mensaje de error (toast / texto nuevo en la página)',
                      'ia': dicho, 'pagina': toasts or [_norm(a) for a in obs['avisos'][-5:]],
                      'via': via if visto else None, 'coincide': visto})
    return filas


def comparar(esperado, obtenido):
    return [{'campo': k, 'esperado': esperado[k], 'obtenido': obtenido.get(k),
             'coincide': esperado[k] == obtenido.get(k)} for k in esperado]


def consultar_api(estudiante, entrenador, documento):
    q = urllib.parse.urlencode({'documento': documento, 'actor_email': entrenador['email']})
    return _get(f'/students/lookup/?{q}')


async def correr_caso(caso, usuarios, headless, sello):
    est, ent = usuarios['estudiante'], usuarios['entrenador']
    documento = caso.documento or est['documento']
    if caso.negativo:
        esperado = {'mensaje': MENSAJE_NO_EXISTE, 'aparece_estudiante': False}
    else:
        esperado = {'nombre': est['name'], 'estado': caso.estado,
                    'inasistencias': caso.inasistencias, 'limite': LIMITE}
    registro = {'caso': caso.numero, 'titulo': caso.titulo, 'documento_buscado': documento,
                'esperado': esperado, 'modelo': MODELO, 'max_output_tokens': MAX_TOKENS_SALIDA,
                'origen_falla': None, 'veredicto': None, 'captura': None}

    # 1) Preparar la base. Si esto falla, el error es del script/entorno.
    try:
        escenario_base(usuarios)
        if not caso.negativo:
            fijar_inasistencias(est['email'], caso.inasistencias, caso.campos)
    except Exception as e:  # noqa: BLE001
        registro.update(veredicto='NO EJECUTADO', origen_falla='SCRIPT/ENTORNO',
                        detalle=f'Falló la preparación de la base: {e!r}')
        return registro

    # 2) Referencia independiente: ¿la API ya responde lo esperado?
    estado_api, cuerpo_api = consultar_api(est, ent, documento)
    if caso.negativo:
        api = {'http': estado_api, 'error': cuerpo_api.get('error')}
        api_ok = estado_api == 404 and cuerpo_api.get('error') == MENSAJE_NO_EXISTE
    else:
        e = cuerpo_api.get('estudiante') or {}
        api = ({'http': estado_api, 'nombre': e.get('name'), 'estado': e.get('estado'),
                'inasistencias': e.get('no_show_count'), 'limite': e.get('no_show_limite')}
               if estado_api == 200 else {'http': estado_api, 'error': cuerpo_api.get('error')})
        api_ok = estado_api == 200 and all(
            api[k] == esperado[k] for k in ('nombre', 'estado', 'inasistencias', 'limite'))
    registro['api'] = api
    if estado_api >= 500 or (not caso.negativo and estado_api != 200):
        registro.update(veredicto='NO EJECUTADO', origen_falla='APP o ENTORNO',
                        detalle=f'La API de búsqueda respondió HTTP {estado_api} para el caso sembrado.')
        return registro

    # 3) La IA navega y lee. La sesion del navegador se conserva para verificar y capturar.
    llm = ChatGoogle(model=MODELO, temperature=0, max_output_tokens=MAX_TOKENS_SALIDA)
    perfil = BrowserProfile(headless=headless, allowed_domains=['localhost', '127.0.0.1'], keep_alive=True)
    sesion = BrowserSession(browser_profile=perfil)
    try:
        # Control negativo: el mensaje es un toast de 5 s. El observador se instala ANTES de que
        # la IA actue; si no queda vivo, no se gasta el modelo y el caso no es concluyente.
        if caso.negativo:
            instalado, aviso_obs = await instalar_observador(sesion)
            registro['observador_instalado'] = instalado
            if aviso_obs:
                registro['aviso_observador'] = aviso_obs
            if not instalado:
                registro.update(veredicto='NO CONCLUYENTE', origen_falla='SCRIPT',
                                detalle='El observador de avisos no pudo instalarse a tiempo; '
                                        'no se ejecutó la IA. ' + (aviso_obs or ''))
                return registro

        agente = Agent(
            task=redactar_tarea_negativa(documento) if caso.negativo else redactar_tarea(documento),
            llm=llm,
            browser_session=sesion,
            sensitive_data={'x_correo_entrenador': ent['email'], 'x_documento_entrenador': ent['documento']},
            output_model_schema=LecturaNegativa if caso.negativo else Lectura,
            use_vision=True,
            max_failures=3,
            directly_open_url=True,
        )
        excepcion = None
        historia = None
        try:
            historia = await agente.run(max_steps=15)
        except Exception as e:  # noqa: BLE001
            excepcion = e

        errores = [str(x) for x in historia.errors() if x] if historia else []
        registro['errores_del_agente'] = errores
        if historia:
            registro['pasos'] = historia.number_of_steps()
            registro['segundos'] = round(historia.total_duration_seconds(), 1)

        # 4) Evidencia: se lee la pagina y se captura con la MISMA sesion, pase lo que pase.
        pag = None
        try:
            pag = await leer_pagina(sesion)
            registro['pagina'] = {k: pag[k] for k in ('url', 'hay_resultado', 'nombre', 'estado', 'linea', 'error')}
        except Exception as e:  # noqa: BLE001
            registro['aviso_pagina'] = f'No se pudo leer la página: {e!r}'
        obs = None
        if caso.negativo:
            try:
                obs = await leer_observador(sesion)
                registro['observador'] = {
                    'vivo': obs['vivo'], 'toasts': obs['toasts'],
                    'avisos_total': len(obs['avisos']), 'avisos_ultimos': obs['avisos'][-10:]}
            except Exception as e:  # noqa: BLE001
                registro['aviso_observador_lectura'] = f'No se pudo leer el observador: {e!r}'
        ruta, aviso = await guardar_captura(sesion, SALIDA / f'rf15-{sello}-tarea{caso.numero}.png')
        registro['captura'] = ruta
        if aviso:
            registro['aviso_captura'] = aviso

        # 5) Sin lectura de la IA no hay veredicto.
        salida = historia.structured_output if historia else None
        if excepcion is not None or salida is None:
            modelo_falla = error_del_modelo(errores, excepcion)
            registro.update(
                veredicto='NO CONCLUYENTE',
                origen_falla='MODELO/ENTORNO' if modelo_falla else 'IA',
                detalle=(f'El agente lanzó una excepción: {excepcion!r}' if excepcion is not None
                         else 'La IA no devolvió los datos en el formato pedido.'),
                final_texto=historia.final_result() if historia else None)
            return registro
        lectura = salida.model_dump()
        registro['lectura_ia'] = lectura

        # La IA dejó la línea vacía: reconoció que no la vio. No es un invento ni un fallo de la app.
        if not caso.negativo and (lectura['inasistencias'] is None or lectura['limite'] is None
                                  or not _norm(lectura['texto_linea'])):
            registro.update(veredicto='NO CONCLUYENTE', origen_falla='IA',
                            detalle='La IA no vio la línea "Inasistencias: X de Y" y la dejó vacía.')
            return registro

        if pag is None:
            registro.update(veredicto='NO CONCLUYENTE', origen_falla='SCRIPT/ENTORNO',
                            detalle='La IA respondió pero no pude leer la página para confirmarlo.')
            return registro

        # 6) Verificacion independiente: lo que dijo la IA ¿esta en la pagina?
        if caso.negativo:
            if obs is None or not obs['vivo']:
                # Sin observador no se puede saber si el toast salio: no se acusa a la IA.
                registro.update(veredicto='NO CONCLUYENTE', origen_falla='SCRIPT',
                                detalle='El observador de avisos se perdió (la página se recargó o se '
                                        'abrió otra pestaña): no hay forma de comprobar el mensaje.')
                return registro
            filas_pagina = verificar_negativo_en_pagina(lectura, pag, obs)
        else:
            filas_pagina = verificar_lectura_en_pagina(lectura, pag)
        registro['verificacion_pagina'] = filas_pagina
        inventados = [f['campo'] for f in filas_pagina if not f['coincide']]
        if inventados:
            registro.update(
                veredicto=VEREDICTO_FALSO_POSITIVO, origen_falla='IA',
                detalle='Valores que la IA reportó y que NO están en la página: ' + ', '.join(inventados))
            return registro

        # 7) Comparacion contra lo esperado.
        if caso.negativo:
            # El mensaje esperado se busca en lo que MOSTRO la pagina (toast / observador), no en la IA.
            visto, via = mensaje_observado(obs, pag, MENSAJE_NO_EXISTE)
            registro['mensaje_visto_via'] = via
            obtenido = {'mensaje': visto, 'aparece_estudiante': pag['hay_resultado']}
            comp = comparar(esperado, obtenido)
            comp.append({'campo': 'mensaje reportado por la IA', 'esperado': MENSAJE_NO_EXISTE,
                         'obtenido': _norm(lectura['mensaje_de_error']),
                         'coincide': _norm(lectura['mensaje_de_error']) == MENSAJE_NO_EXISTE})
        else:
            obtenido = {'nombre': _norm(lectura['nombre']), 'estado': _norm(lectura['estado']).upper(),
                        'inasistencias': lectura['inasistencias'], 'limite': lectura['limite']}
            comp = comparar(esperado, obtenido)
        registro['comparacion'] = comp
        if all(c['coincide'] for c in comp):
            registro['veredicto'] = 'PASA'
            return registro

        registro['veredicto'] = 'FALLA'
        if not api_ok:
            registro['origen_falla'] = 'APP (la API ya devuelve otro valor que el esperado)'
        elif caso.negativo and pag['hay_resultado']:
            registro['origen_falla'] = 'APP/INTERFAZ (mostró un estudiante para un documento inexistente)'
        else:
            registro['origen_falla'] = ('IA (no reportó lo que había en la página) o INTERFAZ '
                                        '(muestra distinto a la API): revisar la captura')
        return registro
    finally:
        try:
            await sesion.kill()
        except Exception:  # noqa: BLE001
            pass


def mostrar(r):
    print(f"\n=== Tarea {r['caso']}: {r['titulo']} ===")
    print(f"  Veredicto: {r['veredicto']}")
    for c in r.get('comparacion', []):
        marca = 'OK ' if c['coincide'] else 'XX '
        print(f"   {marca}{c['campo']}: esperado={c['esperado']!r}  obtenido={c['obtenido']!r}")
    for c in r.get('verificacion_pagina', []):
        marca = 'OK ' if c['coincide'] else 'XX '
        via = f" (vía {c['via']})" if c.get('via') else ''
        print(f"   [pagina] {marca}{c['campo']}: la IA dijo {c['ia']!r}  la página tuvo {c['pagina']!r}{via}")
    if r.get('origen_falla'):
        print(f"  Origen de la falla: {r['origen_falla']}")
    if r.get('detalle'):
        print(f"  Detalle: {r['detalle']}")
    if r.get('captura'):
        print(f"  Captura: {r['captura']}")
    elif r.get('aviso_captura'):
        print(f"  Captura: {r['aviso_captura']}")
    if 'pasos' in r:
        print(f"  Pasos de la IA: {r['pasos']}  ·  {r['segundos']} s")


async def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--headless', action='store_true')
    ap.add_argument('--solo', type=int, choices=[c.numero for c in CASOS])
    args = ap.parse_args()

    if not os.environ.get('GOOGLE_API_KEY'):
        print('Falta GOOGLE_API_KEY en ia_browser_use/.env (copia .env.example a .env y pon tu clave).')
        return 2

    usuarios = cargar_usuarios()
    SALIDA.mkdir(exist_ok=True)
    sello = datetime.now().strftime('%Y%m%d-%H%M%S')
    resultados = []
    for caso in CASOS:
        if args.solo and caso.numero != args.solo:
            continue
        r = await correr_caso(caso, usuarios, args.headless, sello)
        resultados.append(r)
        mostrar(r)

    destino = SALIDA / f'rf15-{sello}.json'
    destino.write_text(json.dumps(resultados, ensure_ascii=False, indent=2, default=str), encoding='utf-8')
    print(f'\nResultado guardado en {destino}')
    pasan = sum(1 for r in resultados if r['veredicto'] == 'PASA')
    print(f'Resumen: {pasan} de {len(resultados)} tareas pasan.')
    return 0 if pasan == len(resultados) else 1


if __name__ == '__main__':
    sys.exit(asyncio.run(main()))

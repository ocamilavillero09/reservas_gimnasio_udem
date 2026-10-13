"""Análisis de las respuestas del formulario de usabilidad (Microsoft Forms).

    python regression_testing/ux/analisis_formulario.py

Lee formulario/respuestas.xlsx (exportado desde Forms) y deja en formulario/:
    resultados.json          puntajes por dimensión, ítems más bajos, calidad de datos
    tablas.md                tablas listas para el informe
    dimensiones.png          gráfica de puntaje por dimensión
    items_bajos.png          los ítems con peor valoración

Escalas: ítems 1–5 (Likert) salvo el bloque emocional (preguntas 30–38), 1–7.
El puntaje 0–100 de cada dimensión es (media − 1) / (máx − 1) × 100.
"""
import json
import statistics as st
from datetime import datetime
from pathlib import Path

import openpyxl

AQUI = Path(__file__).resolve().parent
CARPETA = AQUI / 'formulario'

# ── Estructura del formulario ──────────────────────────────────────────────
# Columnas de la hoja exportada (0 = ID). Sección 1: atributos de usabilidad.
SECCION_1 = {
    'Eficiencia': range(6, 10),
    'Eficacia': range(10, 13),
    'Satisfacción': range(13, 17),
    'Facilidad de aprendizaje': range(17, 20),
    'Memorabilidad': range(20, 23),
    'Seguridad': range(23, 26),
    'Flexibilidad': range(26, 29),
    'Manejo de errores': range(29, 32),
    'Accesibilidad': range(32, 35),
}
EMOCIONAL = range(35, 44)            # preguntas 30–38, escala 1–7
# Sección 2: 50 afirmaciones generales, agrupadas en las mismas dimensiones
# para triangular. Número de pregunta -> dimensión.
SECCION_2 = {
    'Eficiencia': [2, 18, 25, 30, 37, 39, 43, 48],
    'Eficacia': [7, 8, 17, 19, 21, 32],
    'Satisfacción': [1, 11, 16, 47, 50],
    'Facilidad de aprendizaje': [3, 4, 12, 20, 26, 27, 28, 34, 35, 45, 49],
    'Memorabilidad': [23],
    'Flexibilidad': [9, 29, 42, 44, 46],
    'Manejo de errores': [5, 10, 15, 31, 33, 38],
    'Estética': [6, 14, 24, 40],
    'Ayuda y documentación': [13, 36],
}
COL_S2 = 43                          # la pregunta n de la sección 2 está en la columna 43 + n
# Ítems redactados en negativo: se invierten (6 − valor). El formulario marca
# también la 26 como "(Inversa)", pero su redacción es positiva ("No necesito
# leer el manual"): estar de acuerdo es bueno, así que NO se invierte.
INVERSAS_S2 = {11, 14}
# Sección 3: escala de compromiso del usuario (tipo UES).
SECCION_3 = {
    'Estética': range(94, 96),
    'Usabilidad percibida': range(96, 100),
    'Atención focalizada': range(100, 104),
    'Implicación': range(104, 108),
    'Utilidad': range(108, 111),
    'Satisfacción y lealtad': range(111, 116),
}


def valor(celda):
    if celda is None or str(celda).strip() == '':
        return None
    return int(str(celda).strip().split(' ')[0].split('-')[0])


def media(xs):
    xs = [x for x in xs if x is not None]
    return st.mean(xs) if xs else None


def puntaje(m, maximo=5):
    return None if m is None else (m - 1) / (maximo - 1) * 100


def alfa_cronbach(filas):
    """Alfa de Cronbach con casos completos (filas = respuestas, columnas = ítems)."""
    completas = [f for f in filas if None not in f]
    k = len(completas[0]) if completas else 0
    if k < 2 or len(completas) < 3:
        return None
    var_items = [st.pvariance([f[i] for f in completas]) for i in range(k)]
    var_total = st.pvariance([sum(f) for f in completas])
    return None if var_total == 0 else k / (k - 1) * (1 - sum(var_items) / var_total)


def fecha(v):
    return v if isinstance(v, datetime) else datetime.fromisoformat(str(v))


def cargar():
    hoja = openpyxl.load_workbook(CARPETA / 'respuestas.xlsx').active
    filas = list(hoja.iter_rows(values_only=True))
    return filas[0], filas[1:]


def calidad(encabezado, datos):
    """Reglas objetivas de calidad de respuesta, fijadas antes de mirar resultados."""
    minutos = {r[0]: (fecha(r[2]) - fecha(r[1])).total_seconds() / 60 for r in datos}
    mediana = st.median(minutos.values())
    filas = []
    for r in datos:
        likert = [valor(v) for v in list(r[6:35]) + list(r[44:116]) if valor(v) is not None]
        frustrante, distraido = valor(r[COL_S2 + 11]), valor(r[COL_S2 + 14])
        motivos = []
        # 1. Rapidez: menos de la mitad de la mediana del grupo (110 preguntas).
        if minutos[r[0]] < mediana / 2:
            motivos.append(f'rápida ({minutos[r[0]]:.1f} min, {minutos[r[0]] * 60 / 110:.1f} s por pregunta)')
        # 2. Sin variación: la misma respuesta en todo.
        if st.pstdev(likert) < 0.3:
            motivos.append('misma respuesta en casi todo')
        # 3. Contradicción: de acuerdo con "me resulta frustrante" y con "me
        #    distraigo" a la vez que valora todo lo positivo con 4,5 o más.
        positivos = [valor(r[c]) for c in range(6, 35) if valor(r[c])]
        if frustrante and distraido and frustrante >= 4 and distraido >= 4 and media(positivos) >= 4.5:
            motivos.append('contradice las preguntas inversas')
        filas.append({'id': r[0], 'inicio': fecha(r[1]).strftime('%Y-%m-%d %H:%M'),
                      'minutos': round(minutos[r[0]], 1), 'media': round(st.mean(likert), 2),
                      'motivos': motivos})
    return filas, mediana


def analizar(encabezado, datos):
    resultado = {}
    for nombre, cols in SECCION_1.items():
        matriz = [[valor(r[c]) for c in cols] for r in datos]
        todos = [v for f in matriz for v in f if v is not None]
        s2 = [(6 - valor(r[COL_S2 + n])) if n in INVERSAS_S2 else valor(r[COL_S2 + n])
              for r in datos for n in SECCION_2.get(nombre, []) if valor(r[COL_S2 + n]) is not None]
        resultado[nombre] = {
            'media_s1': round(media(todos), 2), 'puntaje_s1': round(puntaje(media(todos))),
            'favorable_s1': round(100 * sum(v >= 4 for v in todos) / len(todos)),
            'desfavorable_s1': round(100 * sum(v <= 2 for v in todos) / len(todos)),
            'media_s2': round(media(s2), 2) if s2 else None,
            'alfa': (round(alfa_cronbach(matriz), 2) if alfa_cronbach(matriz) is not None else None),
            'preguntas': [encabezado[c] for c in cols],
        }
    for nombre in ('Estética', 'Ayuda y documentación'):
        s2 = [(6 - valor(r[COL_S2 + n])) if n in INVERSAS_S2 else valor(r[COL_S2 + n])
              for r in datos for n in SECCION_2[nombre] if valor(r[COL_S2 + n]) is not None]
        resultado[nombre] = {'media_s1': None, 'puntaje_s1': None, 'media_s2': round(media(s2), 2),
                             'puntaje_s2': round(puntaje(media(s2)))}
    emocional = [valor(r[c]) for r in datos for c in EMOCIONAL if valor(r[c]) is not None]
    resultado['_emocional'] = {'media_1a7': round(media(emocional), 2), 'puntaje': round(puntaje(media(emocional), 7))}
    resultado['_seccion_3'] = {n: round(media([valor(r[c]) for r in datos for c in cols]), 2)
                               for n, cols in SECCION_3.items()}
    # Ítems 1–5 con peor valoración (las inversas ya invertidas).
    items = []
    for c in list(range(6, 35)) + list(range(44, 94)) + list(range(94, 116)):
        n_s2 = c - COL_S2 if 44 <= c <= 93 else None
        vals = [valor(r[c]) for r in datos if valor(r[c]) is not None]
        if n_s2 in INVERSAS_S2:
            vals = [6 - v for v in vals]
        if c in SECCION_3['Atención focalizada']:
            continue           # "pierdo la noción del tiempo": no es una meta para una app de reservas
        seccion = 'S1' if c < 44 else 'S2' if c < 94 else 'S3'
        texto = f"{seccion} · " + encabezado[c].replace(' (Inversa)', '') + (' (invertida)' if n_s2 in INVERSAS_S2 else '')
        items.append({'pregunta': texto, 'media': round(st.mean(vals), 2),
                      'desacuerdo': round(100 * sum(v <= 2 for v in vals) / len(vals)), 'n': len(vals)})
    resultado['_items_bajos'] = sorted(items, key=lambda x: x['media'])[:10]
    return resultado


def graficas(validas, todas, destino):
    # validas = análisis principal (las 15); todas = sensibilidad sin las rápidas.
    import matplotlib
    matplotlib.use('Agg')
    import matplotlib.pyplot as plt
    from matplotlib import font_manager
    for f in font_manager.findSystemFonts():
        if 'Inter' in f:
            font_manager.fontManager.addfont(f)
    plt.rcParams.update({'font.family': 'Inter', 'font.size': 10, 'axes.edgecolor': '#d6d5d0',
                         'text.color': '#0b0b0b', 'axes.labelcolor': '#52514e',
                         'xtick.color': '#52514e', 'ytick.color': '#0b0b0b'})
    SERIE_1, SERIE_2, SUPERFICIE = '#2a78d6', '#eb6834', '#fcfcfb'

    # 1. Puntaje por dimensión: respuestas válidas frente a todas.
    dims = [d for d in SECCION_1]
    orden = sorted(dims, key=lambda d: validas[d]['puntaje_s1'])
    fig, ax = plt.subplots(figsize=(8, 5.2), facecolor=SUPERFICIE)
    ax.set_facecolor(SUPERFICIE)
    y = range(len(orden))
    alto = 0.36
    ax.barh([i + alto / 2 + 0.01 for i in y], [validas[d]['puntaje_s1'] for d in orden], height=alto,
            color=SERIE_1, label='Las 15 respuestas')
    ax.barh([i - alto / 2 - 0.01 for i in y], [todas[d]['puntaje_s1'] for d in orden], height=alto,
            color=SERIE_2, label='Sin las 4 respuestas más rápidas')
    for i, d in enumerate(orden):
        ax.text(validas[d]['puntaje_s1'] + 1, i + alto / 2, f"{validas[d]['puntaje_s1']}", va='center', fontsize=9, color='#0b0b0b')
    ax.set_yticks(list(y), orden)
    ax.set_xlim(0, 100)
    ax.axvline(75, color='#9a9992', lw=1, ls=(0, (4, 3)))
    ax.text(75.5, -0.75, 'meta 75', fontsize=8, color='#52514e')
    ax.set_xlabel('Puntaje 0–100 (sección 1 del formulario)')
    ax.set_title('Usabilidad percibida por dimensión', loc='left', fontsize=13, fontweight='bold', pad=30)
    for lado in ('top', 'right'):
        ax.spines[lado].set_visible(False)
    ax.grid(axis='x', color='#ebeae6', lw=0.8)
    ax.set_axisbelow(True)
    ax.legend(frameon=False, loc='lower left', bbox_to_anchor=(0, 1.0), ncol=2, fontsize=9)
    fig.tight_layout()
    fig.savefig(destino / 'dimensiones.png', dpi=160)
    plt.close(fig)

    # 2. Los diez ítems peor valorados.
    bajos = validas['_items_bajos'][::-1]
    fig, ax = plt.subplots(figsize=(9, 5.2), facecolor=SUPERFICIE)
    ax.set_facecolor(SUPERFICIE)
    etiquetas = [(b['pregunta'][:70] + '…') if len(b['pregunta']) > 70 else b['pregunta'] for b in bajos]
    ax.barh(range(len(bajos)), [b['media'] for b in bajos], color=SERIE_1, height=0.6)
    for i, b in enumerate(bajos):
        ax.text(b['media'] + 0.04, i, f"{b['media']:.2f}", va='center', fontsize=9)
    ax.set_yticks(range(len(bajos)), etiquetas, fontsize=8.5)
    ax.set_xlim(1, 5)
    ax.set_xlabel('Media (1 = totalmente en desacuerdo, 5 = totalmente de acuerdo)')
    ax.set_title('Los diez ítems peor valorados (15 respuestas)', loc='left', fontsize=13, fontweight='bold')
    for lado in ('top', 'right'):
        ax.spines[lado].set_visible(False)
    ax.grid(axis='x', color='#ebeae6', lw=0.8)
    ax.set_axisbelow(True)
    fig.tight_layout()
    fig.savefig(destino / 'items_bajos.png', dpi=160)
    plt.close(fig)


def main():
    encabezado, datos = cargar()
    revision, mediana = calidad(encabezado, datos)
    # El equipo confirmó que todas las respuestas son de personas reales (a
    # quienes se les mostró la aplicación y la usaron libremente), así que el
    # análisis principal usa las 15. Las respuestas muy rápidas se marcan y se
    # hace un análisis de sensibilidad sin ellas, para ver si cambian la conclusión.
    marcadas = {f['id'] for f in revision if any(m.startswith('rápida') or m.startswith('misma') for m in f['motivos'])}
    sin_rapidas = [r for r in datos if r[0] not in marcadas]
    res_todas = analizar(encabezado, datos)
    res_sensibilidad = analizar(encabezado, sin_rapidas)
    graficas(res_todas, res_sensibilidad, CARPETA)
    excluidas, validas, res_validas = marcadas, sin_rapidas, res_todas

    salida = {'respuestas': len(datos), 'sin_rapidas': len(validas), 'mediana_minutos': round(mediana, 1),
              'revision_calidad': revision, 'marcadas_rapidas': sorted(excluidas),
              'resultados': res_todas, 'sensibilidad_sin_rapidas': res_sensibilidad}
    (CARPETA / 'resultados.json').write_text(json.dumps(salida, ensure_ascii=False, indent=1, default=str))

    md = ['| Dimensión | Media (1–5) | Puntaje 0–100 | % de acuerdo (4–5) | % en desacuerdo (1–2) | Sección 2 (triangulación) | α de Cronbach | Sin las respuestas rápidas |',
          '|---|---|---|---|---|---|---|---|']
    for d in sorted(SECCION_1, key=lambda d: res_validas[d]['puntaje_s1']):
        v, t = res_validas[d], res_todas[d]
        md.append(f"| {d} | {v['media_s1']:.2f} | {v['puntaje_s1']} | {v['favorable_s1']} % | {v['desfavorable_s1']} % | "
                  f"{v['media_s2'] if v['media_s2'] is not None else '—'} | {v['alfa'] if v['alfa'] is not None else '—'} | {res_sensibilidad[d]['puntaje_s1']} |")
    md += ['', '| Ítem (15 respuestas) | Media | % en desacuerdo |', '|---|---|---|']
    md += [f"| {b['pregunta']} | {b['media']:.2f} | {b['desacuerdo']} % |" for b in res_validas['_items_bajos']]
    md += ['', '| Respuesta | Inicio | Minutos | Media | Observación |', '|---|---|---|---|---|']
    md += [f"| {f['id']} | {f['inicio']} | {f['minutos']} | {f['media']} | "
           f"{('Marcada (incluida en el análisis): ' if f['id'] in excluidas else '') + '; '.join(f['motivos']) or '—'} |" for f in revision]
    (CARPETA / 'tablas.md').write_text('\n'.join(md))
    print(f"{len(datos)} respuestas; marcadas como rápidas: {sorted(excluidas)}")
    for d in SECCION_1:
        print(f"  {d:26} {res_todas[d]['puntaje_s1']:>3}  (sin rápidas {res_sensibilidad[d]['puntaje_s1']})  α={res_todas[d]['alfa']}")


if __name__ == '__main__':
    main()

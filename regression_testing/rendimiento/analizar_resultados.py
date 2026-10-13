"""Resume las ejecuciones de k6 y dibuja las gráficas del informe de rendimiento.

    python regression_testing/rendimiento/analizar_resultados.py

Lee resultados/<etiqueta>/*-resumen.json y *-serie.csv.gz y deja:
    graficas/estres_p95_por_carga.png    p95 por nivel de usuarios (50, 100, 200)
    graficas/carga_p95_por_operacion.png p95 de cada operación con 50 usuarios, antes y después
    resultados/tablas.md                 tablas para el informe
"""
import csv
import gzip
import json
import statistics as st
from pathlib import Path

AQUI = Path(__file__).resolve().parent
RES = AQUI / 'resultados'
GRAF = AQUI / 'graficas'

EJECUCIONES = {
    'antes': 'Antes (runserver)',
    'despues': 'Después (runserver)',
    'despues-gunicorn': 'Después + gunicorn',
}
OPERACIONES = ['login', 'horarios', 'mis_reservas', 'historial', 'RF11_buscar', 'RF11_registrar',
               'RF12_pendientes', 'RF16_registro_diario', 'RF20_enviar', 'RF21_buzon']
NOMBRES = {
    'login': 'Iniciar sesión', 'horarios': 'Consultar horarios', 'mis_reservas': 'Mis reservas',
    'historial': 'Historial', 'RF11_buscar': 'RF11 · Buscar estudiante', 'RF11_registrar': 'RF11 · Registrar asistencia',
    'RF12_pendientes': 'RF12 · Pendientes', 'RF16_registro_diario': 'RF16 · Registro diario',
    'RF20_enviar': 'RF20 · Enviar sugerencia', 'RF21_buzon': 'RF21 · Buzón',
}
# Mesetas del perfil de estrés (segundos desde el inicio): 50, 100 y 200 usuarios.
MESETAS = {50: (30, 75), 100: (105, 150), 200: (180, 225)}
LIMITE_MS = 500


def resumen(etiqueta, perfil):
    ruta = RES / etiqueta / f'{perfil}-resumen.json'
    return json.loads(ruta.read_text())['metrics'] if ruta.exists() else None


def serie(etiqueta, perfil):
    """(segundos desde el inicio, duración ms, falló) de cada petición."""
    ruta = RES / etiqueta / f'{perfil}-serie.csv.gz'
    if not ruta.exists():
        return None
    duraciones, fallos, inicio = [], {}, None
    with gzip.open(ruta, 'rt') as f:
        for fila in csv.DictReader(f):
            t = int(fila['timestamp'])
            inicio = t if inicio is None else min(inicio, t)
            if fila['metric_name'] == 'http_req_duration':
                duraciones.append((t, float(fila['metric_value'])))
            elif fila['metric_name'] == 'http_req_failed':
                fallos.setdefault(t, []).append(float(fila['metric_value']))
    return inicio, duraciones, fallos


def p95(xs):
    return st.quantiles(xs, n=100)[94] if len(xs) >= 20 else max(xs)


def por_meseta(etiqueta):
    datos = serie(etiqueta, 'estres')
    if not datos:
        return None
    inicio, duraciones, fallos = datos
    salida = {}
    for usuarios, (a, b) in MESETAS.items():
        ventana = [d for t, d in duraciones if a <= t - inicio < b]
        errores = [v for t, vs in fallos.items() if a <= t - inicio < b for v in vs]
        salida[usuarios] = {'p95': p95(ventana), 'mediana': st.median(ventana),
                            'rps': len(ventana) / (b - a),
                            'errores_pct': 100 * sum(errores) / len(errores) if errores else 0}
    return salida


def estilo():
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
    return plt


COLORES = {'antes': '#2a78d6', 'despues': '#eb6834', 'despues-gunicorn': '#1baf7a'}
SUPERFICIE = '#fcfcfb'


def grafica_mesetas(mesetas):
    plt = estilo()
    fig, ax = plt.subplots(figsize=(8, 4.8), facecolor=SUPERFICIE)
    ax.set_facecolor(SUPERFICIE)
    niveles = list(MESETAS)
    for etiqueta, nombre in EJECUCIONES.items():
        if not mesetas.get(etiqueta):
            continue
        ys = [mesetas[etiqueta][n]['p95'] for n in niveles]
        ax.plot(niveles, ys, color=COLORES[etiqueta], lw=2, marker='o', ms=8,
                markeredgecolor=SUPERFICIE, markeredgewidth=2, label=nombre)
        ax.annotate(f'{ys[-1]:,.0f} ms'.replace(',', '.'), (niveles[-1], ys[-1]), xytext=(8, 0),
                    textcoords='offset points', va='center', fontsize=9, color='#0b0b0b')
    ax.axhline(LIMITE_MS, color='#9a9992', lw=1, ls=(0, (4, 3)))
    ax.text(niveles[0], LIMITE_MS * 1.04, 'criterio: p95 < 500 ms', fontsize=8, color='#52514e')
    ax.set_xticks(niveles, [f'{n} usuarios' for n in niveles])
    ax.set_xlim(35, 240)
    ax.set_ylabel('Tiempo de respuesta p95 (ms)')
    ax.set_title('Prueba de estrés: p95 según usuarios simultáneos', loc='left', fontsize=13, fontweight='bold', pad=30)
    ax.legend(frameon=False, loc='lower left', bbox_to_anchor=(0, 1.0), ncol=3, fontsize=9)
    for lado in ('top', 'right'):
        ax.spines[lado].set_visible(False)
    ax.grid(axis='y', color='#ebeae6', lw=0.8)
    ax.set_axisbelow(True)
    fig.tight_layout()
    fig.savefig(GRAF / 'estres_p95_por_carga.png', dpi=160)
    plt.close(fig)


def grafica_operaciones(perfil, archivo, titulo):
    plt = estilo()
    antes, despues = resumen('antes', perfil), resumen('despues', perfil)
    ops = sorted(OPERACIONES, key=lambda o: antes[f'http_req_duration{{op:{o}}}']['p(95)'])
    fig, ax = plt.subplots(figsize=(8.5, 5.4), facecolor=SUPERFICIE)
    ax.set_facecolor(SUPERFICIE)
    alto = 0.36
    for i, o in enumerate(ops):
        a = antes[f'http_req_duration{{op:{o}}}']['p(95)']
        d = despues[f'http_req_duration{{op:{o}}}']['p(95)']
        ax.barh(i + alto / 2 + 0.01, a, height=alto, color=COLORES['antes'], label='Antes' if i == 0 else None)
        ax.barh(i - alto / 2 - 0.01, d, height=alto, color=COLORES['despues'], label='Después' if i == 0 else None)
        ax.text(a + 4, i + alto / 2, f'{a:.0f}', va='center', fontsize=8.5)
        ax.text(d + 4, i - alto / 2, f'{d:.0f}', va='center', fontsize=8.5)
    ax.set_yticks(range(len(ops)), [NOMBRES[o] for o in ops])
    ax.set_xlabel('Tiempo de respuesta p95 (ms)')
    ax.set_title(titulo, loc='left', fontsize=13, fontweight='bold', pad=30)
    ax.legend(frameon=False, loc='lower left', bbox_to_anchor=(0, 1.0), ncol=2, fontsize=9)
    for lado in ('top', 'right'):
        ax.spines[lado].set_visible(False)
    ax.grid(axis='x', color='#ebeae6', lw=0.8)
    ax.set_axisbelow(True)
    fig.tight_layout()
    fig.savefig(GRAF / archivo, dpi=160)
    plt.close(fig)


def fmt(ms):
    return f'{ms / 1000:.2f} s' if ms >= 1000 else f'{ms:.0f} ms'


def main():
    GRAF.mkdir(exist_ok=True)
    mesetas = {e: por_meseta(e) for e in EJECUCIONES}
    grafica_mesetas(mesetas)
    grafica_operaciones('carga', 'carga_p95_por_operacion.png', 'Carga de 50 usuarios: p95 por operación')
    grafica_operaciones('estres', 'estres_p95_por_operacion.png', 'Estrés hasta 200 usuarios: p95 por operación')

    md = []
    for perfil, titulo in (('carga', 'Carga — 50 usuarios simultáneos durante 2 min'),
                           ('estres', 'Estrés — escalones de 50, 100 y 200 usuarios')):
        cols = [e for e in EJECUCIONES if resumen(e, perfil)]
        md += [f'**{titulo}**', '', '| Métrica | ' + ' | '.join(EJECUCIONES[e] for e in cols) + ' |',
               '|---|' + '---|' * len(cols)]
        res = {e: resumen(e, perfil) for e in cols}
        filas = [
            ('Peticiones', lambda m: f"{m['http_reqs']['count']:,}".replace(',', '.')),
            ('Peticiones por segundo', lambda m: f"{m['http_reqs']['rate']:.1f}"),
            ('Errores', lambda m: f"{100 * m['http_req_failed']['value']:.2f} %"),
            ('Mediana', lambda m: fmt(m['http_req_duration']['med'])),
            ('p95 (criterio < 500 ms)', lambda m: fmt(m['http_req_duration']['p(95)'])),
            ('p99', lambda m: fmt(m['http_req_duration']['p(99)'])),
            ('Máximo', lambda m: fmt(m['http_req_duration']['max'])),
        ]
        for nombre, f in filas:
            md.append(f'| {nombre} | ' + ' | '.join(f(res[e]) for e in cols) + ' |')
        md += ['', '| Operación (p95) | ' + ' | '.join(EJECUCIONES[e] for e in cols) + ' |', '|---|' + '---|' * len(cols)]
        for o in OPERACIONES:
            limite = 800 if o == 'login' else LIMITE_MS
            celdas = []
            for e in cols:
                v = res[e][f'http_req_duration{{op:{o}}}']['p(95)']
                celdas.append(f"{fmt(v)} {'✅' if v < limite else '❌'}")
            md.append(f'| {NOMBRES[o]} | ' + ' | '.join(celdas) + ' |')
        md.append('')
    md += ['**Estrés por escalón** (p95 · mediana · peticiones por segundo · errores)', '',
           '| Usuarios | ' + ' | '.join(EJECUCIONES.values()) + ' |', '|---|---|---|---|']
    for n in MESETAS:
        celdas = []
        for e in EJECUCIONES:
            m = (mesetas.get(e) or {}).get(n)
            celdas.append(f"{fmt(m['p95'])} {'✅' if m['p95'] < LIMITE_MS else '❌'} · {fmt(m['mediana'])} · {m['rps']:.0f}/s · {m['errores_pct']:.1f} %" if m else '—')
        md.append(f'| {n} | ' + ' | '.join(celdas) + ' |')
    (RES / 'tablas.md').write_text('\n'.join(md))
    print('\n'.join(md))


if __name__ == '__main__':
    main()

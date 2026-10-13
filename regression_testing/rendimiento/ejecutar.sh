#!/usr/bin/env bash
# Ejecuta una prueba de rendimiento completa y guarda sus resultados.
#
#   ./ejecutar.sh <etiqueta> <perfil>      perfil: humo | carga | estres | lote
#   ./ejecutar.sh antes carga
#
# Cada ejecución vuelve a sembrar la base (las pruebas registran asistencias y
# la dejan cambiada) y guarda en resultados/<etiqueta>/:
#   <perfil>-resumen.json   métricas finales (p95, errores, umbrales)
#   <perfil>-serie.csv.gz   cada petición con su tiempo, para las gráficas
#   <perfil>-consola.txt    la salida de k6
set -euo pipefail
cd "$(dirname "$0")"
ETIQUETA=${1:?etiqueta}
PERFIL=${2:?perfil}
K6=${K6:-k6}
SALIDA="resultados/$ETIQUETA"
mkdir -p "$SALIDA"

node sembrar_datos.mjs > /dev/null

if [ "$PERFIL" = "lote" ]; then
  "$K6" run --quiet --summary-export "$SALIDA/lote-resumen.json" lote_rf13.js 2>&1 | tee "$SALIDA/lote-consola.txt"
else
  "$K6" run --quiet -e PERFIL="$PERFIL" \
    --summary-export "$SALIDA/$PERFIL-resumen.json" \
    --out "csv=$SALIDA/$PERFIL-serie.csv.gz" \
    carga.js 2>&1 | tee "$SALIDA/$PERFIL-consola.txt" || true   # un umbral incumplido no detiene la serie
fi

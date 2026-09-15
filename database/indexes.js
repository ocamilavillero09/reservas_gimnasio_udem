// ============================================================================
//  ÍNDICES — verificación
// ----------------------------------------------------------------------------
//      mongosh mongodb://localhost:27017 database/indexes.js
//
//  Este script NO crea índices: solo muestra los que la base tiene puestos.
//  Los índices se declaran en un único sitio, `init.mongodb.js`, que es el que
//  MongoDB ejecuta al arrancar el contenedor sobre un volumen vacío. Tenerlos
//  declarados también aquí significaba mantener dos copias de las mismas diez
//  definiciones, y bastaba con cambiar una y olvidar la otra para que la base
//  real dejara de parecerse a lo que dice el repositorio.
//
//  Sirve para comprobar, después de levantar el stack, que la inicialización
//  se ejecutó y que las reglas respaldadas por la base están en su sitio: el
//  correo y el documento únicos (RN02), una sola disponibilidad por jornada y
//  bloque, y una única reserva ACTIVA por estudiante y día (RN05).
// ============================================================================

db = db.getSiblingDB('gym_udem');

var COLECCIONES = ['users', 'slots', 'disponibilidad', 'reservations', 'suggestions'];

var total = 0;

print('\nIndices por coleccion:');
COLECCIONES.forEach(function (c) {
  print('\n  ' + c);
  var indices = db.getCollection(c).getIndexes();
  if (indices.length === 0) {
    print('    (la coleccion no existe o no tiene indices)');
    return;
  }
  indices.forEach(function (i) {
    // Se anota lo que hace especial a cada índice: los únicos impiden
    // duplicados, y el parcial solo cuenta los documentos que cumplen su
    // filtro, que es lo que permite una reserva activa por día y muchas
    // canceladas.
    var marcas = [];
    if (i.unique) { marcas.push('unico'); }
    if (i.partialFilterExpression) {
      marcas.push('parcial ' + JSON.stringify(i.partialFilterExpression));
    }
    print('    - ' + i.name + '  ' + JSON.stringify(i.key) +
          (marcas.length ? '  [' + marcas.join(', ') + ']' : ''));
    total += 1;
  });
});

print('\nTotal de indices: ' + total);
print('Si falta alguno, la inicializacion no llego a ejecutarse: el script de');
print('init.mongodb.js solo corre sobre un volumen vacio. Para rehacerla:');
print('  docker compose down -v && docker compose up --build');

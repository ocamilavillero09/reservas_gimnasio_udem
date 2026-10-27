import 'dotenv/config';
import { run } from '../src/run.js';
import { act, assertTexto, cantidad, dataCyDe, ejecutarCasos, esperarVisible, iniciarSesion, observe } from '../src/gimnasio.js';


run(() =>
  ejecutarCasos([
    {
      id: 'RF10_FRONT_C2',
      nombre: 'Validar un documento con formato incorrecto',
      probar: async (session) => {
        await iniciarSesion(session, 'entrenador');
        await esperarVisible(session, '[data-cy="buscar-contenedor"]');

       
        const [campo] = await observe(session, 'Encuentra el campo para escribir el documento del estudiante a buscar');
        if (!campo) throw new Error('Observe no encontró el campo del documento.');
        const dataCy = await dataCyDe(session, campo.selector);
        if (dataCy !== 'buscar-documento') {
          throw new Error(`Observe apuntó a otro elemento: data-cy=${dataCy}, selector=${campo.selector}`);
        }

     
        await act(session, 'Escribe %documento% en el campo de documento del buscador de estudiantes', { documento: 'abc' });
        await act(session, 'Haz clic en el botón Buscar del buscador de estudiantes');

       
        await assertTexto(session, '[data-cy="buscar-error"]', 'El documento tiene 10 dígitos, sin letras, puntos ni espacios.');
        const resultados = await cantidad(session, '[data-cy="buscar-resultado"]');
        if (resultados !== 0) throw new Error('No debería mostrarse ningún resultado.');
      },
    },
  ]),
);

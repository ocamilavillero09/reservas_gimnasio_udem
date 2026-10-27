import 'dotenv/config';
import { z } from 'zod';
import { run } from '../src/run.js';
import { act, assertEquals, ejecutarCasos, esperarVisible, extract, iniciarSesion, limpiar, observe } from '../src/gimnasio.js';


run(() =>
  ejecutarCasos([
    {
      id: 'RF06_FRONT_C2',
      nombre: 'Verificar cupos y estado de los horarios',
      probar: async (session) => {
        await iniciarSesion(session, 'estudiante');
        await act(session, 'Haz clic en la opción Reservar del menú superior');
        await esperarVisible(session, '[data-cy="dashboard-horarios"]');

  
        const tarjetas = await observe(session, 'Encuentra los botones para reservar cupo de cada bloque horario');
        if (tarjetas.length === 0) throw new Error('Observe no encontró ningún bloque horario.');

     
        const { bloques } = await extract(
          session,
          'Extrae cada bloque horario de la sección Disponibilidad en tiempo real: la hora de inicio (HH:MM), ' +
            'el número de cupos disponibles, el total de cupos y el texto del estado (por ejemplo Disponible).',
          z.object({
            bloques: z.array(
              z.object({ hora: z.string(), disponibles: z.number(), total: z.number(), estado: z.string() }),
            ),
          }),
        );

  
        const enPagina = await session.page.evaluate(() =>
          Array.from(document.querySelectorAll('[data-cy="dashboard-horarios"] > [data-cy^="dashboard-horario-"]')).map(
            (b) => ({
              hora: b.querySelector('[data-cy$="-hora"]')?.textContent?.trim() ?? '',
              disponibles: Number(b.querySelector('[data-cy$="-disponibles"]')?.textContent),
              total: Number(b.querySelector('[data-cy$="-cupos"]')?.textContent?.match(/\/\s*(\d+)/)?.[1]),
              estado: b.querySelector('[data-cy$="-estado"]')?.textContent?.trim() ?? '',
            }),
          ),
        );

        assertEquals(String(bloques.length), String(enPagina.length), 'La IA no leyó la misma cantidad de bloques.');
        enPagina.forEach((esperado, i) => {
          const leido = bloques[i];
          const bloque = `Bloque ${esperado.hora}`;
          if (!(esperado.disponibles >= 0)) throw new Error(`${bloque}: los cupos disponibles no son un número válido.`);
          if (!limpiar(esperado.estado)) throw new Error(`${bloque}: el estado está vacío.`);
          assertEquals(leido?.hora ?? '', esperado.hora, `${bloque}: la hora no coincide.`);
          assertEquals(String(leido?.disponibles), String(esperado.disponibles), `${bloque}: los cupos no coinciden.`);
          assertEquals(String(leido?.total), String(esperado.total), `${bloque}: el total de cupos no coincide.`);
          assertEquals(limpiar(leido?.estado ?? ''), limpiar(esperado.estado), `${bloque}: el estado no coincide.`);
        });
      },
    },
  ]),
);

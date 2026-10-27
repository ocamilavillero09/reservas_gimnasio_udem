import 'dotenv/config';
import { z } from 'zod';
import { run } from '../src/run.js';
import {
  act, assertEquals, assertTexto, ejecutarCasos, esperarVisible, extract, iniciarSesion, reservarPorApi, textoDe, usuarios,
} from '../src/gimnasio.js';

const ESTADO = '[data-cy^="mis-reservas-reserva-"][data-cy$="-estado"]';
const HORA = '[data-cy^="mis-reservas-reserva-"][data-cy$="-hora"]';


run(() =>
  ejecutarCasos([
    {
      id: 'RF08_FRONT_C2',
      nombre: 'Consultar los detalles de una reserva activa',
  
      preparar: () => reservarPorApi(usuarios.estudiante.email, 1),
      probar: async (session) => {
        await iniciarSesion(session, 'estudiante');

        await act(session, 'Haz clic en la opción Mis reservas del menú superior');
        await esperarVisible(session, '[data-cy="mis-reservas-lista"]');

      
        const reserva = await extract(
          session,
          'Extrae la reserva que aparece en la lista: la hora del bloque (HH:MM) y el texto de su estado.',
          z.object({ hora: z.string(), estado: z.string() }),
        );


        await assertTexto(session, ESTADO, 'Activa');
        await assertTexto(session, HORA, '06:00');
        await esperarVisible(session, '[data-cy="mis-reservas-recordatorio"]');
        assertEquals(reserva.hora, await textoDe(session, HORA), 'La hora extraída por la IA no coincide.');
        assertEquals(reserva.estado.replace(/^●\s*/, ''), 'Activa', 'El estado extraído por la IA no coincide.');
      },
    },
  ]),
);

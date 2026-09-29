"""
Pruebas unitarias de caja blanca — Camila (backend).

Requisitos: RF11, RF12, RF13, RF16, RF20 y RF21.

Cada clase corresponde a un diagrama de flujo de caja-blanca-drawio/ y cada
prueba a una fila de la tabla de caminos de caja-blanca-camila.docx. El nombre
de la prueba lleva los nodos del camino, para que la trazabilidad entre el
diagrama y el código sea directa.

Se prueba cada función de la vista por separado, llamándola con una petición
construida a mano (APIRequestFactory). La base de datos se reemplaza por
mongomock, un MongoDB en memoria, y el reloj se congela en AHORA para que las
reglas que dependen de la fecha y la hora den siempre el mismo resultado.

Las aserciones se escriben con PyHamcrest (assert_that), el estilo fluido que
usa el resto del equipo.
"""
from datetime import datetime, timedelta, timezone
from unittest.mock import patch

import mongomock
from bson import ObjectId
from django.test import SimpleTestCase
from hamcrest import (
    assert_that, equal_to, contains_string, has_length, has_entries, empty,
    is_not, none, not_none, greater_than, contains_exactly,
)
from rest_framework.test import APIRequestFactory

from api import attendance, features
from api import db as db_module


BOGOTA = timezone(timedelta(hours=-5))
# Martes 15 de septiembre de 2026, 10:30 a. m. en el gimnasio.
AHORA = datetime(2026, 9, 15, 10, 30, tzinfo=BOGOTA)
HOY = '2026-09-15'

ESTUDIANTE = 'juan.perez@soyudemedellin.edu.co'
ENTRENADOR = 'coach@udem.edu.co'
ADMIN = 'jefe@udemedellin.edu.co'
DOC_ESTUDIANTE = '1001234567'


class CajaBlancaBase(SimpleTestCase):

    def setUp(self):
        db_module._client = mongomock.MongoClient(tz_aware=True)
        self.db = db_module.get_db()
        self.factory = APIRequestFactory()

        reloj = patch('django.utils.timezone.localtime', return_value=AHORA)
        reloj.start()
        self.addCleanup(reloj.stop)

        self.db.users.insert_many([
            {'name': 'Juan Pérez', 'email': ESTUDIANTE, 'documento': DOC_ESTUDIANTE,
             'role': 'ESTUDIANTE', 'estado': 'ACTIVO', 'no_show_count': 0},
            {'name': 'Coach', 'email': ENTRENADOR, 'documento': '7009998881',
             'role': 'ENTRENADOR', 'estado': 'ACTIVO'},
            {'name': 'Jefa', 'email': ADMIN, 'documento': '3005554442',
             'role': 'ADMIN', 'estado': 'ACTIVO', 'es_principal': True},
        ])

    def tearDown(self):
        db_module._client = None

    def get(self, vista, url, query=None, *args):
        return vista(self.factory.get(url, query or {}), *args)

    def post(self, vista, url, datos):
        return vista(self.factory.post(url, datos, format='json'))

    def reserva(self, email=ESTUDIANTE, fecha=HOY, hour='08:00', slot_id=2, estado='ACTIVA'):
        return self.db.reservations.insert_one({
            'email': email, 'slotId': slot_id, 'hour': hour, 'reserva_date': fecha,
            'date': 'martes 15 de septiembre de 2026', 'estado': estado,
        }).inserted_id


# ── RF11 — registrar_asistencia · back_RF11_registrar_asistencia.drawio ─────
# V(G) = 9
class RF11RegistrarAsistenciaCaminos(CajaBlancaBase):
    URL = '/api/attendance/register/'

    def registrar(self, **datos):
        return self.post(attendance.registrar_asistencia, self.URL, datos)

    def test_rf11_camino_1_2_3_16_actor_estudiante(self):
        resp = self.registrar(actor_email=ESTUDIANTE, documento=DOC_ESTUDIANTE)
        assert_that(resp.status_code, equal_to(403))
        assert_that(resp.data['error'],
                    contains_string('Solo un entrenador o administrador puede registrar asistencias'))

    def test_rf11_camino_1_2_4_5_6_16_id_de_reserva_invalido(self):
        resp = self.registrar(actor_email=ENTRENADOR, reservation_id='no-es-un-id')
        assert_that(resp.status_code, equal_to(400))
        assert_that(resp.data['error'], equal_to('ID de reserva inválido.'))

    def test_rf11_camino_1_2_4_7_8_16_sin_documento_ni_id(self):
        resp = self.registrar(actor_email=ENTRENADOR)
        assert_that(resp.status_code, equal_to(400))
        assert_that(resp.data['error'],
                    contains_string('Debes indicar el documento de identidad o el id de la reserva'))

    def test_rf11_camino_1_2_4_7_9_10_16_documento_no_registrado(self):
        resp = self.registrar(actor_email=ENTRENADOR, documento='9999999999')
        assert_that(resp.status_code, equal_to(404))
        assert_that(resp.data['error'],
                    contains_string('No hay ningún estudiante registrado con el documento'))

    def test_rf11_camino_1_2_4_7_9_11_10_16_estudiante_sin_reserva(self):
        resp = self.registrar(actor_email=ENTRENADOR, documento=DOC_ESTUDIANTE)
        assert_that(resp.status_code, equal_to(404))
        assert_that(resp.data['error'],
                    contains_string('no tiene una reserva activa para registrar asistencia'))

    def test_rf11_camino_1_2_4_7_9_11_12_13_16_fuera_del_horario_del_bloque(self):
        # Son las 10:30 y el bloque empieza a las 12:00.
        rid = self.reserva(hour='12:00', slot_id=4)
        resp = self.registrar(actor_email=ENTRENADOR, documento=DOC_ESTUDIANTE)
        assert_that(resp.status_code, equal_to(409))
        assert_that(resp.data['error'], contains_string('todavía no empieza'))
        assert_that(self.db.reservations.find_one({'_id': rid})['estado'], equal_to('ACTIVA'))

    def test_rf11_camino_1_2_4_7_9_11_12_14_13_16_registrada_al_mismo_tiempo(self):
        # Otro entrenador la registra entre la búsqueda y la actualización:
        # la actualización condicionada ya no encuentra la reserva ACTIVA.
        self.reserva()
        with patch.object(mongomock.Collection, 'find_one_and_update', return_value=None):
            resp = self.registrar(actor_email=ENTRENADOR, documento=DOC_ESTUDIANTE)
        assert_that(resp.status_code, equal_to(409))
        assert_that(resp.data['error'], equal_to('La asistencia ya fue registrada.'))

    def test_rf11_camino_1_2_4_7_9_11_12_14_15_16_registro_por_documento(self):
        rid = self.reserva()
        resp = self.registrar(actor_email=ENTRENADOR, documento=DOC_ESTUDIANTE)
        assert_that(resp.status_code, equal_to(200))
        assert_that(resp.data, has_entries(
            message='Asistencia registrada.', reservation_id=str(rid), email=ESTUDIANTE))
        guardada = self.db.reservations.find_one({'_id': rid})
        assert_that(guardada, has_entries(estado='COMPLETADA', registrada_por=ENTRENADOR))

    def test_rf11_camino_1_2_4_5_11_12_14_15_16_registro_por_id_de_reserva(self):
        rid = self.reserva()
        resp = self.registrar(actor_email=ENTRENADOR, reservation_id=str(rid))
        assert_that(resp.status_code, equal_to(200))
        assert_that(resp.data['notificacion'], contains_string('Asistencia registrada para las 08:00'))
        assert_that(self.db.reservations.find_one({'_id': rid})['estado'], equal_to('COMPLETADA'))


# ── RF12 — consultar_reservas · back_RF12_consultar_reservas.drawio ─────────
# V(G) = 3
class RF12ConsultarReservasCaminos(CajaBlancaBase):
    URL = '/api/attendance/pending/'

    def consultar(self, actor):
        return self.get(attendance.consultar_reservas, self.URL, {'actor_email': actor})

    def test_rf12_camino_1_2_3_8_actor_estudiante(self):
        resp = self.consultar(ESTUDIANTE)
        assert_that(resp.status_code, equal_to(403))
        assert_that(resp.data['error'],
                    contains_string('Solo un entrenador o administrador puede consultar las inasistencias'))

    def test_rf12_camino_1_2_4_5_7_8_jornada_sin_pendientes(self):
        resp = self.consultar(ENTRENADOR)
        assert_that(resp.status_code, equal_to(200))
        assert_that(resp.data['total'], equal_to(0))
        assert_that(resp.data['pendientes'], empty())

    def test_rf12_camino_1_2_4_5_6_5_7_8_lista_de_pendientes(self):
        self.reserva()
        resp = self.consultar(ENTRENADOR)
        assert_that(resp.status_code, equal_to(200))
        assert_that(resp.data['pendientes'], has_length(1))
        assert_that(resp.data['pendientes'][0], has_entries(
            name='Juan Pérez', documento=DOC_ESTUDIANTE, hour='08:00',
            no_show_count=0, inasistencias_restantes=5))


# ── RF13 — procesar_inasistencia · back_RF13_procesar_inasistencia.drawio ───
# V(G) = 7. Los 5 caminos recorren todas las aristas; los otros 2 no son
# posibles (sin reservas procesadas no puede haber penalizados).
class RF13ProcesarInasistenciaCaminos(CajaBlancaBase):
    URL = '/api/attendance/process/'

    def cerrar(self, actor=ENTRENADOR):
        return self.post(attendance.procesar_inasistencia, self.URL, {'actor_email': actor})

    def test_rf13_camino_1_2_3_16_cierre_sin_ser_entrenador(self):
        for actor in (ADMIN, ESTUDIANTE):
            with self.subTest(actor=actor):
                resp = self.cerrar(actor)
                assert_that(resp.status_code, equal_to(403))
                assert_that(resp.data['error'], contains_string(
                    'Solo el entrenador puede cerrar la jornada y procesar las inasistencias'))

    def test_rf13_camino_1_2_4_5_10_11_13_15_16_jornada_sin_pendientes(self):
        resp = self.cerrar()
        assert_that(resp.status_code, equal_to(200))
        assert_that(resp.data['total_procesadas'], equal_to(0))
        assert_that(resp.data['message'], contains_string('No había inasistencias pendientes'))

    def test_rf13_camino_1_2_4_5_6_7_5_10_12_13_15_16_reserva_de_estudiante_borrado(self):
        rid = self.reserva(email='borrado@soyudemedellin.edu.co')
        resp = self.cerrar()
        assert_that(resp.status_code, equal_to(200))
        assert_that(resp.data['message'], contains_string('Se procesaron 1 inasistencias'))
        assert_that(resp.data['total_penalizados'], equal_to(0))
        assert_that(self.db.reservations.find_one({'_id': rid})['estado'], equal_to('NO_SHOW'))

    def test_rf13_camino_1_2_4_5_6_7_8_5_10_12_13_15_16_cuarta_inasistencia(self):
        self.db.users.update_one({'email': ESTUDIANTE}, {'$set': {'no_show_count': 3}})
        self.reserva()
        resp = self.cerrar()
        assert_that(resp.data['message'], contains_string('Se procesaron 1 inasistencias'))
        assert_that(resp.data['procesados'][0], has_entries(no_show_count=4, penalizado=False))
        assert_that(self.db.users.find_one({'email': ESTUDIANTE})['estado'], equal_to('ACTIVO'))

    def test_rf13_camino_1_2_4_5_6_7_8_9_5_10_12_13_14_15_16_quinta_inasistencia(self):
        self.db.users.update_one({'email': ESTUDIANTE}, {'$set': {'no_show_count': 4}})
        self.reserva()
        resp = self.cerrar()
        assert_that(resp.data['message'], contains_string('Estudiantes penalizados: Juan Pérez'))
        assert_that(resp.data['total_penalizados'], equal_to(1))
        usuario = self.db.users.find_one({'email': ESTUDIANTE})
        assert_that(usuario, has_entries(no_show_count=5, estado='PENALIZADO'))
        assert_that(usuario['penalizado_hasta'], greater_than(db_module.ahora_utc()))


# ── RF16 — ver_registro_entrenador · back_RF16_ver_registro_entrenador.drawio
# V(G) = 4
class RF16VerRegistroEntrenadorCaminos(CajaBlancaBase):
    URL = '/api/reports/daily/entrenador/'

    def ver(self, actor=ENTRENADOR, fecha=None):
        query = {'actor_email': actor}
        if fecha:
            query['fecha'] = fecha
        return self.get(attendance.ver_registro_entrenador, self.URL, query)

    def test_rf16_camino_1_2_3_11_consulta_sin_ser_entrenador(self):
        for actor in (ESTUDIANTE, ADMIN):
            with self.subTest(actor=actor):
                resp = self.ver(actor)
                assert_that(resp.status_code, equal_to(403))
                assert_that(resp.data['error'], equal_to('Este registro es el de un entrenador.'))

    def test_rf16_camino_1_2_4_5_7_8_10_11_base_sin_bloques(self):
        resp = self.ver()
        assert_that(resp.status_code, equal_to(200))
        assert_that(resp.data['totales'], has_entries(reservas=0, asistencias=0, inasistencias=0))
        assert_that(resp.data['bloques'], empty())

    def test_rf16_camino_1_2_4_5_7_8_9_8_10_11_dia_sin_movimientos(self):
        db_module.seed_slots()
        resp = self.ver(fecha='2020-01-01')
        assert_that(resp.status_code, equal_to(200))
        assert_that(resp.data['fecha'], equal_to('2020-01-01'))
        assert_that(resp.data['totales']['reservas'], equal_to(0))
        assert_that(resp.data['bloques'], has_length(6))
        assert_that([b['reservados'] for b in resp.data['bloques']], equal_to([0] * 6))

    def test_rf16_camino_1_2_4_5_6_5_7_8_9_8_10_11_registro_con_movimientos(self):
        db_module.seed_slots()
        self.reserva(estado='COMPLETADA')
        self.reserva(hour='10:00', slot_id=3, estado='NO_SHOW')
        self.db.users.update_one(
            {'email': ESTUDIANTE},
            {'$set': {'estado': 'PENALIZADO', 'no_show_count': 5,
                      'penalizado_hasta': datetime(2026, 9, 22, tzinfo=timezone.utc)}})
        resp = self.ver()
        assert_that(resp.status_code, equal_to(200))
        assert_that(resp.data['totales'], has_entries(
            reservas=2, asistencias=1, inasistencias=1, estudiantes_penalizados=1))
        assert_that(resp.data['penalizados'][0], has_entries(
            email=ESTUDIANTE, penalizado_hasta='2026-09-22'))
        bloques = {b['slotId']: b for b in resp.data['bloques']}
        assert_that(bloques[2], has_entries(reservados=1, asistencias=1))
        assert_that(bloques[3], has_entries(reservados=1, inasistencias=1))


# ── RF20 — fallo_sugerencia · back_RF20_fallo_sugerencia.drawio ─────────────
# V(G) = 6
class RF20FalloSugerenciaCaminos(CajaBlancaBase):
    URL = '/api/suggestions/'

    def enviar(self, email=ESTUDIANTE, mensaje='La app no carga los horarios.'):
        return self.post(features.fallo_sugerencia, self.URL, {'email': email, 'mensaje': mensaje})

    def test_rf20_camino_1_2_3_12_correo_vacio(self):
        resp = self.enviar(email='')
        assert_that(resp.status_code, equal_to(400))
        assert_that(resp.data['error'], equal_to('email requerido.'))

    def test_rf20_camino_1_2_4_3_12_mensaje_vacio(self):
        for mensaje in ('', '    '):
            with self.subTest(mensaje=mensaje):
                resp = self.enviar(mensaje=mensaje)
                assert_that(resp.status_code, equal_to(400))
                assert_that(resp.data['error'], equal_to('Escribe el mensaje antes de enviarlo.'))

    def test_rf20_camino_1_2_4_5_3_12_mensaje_muy_largo(self):
        resp = self.enviar(mensaje='a' * 2001)
        assert_that(resp.status_code, equal_to(400))
        assert_that(resp.data['error'], contains_string('no puede superar los 2000 caracteres'))
        assert_that(self.db.suggestions.count_documents({}), equal_to(0))

    def test_rf20_camino_1_2_4_5_6_7_12_usuario_no_registrado(self):
        resp = self.enviar(email='fantasma@soyudemedellin.edu.co')
        assert_that(resp.status_code, equal_to(404))
        assert_that(resp.data['error'], equal_to('Usuario no encontrado.'))

    def test_rf20_camino_1_2_4_5_6_8_9_12_reporte_sin_ser_estudiante(self):
        for actor in (ENTRENADOR, ADMIN):
            with self.subTest(actor=actor):
                resp = self.enviar(email=actor)
                assert_that(resp.status_code, equal_to(403))
                assert_that(resp.data['error'], contains_string(
                    'El buzón es el canal por el que los estudiantes reportan fallas'))

    def test_rf20_camino_1_2_4_5_6_8_10_11_12_reporte_enviado(self):
        resp = self.enviar(mensaje='  El botón de reservar no responde.  ')
        assert_that(resp.status_code, equal_to(201))
        assert_that(resp.data['notificacion'],
                    equal_to('Tu reporte llegó al administrador. Gracias por avisar.'))
        assert_that(self.db.suggestions.find_one({}), has_entries(
            autor_email=ESTUDIANTE, autor_nombre='Juan Pérez',
            mensaje='El botón de reservar no responde.'))


# ── RF21 — consultar_buzon · back_RF21_consultar_buzon.drawio ───────────────
# V(G) = 3
class RF21ConsultarBuzonCaminos(CajaBlancaBase):
    URL = '/api/suggestions/inbox/'

    def consultar(self, actor=ADMIN):
        return self.get(features.consultar_buzon, self.URL, {'actor_email': actor})

    def mensaje(self, texto, minutos_atras):
        self.db.suggestions.insert_one({
            'autor_email': ESTUDIANTE, 'autor_nombre': 'Juan Pérez', 'mensaje': texto,
            'created_at': datetime(2026, 9, 15, 15, 0, tzinfo=timezone.utc)
                          - timedelta(minutes=minutos_atras),
        })

    def test_rf21_camino_1_2_3_7_consulta_sin_ser_administrador(self):
        for actor in (ESTUDIANTE, ENTRENADOR):
            with self.subTest(actor=actor):
                resp = self.consultar(actor)
                assert_that(resp.status_code, equal_to(403))
                assert_that(resp.data['error'], contains_string(
                    'Solo el administrador puede consultar el buzón de sugerencias'))

    def test_rf21_camino_1_2_4_6_7_buzon_vacio(self):
        resp = self.consultar()
        assert_that(resp.status_code, equal_to(200))
        assert_that(resp.data['total'], equal_to(0))
        assert_that(resp.data['mensajes'], empty())

    def test_rf21_camino_1_2_4_5_4_6_7_buzon_con_mensajes(self):
        self.mensaje('viejo', minutos_atras=60)
        self.mensaje('nuevo', minutos_atras=0)
        resp = self.consultar()
        assert_that(resp.status_code, equal_to(200))
        assert_that(resp.data['total'], equal_to(2))
        assert_that([m['mensaje'] for m in resp.data['mensajes']],
                    contains_exactly('nuevo', 'viejo'))
        assert_that(resp.data['mensajes'][0]['id'], is_not(none()))


# ── RF21 — eliminar_sugerencia · back_RF21_eliminar_sugerencia.drawio ───────
# V(G) = 4
class RF21EliminarSugerenciaCaminos(CajaBlancaBase):

    def borrar(self, suggestion_id, actor=ADMIN):
        request = self.factory.delete(
            f'/api/suggestions/{suggestion_id}/?actor_email={actor}')
        return features.eliminar_sugerencia(request, str(suggestion_id))

    def mensaje(self):
        return self.db.suggestions.insert_one({
            'autor_email': ESTUDIANTE, 'autor_nombre': 'Juan Pérez',
            'mensaje': 'Ya atendido', 'created_at': db_module.ahora_utc(),
        }).inserted_id

    def test_rf21_camino_1_2_3_8_borrar_sin_ser_administrador(self):
        mid = self.mensaje()
        for actor in (ESTUDIANTE, ENTRENADOR):
            with self.subTest(actor=actor):
                resp = self.borrar(mid, actor)
                assert_that(resp.status_code, equal_to(403))
                assert_that(resp.data['error'], contains_string(
                    'Solo el administrador puede borrar mensajes del buzón'))
        assert_that(self.db.suggestions.find_one({'_id': mid}), not_none())

    def test_rf21_camino_1_2_4_5_8_id_invalido(self):
        resp = self.borrar('no-es-un-id')
        assert_that(resp.status_code, equal_to(404))
        assert_that(resp.data['error'], equal_to('Mensaje no encontrado.'))

    def test_rf21_camino_1_2_4_6_5_8_mensaje_inexistente(self):
        resp = self.borrar(ObjectId())
        assert_that(resp.status_code, equal_to(404))
        assert_that(resp.data['error'], equal_to('Mensaje no encontrado.'))

    def test_rf21_camino_1_2_4_6_7_8_borrar_mensaje_atendido(self):
        mid = self.mensaje()
        resp = self.borrar(mid)
        assert_that(resp.status_code, equal_to(200))
        assert_that(resp.data, has_entries(message='Mensaje borrado del buzón.', total=0))
        assert_that(self.db.suggestions.find_one({'_id': mid}), none())

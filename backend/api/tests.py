"""
Pruebas unitarias del sistema de reservas.

Cubren los casos de uso críticos (views.py) y las reglas de negocio vigentes:

  RN01  Tres tipos de correo institucional -> rol (estudiante/profesor/admin)
  RN02  Profesores y administradores no reservan: solo consultan el aforo
  RN03  La reserva es siempre para el DÍA SIGUIENTE (y la fecha se expone)
  RN05  Una única reserva por día
  RN09  Penalización por inasistencias (No-Show)
  RN10  Penalización por cancelaciones + alerta previa

Se usa `mongomock` para simular MongoDB en memoria.
"""
from datetime import date, timedelta

import mongomock
from django.test import TestCase
from rest_framework.test import APIClient

from api import db as db_module

ESTUDIANTE = 'juan.perez@soyudemedellin.edu.co'
PROFESOR   = 'coach@udem.edu.co'
ADMIN      = 'jefe@udemedellin.edu.co'

# RF01/RF02 — El documento de identidad identifica a la persona y es su contraseña.
DOCUMENTOS = {
    ESTUDIANTE: '1001234567',
    PROFESOR:   '7009998881',
    ADMIN:      '3005554442',
}


class GymApiTestCase(TestCase):
    def setUp(self):
        # tz_aware, igual que el cliente real: las fechas vuelven con su zona
        # horaria puesta y se pueden comparar con las que produce ahora_utc().
        db_module._client = mongomock.MongoClient(tz_aware=True)
        self.client = APIClient()

    def tearDown(self):
        db_module._client = None

    # Helpers ----------------------------------------------------------------
    def _documento(self, email: str) -> str:
        """Documento de identidad único y estable por correo (RF01)."""
        return DOCUMENTOS.get(email, '10' + str(abs(hash(email)) % 100_000_000).zfill(8))

    def _register(self, email=ESTUDIANTE, name='Juan Perez', documento=None):
        return self.client.post(
            '/api/auth/register/',
            {'name': name, 'email': email, 'documento': documento or self._documento(email)},
            format='json',
        )

    def _login(self, email, documento=None):
        return self.client.post(
            '/api/auth/login/',
            {'email': email, 'documento': documento or self._documento(email)},
            format='json',
        )

    def _reserve(self, email, slot_id):
        return self.client.post('/api/reservations/', {'email': email, 'slotId': slot_id}, format='json')

    def _fecha_reserva(self):
        """RN04 — La jornada para la que se reserva: siempre el día siguiente."""
        return db_module.fecha_reserva().isoformat()

    def _slot(self, slot_id):
        """Cupos del bloque EN LA JORNADA que se reserva.

        Los cupos ya no viven en el catálogo de bloques sino en la
        disponibilidad de cada fecha, así que el aforo de mañana no se mezcla
        con el de ningún otro día.
        """
        db_module.asegurar_disponibilidad(self._fecha_reserva())
        doc = db_module.get_db().disponibilidad.find_one(
            {'fecha': self._fecha_reserva(), 'slotId': slot_id}
        )
        return {'available': doc['cupos_disponibles'], 'total': doc['aforo_maximo']}

    def _fijar_cupos(self, slot_id, cupos):
        """Deja un bloque de la jornada con los cupos indicados."""
        db_module.asegurar_disponibilidad(self._fecha_reserva())
        db_module.get_db().disponibilidad.update_one(
            {'fecha': self._fecha_reserva(), 'slotId': slot_id},
            {'$set': {'cupos_disponibles': cupos}},
        )

    def _jornada_en_curso(self):
        """Sitúa la prueba dentro de la jornada, con el reloj a media tarde.

        Las reservas se crean siempre para el día siguiente (RN04), pero la
        asistencia y los reportes son de la jornada EN CURSO. Estas pruebas
        trasladan la reserva a hoy, que es lo que ocurre en la vida real cuando
        llega el día del bloque.

        Además se fija la hora del sistema, porque RN12 solo abre la ventana a
        partir del inicio del bloque: sin fijarla, la prueba pasaría o fallaría
        según la hora a la que se ejecutara.
        """
        from unittest.mock import patch
        from datetime import datetime as _dt
        hoy = db_module.hoy_local()
        reloj = patch.object(db_module, 'hora_local',
                             return_value=_dt(hoy.year, hoy.month, hoy.day, 17, 0))
        reloj.start()
        self.addCleanup(reloj.stop)
        return hoy.isoformat()

    def _traer_a_hoy(self, email=None):
        """Adelanta a la jornada de hoy las reservas activas."""
        filtro = {'estado': 'ACTIVA'}
        if email:
            filtro['email'] = email
        db_module.get_db().reservations.update_many(
            filtro, {'$set': {'reserva_date': self.hoy, 'hour': '06:00'}})
        return self.hoy

    def _user(self, email):
        return db_module.get_db().users.find_one({'email': email})

    def _cancelar_n_veces(self, email, veces):
        """Reserva y cancela N veces para acumular cancelaciones."""
        for _ in range(veces):
            rid = self._reserve(email, 1).data['id']
            self.client.delete(f'/api/reservations/{rid}/')


# ── RNF06: LA INTERFAZ RECIBE LAS CONSTANTES, NO LAS GUARDA ─────────────────
class ConfiguracionTests(GymApiTestCase):
    """El punto de configuración es lo que hace cumplir la separación de capas.

    La interfaz no guarda los dominios, los bloques ni los límites: los recibe
    de aquí. Estas pruebas comprueban que lo que se entrega es EXACTAMENTE lo
    que aplica el backend, porque si divergieran la interfaz mostraría una regla
    y el sistema aplicaría otra.
    """

    def test_los_dominios_son_los_que_aplica_la_regla_rn01(self):
        resp = self.client.get('/api/config/')
        self.assertEqual(resp.status_code, 200)
        entregados = {d['dominio']: d['rol'] for d in resp.data['dominios']}
        self.assertEqual(entregados, db_module.DOMINIOS_ROL)

    def test_los_bloques_son_los_que_aplica_la_regla_rn03(self):
        bloques = self.client.get('/api/config/').data['bloques']
        self.assertEqual(
            [(b['id'], b['hora_inicio'], b['hora_fin']) for b in bloques],
            [tuple(b) for b in db_module.BLOQUES_HORARIOS],
        )

    def test_los_limites_son_los_que_aplica_el_backend(self):
        c = self.client.get('/api/config/').data
        self.assertEqual(c['no_show_limite'], db_module.NO_SHOW_LIMITE)
        self.assertEqual(c['no_show_alerta'], db_module.NO_SHOW_ALERTA)
        self.assertEqual(c['max_reservas_por_dia'], db_module.MAX_RESERVAS_POR_DIA)
        self.assertEqual(c['documento_min'], db_module.DOCUMENTO_MIN)
        self.assertEqual(c['aforo_por_defecto'], db_module.AFORO_POR_DEFECTO)

    def test_los_rangos_del_perfil_son_los_que_valida_rf03(self):
        rangos = self.client.get('/api/config/').data['perfil_rangos']
        for campo, (minimo, maximo) in db_module.PERFIL_RANGOS.items():
            self.assertEqual(rangos[campo]['minimo'], minimo)
            self.assertEqual(rangos[campo]['maximo'], maximo)


# ── CU-1 / RN01: REGISTRO Y TRES TIPOS DE CORREO ────────────────────────────
class RegisterTests(GymApiTestCase):

    def test_registro_guarda_password_hasheada(self):
        resp = self._register()
        self.assertEqual(resp.status_code, 201)
        user = self._user(ESTUDIANTE)
        # RF01 — se guarda el documento de identidad de la persona...
        self.assertEqual(user['documento'], DOCUMENTOS[ESTUDIANTE])
        # ...y como contraseña solo su hash, nunca el valor en claro.
        self.assertNotEqual(user['password'], DOCUMENTOS[ESTUDIANTE])
        self.assertIn(':', user['password'])
        self.assertEqual(user['estado'], 'ACTIVO')
        self.assertEqual(user['no_show_count'], 0)

    def test_rn01_correo_de_estudiante_da_rol_estudiante(self):
        self.assertEqual(self._register().data['role'], 'ESTUDIANTE')
        self.assertEqual(self._user(ESTUDIANTE)['role'], 'ESTUDIANTE')

    def test_rn01_correo_udem_da_rol_entrenador(self):
        self.assertEqual(self._register(email=PROFESOR).data['role'], 'ENTRENADOR')

    def test_rn01_correo_udemedellin_da_rol_admin(self):
        self.assertEqual(self._register(email=ADMIN).data['role'], 'ADMIN')

    def test_rn01_no_se_puede_elegir_el_rol_desde_el_cliente(self):
        """Un correo de estudiante nunca produce un ADMIN, aunque lo pida."""
        resp = self.client.post(
            '/api/auth/register/',
            {'name': 'Vivo', 'email': ESTUDIANTE, 'documento': DOCUMENTOS[ESTUDIANTE], 'role': 'ADMIN'},
            format='json',
        )
        self.assertEqual(resp.status_code, 201)
        self.assertEqual(self._user(ESTUDIANTE)['role'], 'ESTUDIANTE')

    def test_rechaza_correo_no_institucional(self):
        self.assertEqual(self._register(email='juan@gmail.com').status_code, 400)

    def test_rechaza_documento_corto(self):
        self.assertEqual(self._register(documento='123').status_code, 400)

    def test_rechaza_documento_duplicado(self):
        """RF01 — Dos personas no pueden compartir el mismo documento."""
        self._register()
        otra = self._register(email='otra@soyudemedellin.edu.co', name='Otra',
                              documento=DOCUMENTOS[ESTUDIANTE])
        self.assertEqual(otra.status_code, 409)

    def test_rechaza_correo_duplicado(self):
        self._register()
        self.assertEqual(self._register().status_code, 409)


# ── CU-2: LOGIN Y SESIÓN PERSISTENTE ────────────────────────────────────────
class LoginTests(GymApiTestCase):

    def test_login_devuelve_rol_estado_y_contadores(self):
        self._register()
        resp = self._login(ESTUDIANTE)
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(resp.data['role'], 'ESTUDIANTE')
        self.assertEqual(resp.data['documento'], DOCUMENTOS[ESTUDIANTE])
        self.assertEqual(resp.data['estado'], 'ACTIVO')
        self.assertEqual(resp.data['no_show_count'], 0)
        self.assertEqual(resp.data['no_show_limite'], db_module.NO_SHOW_LIMITE)
        self.assertIsNone(resp.data['alerta_inasistencias'])

    def test_login_documento_incorrecto(self):
        """RF02 — El documento es la contraseña: uno distinto no entra."""
        self._register()
        resp = self._login(ESTUDIANTE, documento='9999999999')
        self.assertEqual(resp.status_code, 401)

    def test_login_usuario_inexistente(self):
        resp = self._login('nadie@udem.edu.co', documento='1234567')
        self.assertEqual(resp.status_code, 401)

    def test_session_rehidrata_la_sesion_al_recargar(self):
        """El frontend consulta este endpoint tras un F5 en vez de cerrar sesión."""
        self._register()
        resp = self.client.get(f'/api/auth/session/?email={ESTUDIANTE}')
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(resp.data['email'], ESTUDIANTE)
        self.assertEqual(resp.data['role'], 'ESTUDIANTE')

    def test_session_de_usuario_inexistente(self):
        self.assertEqual(self.client.get('/api/auth/session/?email=nadie@udem.edu.co').status_code, 404)


# ── GESTIÓN DE USUARIOS POR EL ADMINISTRADOR ────────────────────────────────
class AdminUserTests(GymApiTestCase):
    def setUp(self):
        super().setUp()
        self._register(email=ADMIN, name='Jefa')

    def _crear(self, actor, email, name='Nuevo', documento=None, role=None):
        body = {'actor_email': actor, 'name': name, 'email': email,
                'documento': documento or self._documento(email)}
        if role:
            body['role'] = role
        return self.client.post('/api/admin/users/', body, format='json')

    def test_admin_crea_otro_administrador(self):
        resp = self._crear(ADMIN, 'nueva.admin@udemedellin.edu.co')
        self.assertEqual(resp.status_code, 201)
        self.assertEqual(resp.data['role'], 'ADMIN')
        self.assertEqual(self._user('nueva.admin@udemedellin.edu.co')['role'], 'ADMIN')

    def test_admin_crea_profesor_y_estudiante(self):
        self.assertEqual(self._crear(ADMIN, PROFESOR).data['role'], 'ENTRENADOR')
        self.assertEqual(self._crear(ADMIN, ESTUDIANTE).data['role'], 'ESTUDIANTE')

    def test_estudiante_no_puede_crear_usuarios(self):
        self._register()
        self.assertEqual(self._crear(ESTUDIANTE, 'otra@udemedellin.edu.co').status_code, 403)

    def test_profesor_no_puede_crear_usuarios(self):
        self._register(email=PROFESOR)
        self.assertEqual(self._crear(PROFESOR, 'otra@udemedellin.edu.co').status_code, 403)

    def test_rol_pedido_debe_coincidir_con_el_dominio(self):
        resp = self._crear(ADMIN, ESTUDIANTE, role='ADMIN')
        self.assertEqual(resp.status_code, 400)

    def test_correo_no_institucional_rechazado(self):
        self.assertEqual(self._crear(ADMIN, 'externo@gmail.com').status_code, 400)

    def test_correo_duplicado(self):
        self._crear(ADMIN, PROFESOR)
        self.assertEqual(self._crear(ADMIN, PROFESOR).status_code, 409)

    def test_admin_lista_usuarios(self):
        self._crear(ADMIN, ESTUDIANTE)
        resp = self.client.get(f'/api/admin/users/?actor_email={ADMIN}')
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(len(resp.data), 2)


# ── CU-3 / RN03: CONSULTA DE CUPOS Y FECHA DEL DÍA SIGUIENTE ────────────────
class SlotsTests(GymApiTestCase):
    def test_slots_se_siembran_y_devuelven(self):
        resp = self.client.get('/api/slots/')
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(len(resp.data['slots']), 6)
        self.assertEqual(resp.data['slots'][0]['available'], 20)

    def test_rn03_la_respuesta_expone_la_fecha_del_dia_siguiente(self):
        resp = self.client.get('/api/slots/')
        esperado = db_module.hoy_local() + timedelta(days=1)
        self.assertEqual(resp.data['fecha'], esperado.isoformat())
        # La etiqueta legible se muestra en la interfaz ("martes 18 de agosto de 2026").
        self.assertIn(str(esperado.day), resp.data['fecha_label'])
        self.assertIn('de', resp.data['fecha_label'])

    def test_formato_fecha_en_espanol(self):
        etiqueta = db_module.formato_fecha_es(date(2026, 8, 18))
        self.assertEqual(etiqueta, 'martes 18 de agosto de 2026')


# ── CU-4 / RN02 / RN05: CREAR RESERVA ───────────────────────────────────────
class ReservationTests(GymApiTestCase):
    def setUp(self):
        super().setUp()
        self._register()
        self.client.get('/api/slots/')

    def test_reserva_descuenta_cupo(self):
        resp = self._reserve(ESTUDIANTE, 1)
        self.assertEqual(resp.status_code, 201)
        self.assertEqual(resp.data['estado'], 'ACTIVA')
        self.assertEqual(self._slot(1)['available'], 19)

    def test_rn03_la_reserva_queda_fechada_para_manana(self):
        resp = self._reserve(ESTUDIANTE, 1)
        manana = db_module.hoy_local() + timedelta(days=1)
        self.assertEqual(resp.data['reserva_date'], manana.isoformat())
        self.assertEqual(resp.data['date'], db_module.formato_fecha_es(manana))

    def test_rn05_solo_una_reserva_por_dia(self):
        self.assertEqual(self._reserve(ESTUDIANTE, 1).status_code, 201)
        # Un segundo bloque el mismo día se rechaza y no descuenta cupo.
        resp = self._reserve(ESTUDIANTE, 2)
        self.assertEqual(resp.status_code, 409)
        self.assertIn('una reserva por día', resp.data['error'])
        self.assertEqual(self._slot(2)['available'], 20)

    def test_rn05_repetir_el_mismo_bloque_tambien_se_rechaza(self):
        self._reserve(ESTUDIANTE, 1)
        self.assertEqual(self._reserve(ESTUDIANTE, 1).status_code, 409)
        self.assertEqual(self._slot(1)['available'], 19)

    def test_rn05_tras_cancelar_puede_reservar_otro_bloque_del_dia(self):
        rid = self._reserve(ESTUDIANTE, 1).data['id']
        self.client.delete(f'/api/reservations/{rid}/')
        self.assertEqual(self._reserve(ESTUDIANTE, 3).status_code, 201)

    def test_rn02_el_profesor_no_puede_reservar(self):
        self._register(email=PROFESOR, name='Coach')
        resp = self._reserve(PROFESOR, 1)
        self.assertEqual(resp.status_code, 403)
        self.assertEqual(self._slot(1)['available'], 20)

    def test_rn02_el_administrador_no_puede_reservar(self):
        self._register(email=ADMIN, name='Jefa')
        self.assertEqual(self._reserve(ADMIN, 1).status_code, 403)

    def test_usuario_inexistente_no_reserva(self):
        self.assertEqual(self._reserve('fantasma@soyudemedellin.edu.co', 1).status_code, 404)

    def test_rechaza_sin_cupos(self):
        self._fijar_cupos(1, 0)
        self.assertEqual(self._reserve(ESTUDIANTE, 1).status_code, 409)

    def test_rechaza_slot_inexistente(self):
        self.assertEqual(self._reserve(ESTUDIANTE, 999).status_code, 404)

    def test_descuento_atomico_no_sobrevende(self):
        self._register(email='ana.gomez@soyudemedellin.edu.co', name='Ana Gomez')
        self._fijar_cupos(1, 1)
        r1 = self._reserve(ESTUDIANTE, 1)
        r2 = self._reserve('ana.gomez@soyudemedellin.edu.co', 1)
        self.assertEqual(sorted([r1.status_code, r2.status_code]), [201, 409])
        self.assertEqual(self._slot(1)['available'], 0)

    def test_solo_muestra_activas(self):
        r = self._reserve(ESTUDIANTE, 1)
        self.client.delete(f"/api/reservations/{r.data['id']}/")
        listado = self.client.get(f'/api/reservations/?email={ESTUDIANTE}')
        self.assertEqual(len(listado.data), 0)  # la cancelada no aparece


# ── RN04 / RN06: LA DISPONIBILIDAD ES DE CADA JORNADA ───────────────────────
class DisponibilidadPorJornadaTests(GymApiTestCase):
    """El aforo de una jornada no se mezcla con el de otra.

    Antes los cupos vivían en el catálogo de bloques, con un solo contador para
    todos los días. Como solo se descontaba al reservar y solo se reponía al
    cancelar, una asistencia o una inasistencia consumían el cupo para siempre:
    tras veinte reservas, ese bloque quedaba lleno de forma definitiva y ya
    nadie podía volver a reservarlo ningún día.
    """

    def setUp(self):
        super().setUp()
        self._register(email=PROFESOR, name='Coach')
        self._register()
        self.client.get('/api/slots/')

    def _cupos(self, fecha_iso, slot_id):
        db_module.asegurar_disponibilidad(fecha_iso)
        return db_module.get_db().disponibilidad.find_one(
            {'fecha': fecha_iso, 'slotId': slot_id})['cupos_disponibles']

    def test_cada_jornada_arranca_con_el_aforo_completo(self):
        hoy = db_module.hoy_local().isoformat()
        manana = self._fecha_reserva()
        pasado = (db_module.hoy_local() + timedelta(days=2)).isoformat()
        self._reserve(ESTUDIANTE, 1)
        self.assertEqual(self._cupos(manana, 1), 19)   # la jornada reservada
        self.assertEqual(self._cupos(hoy, 1), 20)      # no toca la de hoy
        self.assertEqual(self._cupos(pasado, 1), 20)   # ni la de pasado mañana

    def test_la_inasistencia_no_consume_el_cupo_de_las_demas_jornadas(self):
        """Es el caso que dejaba el gimnasio lleno para siempre."""
        manana = self._fecha_reserva()
        pasado = (db_module.hoy_local() + timedelta(days=2)).isoformat()
        self._reserve(ESTUDIANTE, 1)
        # El entrenador cierra la jornada reservada y la reserva queda como
        # inasistencia (RF13). Antes, ese cupo se perdía para siempre.
        self.client.post('/api/attendance/process/',
                         {'actor_email': PROFESOR, 'fecha': manana}, format='json')
        self.assertEqual(
            db_module.get_db().reservations.find_one({'email': ESTUDIANTE})['estado'], 'NO_SHOW')
        # La jornada siguiente sigue con su aforo intacto.
        self.assertEqual(self._cupos(pasado, 1), 20)

    def test_el_catalogo_de_bloques_no_guarda_cupos(self):
        """Los cupos son de la jornada, no del bloque."""
        bloque = db_module.get_db().slots.find_one({'slotId': 1})
        self.assertNotIn('available', bloque)
        self.assertEqual(bloque['hour'], '06:00')
        self.assertEqual(bloque['hora_fin'], '08:00')

    def test_rn06_el_contador_nunca_baja_de_cero(self):
        manana = self._fecha_reserva()
        self._fijar_cupos(1, 1)
        self.assertEqual(self._reserve(ESTUDIANTE, 1).status_code, 201)
        self.assertEqual(self._cupos(manana, 1), 0)
        # El siguiente intento no prospera y no deja el contador en negativo.
        self._register(email='otra@soyudemedellin.edu.co', name='Otra')
        self.assertEqual(self._reserve('otra@soyudemedellin.edu.co', 1).status_code, 409)
        self.assertEqual(self._cupos(manana, 1), 0)

    def test_rn07_el_cupo_vuelve_a_la_jornada_correcta(self):
        manana = self._fecha_reserva()
        pasado = (db_module.hoy_local() + timedelta(days=2)).isoformat()
        rid = self._reserve(ESTUDIANTE, 1).data['id']
        self.client.delete(f'/api/reservations/{rid}/')
        self.assertEqual(self._cupos(manana, 1), 20)   # se devolvió aquí
        self.assertEqual(self._cupos(pasado, 1), 20)   # y no infló otra jornada


# ── RF09 / CU-5: CANCELAR Y LIBERAR EL CUPO ─────────────────────────────────
class CancelTests(GymApiTestCase):
    """RF09 — Cancelar mi reserva.

    Cancelar a tiempo NO penaliza: la penalización es por no presentarse
    habiendo reservado (RN08), no por avisar con antelación.
    """

    def setUp(self):
        super().setUp()
        self._register()
        self.client.get('/api/slots/')
        self.rid = self._reserve(ESTUDIANTE, 1).data['id']

    def test_rn07_cancelar_libera_el_cupo_de_inmediato(self):
        self.assertEqual(self._slot(1)['available'], 19)
        resp = self.client.delete(f'/api/reservations/{self.rid}/')
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(self._slot(1)['available'], 20)

    def test_la_reserva_cancelada_no_aparece_en_mis_reservas(self):
        self.client.delete(f'/api/reservations/{self.rid}/')
        listado = self.client.get(f'/api/reservations/?email={ESTUDIANTE}')
        self.assertEqual(len(listado.data), 0)

    def test_doble_cancelacion_no_devuelve_el_cupo_dos_veces(self):
        self.client.delete(f'/api/reservations/{self.rid}/')
        resp = self.client.delete(f'/api/reservations/{self.rid}/')
        self.assertEqual(resp.status_code, 409)          # ya no estaba activa
        self.assertEqual(self._slot(1)['available'], 20)  # y no quedó en 21

    def test_id_invalido(self):
        self.assertEqual(self.client.delete('/api/reservations/no-es-objectid/').status_code, 400)

    def test_rn11_la_cancelacion_devuelve_su_confirmacion(self):
        resp = self.client.delete(f'/api/reservations/{self.rid}/')
        self.assertEqual(resp.data['tipo'], 'RESERVA_CANCELADA')
        self.assertIn('liberado', resp.data['notificacion'])

    def test_rn05_tras_cancelar_puede_volver_a_reservar_ese_dia(self):
        self.client.delete(f'/api/reservations/{self.rid}/')
        self.assertEqual(self._reserve(ESTUDIANTE, 2).status_code, 201)

    def test_cancelar_muchas_veces_no_penaliza(self):
        """La penalización por acumular cancelaciones se retiró del alcance."""
        self.client.delete(f'/api/reservations/{self.rid}/')
        for _ in range(6):
            rid = self._reserve(ESTUDIANTE, 1).data['id']
            self.client.delete(f'/api/reservations/{rid}/')
        self.assertEqual(self._user(ESTUDIANTE)['estado'], 'ACTIVO')
        self.assertEqual(self._reserve(ESTUDIANTE, 1).status_code, 201)


# ── RN09: NO-SHOW Y PENALIZACIÓN ────────────────────────────────────────────
class PenalizacionTests(GymApiTestCase):
    """RN08 — Cinco inasistencias penalizan · RN09 — La cuenta penalizada no reserva.

    Las inasistencias se registran al cerrar la jornada (RF13), que es la única
    vía del sistema: no existe una acción suelta para marcar una inasistencia.
    """

    def setUp(self):
        super().setUp()
        self._register(email=PROFESOR, name='Coach')
        self._register(email=ESTUDIANTE, name='Estudiante')
        self.client.get('/api/slots/')
        self.hoy = self._jornada_en_curso()

    def _reserve(self, email, slot_id):
        resp = super()._reserve(email, slot_id)
        self._traer_a_hoy(email)
        return resp

    def _cerrar_jornada(self, actor=PROFESOR):
        return self.client.post('/api/attendance/process/',
                                {'actor_email': actor, 'fecha': self.hoy}, format='json')

    def test_rn08_la_quinta_inasistencia_penaliza_y_bloquea_la_reserva(self):
        for _ in range(db_module.NO_SHOW_LIMITE):
            self._reserve(ESTUDIANTE, 1)
            self._cerrar_jornada()
        self.assertEqual(self._user(ESTUDIANTE)['estado'], 'PENALIZADO')
        # RN09 — penalizado, ya no puede reservar.
        self.assertEqual(self._reserve(ESTUDIANTE, 2).status_code, 403)

    def test_rn08_asistir_no_suma_inasistencia(self):
        self._reserve(ESTUDIANTE, 1)
        self.client.post('/api/attendance/register/', {
            'actor_email': PROFESOR, 'documento': DOCUMENTOS[ESTUDIANTE],
        }, format='json')
        self._cerrar_jornada()
        self.assertEqual(self._user(ESTUDIANTE)['no_show_count'], 0)
        self.assertEqual(self._user(ESTUDIANTE)['estado'], 'ACTIVO')


# ── RF14 historial · perfil físico · calificaciones · reporte por estudiante ─
class FeaturesTests(GymApiTestCase):
    ANA = 'ana@soyudemedellin.edu.co'

    def setUp(self):
        super().setUp()
        self._register(email=PROFESOR, name='Coach')
        self._register(email=self.ANA, name='Ana')
        self.client.get('/api/slots/')

    def test_rf14_historial_incluye_canceladas(self):
        rid = self._reserve(self.ANA, 1).data['id']
        self.client.delete(f'/api/reservations/{rid}/')
        resp = self.client.get(f'/api/reservations/history/?email={self.ANA}')
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(resp.data[0]['estado'], 'CANCELADA')

    def test_rf03_perfil_fisico(self):
        resp = self.client.put('/api/users/profile/',
                               {'email': self.ANA, 'peso': 65, 'altura': 170, 'meta': 'Resistencia'},
                               format='json')
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(resp.data['peso'], 65)
        self.assertEqual(resp.data['meta'], 'Resistencia')

    def test_rf20_el_estudiante_reporta_una_falla(self):
        resp = self.client.post('/api/suggestions/', {
            'email': self.ANA, 'mensaje': 'El botón de cancelar queda tapado por el teclado.',
        }, format='json')
        self.assertEqual(resp.status_code, 201)
        self.assertEqual(resp.data['tipo'], 'SUGERENCIA_ENVIADA')

    def test_rf20_no_admite_un_mensaje_vacio(self):
        resp = self.client.post('/api/suggestions/',
                                {'email': self.ANA, 'mensaje': '   '}, format='json')
        self.assertEqual(resp.status_code, 400)

    def test_rf20_el_buzon_es_el_canal_de_los_estudiantes(self):
        resp = self.client.post('/api/suggestions/',
                                {'email': PROFESOR, 'mensaje': 'Algo'}, format='json')
        self.assertEqual(resp.status_code, 403)

    def test_rf21_solo_el_administrador_lee_el_buzon(self):
        self.client.post('/api/suggestions/',
                         {'email': self.ANA, 'mensaje': 'Un reporte'}, format='json')
        self._register(email=ADMIN, name='Jefa')

        vista = self.client.get(f'/api/suggestions/inbox/?actor_email={ADMIN}')
        self.assertEqual(vista.status_code, 200)
        self.assertEqual(vista.data['total'], 1)
        self.assertEqual(vista.data['mensajes'][0]['autor_nombre'], 'Ana')
        self.assertEqual(vista.data['mensajes'][0]['mensaje'], 'Un reporte')

        # Ni el estudiante ni el entrenador entran a la bandeja.
        self.assertEqual(
            self.client.get(f'/api/suggestions/inbox/?actor_email={self.ANA}').status_code, 403)
        self.assertEqual(
            self.client.get(f'/api/suggestions/inbox/?actor_email={PROFESOR}').status_code, 403)


class PerfilTests(GymApiTestCase):
    """RF03 — Perfil del estudiante · RF04 — Entrenador · RF05 — Administrador."""

    def setUp(self):
        super().setUp()
        self._register()
        self._register(email=PROFESOR, name='Coach')

    def test_rf03_el_estudiante_gestiona_edad_peso_altura_y_objetivo(self):
        resp = self.client.put('/api/users/profile/', {
            'email': ESTUDIANTE, 'edad': 21, 'peso': 70, 'altura': 175,
            'meta': 'Ganar resistencia',
        }, format='json')
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(resp.data['edad'], 21)
        self.assertEqual(resp.data['peso'], 70)
        self.assertEqual(resp.data['altura'], 175)
        self.assertEqual(resp.data['meta'], 'Ganar resistencia')

    def test_rf03_el_estudiante_consulta_su_informacion_personal(self):
        self.client.put('/api/users/profile/', {'email': ESTUDIANTE, 'edad': 22}, format='json')
        resp = self.client.get(f'/api/users/profile/?email={ESTUDIANTE}')
        self.assertEqual(resp.data['edad'], 22)

    def test_rf03_rechaza_un_valor_fuera_de_rango(self):
        resp = self.client.put('/api/users/profile/',
                               {'email': ESTUDIANTE, 'altura': 500}, format='json')
        self.assertEqual(resp.status_code, 400)

    def test_rf03_un_campo_invalido_impide_guardar_el_valido(self):
        self.client.put('/api/users/profile/', {'email': ESTUDIANTE, 'peso': 60}, format='json')
        self.client.put('/api/users/profile/',
                        {'email': ESTUDIANTE, 'peso': 70, 'altura': 999}, format='json')
        resp = self.client.get(f'/api/users/profile/?email={ESTUDIANTE}')
        self.assertEqual(resp.data['peso'], 60)

    def test_rf03_el_perfil_del_estudiante_no_lo_consulta_el_profesor(self):
        resp = self.client.get(f'/api/users/profile/?email={PROFESOR}')
        self.assertEqual(resp.status_code, 403)

    def test_rf04_el_entrenador_consulta_nombre_documento_y_rol(self):
        resp = self.client.get(f'/api/users/entrenador/?email={PROFESOR}')
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(resp.data['name'], 'Coach')
        self.assertEqual(resp.data['documento'], DOCUMENTOS[PROFESOR])
        self.assertEqual(resp.data['role'], 'ENTRENADOR')

    def test_rf04_el_perfil_del_entrenador_es_solo_para_entrenadores(self):
        resp = self.client.get(f'/api/users/entrenador/?email={ESTUDIANTE}')
        self.assertEqual(resp.status_code, 403)

    def test_rf05_el_administrador_consulta_su_perfil_y_si_es_principal(self):
        self._register(email=ADMIN, name='Jefa')
        resp = self.client.get(f'/api/users/administrador/?email={ADMIN}')
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(resp.data['role'], 'ADMIN')
        self.assertEqual(resp.data['documento'], DOCUMENTOS[ADMIN])
        self.assertTrue(resp.data['es_principal'])

    def test_rf05_el_perfil_del_administrador_es_solo_para_administradores(self):
        resp = self.client.get(f'/api/users/administrador/?email={PROFESOR}')
        self.assertEqual(resp.status_code, 403)


class AsistenciaTests(GymApiTestCase):
    """RF11 · RF13 · RF14 · RF15 · RF16 — Asistencia, inasistencia y penalización."""

    def setUp(self):
        super().setUp()
        self._register(email=PROFESOR, name='Coach')
        self._register(email=ADMIN, name='Jefa')
        self._register(email=ESTUDIANTE, name='Juan Perez')
        self.client.get('/api/slots/')
        # La asistencia es de la jornada EN CURSO, no de la que se reserva.
        self.hoy = self._jornada_en_curso()
        self.jornada = self.hoy

    def _reserve(self, email, slot_id):
        resp = super()._reserve(email, slot_id)
        self._traer_a_hoy(email)
        return resp

    # ── RF11 / HU11 — Buscar al estudiante por su documento ────────────────
    def test_rf11_el_entrenador_encuentra_la_reserva_por_documento(self):
        self._reserve(ESTUDIANTE, 1)
        resp = self.client.get(
            f'/api/students/lookup/?documento={DOCUMENTOS[ESTUDIANTE]}&actor_email={PROFESOR}')
        self.assertEqual(resp.status_code, 200)
        self.assertTrue(resp.data['tiene_reserva'])
        self.assertEqual(resp.data['estudiante']['name'], 'Juan Perez')
        self.assertEqual(len(resp.data['reservas']), 1)

    def test_rf11_documento_sin_estudiante(self):
        resp = self.client.get(f'/api/students/lookup/?documento=0000000&actor_email={PROFESOR}')
        self.assertEqual(resp.status_code, 404)

    def test_rf11_el_estudiante_no_puede_buscar_a_otros(self):
        resp = self.client.get(
            f'/api/students/lookup/?documento={DOCUMENTOS[ESTUDIANTE]}&actor_email={ESTUDIANTE}')
        self.assertEqual(resp.status_code, 403)

    # ── RF13 / HU12 — Registrar la asistencia ──────────────────────────────
    def test_rf13_el_entrenador_registra_la_asistencia_por_documento(self):
        self._reserve(ESTUDIANTE, 1)
        resp = self.client.post('/api/attendance/register/', {
            'actor_email': PROFESOR, 'documento': DOCUMENTOS[ESTUDIANTE], 'fecha': self.jornada,
        }, format='json')
        self.assertEqual(resp.status_code, 200)
        reserva = db_module.get_db().reservations.find_one({'email': ESTUDIANTE})
        self.assertEqual(reserva['estado'], 'COMPLETADA')

    def test_rf13_no_se_registra_asistencia_sin_reserva(self):
        resp = self.client.post('/api/attendance/register/', {
            'actor_email': PROFESOR, 'documento': DOCUMENTOS[ESTUDIANTE], 'fecha': self.jornada,
        }, format='json')
        self.assertEqual(resp.status_code, 404)

    def test_rf13_solo_el_entrenador_registra_asistencia(self):
        self._reserve(ESTUDIANTE, 1)
        resp = self.client.post('/api/attendance/register/', {
            'actor_email': ESTUDIANTE, 'documento': DOCUMENTOS[ESTUDIANTE],
        }, format='json')
        self.assertEqual(resp.status_code, 403)

    # ── RF14 / HU13 / HU15 — Estudiantes sin asistencia registrada ─────────
    def test_rf14_lista_los_estudiantes_sin_asistencia(self):
        self._reserve(ESTUDIANTE, 1)
        resp = self.client.get(f'/api/attendance/pending/?actor_email={PROFESOR}&fecha={self.jornada}')
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(resp.data['total'], 1)
        self.assertEqual(resp.data['pendientes'][0]['documento'], DOCUMENTOS[ESTUDIANTE])

    def test_rf14_quien_ya_asistio_no_aparece_como_pendiente(self):
        self._reserve(ESTUDIANTE, 1)
        self.client.post('/api/attendance/register/', {
            'actor_email': PROFESOR, 'documento': DOCUMENTOS[ESTUDIANTE], 'fecha': self.jornada,
        }, format='json')
        resp = self.client.get(f'/api/attendance/pending/?actor_email={PROFESOR}&fecha={self.jornada}')
        self.assertEqual(resp.data['total'], 0)

    def test_rf14_el_administrador_tambien_consulta_las_inasistencias(self):
        self._reserve(ESTUDIANTE, 1)
        resp = self.client.get(f'/api/attendance/pending/?actor_email={ADMIN}&fecha={self.jornada}')
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(resp.data['total'], 1)

    def test_rf14_el_estudiante_no_consulta_las_inasistencias(self):
        resp = self.client.get(f'/api/attendance/pending/?actor_email={ESTUDIANTE}')
        self.assertEqual(resp.status_code, 403)

    # ── RF15 / HU14 / HU16 — Procesamiento general de inasistencias ────────
    def test_rf15_procesa_de_forma_general_las_inasistencias(self):
        ana = 'ana@soyudemedellin.edu.co'
        self._register(email=ana, name='Ana')
        self._reserve(ESTUDIANTE, 1)
        self._reserve(ana, 2)

        resp = self.client.post('/api/attendance/process/',
                                {'actor_email': PROFESOR, 'fecha': self.jornada}, format='json')
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(resp.data['total_procesadas'], 2)
        self.assertEqual(self._user(ESTUDIANTE)['no_show_count'], 1)
        self.assertEqual(self._user(ana)['no_show_count'], 1)

    def test_rf15_no_toca_a_quien_si_asistio(self):
        self._reserve(ESTUDIANTE, 1)
        self.client.post('/api/attendance/register/', {
            'actor_email': PROFESOR, 'documento': DOCUMENTOS[ESTUDIANTE], 'fecha': self.jornada,
        }, format='json')
        resp = self.client.post('/api/attendance/process/',
                                {'actor_email': PROFESOR, 'fecha': self.jornada}, format='json')
        self.assertEqual(resp.data['total_procesadas'], 0)
        self.assertEqual(self._user(ESTUDIANTE)['no_show_count'], 0)

    def test_rf15_procesar_dos_veces_no_cuenta_doble(self):
        self._reserve(ESTUDIANTE, 1)
        self.client.post('/api/attendance/process/',
                         {'actor_email': PROFESOR, 'fecha': self.jornada}, format='json')
        segunda = self.client.post('/api/attendance/process/',
                                   {'actor_email': PROFESOR, 'fecha': self.jornada}, format='json')
        self.assertEqual(segunda.data['total_procesadas'], 0)
        self.assertEqual(self._user(ESTUDIANTE)['no_show_count'], 1)

    def test_rf13_solo_el_entrenador_cierra_la_jornada(self):
        """El administrador supervisa las pendientes (RF12) pero no cierra el día."""
        self._reserve(ESTUDIANTE, 1)
        resp = self.client.post('/api/attendance/process/',
                                {'actor_email': ADMIN, 'fecha': self.jornada}, format='json')
        self.assertEqual(resp.status_code, 403)
        # La reserva sigue activa: nadie la marcó como inasistencia.
        pend = self.client.get(f'/api/attendance/pending/?actor_email={ADMIN}&fecha={self.jornada}')
        self.assertEqual(pend.data['total'], 1)

    def test_rn12_no_se_registra_la_asistencia_antes_de_que_empiece_el_bloque(self):
        """RN12 — El registro se habilita a partir de la hora del bloque."""
        from unittest.mock import patch
        from datetime import datetime as _dt
        self._reserve(ESTUDIANTE, 1)          # queda en el bloque de las 06:00 de hoy
        hoy = db_module.hoy_local()
        with patch.object(db_module, 'hora_local',
                          return_value=_dt(hoy.year, hoy.month, hoy.day, 5, 30)):
            resp = self.client.post('/api/attendance/register/', {
                'actor_email': PROFESOR, 'documento': DOCUMENTOS[ESTUDIANTE],
            }, format='json')
        self.assertEqual(resp.status_code, 409)
        self.assertIn('06:00', resp.data['error'])

    def test_rn12_no_se_registra_la_asistencia_de_otra_jornada(self):
        """RN12 — Solo el mismo día del bloque."""
        self._reserve(ESTUDIANTE, 1)
        manana = db_module.fecha_reserva().isoformat()
        db_module.get_db().reservations.update_many(
            {'email': ESTUDIANTE, 'estado': 'ACTIVA'},
            {'$set': {'reserva_date': manana}})
        resp = self.client.post('/api/attendance/register/', {
            'actor_email': PROFESOR, 'documento': DOCUMENTOS[ESTUDIANTE], 'fecha': manana,
        }, format='json')
        self.assertEqual(resp.status_code, 409)
        self.assertIn('mismo día', resp.data['error'])

    def test_rf15_el_estudiante_no_puede_procesar(self):
        resp = self.client.post('/api/attendance/process/',
                                {'actor_email': ESTUDIANTE}, format='json')
        self.assertEqual(resp.status_code, 403)

    # ── RF16 — Penalización a las CINCO (5) inasistencias ──────────────────
    def test_rf16_el_limite_de_inasistencias_es_cinco(self):
        self.assertEqual(db_module.NO_SHOW_LIMITE, 5)

    def test_rf16_la_quinta_inasistencia_penaliza(self):
        for i in range(db_module.NO_SHOW_LIMITE):
            self._reserve(ESTUDIANTE, 1)
            resp = self.client.post('/api/attendance/process/',
                                    {'actor_email': PROFESOR, 'fecha': self.jornada}, format='json')
            esperado = i == db_module.NO_SHOW_LIMITE - 1
            self.assertEqual(resp.data['total_penalizados'], 1 if esperado else 0)
        self.assertEqual(self._user(ESTUDIANTE)['estado'], 'PENALIZADO')

    def test_rf16_con_cuatro_inasistencias_todavia_no_hay_penalizacion(self):
        for _ in range(db_module.NO_SHOW_LIMITE - 1):
            self._reserve(ESTUDIANTE, 1)
            self.client.post('/api/attendance/process/',
                             {'actor_email': PROFESOR, 'fecha': self.jornada}, format='json')
        self.assertEqual(self._user(ESTUDIANTE)['estado'], 'ACTIVO')
        self.assertEqual(self._user(ESTUDIANTE)['no_show_count'], 4)


class ReportesTests(GymApiTestCase):
    """RF14 — Historial · RF15 — Inasistencias · RF16 a RF19 — Registro diario."""

    def setUp(self):
        super().setUp()
        self._register(email=PROFESOR, name='Coach')
        self._register(email=ADMIN, name='Jefa')
        self._register(email=ESTUDIANTE, name='Juan Perez')
        self.client.get('/api/slots/')
        self.hoy = self._jornada_en_curso()
        self.jornada = self.hoy

    def _reserve(self, email, slot_id):
        resp = super()._reserve(email, slot_id)
        self._traer_a_hoy(email)
        return resp

    def _procesar(self):
        return self.client.post('/api/attendance/process/',
                                {'actor_email': PROFESOR, 'fecha': self.jornada}, format='json')

    # ── RF17 / HU07 — Historial completo ───────────────────────────────────
    def test_rf17_el_historial_incluye_reservas_cancelaciones_y_asistencias(self):
        rid = self._reserve(ESTUDIANTE, 1).data['id']
        self.client.delete(f'/api/reservations/{rid}/')          # CANCELADA
        self._reserve(ESTUDIANTE, 2)
        self.client.post('/api/attendance/register/', {
            'actor_email': PROFESOR, 'documento': DOCUMENTOS[ESTUDIANTE], 'fecha': self.jornada,
        }, format='json')                                        # COMPLETADA
        self._reserve(ESTUDIANTE, 3)
        self._procesar()                                         # NO_SHOW

        resp = self.client.get(f'/api/reservations/history/?email={ESTUDIANTE}')
        estados = sorted(h['estado'] for h in resp.data)
        self.assertEqual(estados, ['CANCELADA', 'COMPLETADA', 'NO_SHOW'])

    # ── RF18 / HU08 — Reporte personal ─────────────────────────────────────
    def test_rf18_el_estudiante_consulta_sus_inasistencias_y_penalizaciones(self):
        self._reserve(ESTUDIANTE, 1)
        self._procesar()
        resp = self.client.get(f'/api/reports/personal/?email={ESTUDIANTE}')
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(resp.data['no_show_count'], 1)
        self.assertEqual(resp.data['no_show_limite'], 5)
        self.assertEqual(resp.data['inasistencias_restantes'], 4)
        self.assertFalse(resp.data['penalizado'])
        self.assertEqual(len(resp.data['inasistencias']), 1)

    def test_rf18_el_reporte_personal_muestra_la_penalizacion(self):
        for _ in range(db_module.NO_SHOW_LIMITE):
            self._reserve(ESTUDIANTE, 1)
            self._procesar()
        resp = self.client.get(f'/api/reports/personal/?email={ESTUDIANTE}')
        self.assertTrue(resp.data['penalizado'])
        self.assertEqual(resp.data['inasistencias_restantes'], 0)
        self.assertIsNotNone(resp.data['penalizado_hasta'])

    # ── RF19 / HU17 / HU18 — Reporte general diario ────────────────────────
    def test_rf19_reporte_general_diario_con_totales(self):
        ana = 'ana@soyudemedellin.edu.co'
        self._register(email=ana, name='Ana')
        rid = self._reserve(ESTUDIANTE, 1).data['id']
        self.client.delete(f'/api/reservations/{rid}/')            # cancelación
        self._reserve(ESTUDIANTE, 2)
        self.client.post('/api/attendance/register/', {
            'actor_email': PROFESOR, 'documento': DOCUMENTOS[ESTUDIANTE], 'fecha': self.jornada,
        }, format='json')                                          # asistencia
        self._reserve(ana, 3)
        self._procesar()                                           # inasistencia

        resp = self.client.get(f'/api/reports/daily/entrenador/?actor_email={PROFESOR}&fecha={self.jornada}')
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(resp.data['totales']['asistencias'], 1)
        self.assertEqual(resp.data['totales']['cancelaciones'], 1)
        self.assertEqual(resp.data['totales']['inasistencias'], 1)

    def test_rf19_el_estudiante_no_ve_el_reporte_general(self):
        resp = self.client.get(f'/api/reports/daily/entrenador/?actor_email={ESTUDIANTE}')
        self.assertEqual(resp.status_code, 403)

    def test_rf19_el_reporte_lista_a_los_estudiantes_penalizados(self):
        for _ in range(db_module.NO_SHOW_LIMITE):
            self._reserve(ESTUDIANTE, 1)
            self._procesar()
        resp = self.client.get(f'/api/reports/daily/entrenador/?actor_email={PROFESOR}&fecha={self.jornada}')
        self.assertEqual(resp.data['totales']['estudiantes_penalizados'], 1)
        self.assertEqual(resp.data['penalizados'][0]['documento'], DOCUMENTOS[ESTUDIANTE])

    # ── RF20 / HU19 / HU20 — El reporte diario en PDF ──────────────────────
    def test_rf20_el_reporte_diario_se_genera_en_pdf(self):
        self._reserve(ESTUDIANTE, 1)
        self._procesar()
        resp = self.client.get(f'/api/reports/daily/entrenador.pdf?actor_email={PROFESOR}&fecha={self.jornada}')
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(resp['Content-Type'], 'application/pdf')
        self.assertTrue(resp.content.startswith(b'%PDF'))

    def test_rf20_el_estudiante_no_genera_el_pdf_general(self):
        resp = self.client.get(f'/api/reports/daily/entrenador.pdf?actor_email={ESTUDIANTE}')
        self.assertEqual(resp.status_code, 403)


class AdministradorPrincipalTests(GymApiTestCase):
    """RF21 — Crear administradores · RF22 — Retirar el rol de administrador."""

    OTRO_ADMIN = 'segunda.admin@udemedellin.edu.co'

    def setUp(self):
        super().setUp()
        self._register(email=ADMIN, name='Jefa')       # primer ADMIN = principal

    def _crear_admin(self, actor=ADMIN, email=None):
        email = email or self.OTRO_ADMIN
        return self.client.post('/api/admin/users/', {
            'actor_email': actor, 'name': 'Segunda Admin', 'email': email,
            'documento': self._documento(email),
        }, format='json')

    def test_rf21_el_primer_admin_es_el_principal(self):
        self.assertTrue(self._user(ADMIN)['es_principal'])

    def test_rf21_el_principal_crea_cuentas_de_administrador(self):
        resp = self._crear_admin()
        self.assertEqual(resp.status_code, 201)
        self.assertEqual(self._user(self.OTRO_ADMIN)['role'], 'ADMIN')
        self.assertFalse(self._user(self.OTRO_ADMIN)['es_principal'])

    def test_rf21_un_admin_no_principal_no_crea_administradores(self):
        self._crear_admin()
        resp = self._crear_admin(actor=self.OTRO_ADMIN, email='tercera@udemedellin.edu.co')
        self.assertEqual(resp.status_code, 403)

    def test_rf22_el_principal_retira_el_rol_de_administrador(self):
        self._crear_admin()
        resp = self.client.patch(f'/api/admin/users/{self.OTRO_ADMIN}/',
                                 {'actor_email': ADMIN, 'accion': 'retirar'}, format='json')
        self.assertEqual(resp.status_code, 200)
        retirado = self._user(self.OTRO_ADMIN)
        self.assertEqual(retirado['role'], 'SIN_ROL')
        self.assertEqual(retirado['estado'], 'INACTIVO')

    def test_rf22_la_cuenta_retirada_ya_no_inicia_sesion(self):
        self._crear_admin()
        self.client.patch(f'/api/admin/users/{self.OTRO_ADMIN}/',
                          {'actor_email': ADMIN, 'accion': 'retirar'}, format='json')
        self.assertEqual(self._login(self.OTRO_ADMIN).status_code, 403)

    def test_rf22_el_principal_puede_restaurar_el_rol(self):
        self._crear_admin()
        self.client.patch(f'/api/admin/users/{self.OTRO_ADMIN}/',
                          {'actor_email': ADMIN, 'accion': 'retirar'}, format='json')
        resp = self.client.patch(f'/api/admin/users/{self.OTRO_ADMIN}/',
                                 {'actor_email': ADMIN, 'accion': 'restaurar'}, format='json')
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(self._user(self.OTRO_ADMIN)['role'], 'ADMIN')

    def test_rf22_no_se_puede_retirar_al_administrador_principal(self):
        self._crear_admin()
        resp = self.client.patch(f'/api/admin/users/{ADMIN}/',
                                 {'actor_email': ADMIN, 'accion': 'retirar'}, format='json')
        self.assertEqual(resp.status_code, 400)
        self.assertEqual(self._user(ADMIN)['role'], 'ADMIN')

    def test_rf22_un_admin_no_principal_no_retira_roles(self):
        self._crear_admin()
        resp = self.client.patch(f'/api/admin/users/{ADMIN}/',
                                 {'actor_email': self.OTRO_ADMIN, 'accion': 'retirar'}, format='json')
        self.assertEqual(resp.status_code, 403)


class NotificacionesTests(GymApiTestCase):
    """RF23 · RF24 · RF25 — Avisos al estudiante al reservar y cancelar."""

    def setUp(self):
        super().setUp()
        self._register(email=ESTUDIANTE, name='Juan Perez')
        self.client.get('/api/slots/')

    def test_rf23_notifica_la_reserva_confirmada(self):
        resp = self._reserve(ESTUDIANTE, 1)
        self.assertEqual(resp.status_code, 201)
        self.assertEqual(resp.data['tipo'], 'RESERVA_CONFIRMADA')
        self.assertIn('confirmada', resp.data['notificacion'].lower())

    def test_rf24_notifica_la_segunda_reserva_del_mismo_dia(self):
        self._reserve(ESTUDIANTE, 1)
        resp = self._reserve(ESTUDIANTE, 2)
        self.assertEqual(resp.status_code, 409)
        self.assertEqual(resp.data['tipo'], 'RESERVA_DUPLICADA')
        self.assertIn('ya tienes una reserva', resp.data['notificacion'].lower())

    def test_rf25_notifica_la_cancelacion(self):
        rid = self._reserve(ESTUDIANTE, 1).data['id']
        resp = self.client.delete(f'/api/reservations/{rid}/')
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(resp.data['tipo'], 'RESERVA_CANCELADA')
        self.assertIn('cancelaste', resp.data['notificacion'].lower())

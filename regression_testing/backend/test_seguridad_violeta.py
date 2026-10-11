import unittest
from hamcrest import assert_that, equal_to, is_not, has_key, is_in
from api import db as db_module
from .test_violeta import GymApiTestCase, ESTUDIANTE


# SEGURIDAD RF01
class SeguridadRegistroTests(GymApiTestCase):

    def setUp(self):
        super().setUp()
        self.client.raise_request_exception = False

    def _post_registro(self, **cambios):
        cuerpo = {
            'name': 'Ana Prueba',
            'email': 'ana@soyudemedellin.edu.co',
            'documento': '1002003004',
        }
        cuerpo.update(cambios)
        return self.client.post('/api/auth/register/', cuerpo, format='json')

    def test_registro_con_correo_no_institucional_se_rechaza(self):
        resp = self._post_registro(email='x@gmail.com')
        assert_that(resp.status_code, equal_to(400))

    def test_registro_ignora_el_rol_que_manda_el_cliente(self):
        resp = self._post_registro(role='ADMIN')
        assert_that(resp.status_code, equal_to(201))
        assert_that(resp.data['role'], equal_to('ESTUDIANTE'))
        guardada = db_module.get_db().users.find_one(
            {'email': 'ana@soyudemedellin.edu.co'})
        assert_that(guardada['role'], equal_to('ESTUDIANTE'))

    def test_registro_no_devuelve_la_contrasena(self):
        resp = self._post_registro()
        assert_that(resp.status_code, equal_to(201))
        assert_that(resp.data, is_not(has_key('password')))

    # hallazgos: el sistema no se defiende
    @unittest.expectedFailure
    def test_hallazgo_registro_con_dos_arrobas_se_rechaza(self):
        resp = self._post_registro(email='intruso@gmail.com@udemedellin.edu.co')
        assert_that(resp.status_code, equal_to(400))

    @unittest.expectedFailure
    def test_hallazgo_registro_con_email_como_objeto_responde_400(self):
        resp = self._post_registro(email={'$ne': ''})
        assert_that(resp.status_code, equal_to(400))


# INICIO DE SESIÓN RF02
class SeguridadLoginTests(GymApiTestCase):

    def setUp(self):
        super().setUp()
        self.client.raise_request_exception = False

    def test_login_con_truco_de_mongo(self):
        self._register()
        resp = self.client.post(
            '/api/auth/login/',
            {'email': ESTUDIANTE, 'documento': {'$ne': ''}},
            format='json',
        )
        assert_that(resp.status_code, equal_to(401))

    def test_login_no_revela_que_el_correo_existe(self):
        self._register()
        correo_falso = self._login('fantasma@soyudemedellin.edu.co', documento='1001234567')
        documento_malo = self._login(ESTUDIANTE, documento='9999999999')
        assert_that(correo_falso.status_code, equal_to(401))
        assert_that(documento_malo.status_code, equal_to(401))
        assert_that(correo_falso.data, equal_to(documento_malo.data))

    def test_login_exitoso_no_devuelve_contrasena(self):
        self._register()
        resp = self._login(ESTUDIANTE)
        assert_that(resp.status_code, equal_to(200))
        assert_that(resp.data, is_not(has_key('password')))

    def test_cuenta_inhabilitada_no_puede_entrar(self):
        self._register(email='admin0@udemedellin.edu.co', name='Admin0')
        db_module.get_db().users.update_one(
            {'email': 'admin0@udemedellin.edu.co'},
            {'$set': {'estado': 'INACTIVO', 'role': 'SIN_ROL'}},
        )
        resp = self._login('admin0@udemedellin.edu.co')
        assert_that(resp.status_code, equal_to(403))

    # hallazgos
    @unittest.expectedFailure
    def test_bloquear_despues_de_muchos_intentos(self):
        self._register()
        for _ in range(30):
            self._login(ESTUDIANTE, documento='0000000000')
        resp = self._login(ESTUDIANTE)
        assert_that(resp.status_code, is_in([403, 423, 429]))

    @unittest.expectedFailure
    def test_correo_que_no_es_texto(self):
        resp = self.client.post(
            '/api/auth/login/',
            {'email': {'$ne': ''}, 'documento': '1001234567'},
            format='json',
        )
        assert_that(resp.status_code, equal_to(400))
        
    # PERFIL RF03
class SeguridadPerfilTests(GymApiTestCase):

    def setUp(self):
        super().setUp()
        self.client.raise_request_exception = False
        
    def test_perfil_ignora_campo_role(self):
        self._register()
        self.client.put(
            '',
            {'email': ESTUDIANTE, 'peso': 70, 'role': 'ADMIN'},
            format='json',
        )
        guardada = db_module.get_db().users.find_one({'email': ESTUDIANTE})
        assert_that(guardada['ROLE'], equal_to('ESTUDIANTE'))
        
    def test_ignora_documento_nuevo(self):
        self._register()
        self.client.put(
            '/api/users/profile/',
            {'email': ESTUDIANTE, 'peso': 70, 'documento': 123},
            format='json',
        )
        guardada = db_module.get_db().users.find_one({'email': ESTUDIANTE})
        assert_that(guardada['documento'], equal_to('1001234567'))
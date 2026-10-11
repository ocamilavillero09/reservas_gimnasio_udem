from hamcrest import assert_that, equal_to, has_key, none
from api import db as db_module
from .test_violeta import GymApiTestCase, ESTUDIANTE, PROFESOR


class ApiRegistroTest(GymApiTestCase):
    def test_api_responde_correctamente_registro(self):
        resp = self.client.post(
            '/api/auth/register/',
            {'name': 'Previa', 'email': 'previa@soyudemedellin.edu.co',
             'documento': '2000000000'},
            format='json',
        )
        assert_that(resp.status_code, equal_to(201))
        assert_that(resp.data, has_key('message'))
        assert_that(resp.data, has_key('role'))
        assert_that(resp.data, has_key('documento'))
        assert_that(resp.data, has_key('es_principal'))
        assert_that(resp.data['message'], equal_to('Registro exitoso.'))
        assert_that(resp.data['role'], equal_to('ESTUDIANTE'))
        assert_that(resp.data['documento'], equal_to('2000000000'))
        assert_that(resp.data['es_principal'], equal_to(False))

    def test_api_registro_datos_invalidos(self):
        resp = self.client.post(
            '/api/auth/register/',
            {'name': 'Ana', 'email': 'x@gmail.com', 'documento': '1002003004'},
            format='json',
        )
        assert_that(resp.status_code, equal_to(400))
        assert_that(resp.data, has_key('error'))

    def test_api_registro_correo_repetido(self):
        self._register()
        resp = self._register()
        assert_that(resp.status_code, equal_to(409))
        assert_that(resp.data, has_key('error'))

    def test_api_registro_documento_repetido(self):
        self._register()
        resp = self._register(email='otro@soyudemedellin.edu.co',
                              name='Otro', documento='1001234567')
        assert_that(resp.status_code, equal_to(409))
        assert_that(resp.data, has_key('error'))


class ApiLoginTest(GymApiTestCase):

    def test_api_responde_correctamente_login(self):
        self._register()
        resp = self._login(ESTUDIANTE)
        assert_that(resp.status_code, equal_to(200))
        assert_that(resp.data['role'], equal_to('ESTUDIANTE'))
        assert_that(resp.data['estado'], equal_to('ACTIVO'))

    def test_api_responde_correctamente_login_documento_incorrecto(self):
        self._register()
        resp = self._login(ESTUDIANTE, documento='9999999999')
        assert_that(resp.status_code, equal_to(401))
        assert_that(resp.data, has_key('error'))

    def test_api_responde_correctamente_login_cuenta_inactiva(self):
        self._register(email='admin0@udemedellin.edu.co', name='Admin0')
        db_module.get_db().users.update_one(
            {'email': 'admin0@udemedellin.edu.co'},
            {'$set': {'estado': 'INACTIVO', 'role': 'SIN_ROL'}},
        )
        resp = self._login('admin0@udemedellin.edu.co')
        assert_that(resp.status_code, equal_to(403))
        assert_that(resp.data, has_key('error'))


class ApiPerfilEstudianteTest(GymApiTestCase):

    def test_ver_perfil_estudiante_exitoso(self):
        self._register()
        resp = self.client.get('/api/users/profile/', {'email': ESTUDIANTE})
        assert_that(resp.status_code, equal_to(200))
        assert_that(resp.data['name'], equal_to('Juan Pérez'))
        assert_that(resp.data['email'], equal_to(ESTUDIANTE))
        assert_that(resp.data['role'], equal_to('ESTUDIANTE'))
        assert_that(resp.data['documento'], equal_to('1001234567'))
        assert_that(resp.data['es_principal'], equal_to(False))
        assert_that(resp.data['estado'], equal_to('ACTIVO'))
        assert_that(resp.data['peso'], none())

    def test_editar_perfil_estudiante_exitoso(self):
        self._register()
        resp = self.client.put(
            '/api/users/profile/',
            {'email': ESTUDIANTE, 'peso': 70},
            format='json',
        )
        assert_that(resp.status_code, equal_to(200))
        assert_that(resp.data['name'], equal_to('Juan Pérez'))
        assert_that(resp.data['email'], equal_to(ESTUDIANTE))
        assert_that(resp.data['role'], equal_to('ESTUDIANTE'))
        assert_that(resp.data['documento'], equal_to('1001234567'))
        assert_that(resp.data['es_principal'], equal_to(False))
        assert_that(resp.data['estado'], equal_to('ACTIVO'))
        assert_that(resp.data['peso'], equal_to(70))

    def test_perfil_dato_invalido_rechazado(self):
        self._register()
        resp = self.client.put('/api/users/profile/',
                               {'email': ESTUDIANTE, 'altura': 999}, format='json')
        assert_that(resp.status_code, equal_to(400))
        assert_that(resp.data, has_key('error'))
        assert_that(resp.data, has_key('campos'))
        assert_that(resp.data['campos'], has_key('altura'))

    def test_perfil_sin_correo_rechazado(self):
        resp = self.client.put('/api/users/profile/', {'peso': 70}, format='json')
        assert_that(resp.status_code, equal_to(400))
        assert_that(resp.data, has_key('error'))

    def test_perfil_usuario_inexistente(self):
        resp = self.client.get('/api/users/profile/?email=nadie@soyudemedellin.edu.co')
        assert_that(resp.status_code, equal_to(404))
        assert_that(resp.data, has_key('error'))

    def test_perfil_rol_no_estudiante(self):
        self._register(email=PROFESOR, name='Coach')
        resp = self.client.get('/api/users/profile/?email=' + PROFESOR)
        assert_that(resp.status_code, equal_to(403))
        assert_that(resp.data, has_key('error'))


class ApiPerfilEntrenadorTest(GymApiTestCase):

    def test_ver_perfil_entrenador_exitoso(self):
        self._register(email=PROFESOR, name='Coach')
        resp = self.client.get('/api/users/entrenador/', {'email': PROFESOR})
        assert_that(resp.status_code, equal_to(200))
        assert_that(resp.data['name'], equal_to('Coach'))
        assert_that(resp.data['email'], equal_to(PROFESOR))
        assert_that(resp.data['documento'], equal_to('7009998881'))
        assert_that(resp.data['role'], equal_to('ENTRENADOR'))
        assert_that(resp.data['estado'], equal_to('ACTIVO'))

    def test_perfil_entrenador_usuario_inexistente(self):
        resp = self.client.get('/api/users/entrenador/?email=nadie@udem.edu.co')
        assert_that(resp.status_code, equal_to(404))
        assert_that(resp.data, has_key('error'))

    def test_perfil_entrenador_rol_no_entrenador(self):
        self._register()
        resp = self.client.get('/api/users/entrenador/?email=' + ESTUDIANTE)
        assert_that(resp.status_code, equal_to(403))
        assert_that(resp.data, has_key('error'))
        
class ApiPerfilAdministradorTest(GymApiTestCase):

    def test_ver_perfil_administrador_exitoso(self):
        self._register(email=ADMIN, name='Jefe')
        resp = self.client.get('/api/users/administrador/', {'email': ADMIN})
        assert_that(resp.status_code, equal_to(200))
        assert_that(resp.data['name'], equal_to('Jefe'))
        assert_that(resp.data['email'], equal_to(ADMIN))
        assert_that(resp.data['documento'], equal_to('3005554442'))
        assert_that(resp.data['role'], equal_to('ADMIN'))
        assert_that(resp.data['estado'], equal_to('ACTIVO'))
        assert_that(resp.data['es_principal'], equal_to(True))

    def test_perfil_administrador_usuario_inexistente(self):
        resp = self.client.get('/api/users/administrador/?email=nadie@udemedellin.edu.co')
        assert_that(resp.status_code, equal_to(404))
        assert_that(resp.data, has_key('error'))

    def test_perfil_administrador_rol_no_administrador(self):
        self._register()
        resp = self.client.get('/api/users/administrador/?email=' + ESTUDIANTE)
        assert_that(resp.status_code, equal_to(403))
        assert_that(resp.data, has_key('error'))
        
class ApiReporteInasistencias(GymApiTestCase):
    def test_estudiante_sin_inasistencias(self):
        self._register()
        resp= self.client.get(
            '/api/reports/personal/',
            {'email': ESTUDIANTE}
        )
        assert_that(resp.status_code, equal_to(200))
        assert_that(resp.data['name'], equal_to('Juan Pérez'))
        assert_that(resp.data['email'], equal_to(ESTUDIANTE))
        assert_that(resp.data['documento'], equal_to('1001234567'))
        assert_that(resp.data['estado'], equal_to('ACTIVO'))
        assert_that(resp.data['no_show_count'], equal_to(0))
        assert_that(resp.data['no_show_limite'], equal_to(5))
        assert_that(resp.data['inasistencias_restantes'], equal_to(5))
        assert_that(resp.data['alerta_inasistencias'], none())
        assert_that(resp.data['penalizado'], equal_to(False))
        assert_that(resp.data['penalizado_hasta'], none())
        assert_that(resp.data['inasistencias'], equal_to([]))
        assert_that(resp.data['total_asistencias'], equal_to(0))
        assert_that(resp.data['total_cancelaciones'], equal_to(0))

    def test_reporte_inasistencias_usuario_inexistente(self):
        resp = self.client.get('/api/reports/personal/?email=nadie@soyudemedellin.edu.co')
        assert_that(resp.status_code, equal_to(404))
        assert_that(resp.data, has_key('error'))

    def test_reporte_inasistencias_sin_correo(self):
        resp = self.client.get('/api/reports/personal/')
        assert_that(resp.status_code, equal_to(400))
        assert_that(resp.data, has_key('error'))
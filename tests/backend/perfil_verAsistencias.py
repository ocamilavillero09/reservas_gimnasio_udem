from django.test import TestCase
from rest_framework.test import APIClient
import mongomock

from api import db as db_module


ESTUDIANTE = 'juan.perez@soyudemedellin.edu.co'
PROFESOR = 'coach@udem.edu.co'
ADMIN = 'jefe@udemedellin.edu.co'

DOCUMENTOS = {
    ESTUDIANTE: '1001234567',
    PROFESOR: '7009998881',
    ADMIN: '3005554442',
}


class GymApiTestCase(TestCase):

    def setUp(self):
        db_module._client = mongomock.MongoClient(tz_aware=True)
        self.client = APIClient()

    def tearDown(self):
        db_module._client = None

    def _register(self, email=ESTUDIANTE, name='Juan Pérez',
                  documento=None):
        if documento is None:
            documento = DOCUMENTOS.get(email, '1001234567')

        return self.client.post(
            '/api/auth/register/',
            {
                'name': name,
                'email': email,
                'documento': documento,
            },
            format='json',
        )

    def _login(self, email, documento=None):
        if documento is None:
            documento = DOCUMENTOS.get(email, '1001234567')

        return self.client.post(
            '/api/auth/login/',
            {
                'email': email,
                'documento': documento,
            },
            format='json',
        )

class RegistrarCuentaCaminosTests(GymApiTestCase):
 
    def test_rf01_camino_1_2_3_16_campos_vacios(self):
        # Arrange
        # Act
        resp = self.client.post(
            '/api/auth/register/',
            {'name': '', 'email': '', 'documento': ''},
            format='json',
        )
        # Assert
        self.assertEqual(resp.status_code, 400)
 
    def test_rf01_camino_1_2_4_5_16_documento_muy_corto(self):
        # Act
        resp = self._register(documento='123')
        # Assert
        self.assertEqual(resp.status_code, 400)
 
    def test_rf01_camino_1_2_4_6_7_8_16_correo_no_institucional(self):
        # Act
        resp = self._register(email='juan@gmail.com')
        # Assert
        self.assertEqual(resp.status_code, 400)
 
    def test_rf01_camino_1_2_4_6_7_9_10_16_correo_ya_registrado(self):
        # Arrange
        self._register()
        # Act
        resp = self._register()
        # Assert
        self.assertEqual(resp.status_code, 409)
 
    def test_rf01_camino_1_2_4_6_7_9_11_12_16_documento_ya_registrado(self):
        # Arrange
        self._register()
        # Act
        resp = self._register(email='otra@soyudemedellin.edu.co', name='Otra',
                              documento=DOCUMENTOS[ESTUDIANTE])
        # Assert
        self.assertEqual(resp.status_code, 409)
 
    def test_rf01_camino_1_2_4_6_7_9_11_13_14_15_16_registro_exitoso(self):
        # Act
        resp = self._register()
        # Assert
        self.assertEqual(resp.status_code, 201)
        self.assertEqual(resp.data['role'], 'ESTUDIANTE')
 
 
# RF02 — Iniciar sesion
class IniciarSesionCaminosTests(GymApiTestCase):
 
    def test_rf02_camino_1_2_3_9_correo_no_registrado(self):
        # Act
        resp = self._login('fantasma@soyudemedellin.edu.co', documento='1001234567')
        # Assert
        self.assertEqual(resp.status_code, 401)
 
    def test_rf02_camino_1_2_4_3_9_documento_no_coincide(self):
        # Arrange
        self._register()
        db_module.get_db().users.update_one(
            {'email': 'otro@udemedellin.edu.co'},
            {'$set': {'estado': 'INACTIVO'}},   # solo esto
        )
        # Act
        resp = self._login(ESTUDIANTE, documento='0000000000')
        # Assert
        self.assertEqual(resp.status_code, 401)
 
    def test_rf02_camino_1_2_4_5_6_9_cuenta_inactiva(self):
        # Arrange
        self._register(email=ADMIN, name='Jefa')
        # se registra un segundo admin y se le retira el rol para dejarlo inactivo
        self._register(email='otro@udemedellin.edu.co', name='Otro Admin')
        db_module.get_db().users.update_one(
            {'email': 'otro@udemedellin.edu.co'},
            {'$set': {'estado': 'INACTIVO', 'role': 'SIN_ROL'}},
        )
        # Act
        resp = self._login('otro@udemedellin.edu.co')
        # Assert
        self.assertEqual(resp.status_code, 403)
 
    def test_rf02_camino_1_2_4_5_7_6_9_cuenta_sin_rol(self):
        # Arrange
        self._register(email='otro@udemedellin.edu.co', name='Otro')
        db_module.get_db().users.update_one(
            {'email': 'otro@udemedellin.edu.co'},
            {'$set': {'role': 'SIN_ROL'}},
        )
        # Act
        resp = self._login('otro@udemedellin.edu.co')
        # Assert
        self.assertEqual(resp.status_code, 403)
 
    def test_rf02_camino_1_2_4_5_7_8_9_login_exitoso(self):
        # Arrange
        self._register()
        # Act
        resp = self._login(ESTUDIANTE)
        # Assert
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(resp.data['role'], 'ESTUDIANTE')
        self.assertNotIn('password', resp.data)
 
 
# RF03 — Consultar y actualizar mi perfil (estudiante)
class PerfilEstudianteCaminosTests(GymApiTestCase):
 
    def test_rf03_camino_1_2_4_5_21_get_sin_correo(self):
        resp = self.client.get('/api/users/profile/', {'email': ''})
        self.assertEqual(resp.status_code, 400)
 
    def test_rf03_camino_1_3_4_5_21_put_sin_correo(self):
        resp = self.client.put('/api/users/profile/', {'email': '', 'edad': 21}, format='json')
        self.assertEqual(resp.status_code, 400)
 
    def test_rf03_camino_1_2_4_6_7_21_get_usuario_inexistente(self):
        resp = self.client.get('/api/users/profile/', {'email': 'fantasma@x.com'})
        self.assertEqual(resp.status_code, 404)
 
    def test_rf03_camino_1_2_4_6_8_9_21_usuario_con_rol_no_autorizado(self):
        # Arrange
        self._register(email=PROFESOR, name='Coach')
        # Act
        resp = self.client.get('/api/users/profile/', {'email': PROFESOR})
        # Assert
        self.assertEqual(resp.status_code, 403)
 
    def test_rf03_camino_1_2_4_6_8_10_20_21_get_perfil_estudiante_valido(self):
        # Arrange
        self._register()
        # Act
        resp = self.client.get('/api/users/profile/', {'email': ESTUDIANTE})
        # Assert
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(resp.data['email'], ESTUDIANTE)
 
    def test_rf03_camino_1_3_4_6_8_10_11_16_18_20_21_put_body_vacio(self):
        # Arrange
        self._register()
        # Act
        resp = self.client.put('/api/users/profile/', {'email': ESTUDIANTE}, format='json')
        # Assert
        self.assertEqual(resp.status_code, 200)
 
    def test_rf03_camino_1_3_4_6_8_10_11_12_13_14_11_16_17_21_put_campo_invalido(self):
        # Arrange
        self._register()
        # Act
        resp = self.client.put(
            '/api/users/profile/', {'email': ESTUDIANTE, 'altura': 999}, format='json')
        # Assert
        self.assertEqual(resp.status_code, 400)
 
    def test_rf03_camino_1_3_4_6_8_10_11_12_13_15_11_16_18_19_20_21_put_campo_valido(self):
        # Arrange
        self._register()
        # Act
        resp = self.client.put(
            '/api/users/profile/', {'email': ESTUDIANTE, 'peso': 70}, format='json')
        # Assert
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(resp.data['peso'], 70)
 
 
# RF04 — Consultar el perfil del entrenador
class PerfilEntrenadorCaminosTests(GymApiTestCase):
 
    def test_rf04_camino_1_2_3_10_sin_correo(self):
        resp = self.client.get('/api/users/entrenador/', {'email': ''})
        self.assertEqual(resp.status_code, 400)
 
    def test_rf04_camino_1_2_4_5_6_10_usuario_inexistente(self):
        resp = self.client.get('/api/users/entrenador/', {'email': 'fantasma@x.com'})
        self.assertEqual(resp.status_code, 404)
 
    def test_rf04_camino_1_2_4_5_7_8_10_rol_no_autorizado(self):
        # Arrange
        self._register()
        # Act
        resp = self.client.get('/api/users/entrenador/', {'email': ESTUDIANTE})
        # Assert
        self.assertEqual(resp.status_code, 403)
 
    def test_rf04_camino_1_2_4_5_7_9_10_perfil_entrenador_valido(self):
        # Arrange
        self._register(email=PROFESOR, name='Coach')
        # Act
        resp = self.client.get('/api/users/entrenador/', {'email': PROFESOR})
        # Assert
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(resp.data['name'], 'Coach')
        self.assertEqual(resp.data['role'], 'ENTRENADOR')
 
 
# RF05 — Consultar el perfil del administrador
class PerfilAdministradorCaminosTests(GymApiTestCase):
 
    def test_rf05_camino_1_2_3_12_sin_correo(self):
        resp = self.client.get('/api/users/administrador/', {'email': ''})
        self.assertEqual(resp.status_code, 400)
 
    def test_rf05_camino_1_2_4_5_6_12_usuario_inexistente(self):
        resp = self.client.get('/api/users/administrador/', {'email': 'fantasma@x.com'})
        self.assertEqual(resp.status_code, 404)
 
    def test_rf05_camino_1_2_4_5_7_8_12_rol_no_autorizado(self):
        # Arrange
        self._register(email=PROFESOR, name='Coach')
        # Act
        resp = self.client.get('/api/users/administrador/', {'email': PROFESOR})
        # Assert
        self.assertEqual(resp.status_code, 403)
 
    def test_rf05_camino_1_2_4_5_7_9_10_11_12_perfil_admin_valido(self):
        # Arrange
        self._register(email=ADMIN, name='Jefa')
        # Act
        resp = self.client.get('/api/users/administrador/', {'email': ADMIN})
        # Assert
        self.assertEqual(resp.status_code, 200)
        self.assertEqual(resp.data['role'], 'ADMIN')
        self.assertTrue(resp.data['es_principal'])

# RF15 — Ver mi reporte de inasistencias
class InasistenciasCaminosTests(GymApiTestCase):
    # cubre los 4 caminos de la tabla de caminos de RF15

    def test_rf15_camino_1_2_3_13_email_vacio(self):
        resp = self.client.get('/api/reports/personal/', {'email': ''})
        self.assertEqual(resp.status_code, 400)

    def test_rf15_camino_1_2_4_5_6_13_usuario_no_encontrado(self):
        resp = self.client.get('/api/reports/personal/', {'email': 'fantasma@x.com'})
        self.assertEqual(resp.status_code, 404)

    def test_rf15_camino_1_2_4_5_7_8_9_10_12_13_con_penalizado_hasta(self):
        # Arrange
        self._register()
        db_module.get_db().users.update_one(
            {'email': ESTUDIANTE},
            {'$set': {'no_show_count': 5, 'estado': 'PENALIZADO',
                      'penalizado_hasta': db_module.ahora_utc()}},
        )
        # Act
        resp = self.client.get('/api/reports/personal/', {'email': ESTUDIANTE})
        # Assert
        self.assertEqual(resp.status_code, 200)
        self.assertTrue(resp.data['penalizado'])
        self.assertIsNotNone(resp.data['penalizado_hasta'])

    def test_rf15_camino_1_2_4_5_7_8_9_11_12_13_sin_penalizado_hasta(self):
        # Arrange
        self._register()
        # Act
        resp = self.client.get('/api/reports/personal/', {'email': ESTUDIANTE})
        # Assert
        self.assertEqual(resp.status_code, 200)
        self.assertFalse(resp.data['penalizado'])
        self.assertIsNone(resp.data['penalizado_hasta'])


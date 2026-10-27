"""Pruebas del middleware AutenticacionAPI generadas con GitHub Copilot y corregidas.

Copilot propuso los seis casos y sus nombres. El código que generó no cargaba
(ver regression_testing/ia/evidencias/copilot/), así que se corrigió:
  - el decorador @patch usaba self.db fuera de un método (NameError);
  - faltaba importar emitir_token;
  - el patch apuntaba a backend.api.autenticacion.get_db, que no existe;
  - pedía 401 en /api/slots/, que es una ruta pública;
  - usaba un correo y un rol que no existen en el sistema.
La base es mongomock, como en test_violeta.py.
"""
import mongomock
from django.test import TestCase
from rest_framework.test import APIClient

from api import db as db_module
from api.autenticacion import emitir_token

ESTUDIANTE = 'copilot.est@soyudemedellin.edu.co'
OTRO_ESTUDIANTE = 'copilot.otro@soyudemedellin.edu.co'
RUTA_PROTEGIDA = '/api/reports/personal/'


class AutenticacionAPITests(TestCase):
    def setUp(self):
        db_module._client = mongomock.MongoClient(tz_aware=True)
        self.db = db_module.get_db()
        self.db.users.insert_many([
            {'email': ESTUDIANTE, 'name': 'Estudiante Copilot', 'role': 'ESTUDIANTE',
             'estado': 'ACTIVO', 'no_show_count': 0},
            {'email': OTRO_ESTUDIANTE, 'name': 'Otro Estudiante', 'role': 'ESTUDIANTE',
             'estado': 'ACTIVO', 'no_show_count': 0},
        ])
        self.client = APIClient()

    def tearDown(self):
        db_module._client = None

    def _con_token(self, email):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {emitir_token(email)}')

    def test_peticion_sin_token(self):
        response = self.client.get(RUTA_PROTEGIDA, {'email': ESTUDIANTE})
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.json()['tipo'], 'NO_AUTENTICADO')

    def test_token_alterado(self):
        self.client.credentials(HTTP_AUTHORIZATION=f'Bearer {emitir_token(ESTUDIANTE)}x')
        response = self.client.get(RUTA_PROTEGIDA, {'email': ESTUDIANTE})
        self.assertEqual(response.status_code, 401)

    def test_token_inactivo(self):
        self.db.users.update_one({'email': ESTUDIANTE}, {'$set': {'estado': 'INACTIVO'}})
        self._con_token(ESTUDIANTE)
        response = self.client.get(RUTA_PROTEGIDA, {'email': ESTUDIANTE})
        self.assertEqual(response.status_code, 401)

    def test_actor_email_distinto(self):
        self._con_token(ESTUDIANTE)
        response = self.client.get(RUTA_PROTEGIDA, {'email': OTRO_ESTUDIANTE})
        self.assertEqual(response.status_code, 403)
        self.assertEqual(response.json()['tipo'], 'IDENTIDAD_AJENA')

    def test_ruta_inexistente(self):
        response = self.client.get('/api/no-existe/')
        self.assertEqual(response.status_code, 404)

    def test_ruta_publica_sin_token(self):
        response = self.client.get('/api/slots/')
        self.assertEqual(response.status_code, 200)

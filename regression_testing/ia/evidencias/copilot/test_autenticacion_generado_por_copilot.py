import json
from django.test import TestCase
from rest_framework.test import APIClient
from unittest.mock import patch
from mongomock import MongoClient

class AutenticacionAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.db = MongoClient().db
        self.user_data = {
            'email': 'test@example.com',
            'estado': 'ACTIVO',
            'role': 'USER'
        }
        self.db.users.insert_one(self.user_data)

    @patch('backend.api.autenticacion.get_db', return_value=self.db)
    def test_peticion_sin_token(self, mock_get_db):
        response = self.client.get('/api/slots/')
        self.assertEqual(response.status_code, 401)

    @patch('backend.api.autenticacion.get_db', return_value=self.db)
    def test_token_alterado(self, mock_get_db):
        response = self.client.get('/api/slots/', HTTP_AUTHORIZATION='Bearer altered_token')
        self.assertEqual(response.status_code, 401)

    @patch('backend.api.autenticacion.get_db', return_value=self.db)
    def test_token_inactivo(self, mock_get_db):
        self.db.users.update_one({'email': 'test@example.com'}, {'$set': {'estado': 'INACTIVO'}})
        response = self.client.get('/api/slots/', HTTP_AUTHORIZATION='Bearer ' + emitir_token('test@example.com'))
        self.assertEqual(response.status_code, 401)

    @patch('backend.api.autenticacion.get_db', return_value=self.db)
    def test_actor_email_distinto(self, mock_get_db):
        response = self.client.get('/api/slots/', HTTP_AUTHORIZATION='Bearer ' + emitir_token('test@example.com'), data={'actor_email': 'other@example.com'})
        self.assertEqual(response.status_code, 403)

    @patch('backend.api.autenticacion.get_db', return_value=self.db)
    def test_ruta_inexistente(self, mock_get_db):
        response = self.client.get('/api/nonexistent/')
        self.assertEqual(response.status_code, 404)

    @patch('backend.api.autenticacion.get_db', return_value=self.db)
    def test_ruta_publica_sin_token(self, mock_get_db):
        response = self.client.get('/api/slots/')
        self.assertEqual(response.status_code, 200)

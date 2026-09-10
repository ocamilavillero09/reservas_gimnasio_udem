"""
Pruebas de los requisitos que no entran en esta entrega.

El plan reparte los requisitos entre tres personas: RF01 a RF05 (acceso y
perfiles), RF06 a RF10 (reservas), y RF11 a RF16 junto con RF20 y RF21
(asistencia, registro diario y buzón). Los que quedan fuera de ese reparto se
prueban aquí, aparte de test_api.py, para que ese archivo contenga solo lo que
el equipo presenta:

  RF18  Descargar el registro diario en PDF (entrenador)
  RF22  Crear cuentas con rol de administrador
  RF23  Retirar el rol de administrador

Se siguen ejecutando con el resto: `manage.py test tests.backend` las recoge y
cuentan para la cobertura. Separarlas es una decisión de lectura, no una forma
de dejarlas de correr.

El andamiaje (mongomock, los correos de prueba y los ayudantes) se reutiliza
del archivo principal en lugar de copiarlo.
"""
from tests.backend.test_api import (
    GymApiTestCase,
    ESTUDIANTE, PROFESOR, ADMIN, DOCUMENTOS,
)


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


# ── RF18 — EL REGISTRO DIARIO DE LA JORNADA EN PDF ──────────────────────────
class RegistroDiarioPdfTests(GymApiTestCase):
    """RF18 — Descargar el registro diario en PDF (entrenador).

    El PDF necesita una jornada ya empezada y con movimiento, así que la
    preparación es la misma que usan las pruebas del registro en pantalla.
    """

    def setUp(self):
        super().setUp()
        self._register(email=PROFESOR, name='Coach')
        self._register(email=ESTUDIANTE, name='Juan Perez')
        self.client.get('/api/slots/')
        # `_traer_a_hoy` mueve la reserva a self.hoy, así que la jornada que se
        # procesa y la que se pide en el PDF tienen que ser esa misma fecha.
        self.hoy = self._jornada_en_curso()
        self.jornada = self.hoy

    def _reserve(self, email, slot_id):
        resp = super()._reserve(email, slot_id)
        self._traer_a_hoy(email)
        return resp

    def _procesar(self):
        return self.client.post('/api/attendance/process/',
                                {'actor_email': PROFESOR, 'fecha': self.jornada}, format='json')

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

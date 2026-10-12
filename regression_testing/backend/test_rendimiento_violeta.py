import time
import tracemalloc
from concurrent.futures import ThreadPoolExecutor
from hamcrest import assert_that, equal_to, less_than
from rest_framework.test import APIClient
from api import db as db_module
from .test_violeta import GymApiTestCase, ESTUDIANTE, PROFESOR, ADMIN

# RENDIMIENTO RF01
class RendimientoRegistroTests(GymApiTestCase):

    def test_registro_responde_en_tiempo_razonable(self):
        resp = self.client.post(
            '/api/auth/register/',
            {'name': 'Previa', 'email': 'previa@soyudemedellin.edu.co',
             'documento': '2000000000'},
            format='json',
        )
        assert_that(resp.status_code, equal_to(201))

        inicio = time.perf_counter()
        for i in range(20):
            self.client.post(
                '/api/auth/register/',
                {'name': f'Persona {i}',
                 'email': f'persona{i}@soyudemedellin.edu.co',
                 'documento': str(3000000000 + i)},
                format='json',
            )
        promedio_ms = (time.perf_counter() - inicio) / 20 * 1000

        # comparar con el límite
        assert_that(promedio_ms, less_than(600))


# RENDIMIENTO RF02
class RendimientoLoginTests(GymApiTestCase):

    def test_login_responde_en_tiempo_razonable(self):
        self._register()

        # comprobar que funciona antes de medir
        resp = self._login(ESTUDIANTE)
        assert_that(resp.status_code, equal_to(200))

        # medir (20 inicios de sesión de la misma persona)
        inicio = time.perf_counter()
        for _ in range(20):
            self._login(ESTUDIANTE)
        promedio_ms = (time.perf_counter() - inicio) / 20 * 1000

        # comparar con el límite
        assert_that(promedio_ms, less_than(600))


# RENDIMIENTO RF03
class RendimientoRF03Tests(GymApiTestCase):

    def test_leer_el_perfil_responde_rapido(self):
        self._register()
        resp = self.client.get('/api/users/profile/', {'email': ESTUDIANTE})
        assert_that(resp.status_code, equal_to(200))

        inicio = time.perf_counter()
        for _ in range(30):
            self.client.get('/api/users/profile/', {'email': ESTUDIANTE})
        promedio_ms = (time.perf_counter() - inicio) / 30 * 1000

        assert_that(promedio_ms, less_than(100))

    def test_actualizar_el_perfil_responde_rapido(self):
        self._register()
        datos = {'email': ESTUDIANTE, 'peso': 70, 'altura': 175}
        resp = self.client.put('/api/users/profile/', datos, format='json')
        assert_that(resp.status_code, equal_to(200))

        inicio = time.perf_counter()
        for _ in range(30):
            self.client.put('/api/users/profile/', datos, format='json')
        promedio_ms = (time.perf_counter() - inicio) / 30 * 1000

        assert_that(promedio_ms, less_than(150))

    def test_leer_el_perfil_con_2000_usuarios_sigue_siendo_rapido(self):
        self._register()
        db_module.get_db().users.insert_many([
            {
                'name': f'Estudiante {i}',
                'email': f'est{i}@soyudemedellin.edu.co',
                'documento': str(2000000000 + i),
                'password': 'sal:huella',
                'role': 'ESTUDIANTE',
                'estado': 'ACTIVO',
                'es_principal': False,
                'no_show_count': 0,
                'penalizado_hasta': None,
            }
            for i in range(2000)
        ])
        resp = self.client.get('/api/users/profile/', {'email': ESTUDIANTE})
        assert_that(resp.status_code, equal_to(200))

        inicio = time.perf_counter()
        for _ in range(30):
            self.client.get('/api/users/profile/', {'email': ESTUDIANTE})
        promedio_ms = (time.perf_counter() - inicio) / 30 * 1000

        assert_that(promedio_ms, less_than(300))


# RENDIMIENTO RF04, RF05, RF15
class Rendimiento_RF04_RF05_RF15T_ests(GymApiTestCase):

    def _medir_lectura(self, ruta, correo):
        resp = self.client.get(ruta, {'email': correo})
        assert_that(resp.status_code, equal_to(200))

        inicio = time.perf_counter()
        for _ in range(30):
            self.client.get(ruta, {'email': correo})
        return (time.perf_counter() - inicio) / 30 * 1000

    def test_perfil_de_entrenador_responde_rapido(self):
        self._register(email=PROFESOR, name='Coach')
        promedio_ms = self._medir_lectura('/api/users/entrenador/', PROFESOR)
        assert_that(promedio_ms, less_than(100))

    def test_perfil_de_administrador_responde_rapido(self):
        self._register(email=ADMIN, name='Jefa')
        promedio_ms = self._medir_lectura('/api/users/administrador/', ADMIN)
        assert_that(promedio_ms, less_than(100))

    def test_reporte_de_inasistencias_responde_rapido(self):
        self._register()
        promedio_ms = self._medir_lectura('/api/reports/personal/', ESTUDIANTE)
        assert_that(promedio_ms, less_than(100))

    def test_reporte_con_500_reservas_sigue_siendo_rapido(self):
        self._register()
        db_module.get_db().reservations.insert_many([
            {
                'email': ESTUDIANTE,
                'estado': 'NO_SHOW',
                'hour': '06:00',
                'date': '2026-09-14',
                'reserva_date': '2026-09-15',
            }
            for _ in range(500)
        ])
        promedio_ms = self._medir_lectura('/api/reports/personal/', ESTUDIANTE)
        assert_that(promedio_ms, less_than(300))


# MEMORIA (usa la lectura del perfil, RF03)
class RendimientoMemoriaTests(GymApiTestCase):

    def test_la_memoria_no_crece_al_repetir_muchas_peticiones(self):
        self._register()

        def lote(veces):
            for _ in range(veces):
                self.client.get('/api/users/profile/', {'email': ESTUDIANTE})

        lote(20)                       # calentamiento
        tracemalloc.start()
        lote(50)
        antes, _ = tracemalloc.get_traced_memory()
        lote(150)
        despues, _ = tracemalloc.get_traced_memory()
        tracemalloc.stop()

        crecimiento_mb = (despues - antes) / 1024 / 1024
        assert_that(crecimiento_mb, less_than(2))


# PETICIONES AL MISMO TIEMPO (usa la lectura del perfil, RF03)
class RendimientoSimultaneoTests(GymApiTestCase):

    def test_veinte_lecturas_al_mismo_tiempo_responden_200(self):
        self._register()
        codigos = []

        def una_lectura(_):
            cliente = APIClient()
            resp = cliente.get('/api/users/profile/', {'email': ESTUDIANTE})
            codigos.append(resp.status_code)

        inicio = time.perf_counter()
        with ThreadPoolExecutor(max_workers=10) as grupo:
            list(grupo.map(una_lectura, range(20)))
        segundos = time.perf_counter() - inicio

        assert_that(codigos, equal_to([200] * 20))
        assert_that(segundos, less_than(10))
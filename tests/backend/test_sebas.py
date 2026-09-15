from datetime import date, datetime, timedelta, timezone
from unittest.mock import MagicMock, patch

from django.test import SimpleTestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory

from api import db as db_module
from api import views
from api import attendance
from api import features


EMAIL = "juan.perez@soyudemedellin.edu.co"
STAFF = "coach@udem.edu.co"
SLOT_ID = 1
FECHA = date(2026, 9, 15)
FECHA_ISO = FECHA.isoformat()
FECHA_LABEL = "martes 15 de septiembre de 2026"


class CaminosBase(SimpleTestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.db = MagicMock()
        self.ahora = datetime(2026, 9, 14, 15, 0, tzinfo=timezone.utc)

    def request_get(self, path, query=None):
        
        request = self.factory.get(path, query or {})
        request.query_params = request.GET
        return request

    def request_post(self, path, data):
        
        request = self.factory.post(path, data, format="json")
        request.data = data
        return request

    def request_delete(self, path):
        return self.factory.delete(path)

    def slot(self, hour="08:00"):
        return {"slotId": SLOT_ID, "hour": hour}

    def active_reservation(self):
        return {
            "_id": "res-1",
            "email": EMAIL,
            "slotId": SLOT_ID,
            "hour": "08:00",
            "reserva_date": FECHA_ISO,
            "date": FECHA_LABEL,
            "estado": "ACTIVA",
        }

class RF06Caminos(CaminosBase):
    def test_rf06_c1_bloque_no_esta_en_catalogo(self):
        """C1: disponibilidad recorrida -> if NO -> omitir bloque -> fin."""
     
        self.db.slots.find.return_value = [
            {"slotId": 1, "hour": "06:00", "hora_fin": "08:00"},
        ]
        self.db.disponibilidad.find.return_value.sort.return_value = [
            {"slotId": 99, "cupos_disponibles": 0, "aforo_maximo": 20},
        ]

        request = self.request_get("/api/slots/")
        with patch("api.views.fecha_reserva", return_value=FECHA), \
             patch("api.views.formato_fecha_es", return_value=FECHA_LABEL), \
             patch("api.views.asegurar_disponibilidad") as asegurar, \
             patch("api.views.get_db", return_value=self.db):
            response = views.consultar_horarios(request)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["fecha"], FECHA_ISO)
        self.assertEqual(response.data["slots"], [])
        asegurar.assert_called_once_with(FECHA_ISO)

    def test_rf06_c2_bloque_esta_en_catalogo(self):
        """C2: disponibilidad recorrida -> if SI -> agregar/almacenar bloque."""
        self.db.slots.find.return_value = [
            {"slotId": 1, "hour": "06:00", "hora_fin": "08:00"},
        ]
        self.db.disponibilidad.find.return_value.sort.return_value = [
            {"slotId": 1, "cupos_disponibles": 17, "aforo_maximo": 20},
        ]

        request = self.request_get("/api/slots/")
        with patch("api.views.fecha_reserva", return_value=FECHA), \
             patch("api.views.formato_fecha_es", return_value=FECHA_LABEL), \
             patch("api.views.asegurar_disponibilidad") as asegurar, \
             patch("api.views.get_db", return_value=self.db):
            response = views.consultar_horarios(request)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data["slots"]), 1)
        self.assertEqual(response.data["slots"][0]["id"], SLOT_ID)
        self.assertEqual(response.data["slots"][0]["available"], 17)
        self.assertEqual(response.data["slots"][0]["total"], 20)
        asegurar.assert_called_once_with(FECHA_ISO)


class RF07Caminos(CaminosBase):
    def _request(self, email=EMAIL, slot_id=SLOT_ID):
        return self.request_post("/api/reservations/", {"email": email, "slotId": slot_id})

    def _patch_common(self, owner=None, slot=None, count=0, tomar=True):
        self.db.users.find_one.return_value = owner
        self.db.slots.find_one.return_value = slot
        self.db.reservations.count_documents.return_value = count
        self.db.reservations.insert_one.return_value.inserted_id = "res-1"
        self.db.reservations.find_one.return_value = self.active_reservation()
        patches = [
            patch("api.views.get_db", return_value=self.db),
            patch("api.views.fecha_reserva", return_value=FECHA),
            patch("api.views.formato_fecha_es", return_value=FECHA_LABEL),
            patch("api.views.asegurar_disponibilidad"),
            patch("api.views.ahora_utc", return_value=self.ahora),
            patch("api.views.tomar_cupo", return_value=tomar),
            patch("api.views.serialize", return_value=self.active_reservation()),
        ]
        return patches

    def test_rf07_c1_datos_obligatorios_invalidos(self):
        request = self.request_post("/api/reservations/", {"email": "", "slotId": None})
        with patch("api.views.get_db", return_value=self.db):
            response = views.reservar_mañana(request)
        self.assertEqual(response.status_code, 400)
        self.assertIn("email y slotId", response.data["error"])
        self.db.users.find_one.assert_not_called()

    def test_rf07_c2_usuario_no_existe(self):
        self.db.users.find_one.return_value = None
        request = self._request()
        with patch("api.views.get_db", return_value=self.db):
            response = views.reservar_mañana(request)
        self.assertEqual(response.status_code, 404)
        self.assertIn("no existe", response.data["error"])

    def test_rf07_c3_usuario_no_es_estudiante(self):
        self.db.users.find_one.return_value = {"email": STAFF, "role": "ENTRENADOR", "estado": "ACTIVO"}
        request = self._request(email=STAFF)
        with patch("api.views.get_db", return_value=self.db):
            response = views.reservar_mañana(request)
        self.assertEqual(response.status_code, 403)
        self.assertIn("no reservan", response.data["error"])

    def test_rf07_c4_penalizacion_vigente(self):
        hasta = self.ahora + timedelta(days=2)
        self.db.users.find_one.return_value = {
            "email": EMAIL, "role": "ESTUDIANTE", "estado": "PENALIZADO",
            "penalizado_hasta": hasta,
        }
        request = self._request()
        with patch("api.views.get_db", return_value=self.db), \
             patch("api.views.ahora_utc", return_value=self.ahora):
            response = views.reservar_mañana(request)
        self.assertEqual(response.status_code, 403)
        self.assertIn("penalizada", response.data["error"])
        self.db.slots.find_one.assert_not_called()

    def test_rf07_c5_penalizacion_vencida_reactiva_y_continua(self):
        hasta = self.ahora - timedelta(days=1)
        self.db.users.find_one.return_value = {
            "email": EMAIL, "role": "ESTUDIANTE", "estado": "PENALIZADO",
            "penalizado_hasta": hasta,
        }
        self.db.slots.find_one.return_value = self.slot()
        self.db.reservations.count_documents.return_value = 0
        request = self._request()
        with patch("api.views.get_db", return_value=self.db), \
             patch("api.views.ahora_utc", return_value=self.ahora), \
             patch("api.views.fecha_reserva", return_value=FECHA), \
             patch("api.views.formato_fecha_es", return_value=FECHA_LABEL), \
             patch("api.views.asegurar_disponibilidad"), \
             patch("api.views.tomar_cupo", return_value=False):
            response = views.reservar_mañana(request)
        self.assertEqual(response.status_code, 409)
        self.db.users.update_one.assert_called_once()
        self.assertEqual(self.db.users.update_one.call_args.args[1]["$set"]["estado"], "ACTIVO")

    def test_rf07_c6_horario_no_existe(self):
        self.db.users.find_one.return_value = {"email": EMAIL, "role": "ESTUDIANTE", "estado": "ACTIVO"}
        self.db.slots.find_one.return_value = None
        request = self._request()
        with patch("api.views.get_db", return_value=self.db), \
             patch("api.views.fecha_reserva", return_value=FECHA), \
             patch("api.views.formato_fecha_es", return_value=FECHA_LABEL), \
             patch("api.views.asegurar_disponibilidad"):
            response = views.reservar_mañana(request)
        self.assertEqual(response.status_code, 404)
        self.assertIn("Horario no encontrado", response.data["error"])

    def test_rf07_c7_reserva_duplicada(self):
        self.db.users.find_one.return_value = {"email": EMAIL, "role": "ESTUDIANTE", "estado": "ACTIVO"}
        self.db.slots.find_one.return_value = self.slot()
        self.db.reservations.count_documents.return_value = 1
        request = self._request()
        with patch("api.views.get_db", return_value=self.db), \
             patch("api.views.fecha_reserva", return_value=FECHA), \
             patch("api.views.formato_fecha_es", return_value=FECHA_LABEL), \
             patch("api.views.asegurar_disponibilidad"):
            response = views.reservar_mañana(request)
        self.assertEqual(response.status_code, 409)
        self.assertEqual(response.data["tipo"], "RESERVA_DUPLICADA")
        self.db.reservations.insert_one.assert_not_called()

    def test_rf07_c8_sin_cupo(self):
        self.db.users.find_one.return_value = {"email": EMAIL, "role": "ESTUDIANTE", "estado": "ACTIVO"}
        self.db.slots.find_one.return_value = self.slot()
        self.db.reservations.count_documents.return_value = 0
        request = self._request()
        with patch("api.views.get_db", return_value=self.db), \
             patch("api.views.fecha_reserva", return_value=FECHA), \
             patch("api.views.formato_fecha_es", return_value=FECHA_LABEL), \
             patch("api.views.asegurar_disponibilidad"), \
             patch("api.views.tomar_cupo", return_value=False):
            response = views.reservar_mañana(request)
        self.assertEqual(response.status_code, 409)
        self.assertEqual(response.data["tipo"], "SIN_CUPOS")
        self.db.reservations.insert_one.assert_not_called()

    def test_rf07_c9_reserva_exitosa(self):
        self.db.users.find_one.return_value = {"email": EMAIL, "role": "ESTUDIANTE", "estado": "ACTIVO"}
        self.db.slots.find_one.return_value = self.slot()
        self.db.reservations.count_documents.return_value = 0
        self.db.reservations.insert_one.return_value.inserted_id = "res-1"
        request = self._request()
        with patch("api.views.get_db", return_value=self.db), \
             patch("api.views.fecha_reserva", return_value=FECHA), \
             patch("api.views.formato_fecha_es", return_value=FECHA_LABEL), \
             patch("api.views.asegurar_disponibilidad"), \
             patch("api.views.tomar_cupo", return_value=True), \
             patch("api.views.ahora_utc", return_value=self.ahora), \
             patch("api.views.serialize", return_value=self.active_reservation()):
            response = views.reservar_mañana(request)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.data["tipo"], "RESERVA_CONFIRMADA")
        self.db.reservations.insert_one.assert_called_once()


class RF08Caminos(CaminosBase):
    def test_rf08_c1_email_faltante(self):
        request = self.request_get("/api/reservations/")
        with patch("api.views.get_db", return_value=self.db):
            response = views.consultar_reserva(request)
        self.assertEqual(response.status_code, 400)
        self.assertIn("email", response.data["error"])
        self.db.reservations.find.assert_not_called()

    def test_rf08_c2_email_valido_devuelve_reservas_activas(self):
        reserva = self.active_reservation()
        self.db.reservations.find.return_value = [reserva]
        request = self.request_get("/api/reservations/", {"email": EMAIL.upper()})
        with patch("api.views.get_db", return_value=self.db), \
             patch("api.views.serialize", side_effect=lambda r: {**r, "id": "res-1"}):
            response = views.consultar_reserva(request)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["email"], EMAIL)
        self.db.reservations.find.assert_called_once_with({"email": EMAIL, "estado": "ACTIVA"})


class RF09Caminos(CaminosBase):
    def _cancel(self, reservation_id):
        request = self.request_delete(f"/api/reservations/{reservation_id}/")
        return request

    def test_rf09_c1_id_invalido(self):
        request = self._cancel("id-invalido")
        with patch("api.views.get_db", return_value=self.db):
            response = views.cancelar_reserva(request, "id-invalido")
        self.assertEqual(response.status_code, 400)
        self.assertIn("inválido", response.data["error"])

    def test_rf09_c2_reserva_inexistente(self):
        from bson import ObjectId
        rid = str(ObjectId())
        self.db.reservations.find_one_and_update.return_value = None
        self.db.reservations.find_one.return_value = None
        request = self._cancel(rid)
        with patch("api.views.get_db", return_value=self.db):
            response = views.cancelar_reserva(request, rid)
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.data["error"], "Reserva no encontrada.")

    def test_rf09_c3_reserva_existe_pero_no_activa(self):
        from bson import ObjectId
        rid = str(ObjectId())
        self.db.reservations.find_one_and_update.return_value = None
        self.db.reservations.find_one.return_value = {"_id": ObjectId(rid), "estado": "CANCELADA"}
        request = self._cancel(rid)
        with patch("api.views.get_db", return_value=self.db):
            response = views.cancelar_reserva(request, rid)
        self.assertEqual(response.status_code, 409)
        self.assertEqual(response.data["error"], "La reserva ya no está activa.")

    def test_rf09_c4_reserva_activa_se_cancela_y_libera_cupo(self):
        from bson import ObjectId
        rid = str(ObjectId())
        reserva = self.active_reservation()
        reserva["_id"] = ObjectId(rid)
        self.db.reservations.find_one_and_update.return_value = reserva
        request = self._cancel(rid)
        with patch("api.views.get_db", return_value=self.db), \
             patch("api.views.ahora_utc", return_value=self.ahora), \
             patch("api.views.devolver_cupo") as devolver:
            response = views.cancelar_reserva(request, rid)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["tipo"], "RESERVA_CANCELADA")
        devolver.assert_called_once_with(FECHA_ISO, SLOT_ID)


class RF10Caminos(CaminosBase):
    def test_rf10_c1_cuenta_no_autorizada(self):
        self.db.users.find_one.return_value = {"email": EMAIL, "role": "ESTUDIANTE"}
        request = self.request_get("/api/students/lookup/", {"documento": "1001234567", "actor_email": EMAIL})
        with patch("api.attendance.get_db", return_value=self.db):
            response = attendance.buscar_reserva(request)
        self.assertEqual(response.status_code, 403)

    def test_rf10_c2_documento_invalido(self):
        self.db.users.find_one.return_value = {"email": STAFF, "role": "ENTRENADOR"}
        request = self.request_get("/api/students/lookup/", {"documento": "", "actor_email": STAFF})
        with patch("api.attendance.get_db", return_value=self.db):
            response = attendance.buscar_reserva(request)
        self.assertEqual(response.status_code, 400)
        self.assertIn("documento", response.data["error"].lower())

    def test_rf10_c3_estudiante_no_existe(self):
        staff = {"email": STAFF, "role": "ENTRENADOR"}
        self.db.users.find_one.side_effect = [staff, None]
        request = self.request_get("/api/students/lookup/", {"documento": "9999999999", "actor_email": STAFF})
        with patch("api.attendance.get_db", return_value=self.db):
            response = attendance.buscar_reserva(request)
        self.assertEqual(response.status_code, 404)
        self.assertIn("No hay ningún estudiante", response.data["error"])

    def test_rf10_c4_estudiante_encontrado_devuelve_reserva(self):
        staff = {"email": STAFF, "role": "ENTRENADOR"}
        student = {
            "name": "Juan Perez", "email": EMAIL, "documento": "1001234567",
            "role": "ESTUDIANTE", "estado": "ACTIVO", "no_show_count": 0,
        }
        reserva = self.active_reservation()
        self.db.users.find_one.side_effect = [staff, student]
        self.db.reservations.find.return_value.sort.return_value = [reserva]
        request = self.request_get("/api/students/lookup/", {"documento": "1001234567", "actor_email": STAFF})
        with patch("api.attendance.get_db", return_value=self.db), \
             patch("api.attendance.hoy_local", return_value=FECHA):
            response = attendance.buscar_reserva(request)
        self.assertEqual(response.status_code, 200)
        self.assertTrue(response.data["tiene_reserva"])
        self.assertEqual(len(response.data["reservas"]), 1)
        self.assertEqual(response.data["reservas"][0]["slotId"], SLOT_ID)


class RF14Caminos(CaminosBase):
    def test_rf14_c1_email_faltante(self):
        request = self.request_get("/api/reservations/history/")
        with patch("api.features.get_db", return_value=self.db):
            response = features.ver_historial(request)
        self.assertEqual(response.status_code, 400)
        self.assertIn("email", response.data["error"])
        self.db.reservations.find.assert_not_called()

    def test_rf14_c2_historial_completo(self):
        reserva = self.active_reservation()
        self.db.reservations.find.return_value.sort.return_value = [reserva]
        request = self.request_get("/api/reservations/history/", {"email": EMAIL})
        with patch("api.features.get_db", return_value=self.db):
            response = features.ver_historial(request)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]["estado"], "ACTIVA")
        self.db.reservations.find.assert_called_once_with({"email": EMAIL})

    def test_rf14_c3_solo_pasadas_filtra_las_activas(self):
        reserva = self.active_reservation()
        reserva["estado"] = "CANCELADA"
        self.db.reservations.find.return_value.sort.return_value = [reserva]
        request = self.request_get(
            "/api/reservations/history/", {"email": EMAIL, "solo": "pasadas"}
        )
        with patch("api.features.get_db", return_value=self.db):
            response = features.ver_historial(request)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data[0]["estado"], "CANCELADA")
        self.db.reservations.find.assert_called_once_with(
            {"email": EMAIL, "estado": {"$ne": "ACTIVA"}}
        )

# Gym Reservas - Sistema de Gestión de Reservas

Sistema de gestión de reservas para el gimnasio de la Universidad de Medellín.

---

## Documentación del proyecto

| Documento | Contenido |
|---|---|
| `Especificacion-de-Requisitos.docx` | Los 23 requisitos funcionales por módulo, las 12 reglas de negocio y los 6 requisitos no funcionales, cada uno con actor, precondiciones, flujo, postcondiciones y flujos alternos. |
| `Modelo-de-Analisis-Sistema-Reservas-Gimnasio.docx` | Modelo de análisis v2.0: justificación, usuarios, alcance, casos de uso, historias de usuario, modelo de datos y arquitectura. |
| `PROYECTO GESTION DE RESERVAS GIMNASIO.pdf` | Modelo de análisis v1.0, de marzo de 2026. Se conserva como antecedente; sus reglas fueron reemplazadas por las de la v2.0. |

### Reglas de negocio vigentes

| Código | Regla |
|---|---|
| RN01 | El dominio del correo determina el rol, que se asigna una sola vez en el registro |
| RN02 | El documento de identidad es la credencial y el identificador de búsqueda |
| RN03 | Seis bloques de dos horas en horas pares, de 06:00 a 18:00 |
| RN04 | Las reservas son siempre para el día siguiente |
| RN05 | Una reserva por estudiante por día |
| RN06 | El cupo se descuenta en una sola operación, sin sobrecupo |
| RN07 | Cancelar libera el cupo de inmediato |
| RN08 | Cinco inasistencias penalizan la cuenta |
| RN09 | Una cuenta penalizada no puede reservar |
| RN10 | Entrenadores y administradores no reservan |
| RN11 | Toda confirmación se muestra dentro de la aplicación; no se envía correo |
| RN12 | La asistencia se registra el día del bloque y no antes de su hora |

---

## Tecnologías y Versiones

### Frontend
- **Framework:** React 18.2.0
- **Build Tool:** Vite 4.4.0
- **Lenguaje:** JavaScript (JSX)
- **Imagen Base:** Node.js 18-alpine

### Backend
- **Lenguaje:** Python 3.11
- **Framework:** Django 4.2.7
- **API Toolkit:** Django REST Framework 3.14.0
- **Documentación API:** drf-yasg 1.21.7 (Swagger/OpenAPI 2.0)
- **Base de Datos:** MongoDB 6.0 (vía PyMongo 4.6.0)
- **CORS:** django-cors-headers 4.3.0

### Base de Datos
- **Motor:** MongoDB 6.0
- **Esquema:** Ver carpeta `database/` con validaciones e índices

### Infraestructura
- **Contenedores:** Docker 20.10+
- **Orquestación:** Docker Compose 2.0+

---

## Cómo Clonar el Repositorio

```bash
git clone https://github.com/ocamilavillero09/reservas_gimnasio_udem.git
cd reservas_gimnasio_udem
```

---

## Cómo Descargar desde DockerHub

Cada servicio tiene su imagen publicada en DockerHub:

```bash
# Frontend
docker pull tav07/gym-frontend:latest

# Backend
docker pull tav07/gym-backend:latest

# Database
docker pull tav07/gym-database:latest
```

### Ejecutar con imágenes de DockerHub (sin clonar)

Usa este `docker-compose` inline para levantar los 3 servicios conectados:

```bash
cat > docker-compose-hub.yml << 'EOF'
version: "3.8"
services:
  frontend:
    image: tav07/gym-frontend:latest
    ports:
      - "5173:5173"
    environment:
      - VITE_API_URL=http://localhost:8000/api
    depends_on:
      - backend
    restart: unless-stopped

  backend:
    image: tav07/gym-backend:latest
    ports:
      - "8000:8000"
    environment:
      - MONGO_URI=mongodb://database:27017
      - MONGO_DB=gym_udem
      - SECRET_KEY=django-insecure-gym-udem-2024-change-in-production
    depends_on:
      - database
    restart: unless-stopped

  database:
    image: tav07/gym-database:latest
    ports:
      - "27017:27017"
    volumes:
      - mongodb_data:/data/db
    restart: unless-stopped

volumes:
  mongodb_data:
EOF

docker-compose -f docker-compose-hub.yml up
```

---

## Cómo Ejecutar con Docker Compose (Recomendado)

### Requisitos
- Docker 20.10+
- Docker Compose 2.0+
- Puertos 5173, 8000, 27017 disponibles

### Instrucciones paso a paso

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/ocamilavillero09/reservas_gimnasio_udem.git
   cd reservas_gimnasio_udem
   ```

2. **Construir y levantar los servicios:**
   ```bash
   docker-compose up --build
   ```
   > Nota: la primera vez descarga las imágenes base e instala dependencias. Puede tardar 2-3 minutos.

3. **Acceder a las aplicaciones:**
   - Frontend: http://localhost:5173/index.html
   - Backend API: http://localhost:8000/api/
   - Swagger UI: http://localhost:8000/swagger/
   - ReDoc: http://localhost:8000/redoc/
   - MongoDB: localhost:27017

4. **Detener los servicios:**
   ```bash
   docker-compose down
   ```

   Para eliminar también los volúmenes (borra todos los datos):
   ```bash
   docker-compose down -v
   ```

---

## Variables de Entorno

### Frontend
| Variable | Descripción | Default |
|----------|-------------|---------|
| `VITE_API_URL` | URL completa del backend API | `http://localhost:8000/api` |

### Backend
| Variable | Descripción | Default |
|----------|-------------|---------|
| `SECRET_KEY` | Clave secreta de Django | `django-insecure-gym-udem-2024-change-in-production` |
| `DEBUG` | Modo debug de Django | `True` |
| `MONGO_URI` | URI de conexión MongoDB | `mongodb://database:27017` |
| `MONGO_DB` | Nombre de la base de datos | `gym_udem` |

---

## Flujo de Prueba Completo (End-to-End)

Sigue estos pasos para verificar que frontend, backend y base de datos se comunican correctamente:

1. **Abrir el frontend** en http://localhost:5173/index.html
2. **Registrarse** con nombre, correo institucional y documento de identidad (RF01).
   El dominio del correo define el rol (RN01):

   | Dominio | Rol |
   |---|---|
   | `@soyudemedellin.edu.co` | Estudiante |
   | `@udem.edu.co` | Entrenador |
   | `@udemedellin.edu.co` | Administrador |

3. **Iniciar sesión** con el correo y el documento de identidad como contraseña (RF02)
4. **Perfil** — el estudiante gestiona edad, peso, altura y objetivo (RF03); el entrenador (RF04)
   y el administrador (RF05) consultan su nombre, documento y rol
5. **Ver bloques horarios y cupos** en el Dashboard. La reserva es para el día siguiente
   y el sistema muestra la fecha exacta (RF06, RN03, RN04)
6. **Crear una reserva** — llega la confirmación en la aplicación. Si intentas una segunda
   para el mismo día, el sistema lo impide y avisa (RF07, RN05, RN11)
7. **Recargar la página (F5)** — la sesión se mantiene abierta
8. **"Mis Reservas" → cancelar** — el cupo se libera al instante y llega la confirmación
   (RF08, RF09, RN07)
9. **Entrar como entrenador** — se ve el panel, sin interfaz de reserva (RN10):
   - Buscar al estudiante por su documento de identidad (RF10)
   - Registrar su asistencia, solo el día del bloque y a partir de su hora (RF11, RN12)
   - Ver los estudiantes sin asistencia registrada de la jornada (RF12)
   - Cerrar la jornada procesando las inasistencias: se penaliza a quien llegue a
     5 inasistencias (RF13, RN08)
   - Consultar el registro diario e imprimirlo en PDF (RF16, RF18)
10. **Como estudiante**, revisar el historial (RF14) y el reporte de inasistencias en el
    Perfil (RF15), y enviar un reporte de falla al buzón (RF20)
11. **Como administrador**, consultar el registro diario y su PDF (RF17, RF19) y leer el
    buzón de sugerencias (RF21)
12. **Como administrador principal** (el primer ADMIN registrado), crear otras cuentas de
    administrador y retirarles el rol en "Usuarios" (RF22, RF23)
13. **Verificar en Swagger UI** (`http://localhost:8000/swagger/`) que todos los endpoints
    responden con los códigos esperados

### Trazabilidad: requisito → función → endpoint

El nombre de la función es el del requisito, en el backend y en el frontend, para
que las pruebas y los diagramas de flujo calcen con el código.

| Requisito | Backend | Frontend | Endpoint |
|---|---|---|---|
| RF01 Registrar una cuenta | `registrar_cuenta` | `registrarCuenta` | `POST /api/auth/register/` |
| RF02 Iniciar sesión | `iniciar_sesion` | `iniciarSesion` | `POST /api/auth/login/` |
| RF03 Consultar y actualizar mi perfil | `consultar_actualizar_perfil` | `consultarPerfil`, `actualizarPerfil` | `GET/PUT /api/users/profile/` |
| RF04 Perfil del entrenador | `consultar_entrenador` | `consultarEntrenador` | `GET /api/users/entrenador/` |
| RF05 Perfil del administrador | `consultar_administrador` | `consultarAdministrador` | `GET /api/users/administrador/` |
| RF06 Bloques horarios con sus cupos | `consultar_horarios` | `consultarHorarios` | `GET /api/slots/` |
| RF07 Reservar el día siguiente | `reservar_mañana` | `reservarMañana` | `POST /api/reservations/` |
| RF08 Consultar mis reservas | `consultar_reserva` | `consultarReserva` | `GET /api/reservations/` |
| RF09 Cancelar mi reserva | `cancelar_reserva` | `cancelarReserva` | `DELETE /api/reservations/<id>/` |
| RF10 Buscar la reserva por documento | `buscar_reserva` | `buscarReserva` | `GET /api/students/lookup/` |
| RF11 Registrar la asistencia | `registrar_asistencia` | `registrarAsistencia` | `POST /api/attendance/register/` |
| RF12 Reservas sin asistencia | `consultar_reservas` | `consultarReservas` | `GET /api/attendance/pending/` |
| RF13 Cerrar la jornada | `procesar_inasistencia` | `procesarInasistencia` | `POST /api/attendance/process/` |
| RF14 Ver mi historial | `ver_historial` | `verHistorial` | `GET /api/reservations/history/` |
| RF15 Ver mis inasistencias | `ver_inasistencias` | `verInasistencias` | `GET /api/reports/personal/` |
| RF16 Registro diario, entrenador | `ver_registro_entrenador` | `verRegistroEntrenador` | `GET /api/reports/daily/entrenador/` |
| RF17 Registro diario, administrador | `ver_registro_administrador` | `verRegistroAdministrador` | `GET /api/reports/daily/administrador/` |
| RF18 Registro en PDF, entrenador | `descargar_registro_entrenador` | `descargarRegistroEntrenador` | `GET /api/reports/daily/entrenador.pdf` |
| RF19 Registro en PDF, administrador | `descargar_registro_administrador` | `descargarRegistroAdministrador` | `GET /api/reports/daily/administrador.pdf` |
| RF20 Reportar una falla | `fallo_sugerencia` | `falloSugerencia` | `POST /api/suggestions/` |
| RF21 Consultar el buzón | `consultar_buzon` | `consultarBuzon` | `GET /api/suggestions/inbox/` |
| RF22 Crear administrador | `crear_administrador` | `crearAdministrador` | `POST /api/admin/users/` |
| RF23 Retirar el rol de administrador | `eliminar_administrador` | `eliminarAdministrador` | `PATCH /api/admin/users/<correo>/` |

Quedan dos rutas sin requisito aprobado, pendientes de decisión: el reporte por
estudiante y su PDF.

### Verificación rápida con curl

```bash
EST=test@soyudemedellin.edu.co;  DOC_EST=1001234567
COACH=coach@udem.edu.co;         DOC_COACH=7009998881
JEFA=jefa@udemedellin.edu.co;    DOC_JEFA=3005554442

# RF01 — Registro con nombre, correo institucional y documento de identidad
curl -X POST http://localhost:8000/api/auth/register/ -H "Content-Type: application/json" \
  -d "{\"name\":\"Test\",\"email\":\"$EST\",\"documento\":\"$DOC_EST\"}"
curl -X POST http://localhost:8000/api/auth/register/ -H "Content-Type: application/json" \
  -d "{\"name\":\"Coach\",\"email\":\"$COACH\",\"documento\":\"$DOC_COACH\"}"
curl -X POST http://localhost:8000/api/auth/register/ -H "Content-Type: application/json" \
  -d "{\"name\":\"Jefa\",\"email\":\"$JEFA\",\"documento\":\"$DOC_JEFA\"}"   # primer ADMIN = principal

# RF02 — Login con el documento como contraseña
curl -X POST http://localhost:8000/api/auth/login/ -H "Content-Type: application/json" \
  -d "{\"email\":\"$EST\",\"documento\":\"$DOC_EST\"}"

# RF03 — Edad, peso, altura y objetivo de entrenamiento
curl -X PUT http://localhost:8000/api/users/profile/ -H "Content-Type: application/json" \
  -d "{\"email\":\"$EST\",\"edad\":21,\"peso\":72,\"altura\":178,\"meta\":\"Ganar resistencia\"}"

# RF06 — Bloques horarios y cupos (la fecha es la de mañana)
curl http://localhost:8000/api/slots/
FECHA=$(curl -s http://localhost:8000/api/slots/ | python3 -c 'import json,sys;print(json.load(sys.stdin)["fecha"])')

# RF07 — Reserva del día siguiente y su confirmación
curl -X POST http://localhost:8000/api/reservations/ -H "Content-Type: application/json" \
  -d "{\"email\":\"$EST\",\"slotId\":1}"

# RN05 — Segunda reserva del mismo día: rechazada y notificada
curl -X POST http://localhost:8000/api/reservations/ -H "Content-Type: application/json" \
  -d "{\"email\":\"$EST\",\"slotId\":2}"

# RF10 — El entrenador busca al estudiante por su documento
curl "http://localhost:8000/api/students/lookup/?documento=$DOC_EST&actor_email=$COACH"

# RF12 — Estudiantes con reserva y sin asistencia registrada
curl "http://localhost:8000/api/attendance/pending/?actor_email=$COACH&fecha=$FECHA"

# RF11 — Registrar la asistencia
curl -X POST http://localhost:8000/api/attendance/register/ -H "Content-Type: application/json" \
  -d "{\"actor_email\":\"$COACH\",\"documento\":\"$DOC_EST\",\"fecha\":\"$FECHA\"}"

# RF13 — Cerrar la jornada procesando las inasistencias (penaliza a las 5)
curl -X POST http://localhost:8000/api/attendance/process/ -H "Content-Type: application/json" \
  -d "{\"actor_email\":\"$COACH\",\"fecha\":\"$FECHA\"}"

# RF14 — Historial · RF15 — Reporte de inasistencias del estudiante
curl "http://localhost:8000/api/reservations/history/?email=$EST"
curl "http://localhost:8000/api/reports/personal/?email=$EST"

# RF16 a RF19 — Registro diario y su PDF
curl "http://localhost:8000/api/reports/daily/?actor_email=$COACH&fecha=$FECHA"
curl -o registro_diario.pdf "http://localhost:8000/api/reports/daily.pdf?actor_email=$COACH&fecha=$FECHA"

# RF22 — El administrador principal crea otra cuenta de administrador
curl -X POST http://localhost:8000/api/admin/users/ -H "Content-Type: application/json" \
  -d "{\"actor_email\":\"$JEFA\",\"name\":\"Nueva Admin\",
       \"email\":\"nueva@udemedellin.edu.co\",\"documento\":\"3001112223\"}"

# RF23 — Retirarle el rol de administrador
curl -X PATCH http://localhost:8000/api/admin/users/nueva@udemedellin.edu.co/ \
  -H "Content-Type: application/json" -d "{\"actor_email\":\"$JEFA\",\"accion\":\"retirar\"}"
```

### Pruebas automatizadas

```bash
# Backend: pruebas de las reglas de negocio y de los requisitos funcionales
cd backend && python manage.py test api

# Frontend: pruebas unitarias de componentes y del cliente HTTP
cd frontend && npm test

# End-to-end con el stack levantado (docker compose up -d)
cd frontend && npx playwright test
```

---

## Estructura del Proyecto

```
reservas_gimnasio_udem/
├── Especificacion-de-Requisitos.docx
├── Modelo-de-Analisis-Sistema-Reservas-Gimnasio.docx
├── frontend/          # React 18 + Vite
│   ├── dockerfile
│   ├── src/
│   │   ├── App.jsx
│   │   ├── components/
│   │   └── services/
│   ├── index.html
│   └── vite.config.js
├── backend/           # Django 4.2.7 + DRF 3.14.0
│   ├── dockerfile
│   ├── requirements.txt
│   ├── api/
│   └── gym_api/
├── database/          # MongoDB 6.0
│   ├── Dockerfile
│   ├── init.mongodb.js
│   └── schema.json
└── docker-compose.yml
```

---

## Desarrollo Local (Sin Docker)

### Requisitos previos
- Node.js 18+
- Python 3.11+
- MongoDB corriendo localmente en el puerto 27017

### Backend

```bash
cd backend

# Crear entorno virtual
python -m venv venv

# Activar entorno virtual
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Instalar dependencias
pip install -r requirements.txt

# Crear archivo .env
echo SECRET_KEY=tu-clave-secreta > .env
echo DEBUG=True >> .env
echo MONGO_URI=mongodb://localhost:27017 >> .env
echo MONGO_DB=gym_udem >> .env

# Ejecutar servidor
python manage.py runserver
```

El backend estará disponible en http://localhost:8000

### Frontend

```bash
cd frontend

# Instalar dependencias
npm install

# Ejecutar servidor de desarrollo
npm run dev
```

El frontend estará disponible en http://localhost:5173/index.html

> Nota: Asegúrate de que el backend esté corriendo antes de abrir el frontend, ya que la aplicación React necesita conectarse a la API.

---

## Autores

Proyecto desarrollado para el curso de Ingeniería de Software — Universidad de Medellín.

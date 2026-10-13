import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent
SECRET_KEY = os.getenv('SECRET_KEY', 'django-insecure-gym-udem-2024-change-in-production')
# VUL-09 — Apagado por defecto: con DEBUG encendido, cualquier error mostraba
# al visitante la traza, la configuración y la lista de rutas internas. Para
# desarrollar con el modo depuración hay que pedirlo: DEBUG=True.
DEBUG = os.getenv('DEBUG', 'False') == 'True'
ALLOWED_HOSTS = [h.strip() for h in os.getenv('ALLOWED_HOSTS', '*').split(',') if h.strip()]

INSTALLED_APPS = [
    'django.contrib.contenttypes',
    'django.contrib.auth',
    'django.contrib.staticfiles',
    'corsheaders',
    'rest_framework',
    'drf_yasg',
    'api',
]

MIDDLEWARE = [
    # VUL-10 — Cabeceras de seguridad: X-Content-Type-Options: nosniff y
    # Referrer-Policy (SecurityMiddleware) y X-Frame-Options: DENY, que impide
    # meter la aplicación en un iframe de otro sitio (XFrameOptionsMiddleware).
    'django.middleware.security.SecurityMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    # VUL-07 / VUL-08 / VUL-09 — Valida la forma del cuerpo y responde JSON sin
    # trazas ante cualquier error de la API (api/seguridad.py).
    'api.seguridad.ProteccionAPI',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    # Protección contra peticiones falsificadas desde otro sitio.
    #
    # Las vistas de Django REST Framework quedan exentas por diseño del propio
    # framework, así que la API sigue funcionando sin tokens: es una API sin
    # cookies de sesión, y ese ataque necesita justamente que el navegador
    # adjunte una cookie por su cuenta.
    #
    # El middleware sí protege todo lo que NO es la API y se sirve desde el
    # mismo dominio, como la documentación interactiva de Swagger.
    'django.middleware.csrf.CsrfViewMiddleware',
]

ROOT_URLCONF = 'gym_api.urls'
WSGI_APPLICATION = 'gym_api.wsgi.application'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# SQLite solo para que Django y DRF funcionen internamente
# Los datos reales van a MongoDB via pymongo
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# CORS — VUL-11. Antes se aceptaba cualquier origen, así que cualquier página
# web podía llamar a la API desde el navegador de un usuario. Ahora solo los
# orígenes de la lista. En producción el frontend y la API comparten dominio
# (nginx hace de proxy de /api), así que allí CORS ni siquiera interviene.
CORS_ALLOWED_ORIGINS = [
    o.strip() for o in os.getenv(
        'CORS_ALLOWED_ORIGINS',
        'http://localhost:5173,http://127.0.0.1:5173,http://localhost:4173,http://127.0.0.1:4173',
    ).split(',') if o.strip()
]
SECURE_CONTENT_TYPE_NOSNIFF = True
SECURE_REFERRER_POLICY = 'same-origin'
X_FRAME_OPTIONS = 'DENY'

REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': ['rest_framework.renderers.JSONRenderer'],
    'DEFAULT_AUTHENTICATION_CLASSES': [],
    'DEFAULT_PERMISSION_CLASSES': [],
}

LANGUAGE_CODE = 'es-co'
TIME_ZONE = 'America/Bogota'
USE_TZ = True

STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017')
MONGO_DB   = os.getenv('MONGO_DB', 'gym_udem')

# ──────────────────────────────────────────
# El sistema no envía notificaciones por correo ni push: los avisos (reserva
# confirmada, cancelación, alerta de penalización) se muestran dentro de la
# propia aplicación. Por eso no hay configuración de SMTP.
# ──────────────────────────────────────────
# Logging: formato estructurado a stdout para que Promtail/Loki lo recolecte.
# ──────────────────────────────────────────
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'console': {'format': '%(asctime)s %(levelname)s %(name)s %(message)s'},
    },
    'handlers': {
        'console': {'class': 'logging.StreamHandler', 'formatter': 'console'},
    },
    'root': {'handlers': ['console'], 'level': 'INFO'},
    'loggers': {
        'gym': {'handlers': ['console'], 'level': 'INFO', 'propagate': False},
    },
}

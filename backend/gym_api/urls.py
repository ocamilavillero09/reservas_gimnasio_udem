from django.contrib.staticfiles.views import serve as servir_estatico
from django.urls import path, include, re_path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
        title="Gym Reservas API",
        default_version='1.0.0',
        description="API para la gestión de reservas del gimnasio universitario.",
        contact=openapi.Contact(email="contacto@udem.edu.co"),
        license=openapi.License(name="Apache 2.0"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('api/', include('api.urls')),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    path('redoc/', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('swagger.json', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    # Con DEBUG apagado (VUL-09) Django deja de servir los estáticos por su
    # cuenta y la documentación de Swagger se vería sin estilos ni scripts. Solo
    # Swagger los usa: la API devuelve JSON y el frontend lo sirve nginx.
    re_path(r'^static/(?P<path>.*)$', servir_estatico, {'insecure': True}),
]

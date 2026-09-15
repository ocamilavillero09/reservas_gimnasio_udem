FROM mongo:6

# MongoDB ejecuta automáticamente los scripts .js que encuentre aquí, la primera
# vez que arranca sobre un volumen vacío.
COPY init.mongodb.js /docker-entrypoint-initdb.d/

# El contenedor no corre como administrador. La imagen oficial trae el usuario
# `mongodb`, que es el dueño del directorio de datos, así que el servidor
# arranca y el script de inicio se ejecuta igual.
USER mongodb

EXPOSE 27017

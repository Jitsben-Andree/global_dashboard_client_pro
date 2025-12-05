FROM node:18-alpine

WORKDIR /app

# Copiamos dependencias
COPY package*.json ./

# Instalamos todo (incluyendo devDependencies porque Next necesita compilar)
RUN npm install

# Copiamos el código
COPY . .

# CAMBIO CRITICO 1: Construimos la aplicación para producción
RUN npm run build

# Exponemos el puerto
EXPOSE 8011

# CAMBIO CRITICO 2: Arrancamos el servidor optimizado de Next.js
CMD ["npm", "start"]
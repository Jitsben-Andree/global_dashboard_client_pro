# Usamos Node 20 Alpine
FROM node:20-alpine

WORKDIR /app

# Instalamos OpenSSL para Prisma
RUN apk add --no-cache openssl

# Copiamos dependencias
COPY package*.json ./

# Instalamos solo dependencias de producción (más ligero)
RUN npm install --only=production

# Copiamos el código fuente
COPY . .

# Generamos el cliente de Prisma
RUN npx prisma generate

# Exponemos el puerto
EXPOSE 8010

# CAMBIO CRITICO: En producción no usamos "dev".
# Asegúrate de que tu backend/package.json tenga un script "start": "node src/server.js"
CMD ["npm", "start"]
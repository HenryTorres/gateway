# Usa imagen oficial de Node
FROM node:24.4-alpine3.22

# Directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia archivos de configuración
COPY package*.json ./

# Instala dependencias (dev incluidas para build)
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto 3000
EXPOSE 3000
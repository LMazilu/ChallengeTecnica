FROM node:22

# Installa il client MySQL
RUN apt-get update && apt-get install default-mysql-client -y

# Imposta la directory di lavoro all'interno del container
WORKDIR /app

# Copia il file package.json e package-lock.json
COPY package*.json ./

# Installa le dipendenze, comprese quelle di sviluppo
RUN npm install

# Copia tutto il resto del codice sorgente
COPY . .

# Espone le porte per l'applicazione e per il debugger
EXPOSE 3030

RUN npm run build

#RUN npm run
CMD ["node", "dist/app.js"]

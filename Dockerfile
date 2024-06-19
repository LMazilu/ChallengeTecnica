FROM node:22

RUN apt-get update && apt-get install default-mysql-client -y

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3030

RUN npm run build

#CMD ["node", "dist/app.js"]

FROM node:16.13.0

WORKDIR /api

COPY package*.json ./

COPY . .

RUN npm install

EXPOSE 8080

CMD [ "node", "server.js" ]
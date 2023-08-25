FROM node:18.17.1

COPY package*.json .

RUN npm install

COPY . .

CMD [ "node", "server.js" ]
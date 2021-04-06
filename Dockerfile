
FROM node:12.13-alpine

WORKDIR /usr/src/pub-server

COPY package*.json ./

COPY .envsample ./.env

COPY ./src ./src

COPY ./test ./test

RUN npm install

EXPOSE 8000
CMD ["npm", "run", "prod"]
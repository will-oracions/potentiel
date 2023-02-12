FROM node:19-alpine
WORKDIR /usr/src/app

COPY package.json ./

RUN yarn install

COPY . .

EXPOSE 5000

CMD [ "node", "src", "index.js" ]
ARG NODE_VERSION=20

FROM node:${NODE_VERSION}-alpine

WORKDIR /usr/src/app

COPY package.json .
RUN npm install
RUN npm install --save-dev swagger-autogen
COPY . .

EXPOSE 3000

CMD npm install && npm run dev

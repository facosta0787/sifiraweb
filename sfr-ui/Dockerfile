FROM node:8.14

ENV NODE_ENV production

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install

EXPOSE 3000

COPY . .

CMD npm start
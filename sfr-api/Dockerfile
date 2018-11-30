FROM node:8.13

ENV NODE_ENV production

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --development

EXPOSE 3000

COPY . .

CMD npx nodemon server.js
FROM node:20-alpine
LABEL authors="luca"

WORKDIR /usr/src/app
COPY package.json ./
COPY tsconfig.json ./
COPY src ./src
COPY secrets ./secrets

RUN npm run build
RUN npm install --verbose --only=production

FROM node:20-alpine

WORKDIR /usr/src/app
COPY package.json ./
RUN npm install --verbose --only=production
COPY --from=0 /usr/src/app .
EXPOSE 8080

CMD ["pm2-runtime","dist/app.js"]
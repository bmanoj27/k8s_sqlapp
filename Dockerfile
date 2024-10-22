FROM node:18-alpine

MAINTAINER "Manoj Kumar B"

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
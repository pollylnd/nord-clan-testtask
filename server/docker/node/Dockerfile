FROM node:carbon

WORKDIR /app

RUN npm i -g sequelize-cli

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]
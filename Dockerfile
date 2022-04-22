FROM node:17.8.0

WORKDIR /app/
COPY package.json .

RUN npm i -g @nestjs/cli

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "start:dev"]
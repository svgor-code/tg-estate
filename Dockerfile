FROM node:17.8.0

WORKDIR /app/
COPY package.json .

RUN apt-get update

RUN apt-get install python3 -y
RUN apt-get install python3-pip -y

RUN pip install requests

RUN npm i -g @nestjs/cli

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "run", "start:dev"]
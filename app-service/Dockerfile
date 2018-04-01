##nodejs
FROM node:carbon

WORKDIR /urs/src/app

COPY package*.json ./

RUN npm install
RUN npm install pm2 -g

COPY . .

EXPOSE 8080

##CMD [ "npm", "start"]
CMD ["pm2-runtime", "server.js"]
##CMD ["pm2-runtime", "process.yml"]

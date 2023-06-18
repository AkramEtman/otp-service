FROM node:14-alpine

WORKDIR /otp-service

COPY package*.json  /otp-service

RUN  npm install

EXPOSE 444

COPY . .

RUN npm build

CMD ["npm", "start"]
FROM node:12.16.3-alpine3.11
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 4100
CMD ["npm", "start"]
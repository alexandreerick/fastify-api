FROM node:24.12-alpine

WORKDIR /backend-fastify

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3333

CMD ["npm", "run", "dev"]

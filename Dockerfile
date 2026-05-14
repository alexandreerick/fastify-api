FROM node:24.12-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# gera prisma client
RUN npx prisma generate

# builda o projeto
RUN npm run build

EXPOSE 3333

CMD ["sh", "-c", "npx prisma migrate deploy && node dist/server.js"]

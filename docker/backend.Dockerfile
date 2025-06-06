FROM node:20

WORKDIR /app

COPY ./apps/backend .

RUN npm install

RUN npx prisma generate

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate deploy && node src/index.js"]
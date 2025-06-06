FROM node:20

WORKDIR /app

COPY ./apps/frontend .

RUN npm install

EXPOSE 5173

CMD ["sh", "-c", "npm run dev -- --host 0.0.0.0"]
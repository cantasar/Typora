FROM node:18
WORKDIR /app

COPY ./apps/backend/package*.json ./
RUN npm install

COPY ./apps/backend .

EXPOSE $PORT

CMD ["npm", "run", "dev"]
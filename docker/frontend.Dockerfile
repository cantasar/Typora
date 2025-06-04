# Typora Frontend Dockerfile
FROM node:18
WORKDIR /app
COPY ./apps/frontend/package*.json ./
RUN npm install
COPY ./apps/frontend .
CMD ["npm", "run", "dev"]

# 1. Base image
FROM node:20

# 2. Set working directory
WORKDIR /app

# 4. Copy source code
COPY ./apps/backend .

# 3. Install dependencies
RUN npm install

# 5. Generate Prisma client
RUN npx prisma generate

# 6. Expose port (matches .env)
EXPOSE 3000

# 7. Run migration + start app
CMD ["sh", "-c", "npx prisma migrate deploy && node src/index.js"]
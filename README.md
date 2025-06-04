# Typora

Typora is a lightweight blogging platform built with Fastify (backend) and TypeScript + TailwindCSS (frontend). It supports features like user profiles, JWT auth, Google OAuth, 2FA, and pretty URLs.

This project is containerized with Docker and designed as a fullstack monorepo.


## Technologies Used

### Backend
- Node.js
- Fastify
- JWT Authentication
- Google OAuth
- 2FA with Authenticator Apps
- SQLite (via Prisma ORM)
- Docker

### Frontend
- TypeScript
- TailwindCSS
- Vite 

---

## Running the Backend with Docker

Make sure you have Docker installed on your system. Then:

1. Create a `.env` file in the `apps/backend/` directory with at least:

```
PORT=3000
JWT_SECRET=your_super_secret
```

2. Navigate to the backend directory:
```bash
cd apps/backend
```

3. Run the backend with Docker Compose:
```bash
docker compose up --build
```

This will run database migrations automatically and start the Fastify server on the port you specified.

require('dotenv').config();
const fastify = require('fastify')();
const cors = require('@fastify/cors');
const fastifySwagger = require('@fastify/swagger');
const fastifySwaggerUI = require('@fastify/swagger-ui');

// Swagger - OpenAPI config
fastify.register(fastifySwagger, {
  swagger: {
    info: {
      title: 'Medium Clone API',
      description: 'API documentation for the blogging platform',
      version: '1.0.0',
    },
    host: 'localhost:3000',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
  },
});

fastify.register(fastifySwaggerUI, {
  routePrefix: '/docs',
});

fastify.register(cors, {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cache-Control'],
  credentials: true
});

const PORT = process.env.PORT || 3000;

fastify.register(require('./routes/auth'), { prefix: '/auth' });
fastify.register(require('./routes/post'));
fastify.register(require('./routes/user'));

fastify.get('/', async (request, reply) => {
  return { message: 'Welcome to medium API (Node.js)' };
});

fastify.listen({ port: PORT, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`🚀 Server running at ${address}`);
});
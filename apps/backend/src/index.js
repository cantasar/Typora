require('dotenv').config(); // .env dosyasını yükler
const fastify = require('fastify')();

const PORT = process.env.PORT || 3000;

fastify.get('/', async (request, reply) => {
  return { message: 'Welcome to Typora API (Node.js)' };
});

fastify.listen({ port: PORT, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`🚀 Server running at ${address}`);
});
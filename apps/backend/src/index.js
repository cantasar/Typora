require('dotenv').config();
const fastify = require('fastify')();

const PORT = process.env.PORT || 3000;

fastify.register(require('./routes/auth'), { prefix: '/auth' });
fastify.register(require('./routes/post'));
fastify.register(require('./routes/user'));

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
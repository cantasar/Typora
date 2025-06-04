require('dotenv').config();
const fastify = require('fastify')();
fastify.register(require('./routes/auth.js'));

const PORT = process.env.PORT || 3000;

fastify.register(require('./routes/auth.js'), { prefix: '/auth' });

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
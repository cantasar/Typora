const verifyToken = require('../middlewares/auth');
const userService = require('../services/userService');

async function userRoutes(fastify, options) {
  fastify.get('/me', { preHandler: verifyToken }, async (request, reply) => {
    try {
      const user = await userService.findById(request.user.id);
      if (!user) {
        return reply.status(404).send({ error: 'User not found' });
      }

      const { password, ...userWithoutPassword } = user;
      reply.send(userWithoutPassword);
    } catch (err) {
      console.error('GET /me error:', err);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });

  fastify.put('/me', { preHandler: verifyToken }, async (request, reply) => {
    try {
      const userId = request.user.id;
      const { name, email } = request.body;

      if (!name || !email) {
        return reply.status(400).send({ error: 'Name and email are required.' });
      }

      const updatedUser = await userService.updateUser(userId, { name, email });

      if (!updatedUser) {
        return reply.status(404).send({ error: 'User not found.' });
      }

      const { password, ...userWithoutPassword } = updatedUser;
      reply.send(userWithoutPassword);
    } catch (err) {
      console.error('PUT /me error:', err);
      reply.status(500).send({ error: 'Internal Server Error' });
    }
  });
}

module.exports = userRoutes;
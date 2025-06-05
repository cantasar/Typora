const verifyToken = require('../middlewares/auth');
const userController = require('../controllers/userController');

function userRoutes(fastify, options) {
  fastify.get('/me', { preHandler: verifyToken }, userController.getMe);
  fastify.put('/me', { preHandler: verifyToken }, userController.updateMe);

  fastify.get('/user/:username/posts', userController.getPostsByUsername); // 🔥 BU YENİ

  fastify.get('/:username', userController.getPublicProfile);
}

module.exports = userRoutes;
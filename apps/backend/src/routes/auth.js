const authController = require('../controllers/authController');

async function authRoutes(fastify, options) {

  fastify.post('/register', authController.register);

  fastify.post('/login', authController.login);

  fastify.post('/google', authController.loginWithGoogle);

}

module.exports = authRoutes;
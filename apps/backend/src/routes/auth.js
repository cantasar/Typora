const authController = require('../controllers/authController');

async function authRoutes(fastify, options) {
  // Kullanıcı kaydı için route tanımı
  fastify.post('/register', authController.register);
}

module.exports = authRoutes;
const verifyToken = require('../middlewares/auth');
const postController = require('../controllers/postController');

function postRoutes(fastify, options) {
  // Yeni yazı oluştur
  fastify.post('/posts', { preHandler: verifyToken }, postController.createPost);

  // Feed - herkese açık yazı listesi
  fastify.get('/feed', postController.getFeed);

  // Slug ve username ile yazı detayını getir
  fastify.get('/posts/:username/:slug', postController.getPostBySlugAndUsername);
}

module.exports = postRoutes;
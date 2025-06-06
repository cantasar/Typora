const postService = require('../services/postService');
const slugify = require('../utils/slugify');
const prisma = require('../lib/prisma');


const createPost = async (request, reply) => {
  try {
    const { title, content } = request.body;
    const authorId = request.user.id;

    if (!title || !content) {
      return reply.status(400).send({ error: 'Title and content are required.' });
    }

    const slug = slugify(title);

    const newPost = await postService.createPost({
      title,
      content,
      slug,
      authorId,
    });

    reply.status(201).send(newPost);
  } catch (err) {
    console.error('POST /posts error:', err);
    reply.status(500).send({ error: 'Internal Server Error' });
  }
};


async function getFeed() {
  return await prisma.post.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      author: {
        select: {
          username: true,
          name: true
        }
      }
    }
  });
}


const getPostBySlugAndUsername = async (request, reply) => {
  try {
    const { username, slug } = request.params;
    const post = await postService.getPostBySlugAndUsername(username, slug);

    if (!post) {
      return reply.status(404).send({ error: 'Post not found' });
    }

    reply.send(post);
  } catch (err) {
    console.error('GET /:username/:slug error:', err);
    reply.status(500).send({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createPost,
  getFeed,
  getPostBySlugAndUsername
};
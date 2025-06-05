const userService = require('../services/userService');
const prisma = require('../lib/prisma'); // ✅ bu olmalı


const getMe = async (request, reply) => {
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
};

const getPostsByUsername = async (request, reply) => {
  try {
    const { username } = request.params;

    const posts = await prisma.post.findMany({
      where: { author: { username } },
      orderBy: { createdAt: 'desc' },
      include: {
        author: {
          select: {
            username: true
          }
        }
      }
    });

    const author = await prisma.user.findUnique({
      where: { username },
      select: { id: true, username: true, name: true }
    });

    if (!author) {
      return reply.status(404).send({ error: 'User not found' });
    }

    reply.send({ author, posts });
  } catch (err) {
    console.error('GET /user/:username/posts error:', err);
    reply.status(500).send({ error: 'Internal Server Error' });
  }
};

async function updateMe(request, reply) {
  try {
    const userId = request.user.id;
    const { name, email, username } = request.body;

    if (!name || !email || !username) {
      return reply.status(400).send({ error: 'Name, email, and username are required.' });
    }

    // Check if email is already taken by another user
    const existingEmail = await prisma.user.findUnique({
      where: { email },
    });
    if (existingEmail && existingEmail.id !== userId) {
      return reply.status(400).send({ error: 'Email is already in use.' });
    }

    // Check if username is already taken by another user
    const existingUsername = await prisma.user.findUnique({
      where: { username },
    });
    if (existingUsername && existingUsername.id !== userId) {
      return reply.status(400).send({ error: 'Username is already taken.' });
    }

    const updatedUser = await userService.updateUser(userId, { name, email, username });

    if (!updatedUser) {
      return reply.status(404).send({ error: 'User not found.' });
    }

    const { password, ...userWithoutPassword } = updatedUser;
    reply.send(userWithoutPassword);
  } catch (err) {
    console.error('PUT /me error:', err);
    if (err.code === 'P2002') {
      return reply.status(400).send({ error: 'Username or email is already taken.' });
    }
    reply.status(500).send({ error: 'Internal Server Error' });
  }
}

async function getPublicProfile(request, reply) {
  try {
    const { username } = request.params;

    const user = await userService.findByUsernameWithPosts(username);
    if (!user) {
      return reply.status(404).send({ error: 'User not found' });
    }

    const { password, ...userWithoutPassword } = user;
    reply.send(userWithoutPassword);
  } catch (err) {
    console.error('GET /:username error:', err);
    reply.status(500).send({ error: 'Internal Server Error' });
  }
}

module.exports = {
  getMe,
  getPostsByUsername,
  updateMe,
  getPublicProfile
};
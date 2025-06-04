const userService = require('../services/userService');

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

async function updateMe(request, reply) {
  try {
    const userId = request.user.id;
    const { name, email, username } = request.body;

    if (!name || !email || !username) {
      return reply.status(400).send({ error: 'Name, email, and username are required.' });
    }

    const updatedUser = await userService.updateUser(userId, { name, email, username });

    if (!updatedUser) {
      return reply.status(404).send({ error: 'User not found.' });
    }

    const { password, ...userWithoutPassword } = updatedUser;
    reply.send(userWithoutPassword);
  } catch (err) {
    console.error('PUT /me error:', err);
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
  updateMe,
  getPublicProfile
};
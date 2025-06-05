const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function findByEmail(email) {
  return prisma.user.findUnique({
    where: { email },
  });
}

function findById(id) {
  return prisma.user.findUnique({
    where: { id },
  });
}

function createUser({ name, username, email, password }) {
  return prisma.user.create({
    data: {
      name,
      username,
      email,
      password,
    },
  });
}

function updateUser(id, { name, email, username }) {
  return prisma.user.update({
    where: { id },
    data: {
      name,
      email,
      username,
    },
  });
}

async function getPostBySlugAndUsername(username, slug) {
  return prisma.post.findFirst({
    where: {
      slug,
      author: {
        username: username,
      },
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          username: true,
        },
      },
    },
  });
}

async function findByUsernameWithPosts(username) {
  return prisma.user.findFirst({
    where: {
      username,
    },
    include: {
      posts: {
        orderBy: {
          createdAt: 'desc',
        },
        select: {
          id: true,
          title: true,
          slug: true,
          createdAt: true,
        },
      },
    },
  });
}

module.exports = {
  findByEmail,
  findById,
  createUser,
  updateUser,
  getPostBySlugAndUsername,
  findByUsernameWithPosts,
};
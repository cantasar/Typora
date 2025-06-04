const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function createPost({ title, content, slug, authorId }) {
  return prisma.post.create({
    data: {
      title,
      content,
      slug,
      authorId,
    },
    include: {
      author: true,
    },
  });
}

async function getFeed() {
  return prisma.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });
}

async function getPostBySlugAndUsername(username, slug) {
  return prisma.post.findFirst({
    where: {
      slug,
      author: {
        name: username,
      },
    },
    include: {
      author: true,
    },
  });
}

module.exports = {
  createPost,
  getFeed,
  getPostBySlugAndUsername,
};
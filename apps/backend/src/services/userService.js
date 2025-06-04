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

function createUser({ name, email, password }) {
  return prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });
}

function updateUser(id, { name, email }) {
  return prisma.user.update({
    where: { id },
    data: {
      name,
      email,
    },
  });
}

module.exports = {
  findByEmail,
  findById,
  createUser,
  updateUser,
};
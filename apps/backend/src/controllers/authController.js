const bcrypt = require('bcrypt');
const userService = require('../services/userService');

const register = async (request, reply) => {
  try {
    const { name, email, password } = request.body;

    // 1. Zorunlu alanları kontrol et
    if (!name || !email || !password) {
      return reply.status(400).send({ error: 'Name, email, and password are required.' });
    }

    // 2. Email zaten kayıtlı mı?
    const existingUser = await userService.findByEmail(email);
    if (existingUser) {
      return reply.status(409).send({ error: 'Email is already in use.' });
    }

    // 3. Şifreyi hashle
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Yeni kullanıcı oluştur
    const newUser = await userService.createUser({
      name,
      email,
      password: hashedPassword,
    });

    // 5. Yanıt döndür (şifre hariç)
    const { password: _, ...userWithoutPassword } = newUser;

    return reply.status(201).send(userWithoutPassword);

  } catch (error) {
    console.error('Register error:', error);
    return reply.status(500).send({ error: 'Internal Server Error' });
  }
};

module.exports = {
  register,
};
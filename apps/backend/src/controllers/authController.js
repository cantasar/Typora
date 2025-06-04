const bcrypt = require('bcrypt');
const userService = require('../services/userService');

const register = async (request, reply) => {
  try {
    const { name, username, email, password } = request.body;

    if (!name || !username || !email || !password) {
      return reply.status(400).send({ error: 'All fields are required' });
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
      username,
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


const jwt = require('jsonwebtoken');

const login = async (request, reply) => {
  try {
    const { email, password } = request.body;

    // Alan kontrolü
    if (!email || !password) {
      return reply.status(400).send({ error: 'Email and password are required.' });
    }

    // Kullanıcıyı bul
    const user = await userService.findByEmail(email);
    if (!user) {
      return reply.status(401).send({ error: 'Invalid credentials.' });
    }

    // Şifreyi kontrol et
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return reply.status(401).send({ error: 'Invalid credentials.' });
    }

    // Token oluştur
    const token = jwt.sign(
      { id: user.id, email: user.email }, 
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Şifreyi yanıttan çıkar
    const { password: _, ...userWithoutPassword } = user;

    return reply.send({
      token,
      user: userWithoutPassword
    });

  } catch (error) {
    console.error('Login error:', error);
    return reply.status(500).send({ error: 'Internal Server Error' });
  }
};

module.exports = {
  register,
  login
};
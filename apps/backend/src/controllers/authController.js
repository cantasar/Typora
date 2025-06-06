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

const { OAuth2Client } = require('google-auth-library');
const prisma = require('../lib/prisma');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function loginWithGoogle(request, reply) {
  try {
    const { idToken } = request.body;

    if (!idToken) {
      return reply.status(400).send({ error: 'Missing idToken' });
    }

    // Google idToken'ı doğrula
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const email = payload.email;
    const name = payload.name;
    const googleId = payload.sub;

    // Kullanıcı daha önce kaydolmuş mu?
    let user = await prisma.user.findUnique({
      where: { email },
    });

    // Yoksa oluştur
    if (!user) {
      const username = email.split('@')[0]; // basit username üretimi

      user = await prisma.user.create({
        data: {
          name,
          email,
          username: username + Math.floor(Math.random() * 1000),
          password: "GOOGLE_USER"
        }
      })};

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    reply.send({
      token,
      username: user.username,
    });
  } catch (err) {
    console.error('Google login error:', err);
    reply.status(500).send({ error: 'Internal Server Error' });
  }
}

module.exports = {
  register,
  login,
  loginWithGoogle
};
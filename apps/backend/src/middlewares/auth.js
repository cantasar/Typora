const jwt = require('jsonwebtoken');

function verifyToken(request, reply, done) {
  const authHeader = request.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return reply.status(401).send({ error: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    request.user = decoded; // kullanıcının bilgilerini route'a taşıyoruz
    done();
  } catch (err) {
    return reply.status(401).send({ error: 'Invalid or expired token' });
  }
}

module.exports = verifyToken;
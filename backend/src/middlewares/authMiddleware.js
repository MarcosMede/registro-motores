const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization || '';
  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Token ausente ou invalido.' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = {
      id: payload.sub,
      email: payload.email,
      nome: payload.nome
    };

    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Token expirado ou invalido.' });
  }
}

module.exports = authenticateToken;

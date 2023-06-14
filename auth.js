const jwt = require('jsonwebtoken');

const secretKey = 'secret';

const generateToken = (user) => {
  const payload = {
    userId: user.id,
    name: user.name,
  };

  const options = {
    expiresIn: '1h',
  };

  return jwt.sign(payload, "secret", options);
};

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = decoded;
    next();
  });
};

module.exports = { generateToken, verifyToken };

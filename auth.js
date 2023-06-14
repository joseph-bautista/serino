const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.JWT_SECRET;

const generateToken = (user) => {
  const payload = {
    userId: user.id,
    name: user.name,
  };

  const options = {
    expiresIn: '1h',
  };

  return jwt.sign(payload, secretKey, options);
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

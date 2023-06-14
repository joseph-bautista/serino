const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
  
  const retoken = req.header('Authorization');
  const token = retoken.replace("Bearer ", '');
  
  if (!token) {
    return res.status(401).json({ message: 'Authorization denied. Token missing.' });
  }

  try {
    
    const decoded = jwt.verify(token, 'secret');
    console.log(decoded);
    req.user = decoded.user;
    next(); 
  } catch (error) {
    res.status(401).json({ message: 'Authorization denied. Invalid token.' });
  }
};

module.exports = authenticateJWT;

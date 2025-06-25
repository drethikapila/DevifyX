// const jwt = require('jsonwebtoken');

// function authenticateToken(req, res, next) {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) return res.status(401).json({ error: 'Token not provided' });

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) return res.status(403).json({ error: 'Invalid token' });
//     req.user = user;
//     next();
//   });
// }

// module.exports = authenticateToken;


const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    console.warn('Authorization header missing');
    return res.status(401).json({ error: 'Authorization header missing' });
  }

  if (!authHeader.startsWith('Bearer ')) {
    console.warn('Invalid auth format. Expected Bearer token.');
    return res.status(401).json({ error: 'Invalid authorization format. Use Bearer <token>' });
  }

  const token = authHeader.split(' ')[1];
  console.log("🔐 Token:", token);
  console.log("🧪 JWT_SECRET from .env:", process.env.JWT_SECRET);


  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.error('JWT verification failed:', err.message);
      return res.status(403).json({ error: 'Invalid token' });
    }

    req.user = user;
    next();
  });
}

module.exports = authenticateToken;

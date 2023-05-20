import  jwt from  'jsonwebtoken';
import dotnenv from 'dotenv';
dotnenv.config();
const secretKey = process.env.SECRET_KEY;

// Authenticate request using JWT token
exports.authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  jwt.verify(token,  (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.userId = decoded.userId;
    next();
  });
};

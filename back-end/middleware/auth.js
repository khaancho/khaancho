const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth.js'); // Ensure this path is correct


module.exports = function (req, res, next) {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) return res.status(401).json({ msg: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // { id: user._id }
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token' });
  }
};

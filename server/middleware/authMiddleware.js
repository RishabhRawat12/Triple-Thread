// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

// Middleware to protect routes that require a user to be logged in
const protect = (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.user; // Attach user's ID to the request
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Middleware to check if the logged-in user is a tutor
const isTutor = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user.id);
    if (user && user.is_tutor) {
      next();
    } else {
      res.status(403).json({ message: 'Access denied. Tutors only.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { protect, isTutor };
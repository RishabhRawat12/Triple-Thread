const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user
const registerUser = async (req, res) => {
  try {
    const { first_name, last_name, email, password, is_tutor } = req.body;
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);
    const newUser = { first_name, last_name, email, password_hash, is_tutor };
    const result = await userModel.create(newUser);
    res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Login a user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const payload = { user: { id: user.user_id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, userId: user.user_id, is_tutor: user.is_tutor });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get tutors with optional filtering
const getTutors = async (req, res) => {
  try {
    const tutors = await userModel.findAllTutors(req.query);
    res.json(tutors);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// In /server/controllers/userController.js

// --- Get all tutors (with filtering) ---
const getAllTutors = async (req, res) => {
  // ADD THIS LINE FOR DEBUGGING
  console.log("Filtering with query params:", req.query); 

  try {
    const tutors = await userModel.findAllTutors(req.query);
    res.json(tutors);
  } catch (error) {
    console.error('Error fetching tutors:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a single user's public profile
const getUserProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    delete user.password_hash; // Do not send password hash to the client
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { registerUser, loginUser, getTutors, getUserProfile };
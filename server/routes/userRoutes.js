const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getTutors, getUserProfile } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/tutors', getTutors); // Route for the "Find a Tutor" page
router.get('/profile/:id', getUserProfile); // Route to get any user's public profile

module.exports = router;
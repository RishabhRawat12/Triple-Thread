const express = require('express');
const router = express.Router();
const { createLecture, getTutorLectures } = require('../controllers/lectureController');
const { protect, isTutor } = require('../middleware/authMiddleware');

// This implements the "managing... recorded lectures" task from your report [cite: 130]
// Protected, tutor-only route to create a lecture
router.post('/', [protect, isTutor], createLecture);
// Public route to get all lectures for a specific tutor
router.get('/tutor/:tutorId', getTutorLectures);

module.exports = router;
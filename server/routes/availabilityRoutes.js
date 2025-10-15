const express = require('express');
const router = express.Router();
const { setAvailability, getTutorAvailability } = require('../controllers/availabilityController');
const { protect, isTutor } = require('../middleware/authMiddleware');

// A protected, tutor-only route to set availability
router.post('/', [protect, isTutor], setAvailability);
// A public route to get a tutor's available slots
router.get('/tutor/:tutorId', getTutorAvailability);

module.exports = router;
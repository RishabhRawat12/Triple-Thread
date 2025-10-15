const express = require('express');
const router = express.Router();
const { createBooking, getUserBookings } = require('../controllers/bookingController');
const { protect } = require('../middleware/authMiddleware');

// Protected route for a learner to create a booking
router.post('/', protect, createBooking);
// Protected route to view their own bookings
router.get('/mybookings', protect, getUserBookings);

module.exports = router;
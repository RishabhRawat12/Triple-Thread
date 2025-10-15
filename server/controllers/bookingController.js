const bookingModel = require('../models/bookingModel');
const db = require('../config/db'); // Import the raw pool for transactions

// Create a new booking
const createBooking = async (req, res) => {
  const connection = await db.getConnection();
  try {
    const { availability_id } = req.body;
    const learner_id = req.user.id;

    // This transactional logic directly addresses the "primary challenge" of conflict-free booking [cite: 116, 118]
    await connection.beginTransaction();

    const availability = await bookingModel.getAvailabilityForUpdate(connection, availability_id);
    if (!availability || availability.is_booked) {
      await connection.rollback();
      return res.status(409).json({ message: 'This time slot is no longer available.' });
    }

    await bookingModel.markAsBooked(connection, availability_id);
    await bookingModel.create(connection, { learner_id, availability_id });
    await connection.commit();
    
    res.status(201).json({ message: 'Booking created successfully!' });
  } catch (error) {
    await connection.rollback(); // Ensure rollback on any error
    res.status(500).json({ message: 'Server error during booking.' });
  } finally {
    connection.release();
  }
};

// Get all bookings for the logged-in user
const getUserBookings = async (req, res) => {
  try {
    const bookings = await bookingModel.findByLearnerId(req.user.id);
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createBooking, getUserBookings };
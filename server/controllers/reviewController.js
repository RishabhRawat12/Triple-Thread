const reviewModel = require('../models/reviewModel');

const createReview = async (req, res) => {
  try {
    const { booking_id, rating, comment } = req.body;
    const reviewer_id = req.user.id;

    // Verify that the user making the review is the one who made the booking
    const booking = await reviewModel.findBookingForValidation(booking_id);
    if (!booking || booking.learner_id !== reviewer_id) {
      return res.status(403).json({ message: 'You are not authorized to review this booking.' });
    }

    const newReview = { booking_id, reviewer_id, tutor_id: booking.tutor_id, rating, comment };
    
    // Insert the review. The database trigger mentioned in the report will handle updating the tutor's avg_rating [cite: 130]
    await reviewModel.create(newReview);

    res.status(201).json({ message: 'Review submitted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createReview };
const db = require('../config/db');

const create = async (review) => {
  const { booking_id, reviewer_id, tutor_id, rating, comment } = review;
  await db.query(
    'INSERT INTO Review (booking_id, reviewer_id, tutor_id, rating, comment) VALUES (?, ?, ?, ?, ?)',
    [booking_id, reviewer_id, tutor_id, rating, comment]
  );
};

const findBookingForValidation = async (booking_id) => {
  const [rows] = await db.query(
    `SELECT b.learner_id, a.tutor_id 
     FROM Booking b
     JOIN Availability a ON b.availability_id = a.availability_id
     WHERE b.booking_id = ?`,
    [booking_id]
  );
  return rows[0];
};

module.exports = { create, findBookingForValidation };
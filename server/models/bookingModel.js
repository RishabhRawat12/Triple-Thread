// Note: These functions accept a 'connection' object to be used within a transaction
const getAvailabilityForUpdate = async (connection, availability_id) => {
  const [rows] = await connection.query(
    'SELECT * FROM Availability WHERE availability_id = ? AND is_booked = false FOR UPDATE', 
    [availability_id]
  );
  return rows[0];
};

const markAsBooked = async (connection, availability_id) => {
  await connection.query(
    'UPDATE Availability SET is_booked = true WHERE availability_id = ?',
    [availability_id]
  );
};

const create = async (connection, bookingDetails) => {
  const { learner_id, availability_id } = bookingDetails;
  await connection.query(
    'INSERT INTO Booking (learner_id, availability_id, status) VALUES (?, ?, ?)',
    [learner_id, availability_id, 'confirmed']
  );
};

const findByLearnerId = async (learner_id) => {
  const db_pool = require('../config/db');
  const [rows] = await db_pool.query(
    `SELECT b.booking_id, b.status, a.start_time, a.end_time, u.first_name as tutor_first_name 
     FROM Booking b
     JOIN Availability a ON b.availability_id = a.availability_id
     JOIN Users u ON a.tutor_id = u.user_id
     WHERE b.learner_id = ?`,
    [learner_id]
  );
  return rows;
};

module.exports = { getAvailabilityForUpdate, markAsBooked, create, findByLearnerId };
const db = require('../config/db');

// Create new availability slots for a tutor
const create = async (tutor_id, slots) => {
  const queryValues = slots.map(slot => [tutor_id, slot.start_time, slot.end_time]);
  await db.query(
    'INSERT INTO Availability (tutor_id, start_time, end_time) VALUES ?',
    [queryValues]
  );
};

// Find all available (not booked) slots for a specific tutor
const findByTutorId = async (tutor_id) => {
  const [rows] = await db.query(
    'SELECT * FROM Availability WHERE tutor_id = ? AND is_booked = false ORDER BY start_time ASC',
    [tutor_id]
  );
  return rows;
};

module.exports = { create, findByTutorId };

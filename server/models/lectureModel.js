const db = require('../config/db');

const create = async (lecture) => {
  const { tutor_id, title, description, video_url } = lecture;
  const [result] = await db.query(
    'INSERT INTO RecordedLecture (tutor_id, title, description, video_url) VALUES (?, ?, ?, ?)',
    [tutor_id, title, description, video_url]
  );
  return result;
};

const findByTutorId = async (tutor_id) => {
  const [rows] = await db.query(
    'SELECT * FROM RecordedLecture WHERE tutor_id = ? ORDER BY uploaded_at DESC',
    [tutor_id]
  );
  return rows;
};

module.exports = { create, findByTutorId };
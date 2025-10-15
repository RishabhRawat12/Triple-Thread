// In /server/models/userModel.js

const db = require('../config/db');

const create = async (user) => {
  const { first_name, last_name, email, password_hash, is_tutor } = user;
  const [result] = await db.query(
    'INSERT INTO Users (first_name, last_name, email, password_hash, is_tutor) VALUES (?, ?, ?, ?, ?)',
    [first_name, last_name, email, password_hash, is_tutor || false]
  );
  return result;
};

const findByEmail = async (email) => {
  const [rows] = await db.query('SELECT * FROM Users WHERE email = ?', [email]);
  return rows[0];
};

const findById = async (id) => {
  const [rows] = await db.query('SELECT * FROM Users WHERE user_id = ?', [id]);
  return rows[0];
};

const findAllTutors = async (filters) => {
  let query = 'SELECT user_id, first_name, last_name, bio, avg_rating, hourly_rate FROM Users WHERE is_tutor = true';
  const queryParams = [];

  if (filters.skill) {
    query += ` AND user_id IN (
      SELECT us.user_id FROM UserSkill us
      JOIN Skill s ON us.skill_id = s.skill_id
      WHERE s.skill_name LIKE ?
    )`;
    queryParams.push(`%${filters.skill}%`);
  }

  // This is the key condition for the rating filter
  if (filters.rating && parseFloat(filters.rating) > 0) {
    query += ' AND avg_rating >= ?';
    queryParams.push(parseFloat(filters.rating));
  }
  
  query += ' ORDER BY avg_rating DESC';

  const [rows] = await db.query(query, queryParams);
  return rows;
};

module.exports = { create, findByEmail, findById, findAllTutors };
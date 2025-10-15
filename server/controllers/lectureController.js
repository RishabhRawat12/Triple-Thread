const lectureModel = require('../models/lectureModel');

// Create a new recorded lecture
const createLecture = async (req, res) => {
  try {
    const tutor_id = req.user.id;
    const { title, description, video_url } = req.body;
    if (!title || !video_url) {
      return res.status(400).json({ message: 'Title and video URL are required.' });
    }
    const newLecture = { tutor_id, title, description, video_url };
    const result = await lectureModel.create(newLecture);
    res.status(201).json({ message: 'Lecture created successfully', lectureId: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all lectures for a specific tutor
const getTutorLectures = async (req, res) => {
  try {
    const { tutorId } = req.params;
    const lectures = await lectureModel.findByTutorId(tutorId);
    res.json(lectures);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { createLecture, getTutorLectures };
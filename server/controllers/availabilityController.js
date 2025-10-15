const availabilityModel = require('../models/availabilityModel');

// Controller for a tutor to set their availability
const setAvailability = async (req, res) => {
  try {
    const tutor_id = req.user.id;
    const { slots } = req.body; // Expects an array of { start_time, end_time }
    if (!slots || !Array.isArray(slots) || slots.length === 0) {
      return res.status(400).json({ message: 'Please provide an array of time slots.' });
    }
    await availabilityModel.create(tutor_id, slots);
    res.status(201).json({ message: 'Availability set successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
};

// Controller to get all available slots for a given tutor
const getTutorAvailability = async (req, res) => {
  try {
    const { tutorId } = req.params;
    const availableSlots = await availabilityModel.findByTutorId(tutorId);
    res.json(availableSlots);
  } catch (error) {
    res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = { setAvailability, getTutorAvailability };
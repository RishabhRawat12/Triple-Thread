import axios from 'axios';

const API_URL = 'http://localhost:5000/api/availability';

export const getAvailabilityForTutor = async (tutorId) => {
  const response = await axios.get(`${API_URL}/tutor/${tutorId}`);
  return response.data;
};
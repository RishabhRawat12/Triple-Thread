import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const getTutors = async () => {
  const response = await axios.get(`${API_URL}/users/tutors`);
  return response.data;
};

export const getTutorById = async (tutorId) => {
  const response = await axios.get(`${API_URL}/users/profile/${tutorId}`);
  return response.data;
};
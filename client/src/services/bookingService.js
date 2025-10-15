import axios from 'axios';

const API_URL = 'http://localhost:5000/api/bookings';

export const createBooking = async (availability_id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, { availability_id }, config);
  return response.data;
};

export const getUserBookings = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };
    const response = await axios.get(`${API_URL}/mybookings`, config);
    return response.data;
};
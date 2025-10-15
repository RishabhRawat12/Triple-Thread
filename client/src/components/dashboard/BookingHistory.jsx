import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { getUserBookings } from '../../services/bookingService';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  useEffect(() => {
    const fetchBookings = async () => {
      if (!token) return;
      try {
        const data = await getUserBookings(token);
        setBookings(data);
      } catch (error) {
        console.error("Failed to fetch booking history", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [token]);

  if (loading) return <p>Loading booking history...</p>;

  return (
    <div>
      <h3>Your Booking History</h3>
      {bookings.length === 0 ? (
        <p>You have no past bookings.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {bookings.map(booking => (
            <li key={booking.booking_id} style={{ border: '1px solid #e5e7eb', borderRadius: '0.5rem', padding: '1rem', marginBottom: '1rem' }}>
              <p><strong>Tutor:</strong> {booking.tutor_first_name}</p>
              <p><strong>Time:</strong> {new Date(booking.start_time).toLocaleString()}</p>
              <p><strong>Status:</strong> {booking.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookingHistory;
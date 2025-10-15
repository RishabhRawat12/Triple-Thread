import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTutorById } from '../services/tutorService';
import { getAvailabilityForTutor } from '../services/availabilityService'; 
import { createBooking } from '../services/bookingService';
import { useAuth } from '../hooks/useAuth';


const TutorProfilePage = () => {
  const { tutorId } = useParams();
  const [tutor, setTutor] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, token } = useAuth();

  useEffect(() => {
    const fetchTutorData = async () => {
      try {
        const [tutorData, availabilityData] = await Promise.all([
          getTutorById(tutorId),
          getAvailabilityForTutor(tutorId)
        ]);
        setTutor(tutorData);
        setAvailability(availabilityData);
      } catch (error) {
        console.error("Failed to fetch tutor data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTutorData();
  }, [tutorId]);

  const handleBooking = async (availabilityId) => {
    if (!user) {
        alert("Please log in to book a session.");
        return;
    }
    if (user.is_tutor) {
        alert("Tutors cannot book sessions.");
        return;
    }
    try {
        await createBooking(availabilityId, token);
        alert("Booking successful!");
        setAvailability(prev => prev.filter(slot => slot.availability_id !== availabilityId));
    } catch (error) {
        alert("Failed to book session. It may no longer be available.");
        console.error("Booking failed", error);
    }
  };

  if (loading) return <div>Loading profile...</div>;
  if (!tutor) return <div>Tutor not found.</div>;

  return (
    <div className="dashboard-page">
       <div className="dashboard-header" style={{ marginBottom: '2rem' }}>
        <img src={`https://i.pravatar.cc/150?u=${tutor.user_id}`} alt={`${tutor.first_name}`} />
        <div>
          <h2>{tutor.first_name} {tutor.last_name}</h2>
          <p>⭐ {tutor.avg_rating} (0 reviews)</p>
        </div>
      </div>
       <div className="dashboard-content">
          <h3>About Me</h3>
          <p>{tutor.bio}</p>
          <hr />
          <h3>Available Sessions</h3>
          {availability.length > 0 ? (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {availability.map(slot => (
                <li key={slot.availability_id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '0.5rem', marginBottom: '1rem' }}>
                  <span>{new Date(slot.start_time).toLocaleString()}</span>
                  <button className="btn btn-primary" onClick={() => handleBooking(slot.availability_id)}>Book Session</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>This tutor has no available sessions at the moment.</p>
          )}
       </div>
    </div>
  );
};

export default TutorProfilePage;
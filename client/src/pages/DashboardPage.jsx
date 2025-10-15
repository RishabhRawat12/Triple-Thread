import { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { getTutorById } from '../services/tutorService';
import BookingHistory from '../components/dashboard/BookingHistory';

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('personal');
  const [profile, setProfile] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.id) {
      getTutorById(user.id)
        .then(data => setProfile(data))
        .catch(err => console.error(err));
    }
  }, [user]);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <img src={`https://i.pravatar.cc/150?u=${profile.user_id}`} alt={`${profile.first_name}`} />
        <div>
          <h2>{profile.first_name} {profile.last_name}</h2>
          <p>{profile.email}</p>
        </div>
        <div className="dashboard-stats">
          <div className="stat-item">
            <h2>0</h2>
            <p>Total Sessions</p>
          </div>
          <div className="stat-item">
            <h2>{profile.avg_rating} ★</h2>
            <p>Average Rating</p>
          </div>
        </div>
      </div>
      <div className="dashboard-content">
        <div className="dashboard-tabs">
          <button className={activeTab === 'personal' ? 'active' : ''} onClick={() => setActiveTab('personal')}>Personal Info</button>
          <button className={activeTab === 'history' ? 'active' : ''} onClick={() => setActiveTab('history')}>Booking History</button>
        </div>
        {activeTab === 'personal' && (
          <div>
            <h3>Personal Information</h3>
            <p><strong>Name:</strong> {profile.first_name} {profile.last_name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Bio:</strong> {profile.bio}</p>
          </div>
        )}
        {activeTab === 'history' && <BookingHistory />}
      </div>
    </div>
  );
};

export default DashboardPage;
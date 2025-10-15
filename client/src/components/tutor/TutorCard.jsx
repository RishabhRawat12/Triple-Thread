// In /client/src/components/tutor/TutorCard.jsx

import { useNavigate } from 'react-router-dom';

const TutorCard = ({ tutor }) => {
  const navigate = useNavigate();

  return (
    <div className="tutor-card">
      <div className="tutor-card-img">
        <img src={`https://i.pravatar.cc/150?u=${tutor.user_id}`} alt={`${tutor.first_name}`} />
      </div>
      <div className="tutor-card-info">
        <h3>{tutor.first_name} {tutor.last_name}</h3>
        <p>{tutor.bio?.substring(0, 100)}...</p>
        <div>⭐ {tutor.avg_rating} (0 reviews)</div>
      </div>
      <div className="tutor-card-actions">
        {/* Changed from $ to ₹ and uses the new hourly_rate property */}
        <div className="tutor-card-price">₹{tutor.hourly_rate}/hr</div>
        <button className="btn btn-primary" onClick={() => navigate(`/tutor/${tutor.user_id}`)}>View Profile</button>
      </div>
    </div>
  );
};

export default TutorCard;
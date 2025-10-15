import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  
  return (
    <div style={{ textAlign: 'center', padding: '5rem 0' }}>
      <h1>Find Your Perfect Learning Partner</h1>
      <p style={{ fontSize: '1.25rem', color: '#6b7280', marginBottom: '2rem' }}>
        Connect with expert tutors worldwide. Learn anything, anytime, anywhere.
      </p>
      <div>
        <input 
          type="text" 
          placeholder="What would you like to learn?" 
          style={{ padding: '1rem', fontSize: '1rem', width: '300px', marginRight: '1rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }} 
        />
        <button className="btn btn-primary" onClick={() => navigate('/tutors')}>Find Tutors</button>
      </div>
    </div>
  );
};

export default HomePage;
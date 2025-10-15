import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    is_tutor: false
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(formData);
      navigate('/login');
    } catch (err) {
      setError('Failed to register. Please try again.');
    }
  };

  return (
    <div className="form-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        {error && <p style={{color: 'red'}}>{error}</p>}
        <div className="form-group">
          <label>First Name</label>
          <input type="text" name="first_name" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input type="text" name="last_name" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" onChange={handleChange} required />
        </div>
         <div className="form-group" style={{ display: 'flex', alignItems: 'center' }}>
          <input type="checkbox" name="is_tutor" id="is_tutor" onChange={handleChange} style={{ width: 'auto', marginRight: '0.5rem' }} />
          <label htmlFor="is_tutor" style={{ marginBottom: 0 }}>I want to be a Tutor</label>
        </div>
        <button type="submit" className="btn btn-primary" style={{width: '100%'}}>Create Account</button>
      </form>
    </div>
  );
};

export default RegisterPage;
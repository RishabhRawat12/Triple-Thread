import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">LearnHive</Link>
      <div className="nav-links">
        <Link to="/tutors">Find Tutors</Link>
        <Link to="/become-tutor">Become a Tutor</Link>
      </div>
      <div className="nav-auth">
        {user ? (
          <>
            <button onClick={() => navigate('/dashboard')} className="btn btn-secondary">Dashboard</button>
            <button onClick={handleLogout} className="btn btn-primary">Logout</button>
          </>
        ) : (
          <>
            <button onClick={() => navigate('/login')} className="btn btn-secondary">Login</button>
            <button onClick={() => navigate('/register')} className="btn btn-primary">Sign Up</button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FindTutorPage from './pages/FindTutorPage';
import DashboardPage from './pages/DashboardPage';
import TutorProfilePage from './pages/TutorProfilePage';
import BecomeTutorPage from './pages/BecomeTutorPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/tutors" element={<FindTutorPage />} />
            <Route path="/tutor/:tutorId" element={<TutorProfilePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/become-tutor" element={<BecomeTutorPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
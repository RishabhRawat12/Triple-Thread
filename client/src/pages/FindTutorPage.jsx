// In /client/src/pages/FindTutorPage.jsx

import { useState, useEffect } from 'react';
import TutorCard from '../components/tutor/TutorCard';
import TutorFilterSidebar from '../components/tutor/TutorFilterSidebar';
import { getTutors } from '../services/tutorService';

const FindTutorPage = () => {
  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ skill: '', rating: '0' });

  useEffect(() => {
    const fetchTutors = async () => {
      setLoading(true);
      try {
        const activeFilters = { ...filters };
        // Clean up filters before sending to the API
        if (!activeFilters.skill) delete activeFilters.skill;
        if (activeFilters.rating === '0') delete activeFilters.rating;

        const data = await getTutors(activeFilters);
        setTutors(data);
      } catch (error) {
        console.error("Failed to fetch tutors", error);
      } finally {
        setLoading(false);
      }
    };
    
    // This delays the API call slightly so it doesn't fire on every keystroke
    const debounceFetch = setTimeout(() => {
        fetchTutors();
    }, 300);

    return () => clearTimeout(debounceFetch);
  }, [filters]);

  const handleFilterChange = (name, value) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  return (
    <div className="find-tutor-page">
      <TutorFilterSidebar filters={filters} onFilterChange={handleFilterChange} />
      <section className="tutor-list">
        <h2>Showing {tutors.length} Tutors</h2>
        {loading ? <p>Loading tutors...</p> : tutors.map(tutor => <TutorCard key={tutor.user_id} tutor={tutor} />)}
      </section>
    </div>
  );
};

export default FindTutorPage;
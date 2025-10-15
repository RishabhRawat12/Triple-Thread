// In /client/src/components/tutor/TutorFilterSidebar.jsx

const TutorFilterSidebar = ({ filters, onFilterChange }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };
  
  const clearFilters = () => {
    onFilterChange('skill', '');
    onFilterChange('rating', '0'); // Resetting rating to '0'
  };

  return (
    <aside className="filter-sidebar">
      <h3>Filters</h3>
      <div className="form-group">
        <label htmlFor="skill">Subject or Skill</label>
        <input 
          type="text" 
          id="skill" 
          name="skill"
          placeholder="e.g., Python, Maths"
          value={filters.skill || ''}
          onChange={handleInputChange} 
        />
      </div>
      <div className="form-group">
        <label>Minimum Rating</label>
        <div>
          <input 
            type="radio" 
            id="rating4.5" 
            name="rating" 
            value="4.5"
            checked={filters.rating === '4.5'}
            onChange={handleInputChange}
          />
          <label htmlFor="rating4.5"> ⭐ 4.5 & up</label>
        </div>
        <div>
          <input 
            type="radio" 
            id="rating4" 
            name="rating" 
            value="4.0"
            checked={filters.rating === '4.0'}
            onChange={handleInputChange}
          />
          <label htmlFor="rating4"> ⭐ 4.0 & up</label>
        </div>
         <div>
          <input 
            type="radio" 
            id="rating3.5" 
            name="rating" 
            value="3.5"
            checked={filters.rating === '3.5'}
            onChange={handleInputChange}
          />
          <label htmlFor="rating3.5"> ⭐ 3.5 & up</label>
        </div>
      </div>
      <button className="btn btn-secondary" style={{ width: '100%' }} onClick={clearFilters}>Clear Filters</button>
    </aside>
  );
};

export default TutorFilterSidebar;
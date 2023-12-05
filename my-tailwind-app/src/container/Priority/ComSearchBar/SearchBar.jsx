import React, { useState } from 'react';


const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
  };

  const searchBarStyle = {
    backgroundColor: '#ddd',
    width: '100%',
    padding: '10px',
    boxSizing: 'border-box',
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 4px'
    
  };

  const inputStyle = {
    width: '100%',
    padding: '5px',
    backgroundColor: '#ddd', 
    color: 'white', 
    border: 'none',
  };

  return (
    <div style={searchBarStyle}>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        
        style={inputStyle}
      />
      
    </div>
  );
};

export default SearchBar;

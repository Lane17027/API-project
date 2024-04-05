import { useState } from 'react';
import axios from 'axios';

const SearchBar = ({ onSearch }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8000/api/spots/search?city=${searchInput}`);
      const spots = response.data.Spots || []; // Check if response data exists
      onSearch(spots);
    } catch (error) {
      console.error('Error searching for spots:', error);
      onSearch([]); // Pass an empty array if there's an error
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchInput}
        onChange={handleInputChange}
        placeholder="Search by city..."
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;

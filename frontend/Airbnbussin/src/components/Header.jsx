import { useState } from 'react';
import SearchBar from './SearchBar';
import SearchSpotList from './SearchSpotList';

const Header = () => {
  const [searchedSpots, setSearchedSpots] = useState([]);

  const handleSearch = (spots) => {
    setSearchedSpots(spots);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
    </div>
  );
};

export default Header;

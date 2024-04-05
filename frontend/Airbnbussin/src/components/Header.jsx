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
      <h1>My App</h1>
      <SearchBar onSearch={handleSearch} />
      <SearchSpotList spots={searchedSpots} />
    </div>
  );
};

export default Header;

// export default function Header(){
//     return <div>This is header</div>
// }

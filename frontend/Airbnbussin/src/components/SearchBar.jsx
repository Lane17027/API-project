import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:8000/api/spots/search?city=${searchInput}`
      );
      const spots = response.data.Spots || [];
      navigate(`/search?city=${searchInput}`);
    } catch (error) {
      console.error("Error searching for spots:", error);
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

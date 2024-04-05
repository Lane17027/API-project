
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const SearchSpotList = () => {
  const [spots, setSpots] = useState([]);
  const location = useLocation();
  console.log(location)

  useEffect(() => {
    const fetchSpots = async () => {
      try {
        const searchParams = new URLSearchParams(location.search);
        const city = searchParams.get('city');
        const response = await axios.get(`http://localhost:8000/api/spots/search?city=${city}`);
        setSpots(response.data.Spots || []);
      } catch (error) {
        console.error('Error fetching spots:', error);
      }
    };

    fetchSpots();
  }, [location.search]);

  const navigate = useNavigate();
  let showSpot = (id) => {
    navigate(`/spots/${id}`);
  };


  if (!spots || spots.length<=0) {
    return <div>No spots found</div>;
  }

  console.log(spots)

  return (
    <div>
      <h1>Spots near {decodeURIComponent(location.search.split('=')[1])}</h1>
      <div className="spots-homepage-container">
        {spots.map((spot) => (
          <div className="spot-homepage-card-container" key={spot.id} onClick={() => showSpot(spot.id)}>
            <img className="spot-image" src={spot.SpotImages[0].url} alt={`Spot ${spot.id}`} />
            <div className="spot-name-avg-rating-container">
              <h3>{spot.name}</h3>
              <h3>{spot.avgRating}</h3>
            </div>
            <div className="price">
              <h3>${spot.price}/night</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchSpotList;

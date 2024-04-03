import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "../styles/Spots.css";

export default function Spots() {
  const [spots, setSpots] = useState([]);
  const navigate = useNavigate();
  let showSpot = (id) => {
    navigate(`spots/${id}`);
  };

  useEffect(() => {
    const getSpots = async () => {
      const response = await axios.get(`http://localhost:8000/api/spots`);
      console.log(response.data.Spots);
      setSpots(response.data.Spots);
    };
    getSpots();
  }, []);

  return (
    <div>
      <div>
        <h1>Recommended Spots</h1>
      </div>

      <div className="spots-homepage-container">
        {spots.map((spot, index) => (
          <div className="spot-homepage-card-container" key={spot.id} onClick={()=> showSpot(spot.id)}>
            <img className="spot-image" src={spot.previewImage} />
            <div className="spot-name-avg-rating-container">
              <h3>{spot.name}</h3>
              <h3>
                {spot.avgRating}{" "}
                {/* <img
                  src="https://png.pngtree.com/png-vector/20190223/ourmid/pngtree-star-vector-icon-png-image_696411.jpg"
                  alt="Star"
                  style={{ width: 'auto', height: '20px', marginLeft: '5px' }}
                /> */}
              </h3>
            </div>
            <div className="price">
              <h3>${spot.price}/night</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

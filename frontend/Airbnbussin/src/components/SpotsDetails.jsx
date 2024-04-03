import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import '../styles/SpotsDetails.css'

export default function SpotsDetails() {
  let { id } = useParams();
  const [spot, setSpot] = useState([]);

  useEffect(() => {
    const getSpot = async () => {
      const response = await axios.get(`http://localhost:8000/api/spots/${id}`);
      setSpot(response.data);
    };
    getSpot();
  }, []);
  console.log(spot);

  return (
    <div className="spot-details-container">
      <div className="mini-spot-header">
        <div className="spot-name">
          <h1>{spot.name}</h1>
        </div>
        <div className="share-favorites">
          <h3>share </h3>
          <h3>add to favorites</h3>
        </div>
      </div>
    </div>
  );
}



import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/SpotsDetails.css";

export default function SpotsDetails() {
  let { id } = useParams();
  const [spot, setSpot] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSpot = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/spots/${id}`
        );
        console.log(response.data);
        setSpot(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching spot details:", error);
        setLoading(false);
      }
    };
    getSpot();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="spot-details-container">
      {spot && (
  <div>
    <div className="mini-spot-header">
      <div className="spot-name">
        <h1>{spot.name}</h1>
      </div>
      <div className="share-favorites">
        <h3>share </h3>
        <h3>add to favorites</h3>
      </div>
    </div>
    <div className="all-images-container">
      <div className="solo-preview-image">
        <img className="spot-image" src={spot.SpotImages[0].url} />
      </div>
      <div className="four-images-container">
        <div className="img1">
          <img className="spot-image" src={spot.SpotImages[0].url} />
        </div>
        <div className="img2">
          <img className="spot-image" src={spot.SpotImages[0].url} />
        </div>
        <div className="img3">
          <img className="spot-image" src={spot.SpotImages[0].url} />
        </div>
        <div className="img4">
          <img className="spot-image" src={spot.SpotImages[0].url} />
        </div>
      </div>
    </div>
    <div className="spots-details-inline">
      <div>
        <div className="spots-details-name">
          {/* Need to Change this later to brief description */}
          <h3>{spot.name}</h3>
        </div>
        <button>Show All Photos</button>
        <h4 className="spots-details-guests-bedrooms-bathrooms">
          # of guests, # of bedrooms, # of bathrooms
        </h4>
        <h4 className="spots-details-owner-name">
          Hosted by {spot.Owner.firstName} {spot.Owner.lastName}
        </h4>
        <div className="long-description">
          <h4>Long Description</h4>
          <h5>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident,
            sunt in culpa qui officia deserunt mollit anim id est laborum.
          </h5>
        </div>
      </div>
      <div className="reservation-container">
        <div className="reservation-cost">

          Total Cost: $XXX
        </div>
        <button className="reserve-button">Reserve</button>
      </div>
    </div>
  </div>
)}

    </div>
  );
}


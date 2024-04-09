import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import '../styles/ShowAllPhoto.css'

export default function ShowAllPhoto() {
  const { id } = useParams();
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
    console.log(spot);
  }, [id]);

  if (loading) {
    return <p>Loading photos...</p>;
  }

  console.log(spot.SpotImages);
  return (
    <div>
        <h1>All Photos({spot.SpotImages.length})</h1>
      <div className="all-images-container">

        {spot.SpotImages.map((image, index) => (
          <div className="single-image">
            <img className="singles-image" src={image.url} />
          </div>
        ))}
      </div>
    </div>
  );
}

import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/SpotsDetails.css";
import { Link } from "react-router-dom";

export default function SpotsDetails() {
  let { id } = useParams();
  const [spot, setSpot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState(null);
  const mapRef = useRef(null);

  const handleDeleteReview = async (reviewId) => {
    try {
      await axios.delete(`http://localhost:8000/api/reviews/${reviewId}`);
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  useEffect(() => {
    const getSpot = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/spots/${id}`
        );
        setSpot(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching spot details:", error);
        setLoading(false);
      }
    };
    getSpot();
  }, [id]);

  console.log('spot',spot)

  useEffect(() => {
    if (spot && window.google) {
      const mapOptions = {
        center: { lat: parseFloat(spot.lat), lng: parseFloat(spot.lng) },
        zoom: 14,
      };
      const map = new window.google.maps.Map(mapRef.current, mapOptions);
      new window.google.maps.Marker({
        position: { lat: parseFloat(spot.lat), lng: parseFloat(spot.lng) },
        map,
        title: spot.name,
      });
    }
  }, [spot]);

  useEffect(() => {
    const getReviews = async () => {
      const response = await axios.get(
        `http://localhost:8000/api/spots/${id}/reviews`
      );
      if (response.data.spotReview) {
        setReviews(response.data.spotReview);
        return;
      }
    };
    getReviews();
  }, [reviews]);

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
                <img className="spot-image" src={spot.SpotImages[1].url} />
              </div>
              <div className="img2">
                <img className="spot-image" src={spot.SpotImages[2].url} />
              </div>
              <div className="img3">
                <img className="spot-image" src={spot.SpotImages[3].url} />
              </div>
              <div className="img4">
                <img className="spot-image" src={spot.SpotImages[4].url} />
              </div>
            </div>
          </div>
          <div className="spots-details-inline">
            <div>
              <div className="spots-details-name"></div>
              <div className="show-all-photos-container">
                <button className="show-all-photos">
                  <Link to={`/show-all-photos/${id}`}>Show All Photos</Link>
                </button>
              </div>
              {/* <h4 className="spots-details-guests-bedrooms-bathrooms">
                # of guests, # of bedrooms, # of bathrooms
              </h4> */}
              <h4 className="spots-details-owner-name">
                Hosted by {spot.Owner.firstName} {spot.Owner.lastName}
              </h4>
              <div className="long-description">
                <h4>Long Description: </h4>
                <h5>{spot.description}</h5>
              </div>
            </div>
            <div className="reservation-container">
              <div className="reservation-cost">Cost per night: ${spot.price}</div>
              <div>Total Nights: 5</div>
              <div>Tax: ${.8*spot.price*5}</div>
              <div>Total: ${(.8*spot.price*5)+spot.price*5}</div>
              <button className="reserve-button">Reserve</button>
            </div>
          </div>

          <div className="reviews-container">
            {reviews ? (
              <div>
                <h2>Reviews({reviews.length})</h2>

                {reviews.map((review, index) => {


                  return (
                    <div key={index} className="review">
                      <h2>
                        {review.User.firstName} {review.User.lastName}{" "}
                        {review.stars}/5
                      </h2>
                      <p>-{review.review}</p>
                      <div className="update-delete-container">
                        <button onClick={() => handleDeleteReview(review.id)}>
                          Delete Review
                        </button>
                        <button className="update-a-review">
                          <Link
                            to={`/update-review/${review.id}`}
                            state={{
                              userId: review.User.id,
                              review: review.review,
                              stars: review.stars,
                              spotId: review.spotId
                            }}
                          >
                            Update This Review
                          </Link>
                        </button>
                      </div>
                    </div>
                  );
                })}
                {/* <div>

            </div> */}
              </div>
            ) : (
              <h3>No reviews for this spot</h3>
            )}
            <div className="write-review-container">
              <button className="write-a-review">
                <Link to={`/create-review/${id}`}>Write a Review</Link>
              </button>
            </div>
          </div>

          <div>
            <div>
              <div
                className="google-map"
                ref={mapRef}
                style={{ width: "100%", height: "400px" }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

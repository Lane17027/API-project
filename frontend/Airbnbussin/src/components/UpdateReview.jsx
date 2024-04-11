import { useState } from 'react';
import axios from 'axios';
import { useParams, useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";



const UpdateReview = () => {
  const { id } = useParams();
  const location = useLocation();
  const { userId, review, stars, spotId } = location.state || {};
  const navigate = useNavigate();

  console.log(spotId)
  const [formData, setFormData] = useState({
    userId: userId || '',
    review: review || '',
    stars: stars || 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8000/api/reviews/${id}`, formData);
      console.log('Review updated:', response.data);
      navigate(`/spots/${spotId}`)
    } catch (error) {
      console.error('Error updating review:', error);
    }
  };

  return (
    <div className="create-review-container">
      <h2>Update Review</h2>
      <form onSubmit={handleSubmit}>
        {/* Input field for userId */}
        <div className="input-container">
          <label htmlFor="userId">User ID:</label>
          <input
            type="number"
            id="userId"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            required
          />
        </div>
        {/* Input field for review */}
        <div className="input-container">
          <label htmlFor="review">Review:</label>
          <textarea
            id="review"
            name="review"
            value={formData.review}
            onChange={handleChange}
            required
          />
        </div>
        {/* Input field for stars */}
        <div className="input-container">
          <label htmlFor="stars">Stars:</label>
          <input
            type="number"
            id="stars"
            name="stars"
            value={formData.stars}
            onChange={handleChange}
            min={1}
            max={5}
            required
          />
        </div>
        <button type="submit">Update Review</button>
      </form>
    </div>
  );
};

export default UpdateReview;

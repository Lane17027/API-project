import { useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import '../styles/CreateReview.css'

const CreateReview = () => {
  let { id } = useParams();

  const [formData, setFormData] = useState({
    userId: '',
    review: '',
    stars: 1
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const reviewData = { ...formData};
        reviewData.userId=parseInt(formData.userId)

      const response = await axios.post( `http://localhost:8000/api/spots/${id}/reviews`, reviewData);
      console.log('Review created:', response.data);
      setFormData({
        userId: '',
        review: '',
        stars: 1
      });
    } catch (error) {
      console.error('Error creating review:', error);
    }
  };

  return (
    <div className="create-review-container">
  <h2>Create a Review</h2>
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
    <button type="submit">Submit Review</button>
  </form>
</div>
  )
};

export default CreateReview;

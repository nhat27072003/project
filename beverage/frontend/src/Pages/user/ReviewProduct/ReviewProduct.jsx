import React, { useContext, useState } from 'react';
import './ReviewProduct.css';
import { createReview } from '../../../services/userReview';
import { UserContext } from '../../../Context/UserContext';

const ReviewProduct = ({ product, orderId, closeModal }) => {
  const [rating, setRating] = useState(5); // Default rating
  const [review, setReview] = useState('');
  const { user } = useContext(UserContext);
  const handleReview = async (event) => {
    event.preventDefault(); // Prevent default form submission

    const values = {
      rating: rating,
      review: review,
      userId: user.userId,
      productId: product.productID,
      orderId: orderId
    };

    try {
      const result = await createReview(values);

      if (result.EC === 0) {
        alert("Đánh giá sản phẩm thành công");
        closeModal();
        // Optionally reset form fields after successful submission
        setRating(5);
        setReview('');
      } else {
        // Handle error cases if needed
        console.error('Failed to submit review:', result.message);
        alert("Đánh giá sản phẩm thất bại");
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert("Đánh giá sản phẩm thất bại");
    }
  };

  return (
    <div className='review-page'>
      <div className="review-container">
        <h3>Submit Your Review: {product.name}</h3>
        <form className="review-form" onSubmit={handleReview}>
          <div className="form-group">
            <label htmlFor="rating">Rating:</label>
            <select
              id="rating"
              name="rating"
              value={rating}
              onChange={(e) => setRating(parseInt(e.target.value))}
              required
            >
              <option value="5">★★★★★</option>
              <option value="4">★★★★☆</option>
              <option value="3">★★★☆☆</option>
              <option value="2">★★☆☆☆</option>
              <option value="1">★☆☆☆☆</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="review">Your Review:</label>
            <textarea
              id="review"
              name="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows="5"
              required
            ></textarea>
          </div>
          <button type="submit">Submit Review</button>
        </form>
      </div>
    </div>
  );
};

export default ReviewProduct;

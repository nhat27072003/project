import React from 'react'
import './StarRating.css'


const StarRating = (rating) => {
  let percentage = (parseFloat(rating.rating) / 5) * 100;
  if (isNaN(percentage)) {
    percentage = 0;
  }
  return (
    <div className="star-rating">
      <div className="star-rating-top" style={{ width: `${percentage}%` }}>
        <span>★★★★★</span>
      </div>
      <div className="star-rating-bottom">
        <span>★★★★★</span>
      </div>
    </div>
  );
}

export default StarRating
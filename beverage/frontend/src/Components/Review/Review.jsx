import React from 'react';
import './Review.css';

// Component nhỏ để hiển thị từng đánh giá
const ReviewItem = ({ review }) => {
  return (
    <div className="review">
      <h5>{review.name}</h5>
      <p>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</p>
      <p>{review.review}</p>
      <button>Like</button>
      <button>Dislike</button>
      <button>Report</button>
    </div>
  );
};

// Component chính để hiển thị danh sách các đánh giá và tính toán thống kê
const Review = ({ reviews, values }) => {
  // Khởi tạo đối tượng đếm số sao


  return (
    <section className="customer-ratings">
      <div className="ratings-overview">
        <h3>Customer Ratings</h3>
        <div className="rating">
          {!isNaN(values.averageRating) &&
            <h4>{values.averageRating} / 5</h4>}
          <p>{values.totalRatings} ratings</p>
        </div>
        <div className="rating-breakdown">
          <div>★★★★★ {values.ratingCounts[5]}</div>
          <div>★★★★☆ {values.ratingCounts[4]}</div>
          <div>★★★☆☆ {values.ratingCounts[3]}</div>
          <div>★★☆☆☆ {values.ratingCounts[2]}</div>
          <div>★☆☆☆☆ {values.ratingCounts[1]}</div>
        </div>
      </div>
      <div className="customer-reviews">
        {reviews.map((review, index) => (
          <ReviewItem key={index} review={review} />
        ))}
      </div>
    </section>
  );
};

export default Review;

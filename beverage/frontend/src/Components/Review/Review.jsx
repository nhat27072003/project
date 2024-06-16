import React from 'react'
import './Review.css'


const Review = () => {
  return (
    <section class="customer-ratings">
      <div class="ratings-overview">
        <h3>Customer Ratings</h3>
        <div class="rating">
          <h4>4.8 / 5</h4>
          <p>483 ratings</p>
        </div>
        <div class="rating-breakdown">
          <div>★★★★★ 410</div>
          <div>★★★★☆ 40</div>
          <div>★★★☆☆ 23</div>
          <div>★★☆☆☆ 6</div>
          <div>★☆☆☆☆ 4</div>
        </div>
      </div>
      <div class="customer-reviews">
        <div class="review">
          <h5>Milk Tea Lover</h5>
          <p>★★★★★ Refreshing</p>
          <p>Discover the essence of Milk Tea with our premium selection...</p>
          <button>Like (2)</button>
          <button>Dislike (0)</button>
          <button>Report</button>
        </div>
        <div class="review">
          <h5>Coffee Enthusiast</h5>
          <p>★★★★★ Energizing</p>
          <p>Awaken your senses with the perfect cup of Coffee from BeverageHub...</p>
          <button>Like (1)</button>
          <button>Dislike (3)</button>
          <button>Report</button>
        </div>
        <div class="review">
          <h5>Thirst Quencher</h5>
          <p>★★★★★ Revitalizing</p>
          <p>Find your perfect thirst-quenching companion at BeverageHub with our selection of Soft Drinks...</p>
          <button>Like (0)</button>
          <button>Dislike (0)</button>
          <button>Report</button>
        </div>
      </div>
    </section>
  )
}

export default Review
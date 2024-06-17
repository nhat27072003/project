import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Breadcrum from '../Components/Breadcums/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';
import { getDetailProduct } from '../services/manageProduct';
import Review from '../Components/Review/Review';
import { getReview } from '../services/userReview';

const Product = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { productId } = useParams();
  const [review, setReview] = useState([]);

  const fetchReview = async () => {
    const result = await getReview(productId);
    if (result.EC === 0) {
      setReview(result.DT);
      console.log("check review product :", review);
    }
  }
  useEffect(() => {
    fetchReview();
  }, [productId]);
  useEffect(() => {
    const fetchProduct = async () => {
      const response = await getDetailProduct(productId);
      if (response.EC === 0) {
        setProduct(response.DT);
        setLoading(false);
      }
      else {
        setError('Error fetching product data');
        setLoading(false);
      }
    }
    fetchProduct();
  }, [productId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!product) {
    return <p>Product not found</p>;
  }

  const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  let totalRatings = 0;
  let sumRatings = 0;

  // Lặp qua các đánh giá để đếm số sao và tính tổng điểm
  review.forEach((review) => {
    ratingCounts[review.rating]++;
    totalRatings++;
    sumRatings += review.rating;
  });
  const averageRating = (sumRatings / totalRatings).toFixed(1);
  const values = {
    totalRatings: totalRatings,
    averageRating: averageRating,
    ratingCounts: ratingCounts
  }

  // Tính điểm trung bình

  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={product} reviews={review} values={values} />
      <RelatedProducts product={product} />
      <Review productId={product.productID} reviews={review} values={values} />
    </div>
  )
}

export default Product
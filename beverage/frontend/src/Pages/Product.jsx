import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Breadcrum from '../Components/Breadcums/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';
import axios from 'axios';

const Product = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { productId } = useParams();
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Gọi API để lấy dữ liệu sản phẩm từ backend
        const response = await axios.get(`http://localhost:8081/product/${productId}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product data:', error);
        setError('Error fetching product data');
        setLoading(false);
      }
    };

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
  console.log(product);
  //const {all_product} = useContext(ShopContext);

  //const product = products.find((e)=> e.productID === Number(productId));

  return (
    <div>
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <RelatedProducts product={product} />
    </div>
  )
}

export default Product
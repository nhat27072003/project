import React, { useContext, useEffect, useState } from 'react'
import './RelatedProducts.css'
import Item from '../Item/Item'
import { ShopContext } from '../../Context/ShopContext'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
const RelatedProducts = (props) => {
  const { product } = props;
  const { products, getProducts } = useContext(ShopContext);
  const productID = useParams();
  const [relatedProducts, setRelatedProducts] = useState([]);

  const setRelate = () => {
    setRelatedProducts(products.filter(item => item.category === product.category && item.productID !== Number(productID.productId)).slice(0, 7));
  }
  useEffect(() => {
    setRelate();
  }, []);
  const navigate = useNavigate();

  return (
    // <div className='relatedproducts'>
    //   <h1>Related Products</h1>
    //   <hr />
    //   <div className="relatedproducts-item">
    //     {relatedProducts.map((item, i) => {
    //       return <Item key={i} id={item.productID} name={item.name} image={item.imageUrl} price={item.price} stock={item.stock} />
    //     })}
    //   </div>
    // </div>

    <section class="featured-beverages">
      <h3>Featured Beverages</h3>
      <div class="beverage-list">
        {relatedProducts.map((item, i) => {
          return (
            <div class="beverage-item" onClick={() => { navigate(`/product/${item.productID}`); window.scrollTo(0, 0); setRelate(); }} style={{ '--item-index': i }}>
              <img src={item.imageUrl} alt="The Perfect Brew" />
              <p>{item.name}</p>
              <p>{ }</p>
              <p>$ {item.price}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default RelatedProducts
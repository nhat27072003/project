import React, { useContext, useEffect, useState } from 'react'
import './RelatedProducts.css'
import Item from '../Item/Item'
import axios from 'axios'
import { ShopContext } from '../../Context/ShopContext'
import { useParams } from 'react-router-dom'
const RelatedProducts = (props) => {
  const { product } = props;
  const { products, getProducts } = useContext(ShopContext);
  const productID = useParams();
  useEffect(() => {

  }, [products]);

  const relatedProducts = products.filter(item => item.category === product.category && item.productID !== Number(productID.productId)).slice(0, 5);
  console.log(products);
  console.log(productID);
  return (
    <div className='relatedproducts'>
      <h1>Related Products</h1>
      <hr />
      <div className="relatedproducts-item">
        {relatedProducts.map((item, i) => {
          return <Item key={i} id={item.productID} name={item.name} image={item.imageUrl} price={item.price} stock={item.stock} />
        })}
      </div>
    </div>
  )
}

export default RelatedProducts
import React, { useContext, useEffect, useState } from 'react'
import './Popular.css'
import Item from '../Item/Item'
import { ShopContext } from '../../Context/ShopContext'
const Popular = () => {
  const {products, getProducts,popular,getPopular} = useContext(ShopContext);
  useEffect(()=>{
    getPopular();
  },[])
  console.log(popular);
  return (
    <div className='popular'>
        <h1>Bán chạy nhất</h1>
        <hr/>
        <div className="popular-item">
            {popular.map((item,i)=>{
                return <Item key={i} id={item.productID} name={item.name} image={item.imageUrl} price={item.price} stock={item.stock} category={item.category}/>
            })}
        </div>
    </div>
  )
}

export default Popular
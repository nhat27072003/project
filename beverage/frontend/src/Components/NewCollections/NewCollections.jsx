import React, { useContext, useEffect, useState } from 'react'
import './NewCollections.css'
import Item from '../Item/Item'
import { ShopContext } from '../../Context/ShopContext'
const NewCollections = () => {
  const {getProducts, products} = useContext(ShopContext);
  useEffect(() => {
    getProducts();
  }, []);
  const lastSixProducts = products.slice(-10);
  console.log(products);

  return (
    <div className='new-collections' id='newscroll'>
        <h1>Sản phẩm mới</h1>
        <hr/>
        <div className="collections">
            {lastSixProducts.reverse().map((item,i)=>{
                return <Item key={i} id={item.productID} name={item.name} image={item.imageUrl} price={item.price} stock={item.stock}/>
            })}
        </div>
    </div>
  )
}

export default NewCollections
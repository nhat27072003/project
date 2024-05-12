import React, { useContext } from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { ShopContext } from '../../Context/ShopContext'
import { AuthContext } from '../../Pages/AuthProvider'
import { useParams } from 'react-router-dom'

const ProductDisplay = (props) => {
  const {userData} = useContext(AuthContext);
  const productID = useParams().productId;
  const {product} = props;
  const {addToCart, getTotalCartItems,updateTotal} = useContext(ShopContext);
  console.log(product);
  console.log(userData);
  console.log(productID);
  const handleCart = async ()=>{
    if(userData === '')
      alert("Bạn chưa đăng nhập!");
    else if(userData === 'admin')
      alert("bạn là admin không thể đặt hàng");
    else {
      await addToCart(productID);
      await getTotalCartItems();
    }

  }
  return (
    <div className='productdisplay'>
        <div className="productdisplay-left">
                <img src={product.imageURL} alt=""/>
        </div>
        <div className="productdisplay-right">
          <div className="frame-display">
          <h1>{product.name}</h1>
          <div className="productdisplay-right-star">
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_icon} alt="" />
            <img src={star_dull_icon} alt="" />
            <p>(20)</p>
          </div>
          <div className="productdisplay-right-price">
            <div className="stock">
              {product.stock} có sẵn
            </div>
            <div className="price">
              {product.price} .000 vnđ
            </div>
          </div>
          <div className="productdisplay-right-size">
            <h1>Select Size</h1>
            <div className="size">
            <select>
              <option value=''>Chọn size</option>
              <option value='S'>S</option>
              <option value='M'>M</option>
              <option value='L'>L</option>
            </select>
            </div>
          </div>
          <button onClick={()=>{handleCart()}}>Add to cart</button>
          </div>

        </div>
    </div>
  )
}

export default ProductDisplay
import React, { useContext } from 'react'
import './ProductDisplay.css'
import star_icon from '../Assets/star_icon.png'
import star_dull_icon from '../Assets/star_dull_icon.png'
import { ShopContext } from '../../Context/ShopContext'
import { useParams } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import { addItemCart } from '../../services/userCart'

const ProductDisplay = (props) => {
  const { user } = useContext(UserContext);
  const productID = useParams().productId;
  const { product } = props;
  const { getTotalCartItems, updateTotal } = useContext(UserContext);

  const addToCart = async (props) => {
    const values = {
      userData: user.username,
      productID: props
    };
    await addItemCart(values);
  }

  const handleCart = async () => {
    if (user.username === '')
      alert("Bạn chưa đăng nhập!");
    else {
      await addToCart(productID);
      await getTotalCartItems();
    }

  }
  return (
    <div className='productdisplay'>
      <div className="productdisplay-left">
        <img src={product.imageURL} alt="" />
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
          <button onClick={() => { handleCart() }}>Add to cart</button>
        </div>
      </div>
    </div>
  )
}

export default ProductDisplay
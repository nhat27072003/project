import React, { useContext } from 'react'
import './ProductDisplay.css'
import { useParams } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import { addItemCart } from '../../services/userCart'

const ProductDisplay = (props) => {
  const { user, addToCart } = useContext(UserContext);
  const productID = useParams().productId;
  const { product } = props;
  const { getTotalCartItems } = useContext(UserContext);



  const handleCart = async () => {
    if (user.username === '')
      alert("Bạn chưa đăng nhập!");
    else {
      await addToCart(productID);
      await getTotalCartItems();
    }

  }
  return (
    <section class="product-details">
      <div class="product-info">
        <img src={product.imageUrl} alt="Milk Tea Delight" />
        <div class="details">
          <h2>{product.name}</h2>
          <p>By { }</p>
          <div class="rating">
            <span>★★★★★</span>
            <p>789 reviews</p>
          </div>
          <p>Published by: { }</p>
          <p>Volume: 500ml</p>
          <p>{product.description}</p>
          <div class="actions">
            <p>Price: ${product.price}</p>
            <button onClick={() => { handleCart() }}><i class='bx bx-cart-add'></i>Add to cart</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDisplay
import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../../Context/ShopContext'
import './CartItems.css'
import remove_icon from '../Assets/cart_cross_icon.png'
import axios from 'axios'
import { AuthContext } from '../../Pages/AuthProvider'
import { Link } from 'react-router-dom'
import { delItemCart } from '../../services/userCart'
import { createOrder } from '../../services/userOrder'

const CartItems = () => {
    const { getCart, cartItems, removeFromCart, getPopular, getTotalCartItems } = useContext(ShopContext);
    const [total_sum, setTotal_sum] = useState(0);
    const [cart, setCart] = useState([]);
    const { userData } = useContext(AuthContext);
    const [address, setAddress] = useState('');

    console.log(cartItems);

    const handleInput = (event) => {
        setAddress(event.target.value);
    }
    useEffect(() => {
        // Tính tổng giá trị từ cartItems và cập nhật total_sum
        const newTotalSum = cartItems.reduce((sum, item) => sum + item.sum, 0);
        setTotal_sum(newTotalSum);
    }, [cartItems]); // Theo dõi sự thay đổi của cartItems

    useEffect(() => {
        getCart();
    }, []);
    const handleDelete = async (productId) => {
        console.log({ username: userData, id: productId });
        const result = await delItemCart({ username: userData, id: productId });
        if (result.EC === 0) {
            getCart();
            getTotalCartItems();
        }
    }
    const handleCreateOrder = async (sum) => {
        if (cartItems.length <= 0)
            alert("Không có sản phẩm nào trong giỏ hàng");
        else {
            const values = { username: userData, total: sum, products: cartItems, address: address };
            const response = await createOrder(values);
            if (response.EC === 0) {
                alert("Đặt hàng thành công");
                // Xử lý đồng bộ: Gọi getCart và sau đó gọi getPopular
                await getCart();
                await getPopular();
                await getTotalCartItems();
            } else {
                alert("Đặt hàng thất bại");
            }
        }
    }


    return (
        <div className='cartitems'>
            <div className="cartitems-format-main">
                <p>Sản phẩm</p>
                <p>Tên</p>
                <p>Đơn giá</p>
                <p>Số lượng</p>
                <p>Tổng</p>
                <p>Xóa</p>
            </div>
            <hr />
            {cartItems.map((e) => {
                return <div>
                    <div className="cartitems-format cartitems-format-main">
                        <Link to={`/product/${e.productID}`}>
                            <img src={e.imageUrl} className='carticon-product-icon' alt="" />
                        </Link>
                        <Link to={`/product/${e.productID}`} style={{ textDecoration: 'none', color: '#454545' }}><p>{e.name}</p></Link>
                        <p>{e.price} .000nvđ</p>
                        <p>{e.quantity}</p>
                        <p>{e.sum} .000vnđ</p>
                        <img className='cartitems-remove-icon' src={remove_icon} onClick={async () => { handleDelete(e.productID); }} alt="" />
                    </div>
                </div>

                //return null;
            })}
            <div className="cartitems-down">
                <div className="cartitems-total">
                    <h1>Đơn hàng</h1>
                    <div>
                        <div className="cartitems-total-item">
                            <p>Giá trị</p>
                            <p>{total_sum} .000vnđ</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Địa chỉ</p>
                            <input type='text' onChange={handleInput} nam='address' placeholder='Nhập địa chỉ' />
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Phí ship</p>
                            <p>Miễn phí</p>
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <h3>Tổng</h3>
                            <h3>{total_sum} .000vnđ</h3>
                        </div>
                        <button onClick={() => handleCreateOrder(total_sum)}>Đặt hàng</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItems
import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import './CartItems.css';
import { Link } from 'react-router-dom';
import { createOrder } from '../../services/userOrder';
import { UserContext } from '../../Context/UserContext';

const CartItems = () => {
    const { getPopular } = useContext(ShopContext);
    const { getCart, cartItems, handleDelete, addToCart, getTotalCartItems } = useContext(UserContext);
    const [total_sum, setTotal_sum] = useState(0);
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const { user } = useContext(UserContext);

    // Handle input changes for address and phone
    const handleInput = (event) => {
        const { name, value } = event.target;
        if (name === 'address') {
            setAddress(value);
        } else if (name === 'phone') {
            setPhone(value);
        }
    }

    useEffect(() => {
        // Calculate total sum from cartItems and update total_sum
        const newTotalSum = cartItems.reduce((sum, item) => sum + item.sum, 0);
        setTotal_sum(newTotalSum);
    }, [cartItems]);

    useEffect(() => {
        getCart();
    }, []);

    const handleCreateOrder = async () => {
        if (cartItems.length <= 0) {
            alert("Không có sản phẩm nào trong giỏ hàng");
            return;
        }

        // Group cart items by store
        const groupedItems = cartItems.reduce((acc, item) => {
            if (!acc[item.storeId]) {
                acc[item.storeId] = [];
            }
            acc[item.storeId].push(item);
            return acc;
        }, {});

        let success = true;

        // Create an order for each store
        for (const store in groupedItems) {
            const storeItems = groupedItems[store];
            const storeTotal = storeItems.reduce((sum, item) => sum + item.sum, 0);
            const values = { username: user.username, total: storeTotal, products: storeItems, address: address, phone: phone, storeId: store };
            const response = await createOrder(values);
            if (response.EC !== 0) {
                success = false;
                alert(`Đặt hàng thất bại`);
            }
        }

        if (success) {
            alert("Đặt hàng thành công");
            // Synchronous handling: Call getCart and then getPopular
            await getCart();
            await getPopular();
            await getTotalCartItems();
        }
    };

    // Group cart items by store for rendering
    const groupedItems = cartItems.reduce((acc, item) => {
        if (!acc[item.store_name]) {
            acc[item.store_name] = [];
        }
        acc[item.store_name].push(item);
        return acc;
    }, {});

    console.log('check items: ', cartItems);

    return (
        <div className='cartitems'>
            <div className="cartitems-format-main">
                <p>Cửa hàng</p>
                <p>Sản phẩm</p>
                <p>Tên</p>
                <p>Đơn giá</p>
                <p>Số lượng</p>
                <p>Tổng</p>
            </div>
            <hr />
            {Object.keys(groupedItems).map((store) => (
                <div key={store} className='store-item'>
                    <h3>{store}</h3>
                    {groupedItems[store].map((e) => (
                        <div key={e.productID} className="cartitems-format cartitems-format-main">
                            <p> </p>
                            <Link to={`/product/${e.productID}`}>
                                <img src={e.imageUrl} className='carticon-product-icon' alt="" />
                            </Link>
                            <Link to={`/product/${e.productID}`} style={{ textDecoration: 'none', color: '#454545' }}>
                                <p>{e.product_name}</p>
                            </Link>
                            <p>{e.price} .000vnđ</p>
                            <div className='change-quantity'>
                                <i className='bx bx-plus' onClick={() => addToCart(e.productID)}></i>
                                <p>{e.quantity}</p>
                                <i className='bx bx-minus' onClick={() => handleDelete(e.productID)}></i>
                            </div>
                            <p>{e.sum} .000vnđ</p>
                        </div>
                    ))}
                </div>
            ))}
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
                            <input type='text' onChange={handleInput} name='address' placeholder='Nhập địa chỉ' value={address} />
                        </div>
                        <hr />
                        <div className="cartitems-total-item">
                            <p>Số điện thoại</p>
                            <input type='text' onChange={handleInput} name='phone' placeholder='Nhập số điện thoại' value={phone} />
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
                        <button onClick={handleCreateOrder}>Đặt hàng</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItems;

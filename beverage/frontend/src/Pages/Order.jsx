// OrderList.js
import React, { useContext, useEffect, useState } from 'react';
import './CSS/Order.css'; // Import file CSS để tùy chỉnh giao diện
import { Link } from 'react-router-dom';
import { putOrder } from '../services/userOrder';
import { UserContext } from '../Context/UserContext';
import { confirmOrder } from '../services/manageOrder';

const OrderList = () => {
  const { orders, getOrders, user } = useContext(UserContext);

  // Tạo state để lưu trữ groupedOrdersArray
  const [groupedOrdersArray, setGroupedOrdersArray] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(1);
  const status = ['', 'Chờ xác nhận', 'Đã xác nhận', 'Đang giao', 'Đã giao'];
  useEffect(() => {

    getOrders();
  }, []);
  console.log(selectedStatus)
  function convertDateTimeToString(jsDate) {
    // Lấy các thành phần của ngày giờ
    const year = jsDate.getFullYear();
    const month = jsDate.getMonth() + 1; // Tháng bắt đầu từ 0
    const day = jsDate.getDate();
    const hours = jsDate.getHours();
    const minutes = jsDate.getMinutes();
    const seconds = jsDate.getSeconds();

    // Tạo chuỗi theo định dạng mong muốn, ví dụ: "YYYY-MM-DD HH:mm:ss"
    const formattedString = `${year}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day} ${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

    return formattedString;
  }
  useEffect(() => {
    // Tạo một đối tượng để nhóm đơn hàng theo orderID
    const groupedOrders = orders.reduce((result, order) => {
      const orderID = order.orderID;

      if (!result[orderID]) {
        result[orderID] = {
          orderID: orderID,
          status: order.status,
          sum: order.sum,
          orderDate: new Date(order.orderDate).toISOString(),
          products: [],
          address: order.address,
          phone: order.phone
        };
      }

      // Thêm thông tin sản phẩm vào mảng products của đơn hàng
      result[orderID].products.push({
        oderProductID: order.oderProductID,
        quantity: order.quantity,
        priceProduct: order.priceProduct,
        productID: order.productID,
        name: order.name,
        price: order.price,
        stock: order.stock,
        category: order.category,
        imageUrl: order.imageUrl,
      });

      return result;
    }, {});

    // Chuyển đối tượng thành mảng và cập nhật state
    setGroupedOrdersArray(Object.values(groupedOrders));
  }, [orders]); // Thay đổi chỉ khi orders thay đổi

  const handleStatus = async (orderID) => {
    const result = await putOrder(orderID);
    if (result.EC === 0)
      await getOrders();
  }

  const filterOrdersByStatus = (status) => {
    return groupedOrdersArray.filter((order) => order.status === status);
  };

  const handleTabClick = (status) => {
    setSelectedStatus(status);
  };
  const handleConfirm = async (orderID, status) => {
    const result = await confirmOrder(orderID, status);
    if (result.EC === 0) {
      getOrders();
    }
  }
  console.log('check order:', orders);
  return (
    <div className="user-order-list-container">
      <h2>Đơn hàng của bạn</h2>
      <div className="order">
        <div className="order-main">
          <button onClick={() => handleTabClick(1)} style={{ background: selectedStatus === 1 ? '#c7c7c7' : '' }}>{status[1]}</button>
          <button onClick={() => handleTabClick(2)} style={{ background: selectedStatus === 2 ? '#c7c7c7' : '' }}>{status[2]}</button>
          <button onClick={() => handleTabClick(3)} style={{ background: selectedStatus === 3 ? '#c7c7c7' : '' }}>{status[3]}</button>
          <button onClick={() => handleTabClick(4)} style={{ background: selectedStatus === 4 ? '#c7c7c7' : '' }}>{status[4]}</button>
        </div>
        <ul className="order-list">
          {filterOrdersByStatus(selectedStatus).map((order) => (
            <li key={order.orderID} className="order-items">
              <div className="left">
                <p className="order-info">Mã đơn hàng #{order.orderID}</p>
                <p className="order-info">Ngày đặt hàng: {order.orderDate}</p>
                <p className='order-info'>Địa chỉ: {order.address}</p>
                <p className='order-info'>Số điện thoại: {order.phone}</p>
                <p className="order-info">Tổng đơn hàng: <span>{order.sum} .000vnđ</span></p>
                <p className='order-info'>Trạng thái: <span>{status[order.status]}</span></p>
                {order.status === 3 &&
                  (
                    <button onClick={() => { handleConfirm(order.orderID, 4) }}>Đã nhận</button>
                  )}
              </div>
              <table className="right">
                {order.products.map((product) => (
                  <div className="list">
                    <tr className='list-product' key={product.productID}>
                      <td><Link to={`/product/${product.productID}`}>
                        <img src={product.imageUrl} className='carticon-product-icon' alt="" /></Link>
                      </td>
                      <td className='name'> <Link to={`/product/${product.productID}`} style={{ textDecoration: 'none', color: '#454545' }}>
                        <p>{product.name}</p>
                      </Link>
                      </td>
                      <td className='price'>Đơn giá: {product.priceProduct} .000nvđ</td>
                      <td className='quantity'>Số lượng: {product.quantity}</td>
                    </tr>
                    <hr />
                  </div>
                ))}
              </table>
            </li>
          ))}

        </ul>
      </div>
    </div>
  );
};

export default OrderList;

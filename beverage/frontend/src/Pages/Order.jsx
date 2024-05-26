// OrderList.js
import React, { useContext, useEffect, useState } from 'react';
import './CSS/Order.css'; // Import file CSS để tùy chỉnh giao diện
import { AuthContext } from './AuthProvider';
import { Link } from 'react-router-dom';
import { ShopContext } from '../Context/ShopContext';
import { putOrder } from '../services/userOrder';

const OrderList = ({ username }) => {
  const { orders, getOrders } = useContext(ShopContext);
  const { userData } = useContext(AuthContext);

  // Tạo state để lưu trữ groupedOrdersArray
  const [groupedOrdersArray, setGroupedOrdersArray] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(false);

  useEffect(() => {
    // Gọi API để lấy danh sách đơn hàng từ server
    getOrders();
  }, []); // Thay đổi chỉ khi getOrders thay đổi

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

  return (
    <div className="order-list-container">
      <h2>Danh sách đơn hàng của {userData}</h2>
      <div className="order">
        <div className="order-main">
          <button onClick={() => handleTabClick(false)} style={{ background: selectedStatus === false ? 'white' : '', border: selectedStatus === false ? '' : 'none' }}>Chưa hoàn thành</button>
          <button onClick={() => handleTabClick(true)} style={{ background: selectedStatus === true ? 'white' : '', border: selectedStatus === true ? '' : 'none' }}>Đã hoàn thành</button>
        </div>
        <ul className="order-list">
          {filterOrdersByStatus(selectedStatus).map((order) => (
            <li key={order.orderID} className="order-items">
              <div className="left">
                <p className="order-info">Mã đơn hàng #{order.orderID}</p>
                <p className="order-info">Ngày đặt hàng: {order.orderDate}</p>
                <p className="order-info">Tổng giá trị: <span>{order.sum} .000vnđ</span></p>
                <p className='order-info'>Địa chỉ: {order.address}</p>
                <p className='order-info'>Trạng thái:{order.status == false ? <span>Chưa hoàn thành</span> : <span>Đã hoàn thành</span>} </p>
                {order.status == false ? <button onClick={() => handleStatus(order.orderID)}>Đã nhận</button> : <></>}
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

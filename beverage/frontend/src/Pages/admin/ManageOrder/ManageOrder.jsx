// ManageOrder.js
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './ManageOrder.css'; // Import file CSS để tùy chỉnh giao diện
import { Link } from 'react-router-dom';
import search_icon from '../../../Components/Assets/search-icon.png'
import { AuthContext } from '../../AuthProvider';
import { getOrders } from '../../../services/manageOrder';

const ManageOrder = ({ username }) => {
  const { userData } = useContext(AuthContext);
  const [searchTerm, setSearchTerm] = useState("");
  // Tạo state để lưu trữ groupedOrdersArray
  const [groupedOrdersArray, setGroupedOrdersArray] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(false);
  const [orders, setOrders] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    // Gọi API để lấy danh sách tất cả đơn hàng từ server (không cần phải truyền username)
    const fetchOrders = async () => {
      const data = await getOrders();
      setOrders(data);
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    // Tạo một đối tượng để nhóm đơn hàng theo orderID
    const groupedOrders = orders.reduce((result, order) => {
      const orderID = order.orderID;

      if (!result[orderID]) {
        result[orderID] = {
          orderID: orderID,
          status: order.status,
          sum: order.sum,
          orderDate: new Date(order.orderDate).toLocaleString(),
          username: order.username,
          products: [],
          address: order.address
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

  const filterOrdersByStatus = (status) => {
    return groupedOrdersArray.filter((order) => order.status === status);
  };

  const handleTabClick = (status) => {
    setSelectedStatus(status);
    console.log(groupedOrdersArray);
  };
  const handleSearch = () => {
    const filtered = filterOrdersByStatus(selectedStatus).filter(item => {
      return (
        (item.username.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    });
    setFilteredProducts(filtered);
  };
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredProducts(filterOrdersByStatus(selectedStatus));
    }
  }, [searchTerm, orders]);
  useEffect(() => {
    handleSearch();
  }, [selectedStatus]);
  useEffect(() => {
    setFilteredProducts(filterOrdersByStatus(selectedStatus));
  }, [groupedOrdersArray]);

  return (
    <div className="order-list-container">
      <div className="head">
        <h2>Danh sách đơn hàng</h2>
        <div className="shopcategory-search">
          <label><img src={search_icon} alt="" /></label>
          <input
            type="text"
            placeholder=' Nhập username'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
      </div>
      <div className="order">
        <div className="order-main">
          <button onClick={() => handleTabClick(false)} style={{ background: selectedStatus === false ? 'white' : '', border: selectedStatus === false ? '' : 'none' }}>Chưa hoàn thành</button>
          <button onClick={() => handleTabClick(true)} style={{ background: selectedStatus === true ? 'white' : '', border: selectedStatus === true ? '' : 'none' }}>Đã hoàn thành</button>
        </div>
        <ul className="order-list">
          {filteredProducts.map((order) => (
            <li key={order.orderID} className="order-items">
              <div className="left">
                <p className="order-info">Mã đơn hàng #{order.orderID}</p>
                <p className="order-info">Người đặt hàng: {order.username}</p>
                <p className="order-info">Ngày đặt hàng: {order.orderDate}</p>
                <p className="order-info">Tổng giá trị: <span>{order.sum} .000vnđ</span></p>
                <p className='order-info'>Địa chỉ: {order.address}</p>
                <p className='order-info'>Trạng thái:{order.status == false ? <span>Chưa hoàn thành</span> : <span>Đã hoàn thành</span>} </p>
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
export default ManageOrder;

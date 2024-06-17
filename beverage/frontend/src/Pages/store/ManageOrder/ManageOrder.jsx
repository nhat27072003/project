// ManageOrder.js
import React, { useContext, useEffect, useId, useState } from 'react';
import './ManageOrder.css'; // Import file CSS để tùy chỉnh giao diện
import { Link } from 'react-router-dom';
import search_icon from '../../../Components/Assets/search-icon.png'
import { confirmOrder, getOrders } from '../../../services/manageOrder';
import { UserContext } from '../../../Context/UserContext';
const ManageOrder = () => {
  const [searchTerm, setSearchTerm] = useState("");
  // Tạo state để lưu trữ groupedOrdersArray
  const [groupedOrdersArray, setGroupedOrdersArray] = useState([]);

  const [orders, setOrders] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState(1);
  const status = ['', 'Chờ xác nhận', 'Đã xác nhận', 'Đang giao', 'Đã giao'];
  const { user } = useContext(UserContext);

  const handleStatus = async (orderID) => {
    // const result = await putOrder(orderID);
    // if (result.EC === 0)
    //   await getOrders();
  }
  const fetchOrders = async () => {
    if (user.userId) {
      console.log('check id', user.userId)
      const result = await getOrders(user.userId);
      if (result.EC === 0) {
        setOrders(result.DT);
      }
    }
  };
  useEffect(() => {
    // Gọi API để lấy danh sách tất cả đơn hàng từ server (không cần phải truyền username)
    fetchOrders();
  }, [user]);

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

  const handleConfirm = async (orderID, status) => {
    const result = await confirmOrder(orderID, status);
    if (result.EC === 0) {
      fetchOrders();
    }
  }
  return (
    <div className="store-order-list-container">
      <h2>Quản lý Đơn hàng</h2>
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
                <p className='order-info'>Người đặt hàng: {order.username}</p>
                <p className='order-info'>Địa chỉ: {order.address}</p>
                <p className='order-info'>Số điện thoại: {order.phone}</p>
                <p className="order-info">Tổng đơn hàng: <span>{order.sum} .000vnđ</span></p>
                <p className='order-info'>Trạng thái: <span>{status[order.status]}</span></p>
                {selectedStatus === 1 && (
                  <button onClick={() => handleConfirm(order.orderID, 2)}>Xác nhận</button>
                )}
                {selectedStatus === 2 && (
                  <button onClick={() => handleConfirm(order.orderID, 3)}>Đang giao</button>
                )}
                {selectedStatus === 3 && (
                  <button onClick={() => handleConfirm(order.orderID, 4)}>Đã nhận</button>
                )}
              </div>
              <table className="right">
                {order.products.map((product) => (
                  <div className="list">
                    <tr className='list-product' key={product.productID}>
                      <td><Link to={`/product/${product.productID}`}>
                        <img src={product.imageUrl} className='carticon-product-icon' alt="" /></Link>
                      </td>
                      <td className='name'> <Link to={`/product/${product.productID}`} style={{ textDecoration: 'none', color: 'black' }}>
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

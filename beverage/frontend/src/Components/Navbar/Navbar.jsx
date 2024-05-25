import React, { useContext, useEffect, useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart from '../Assets/cart.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
import { AuthContext } from '../../Pages/AuthProvider'
const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems, total, getCart } = useContext(ShopContext);
  const { userData, login, logout } = useContext(AuthContext);
  console.log(userData);
  useEffect(() => {
    // Sử dụng useEffect để theo dõi sự thay đổi của total
    // và cập nhật nó vào state của Navbar
    getTotalCartItems();
  }, [userData]); // Theo dõi sự thay đổi của total
  console.log(userData);
  return (
    <div className='navbar'>
      <Link to='/' style={{ textDecoration: 'none' }}>
        <div className="nav-logo" onClick={() => { setMenu("shop") }}>
          <img src={logo} alt="" />
          <p>GREEN FLAVOR</p>
        </div>
      </Link>
      <ul className="nav-menu">
        <li onClick={() => { setMenu("shop") }}><Link style={{ textDecoration: 'none', color: 'black' }} to='/'>Shop</Link>{menu === "shop" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("trasua") }}><Link style={{ textDecoration: 'none', color: 'black' }} to='/trasua'>Trà sữa</Link>{menu === "trasua" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("caphe") }}><Link style={{ textDecoration: 'none', color: 'black' }} to='/caphe'>Cà phê</Link>{menu === "caphe" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("nuocgiaikhat") }}><Link style={{ textDecoration: 'none', color: 'black' }} to='/nuocgiaikhat'>Nước giải khát</Link>{menu === "nuocgiaikhat" ? <hr /> : <></>}</li>
      </ul>
      <div className="nav-login-cart">
        {userData === 'admin' ? (
          // <ul className='admin'>
          //   <li onClick={() => { setMenu("") }}><Link to='/admin/crudproduct' style={{ textDecoration: 'none' }}><button>Quản lý sản phẩm</button></Link></li>
          //   <li onClick={() => { setMenu("") }}><Link to='/admin/manageorder' style={{ textDecoration: 'none' }}><button>Quản lý đơn hàng</button></Link></li>
          //   <li onClick={() => { logout(); setMenu("shop") }}><Link to='/login' style={{ textDecoration: 'none' }}><button>Đăng xuất</button></Link></li>
          // </ul>
          <>
            <div className="right-sidebar">
              <input type="checkbox" id="check" placeholder='i' />
              <div className="btn-one">
                <label htmlFor="check">
                  <i class='bx bxs-user-circle'></i>
                </label>
              </div>
              <div className="sidebar-menu">
                <div className="menu-title">
                  <i class='bx bxs-user-circle'></i>

                  <span>{userData}</span>
                  <Link to='/' onClick={() => { logout(); setMenu("") }}>Đăng xuất</Link>
                </div>
                <div className="btn-two">
                  <label htmlFor="check">
                    <i class='bx bxs-tag-x'></i>
                  </label>
                </div>
                <div className="menu">
                  <ul>
                    <li><Link to='/order' style={{ textDecoration: 'none' }} onClick={() => { setMenu("") }}>Thông báo</Link></li>
                    <li><Link to='/admin/manageusers' style={{ textDecoration: 'none' }}>Quản lý người dùng</Link></li>
                    <li><Link to='/admin/manageorder' style={{ textDecoration: 'none' }}>Quản lý đơn hàng</Link></li>
                    <li><Link to='/' style={{ textDecoration: 'none' }}>Đăng xuất</Link></li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        )
          : userData === '' ?
            <>
              <Link to='/login' style={{ textDecoration: 'none' }} onClick={() => { setMenu("") }}><button>Đăng nhập</button></Link>
              <Link to='/cart' style={{ textDecoration: 'none' }} onClick={() => { setMenu("") }}><img src={cart} alt="" /></Link>
              <div className="nav-cart-count">{total}</div>
            </>
            :
            <>
              <Link to='/cart' style={{ textDecoration: 'none' }} onClick={() => { setMenu("") }}><img src={cart} alt="" /></Link>
              <div className="nav-cart-count">{total}</div>
              <div className="right-sidebar">
                <input type="checkbox" id="check" placeholder='i' />
                <div className="btn-one">
                  <label htmlFor="check">
                    <i class='bx bxs-user-circle'></i>
                  </label>
                </div>
                <div className="sidebar-menu">
                  <div className="menu-title">
                    <i class='bx bxs-user-circle'></i>

                    <span>{userData}</span>
                    <Link to='/' onClick={() => { logout(); setMenu("") }}>Đăng xuất</Link>
                  </div>
                  <div className="btn-two">
                    <label htmlFor="check">
                      <i class='bx bxs-tag-x'></i>
                    </label>
                  </div>
                  <div className="menu">
                    <ul>
                      <li><Link to='/order' style={{ textDecoration: 'none' }} onClick={() => { setMenu("") }}>Thông báo</Link></li>
                      <li><Link to='/order' style={{ textDecoration: 'none' }} onClick={() => { setMenu("") }}>Đơn hàng của bạn</Link></li>
                      <li><Link to='/order' style={{ textDecoration: 'none' }} onClick={() => { setMenu("") }}>Cập nhật thông tin</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
        }

      </div>
    </div>
  )
}

export default Navbar
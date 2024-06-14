import React, { useContext, useEffect, useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart from '../Assets/cart.png'
import { Link } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import { fectchTotalCart } from '../../services/userCart'


const Navbar = () => {
  const [menu, setMenu] = useState("shop");

  const { user, logoutContext, getTotalCartItems, total } = useContext(UserContext);


  useEffect(() => {
    getTotalCartItems();
  }, [user]);


  const Sidebar = () => {
    const renderAdminMenu = () => (
      <ul>
        <li><Link to='/admin/manageusers' style={{ textDecoration: 'none' }}>Quản lý người dùng</Link></li>
        <li><Link to='/admin/manageorder' style={{ textDecoration: 'none' }}>Quản lý đơn hàng</Link></li>
      </ul>
    );

    const renderStoreMenu = () => (
      <ul>
        <li><Link to='/store/manageproducts' style={{ textDecoration: 'none' }}>Quản lý sản phẩm</Link></li>
        <li><Link to='/store/manageorder' style={{ textDecoration: 'none' }}>Quản lý đơn hàng</Link></li>
      </ul>
    );

    const renderCustomerMenu = () => (
      <ul>
        <li><Link to='/order' style={{ textDecoration: 'none' }}>Đơn hàng của bạn</Link></li>
        <li><Link to='/profile' style={{ textDecoration: 'none' }}>Cập nhật thông tin</Link></li>
      </ul>
    );
    console.log("check user:", user);
    switch (user.role) {
      case 'admin':
        return renderAdminMenu();
      case 'store':
        return renderStoreMenu();
      case 'user':
        return renderCustomerMenu();
      default:
        return null;
    }
  }

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
        {user.role !== 'admin' ? <>
          <Link to='/cart' style={{ textDecoration: 'none', }} onClick={() => { setMenu("") }}><img src={cart} alt="" /></Link>
          <div className="nav-cart-count">{total}</div>
        </> :
          <></>
        }
        {
          user.role ?
            <><div className="right-sidebar">
              <input type="checkbox" id="check" />
              <div className="btn-one">
                <label htmlFor="check">
                  <i className='bx bxs-user-circle'></i>
                </label>
              </div>
              <div className="sidebar-menu">
                <div className="menu-title">
                  <i className='bx bxs-user-circle'></i>
                  <span>{user.username}</span>
                  <Link to='/' onClick={() => { logoutContext(); setMenu("") }}>Đăng xuất</Link>
                </div>
                <div className="btn-two">
                  <label htmlFor="check">
                    <i class='bx bxs-tag-x'></i>
                  </label>
                </div>
                <div className="menu">
                  {Sidebar()}
                </div>
              </div>
            </div>
            </>
            : <><Link to='/login' style={{ textDecoration: 'none', display: user.role ? 'none' : 'block' }} onClick={() => { setMenu("") }}><button>Đăng nhập</button></Link></>
        }

        {
          // <ul className='admin'>
          //   <li onClick={() => { setMenu("") }}><Link to='/admin/crudproduct' style={{ textDecoration: 'none' }}><button>Quản lý sản phẩm</button></Link></li>
          //   <li onClick={() => { setMenu("") }}><Link to='/admin/manageorder' style={{ textDecoration: 'none' }}><button>Quản lý đơn hàng</button></Link></li>
          //   <li onClick={() => { logout(); setMenu("shop") }}><Link to='/login' style={{ textDecoration: 'none' }}><button>Đăng xuất</button></Link></li>
          // </ul>
        }

      </div>
    </div>
  )
}

export default Navbar
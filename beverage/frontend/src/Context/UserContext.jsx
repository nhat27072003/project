import React, { createContext, useEffect, useState } from 'react'
import { authenicateCookie } from '../services/manageUsers';
import { delItemCart, fectchTotalCart, fetchCart } from '../services/userCart';


export const UserContext = createContext(null);

const UserContextProvider = ({ children }) => {
  const noneUser = {
    userId: '',
    username: '',
    role: ''
  };

  const [total, setTotal] = useState(0);
  const [cartItems, setCartItems] = useState([]);

  const [user, setUser] = useState(noneUser);

  const loginContext = (userData) => {
    setUser(userData);
  }

  const logoutContext = () => {
    setUser(noneUser);
  }
  useEffect(() => {
    authenicateUser();
  }, []);

  const authenicateUser = async () => {
    const result = await authenicateCookie();
    if (result.EC === 0) {
      if (result.DT.isauthenicated) {
        setUser(result.DT.user);
      }
      else setUser(noneUser);
    }
    else setUser(noneUser);
  }

  const getCart = async () => {
    if (user.role !== "admin" && user.username !== '') {
      const data = await fetchCart(user.username);
      setCartItems(data);
    }
  }

  useEffect(() => {
    getCart();
  }, [user]);

  const getTotalCartItems = async () => {
    if (user.role !== "admin" && user.username !== '') {
      const res = await fectchTotalCart(user.username);
      setTotal(res);
    }
    else setTotal(0);
  };
  const handleDelete = async (productId) => {

    const result = await delItemCart({ username: user.username, id: productId });
    if (result.EC === 0) {
      getCart();
      getTotalCartItems();
    }
  }

  return (
    <UserContext.Provider value={{ cartItems, user, loginContext, logoutContext, getTotalCartItems, total, handleDelete, getCart }}>
      {children}
    </UserContext.Provider>
  )
}
export default UserContextProvider;
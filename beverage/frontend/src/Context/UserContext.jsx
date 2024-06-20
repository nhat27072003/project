import React, { createContext, useEffect, useState } from 'react'
import { authenicateCookie } from '../services/manageUsers';
import { addItemCart, delItemCart, fectchTotalCart, fetchCart } from '../services/userCart';
import { fetchOrder } from '../services/userOrder';


export const UserContext = createContext(null);

const UserContextProvider = ({ children }) => {
  const noneUser = {
    userId: '',
    username: '',
    role: ''
  };

  const [total, setTotal] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
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
        await setUser(result.DT.user);
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

  const addToCart = async (props) => {
    const values = {
      userData: user.username,
      productID: props
    };
    const result = await addItemCart(values);

    if (+result.EC === 0) {
      getCart();
      getTotalCartItems();
    }
  }
  const handleDelete = async (productId) => {

    const result = await delItemCart({ username: user.username, id: productId });
    if (result.EC === 0) {
      getCart();
      getTotalCartItems();
    }
  }

  const getOrders = async () => {
    if (user.username !== '') {
      const data = await fetchOrder(user.userId);
      if (data.EC === 0) {
        setOrders(data.DT);
      }
    }
  };
  useEffect(() => {
    getOrders();
  }, []);

  return (
    <UserContext.Provider value={{ authenicateUser, cartItems, addToCart, user, loginContext, logoutContext, getTotalCartItems, total, handleDelete, getCart, orders, getOrders }}>
      {children}
    </UserContext.Provider>
  )
}
export default UserContextProvider;
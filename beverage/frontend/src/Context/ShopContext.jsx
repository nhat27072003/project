import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "../Pages/AuthProvider";
import { fetchProductPopular, fetchProducts } from "../services/manageProduct";
import { fetchOrder } from "../services/userOrder";
import { addItemCart, fectchTotalCart, fetchCart } from "../services/userCart";
export const ShopContext = createContext(null)

const ShopContextProvider = ({ children }) => {

  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [popular, setPopular] = useState([]);
  const [orders, setOrders] = useState([]);
  const { userData } = useContext(AuthContext);

  const getProducts = async () => {
    const result = await fetchProducts();

    setProducts(result.DT);
  }
  useEffect(() => {
    getProducts();
  }, []);

  const getPopular = async () => {
    const data = await fetchProductPopular();
    setPopular(data);
  };

  const getOrders = async () => {
    if (userData !== 'admin' && userData !== '') {
      const data = await fetchOrder(userData);
      setOrders(data);
    }
  };
  useEffect(() => {
    getOrders();
  }, []);


  const addToCart = async (props) => {
    const values = {
      userData: userData,
      productID: props
    };

    await addItemCart(values);
  }

  const getCart = async () => {
    if (userData !== 'admin' && userData !== '') {
      const data = await fetchCart(userData);
      setCartItems(data);
    }
  }

  const [total, setTotal] = useState(0);

  const getTotalCartItems = async () => {
    if (userData !== 'admin' && userData !== '') {
      const res = await fectchTotalCart(userData);
      setTotal(res);
    }
    else setTotal(0);
  };


  return (
    <ShopContext.Provider value={{ getTotalCartItems, getProducts, products, cartItems, getCart, total, addToCart, popular, getPopular, orders, getOrders }}>
      {children}
    </ShopContext.Provider>
  )
}
export default ShopContextProvider;
import React, { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "../Pages/AuthProvider";
import axios from "axios";
export const ShopContext = createContext(null)

const ShopContextProvider = ({children}) => {

    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [popular, setPopular] = useState([]);
    const [orders, setOrders] = useState([]);
    const {userData} = useContext(AuthContext);

    const getProducts = async ()=>{
        const result = await axios.get('http://localhost:8081/product');
        console.log(result.data);
        setProducts(result.data.recordset);
    }
    useEffect(()=>{
        getProducts();
    },[]);

    const getPopular = async ()=>{
        try {
            const response = await axios.get('http://localhost:8081/popular');
            setPopular(response.data.recordset);
          } catch (error) {
            console.error('Error fetching popular products:', error);
          }
        }; 
    // useEffect(()=>{
    //     getPopular();
    // },[]);

    const getOrders = async () => {
        try {
          if(userData !== 'admin' && userData !== ''){
              const values = {username: userData};
              const response = await axios.post('http://localhost:8081/order',values);
              setOrders(response.data);
          }
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      };
    useEffect(()=>{
        getOrders();
    },[]);
    const addToCart = async (props) =>{
        const values = {
            userData: userData,
            productID: props
        };
        console.log(values);
        // setCartItems((prev)=>({
        //     ...prev,[item]:prev[item]+1
        // }))
        await axios.post('http://localhost:8081/cart',values)
    }
    const getCart = async ()=>{
        if(userData!=='admin' && userData !==''){
            await axios.post('http://localhost:8081/getcart',{username: userData})
            .then(res => {
                console.log(res);
                setCartItems(res.data);
            })
        }

    }

    const [total, setTotal] = useState(0);
    const getTotalCartItems =  async () => {
      try{
        if(userData !== 'admin' && userData !== ''){
            console.log({username: userData});
            const res = await axios.post('http://localhost:8081/totalquantity',{username: userData})
            setTotal(res.data.total);
        }
        else setTotal(0);
      }
      catch(err){
        console.log(err);
      }
        
    };

     const contextValue = {getTotalCartItems,cartItems,addToCart,};

    return (
        <ShopContext.Provider value={{getTotalCartItems,getProducts,products,cartItems,getCart,total, addToCart,popular, getPopular,orders, getOrders}}>
            {children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;
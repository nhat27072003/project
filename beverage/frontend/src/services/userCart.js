import axios from "../setup/axios"

const addItemCart = async (values) => {
  const result = await axios.post('/cart', values);
  return result;
}

const fetchCart = async (username) => {
  const result = await axios.get(`/getcart?username=${username}`);
  return result.DT;
}

const fectchTotalCart = async (username) => {
  const result = await axios.get(`/totalquantity?username=${username}`);
  return result.DT;
}
export {
  addItemCart,
  fetchCart,
  fectchTotalCart
}
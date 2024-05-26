import axios from "../setup/axios"


const createOrder = async (values) => {
  const response = await axios.post('/createorder', values);
  return response;
}
const fetchOrder = async (values) => {
  const data = await axios.get(`/order?username=${values}`);
  return data.DT;
}
const putOrder = async (orderID) => {
  const result = await axios.put(`/order/${orderID}`);
  return result;
}

export {
  fetchOrder,
  putOrder,
  createOrder
}

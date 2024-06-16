import axios from '../setup/axios'

const getOrders = async (userId) => {
  const response = await axios.get(`/store/orders?storeId=${userId}`);
  return response;
}

const confirmOrder = async (orderId, status) => {
  const response = await axios.put(`/store/order/update?orderId=${orderId}&status=${status}`)
  console.log('check response', response);
  return response;
}

export {
  getOrders,
  confirmOrder
}
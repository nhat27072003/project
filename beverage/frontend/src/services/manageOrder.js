import axios from '../setup/axios'

const getOrders = async () => {
  const response = await axios.get('/admin/orders');
  return response.DT;
}

export {
  getOrders,
}
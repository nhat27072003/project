import axios from '../setup/axios'



const getRevenue = async (limit, start, end) => {
  const response = await axios.post(`/admin/revenue?limit=${limit}`, { start, end });
  return response;
}

const getrevenueCategory = async (start, end) => {
  const response = await axios.post('/admin/revenue/category', { start, end });
  console.log('check category', response)
  return response;
}

const storeGetRevenue = async (userId, limit, start, end) => {
  console.log('userid:', userId)
  const response = await axios.post(`/store/revenue?limit=${limit}&userId=${userId}`, { start, end });
  return response;
}
const StoreGetrevenueCategory = async (userId, start, end) => {
  const response = await axios.post(`/store/revenue/category?userId=${userId}`, { start, end });
  console.log('check category', response)
  return response;
}
export {
  getRevenue,
  getrevenueCategory,
  storeGetRevenue,
  StoreGetrevenueCategory
}
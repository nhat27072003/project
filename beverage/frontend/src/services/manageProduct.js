import axios from "../setup/axios";


const fetchProducts = async () => {
  const result = await axios.get('/product');
  return result;
}
const getDetailProduct = async (productId) => {
  const response = await axios.get(`/product/${productId}`);
  return response;
}
const fetchProductPopular = async () => {
  const result = await axios.get('/popular');
  return result.DT;
}

const addProduct = async (formData) => {
  const result = await axios.post('/addproduct', formData);
  return result;
}

const updateProducct = async (productId, formData) => {
  const response = await axios.put(`/products/${productId}`, formData);
  return response
}
const deleteProduct = async (productId) => {
  const response = await axios.delete(`/deleteproduct/${productId}`);
  return response;
}
export {
  fetchProducts,
  getDetailProduct,
  fetchProductPopular,
  addProduct,
  deleteProduct,
  updateProducct
}
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
  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }
  const result = await axios.post('/addproduct', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return result;
}

const updateProducct = async (productId, formData) => {
  const response = await axios.put(`/products/${productId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response;
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
import axios from "../setup/axios"


const getReview = async (productId) => {
  const response = await axios.get(`/review?productId=${productId}`);
  console.log('check res', response);
  return response;
}
const createReview = async (values) => {
  const response = await axios.post('/user/review', values);
  return response;
}

export {
  createReview,
  getReview
}
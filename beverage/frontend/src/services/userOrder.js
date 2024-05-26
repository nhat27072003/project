import axios from "../setup/axios"

const fetchOrder = async (values) => {
  const data = await axios.get(`/order?username=${values}`);
  return data.DT;
}


export {
  fetchOrder,
}

import axios from '../setup/axios'

const getUsers = async () => {
  const response = await axios.get(`/admin/getuser`);
  return response;
}
const getDetailUser = async (userId) => {
  console.log("check userid:", userId);
  const response = await axios.get(`/detail-user/${userId}`);
  return response;
}
const loginUser = async (values) => {
  const response = await axios.post('/login', values);
  return response;
}

const signupUser = async (values) => {
  const res = await axios.post('/sign', values);
  return res;
}

const updateUser = async (values) => {
  const res = await axios.put(`/update-user/${values.userID}`, { values: values });
  console.log('check res:', res);
  return res;
}

const delUser = async (userID) => {
  const res = await axios.delete(`/delete-user/${userID}`);
  return res;
}
export {
  getUsers,
  loginUser,
  signupUser,
  getDetailUser,
  updateUser,
  delUser
}
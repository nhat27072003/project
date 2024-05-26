import axios from '../setup/axios'

const getUsers = async (page, limit) => {
  const response = await axios.get(`/admin/getuser/getpage?page=${page}&limit=${limit}`);
  return response;
}

export {
  getUsers
}
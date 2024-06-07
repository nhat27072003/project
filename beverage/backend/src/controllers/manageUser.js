const { getAllAccount, getPage } = require("../services/manageUserServices");

// const handleUser = async (req, res) => {
//   let data = await getAllAccount();
//   res.status(200).json({
//     EM: data.EM,
//     EC: data.EC,
//     DT: data.DT
//   })
// }

const handleGetUsers = async (req, res) => {

  let users = await getAllAccount();
  res.status(200).json({
    EM: users.EM,
    EC: users.EC,
    DT: users.DT
  })
}

module.exports = {
  // handleUser,
  handleGetUsers
}
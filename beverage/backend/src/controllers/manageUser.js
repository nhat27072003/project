const { getAllAccount, detailUser, updateUser, deleteUser } = require("../services/manageUserServices");


const handleGetAllAccount = async (req, res) => {
  var sqlstring = 'SELECT * FROM Users';
  try {
    await pool.connect();
    const result = await pool.request()
      .query(sqlstring);
    res.json(result);

  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });

  }
};

const getDetailUser = async (req, res) => {
  if (req.params.userId) {
    const result = await detailUser(req.params.userId);
    res.status(200).json({
      EC: result.EC,
      EM: result.EM,
      DT: result.DT
    })
  }
  else res.json(
    {
      EC: 2,
      EM: "error params",
      DT: []
    }
  )
}

const handleUpdateUser = async (req, res) => {
  if (req.params.userId && req.body.values) {
    const result = await updateUser(req.body.values);

    res.status(200).json({
      EC: result.EC,
      EM: result.EM,
      DT: result.DT
    })
  }
  else {
    res.status(200).json({
      EC: 1,
      EM: "missleading values",
      DT: []
    })
  }
}

const handleDeleteUser = async (req, res) => {
  if (req.params.userId) {
    const result = await deleteUser(req.params.userId);

    res.status(200).json({
      EC: result.EC,
      EM: result.EM,
      DT: result.DT
    })
  }
  else res.json({
    EC: 1,
    EM: "missleading params",
    DT: []
  })
}
const handleGetUsers = async (req, res) => {

  let users = await getAllAccount();
  res.status(200).json({
    EM: users.EM,
    EC: users.EC,
    DT: users.DT
  })
}

module.exports = {
  handleGetUsers,
  handleDeleteUser,
  handleUpdateUser,
  handleGetAllAccount,
  getDetailUser
}
const { adminOrder } = require("../services/manageOrderServices");

const handleAdminOrder = async (req, res) => {
  const result = await adminOrder();
  res.json(result.recordset);
}

module.exports = {
  handleAdminOrder
}
const { adminOrder } = require("../services/manageOrderServices");

const handleAdminOrder = async (req, res) => {
  const result = await adminOrder();
  res.json({
    EC: result.EC,
    EM: result.EM,
    DT: result.DT
  });
}

module.exports = {
  handleAdminOrder
}
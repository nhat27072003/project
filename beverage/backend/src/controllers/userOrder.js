const { createOrder, getOrder, updateOrder } = require('../services/userOrderServices');


const handleCreateOrder = async (req, res) => {
  const order = {
    username: req.body.username,
    total: req.body.total,
    address: req.body.address,
    products: req.body.products,
    phone: req.body.phone,
    storeId: req.body.storeId
  }

  const result = await createOrder(order);
  res.status(200).json({
    EC: result.EC,
    EM: result.EM,
    DT: result.DT
  })
}
const handleGetOrder = async (req, res) => {
  if (req.query && req.query.userId) {
    const result = await getOrder(req.query.userId);

    res.status(200).json({
      EM: result.EM,
      EC: result.EC,
      DT: result.DT
    });
  }

  else {
    res.status(200).json({
      EC: 3,
      EM: "missleading query",
      DT: []
    })
  }
}
const handleUpdateOrder = async (req, res) => {
  if (req.params.orderID) {
    const result = await updateOrder(req.params.orderID);
    res.json({
      EC: result.EC,
      EM: result.EM,
      DT: result.DT
    });
  }
  else res.json({
    EC: 2,
    EM: "missleading params",
    DT: []
  })
}

module.exports = {
  handleCreateOrder,
  handleGetOrder,
  handleUpdateOrder,
}
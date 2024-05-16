const { createOrder, getOrder, updateOrder } = require('../services/userOrderServices');
const handleCreateOrder = async (req, res) => {
  const order = {
    username: req.body.username,
    total: req.body.total,
    address: req.body.address,
    products: req.body.products,
  }

  const result = await createOrder(order);
  if (result) {
    res.json({ success: true });
  }
  else {
    res.json({ success: false });
  }
}
const handleGetOrder = async (req, res) => {
  try {
    const result = await getOrder(req.body.username);
    res.json(result.recordset);
  }
  catch (err) {
    console.log(err);
    res.json(err);
  }
}
const handleUpdateOrder = async (req, res) => {
  const result = await updateOrder(req.params.orderID);
  res.json(result);
}

module.exports = {
  handleCreateOrder,
  handleGetOrder,
  handleUpdateOrder,
}
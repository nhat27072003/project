const { getStoreOrder, storeUpdateOrder } = require("../services/manageOrderServices");

const handleManageOrder = async (req, res) => {
  if (req.query.storeId) {
    const result = await getStoreOrder(req.query.storeId);
    res.json({
      EC: result.EC,
      EM: result.EM,
      DT: result.DT
    });
  } else {
    res.json({
      EC: 4,
      EM: 'missleading query',
      DT: []
    })
  }
}

const handleStoreUpdateOrder = async (req, res) => {
  if (req.query.orderId && req.query.status) {
    const result = await storeUpdateOrder(req.query.orderId, req.query.status);

    res.status(200).json({
      EC: result.EC,
      EM: result.EM,
      DT: result.DT
    })
  }
  else res.json({
    EC: 2,
    EM: "missleading query",
    DT: []
  })
}
module.exports = {
  handleManageOrder,
  handleStoreUpdateOrder
}
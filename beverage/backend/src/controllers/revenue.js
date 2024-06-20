const { adminGetRevenue, adminGetRevenueDate, adminGetRevenueCategoryDate, adminGetRevenueCategory, storeGetRevenueDate, storeGetRevenue, storeGetRevenueCategoryDate, storeGetRevenueCategory } = require("../services/revenue")


const handleAdminGetRevenue = async (req, res) => {
  if (req.query.limit) {
    let result = null;
    if (req.body.start && req.body.end) {
      result = await adminGetRevenueDate(req.query.limit, req.body.start, req.body.end)
    }
    else {
      result = await adminGetRevenue(req.query.limit);
    }
    res.json({
      EC: result.EC,
      EM: result.EM,
      DT: result.DT
    })
  }
  else {
    res.json({
      EC: 1,
      EM: "missleading query",
      DT: []
    })
  }
}

const handleAdminGetRevenueCategory = async (req, res) => {
  let result = null;
  if (req.body.start && req.body.end) {
    result = await adminGetRevenueCategoryDate(req.body.start, req.body.end)
  }
  else {
    result = await adminGetRevenueCategory();
  }
  res.json({
    EC: result.EC,
    EM: result.EM,
    DT: result.DT
  })
}

const handleStoreGetRevenue = async (req, res) => {
  if (req.query.limit && req.query.userId) {
    let result = null;
    const query = {
      storeId: req.query.userId,
      limit: req.query.limit
    }
    if (req.body.start && req.body.end) {
      result = await storeGetRevenueDate(query, req.body.start, req.body.end)
    }
    else {
      result = await storeGetRevenue(query);
    }
    res.json({
      EC: result.EC,
      EM: result.EM,
      DT: result.DT
    })
  }
  else {
    res.json({
      EC: 1,
      EM: "missleading query",
      DT: []
    })
  }
}

const handleStoreGetRevenueCategory = async (req, res) => {
  let result = null;
  if (req.body.start && req.body.end && req.query.userId) {
    result = await storeGetRevenueCategoryDate(req.query.userId, req.body.start, req.body.end)
  }
  else {
    result = await storeGetRevenueCategory(req.query.userId);
  }
  res.json({
    EC: result.EC,
    EM: result.EM,
    DT: result.DT
  })
}
module.exports = {
  handleAdminGetRevenue,
  handleAdminGetRevenueCategory,
  handleStoreGetRevenue,
  handleStoreGetRevenueCategory
}
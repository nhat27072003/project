const { createReview, getReview } = require("../services/reviewProductServices")

const handleGetReview = async (req, res) => {
  if (req.query.productId) {
    const result = await getReview(req.query.productId);

    res.status(200).json({
      EC: result.EC,
      EM: result.EM,
      DT: result.DT
    })
  }
  else {
    res.json({
      EC: 3,
      EM: "missleading query",
      DT: []
    })
  }
}

const handleCreateReview = async (req, res) => {
  if (req.body.orderId && req.body.productId && req.body.rating && req.body.review && req.body.userId) {
    const values = {
      orderId: req.body.orderId,
      productId: req.body.productId,
      rating: req.body.rating,
      review: req.body.review,
      userId: req.body.userId
    }

    const result = await createReview(values);

    res.status(200).json({
      EC: result.EC,
      EM: result.EM,
      DT: result.DT
    })
  }
  else {
    res.json({
      EC: 4,
      EM: "missleading values",
      DT: []
    })
  }
}

module.exports = {
  handleGetReview,
  handleCreateReview
}
const { getAllProduct, getPopular, getDetailProduct } = require('../services/getProductServices');

const handleGetAllProduct = async (req, res) => {
  const result = await getAllProduct();

  res.status(200).json({
    EM: result.EM,
    EC: result.EC,
    DT: result.DT
  });
};

const handleGetPopular = async (req, res) => {
  const result = await getPopular();

  res.status(200).json({
    EM: result.EM,
    EC: result.EC,
    DT: result.DT
  });
};

const handleGetDetailProduct = async (req, res) => {
  if (req.params.productId) {
    const result = await getDetailProduct(req.params.productId);
    res.json({
      EC: result.EC,
      EM: result.EM,
      DT: result.DT
    });
  } else {
    res.status(400).json({
      EC: 3,
      EM: "missleading params",
      DT: []
    })
  }
};

module.exports = {
  handleGetDetailProduct,
  handleGetPopular,
  handleGetAllProduct
}
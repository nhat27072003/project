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
  const result = await getDetailProduct(req.params.productId);
  if (result.recordset.length > 0) {
    const productData = result.recordset[0];
    res.json(productData);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
};

module.exports = {
  handleGetDetailProduct,
  handleGetPopular,
  handleGetAllProduct
}
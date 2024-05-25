const { getAllProduct, getPopular, getDetailProduct } = require('../services/getProductServices');

const handleGetAllProduct = async (req, res) => {
  const result = await getAllProduct();
  if (result.recordset.length > 0) {
    res.json(result);
  }
  else {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const handleGetPopular = async (req, res) => {
  const result = await getPopular();
  if (result.recordset.length > 0) {
    res.json(result);
  }
  else res.json("NO Popular Product");
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
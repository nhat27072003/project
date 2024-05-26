const cloudinary = require('../config/cloudinary');
const { pool, sql } = require('../config/database');
const upload = require('../config/saveImage');
const { delProduct, addProduct, updateProducct } = require('../services/manageProduct');


const handleAddProduct = async (req, res) => {

  let imageUrl = null;
  // Nếu có file ảnh từ client, tải lên Cloudinary và nhận URL
  if (req.file) {
    const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path);
    imageUrl = cloudinaryResponse.secure_url;
  }

  if (req.body.productName && req.body.price && req.body.quantity && req.body.category) {
    const values = {
      productName: req.body.productName,
      price: req.body.price,
      quantity: req.body.quantity,
      category: req.body.category,
      imageUrl: imageUrl
    }
    const result = await addProduct(values);

    res.status(200).json({
      EM: result.EM,
      EC: result.EC,
      DT: result.DT
    });
  }
  else res.status(200).json({
    EM: "missleading params",
    EC: 2,
    DT: []
  })

};

const handleUpdateProducct = async (req, res) => {

  let imageUrl = null;
  console.log(req.file);
  // Nếu có file ảnh từ client, tải lên Cloudinary và nhận URL
  if (req.file) {
    const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path);
    imageUrl = cloudinaryResponse.secure_url;
  }
  const values = {
    productId: req.params.productId,
    productName: req.body.productName,
    price: req.body.price,
    quantity: req.body.quantity,
    imageUrl: imageUrl,
    category: req.body.category,
  }
  const result = await updateProducct(values);
  res.json({
    EM: result.EM,
    EC: result.EC,
    DT: result.DT
  });

};

const deleteProduct = async (req, res) => {
  if (req.params.productId) {
    const productId = req.params.productId;
    const result = delProduct(productId);
    res.status(200).json({
      EM: result.EM,
      EC: result.EC,
      DT: result.DT
    })
  }
  else res.status(200).json({
    EM: 'missleading params',
    EC: 2,
    DT: []
  })
};

module.exports = {
  handleAddProduct,
  handleUpdateProducct,
  deleteProduct
}
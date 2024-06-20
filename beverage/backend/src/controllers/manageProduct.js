const cloudinary = require('../config/cloudinary');
const { delProduct, addProduct, updateProducct } = require('../services/manageProduct');


const handleAddProduct = async (req, res) => {

  let imageUrl = null;
  // Nếu có file ảnh từ client, tải lên Cloudinary và nhận URL
  if (req.file) {
    const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path);
    imageUrl = cloudinaryResponse.secure_url;
  }

  if (req.body.productName && req.body.price && req.body.description && req.body.category && req.body.userId) {
    const values = {
      productName: req.body.productName,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      imageUrl: imageUrl,
      userId: req.body.userId
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

  // Nếu có file ảnh từ client, tải lên Cloudinary và nhận URL
  if (req.file) {
    const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path);
    imageUrl = cloudinaryResponse.secure_url;
  }
  const values = {
    productId: req.params.productId,
    productName: req.body.productName,
    price: req.body.price,
    description: req.body.description,
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
    const result = await delProduct(productId);
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
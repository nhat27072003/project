const express = require('express');
const router = express.Router();
const { getAllAccount, getAccount, signAccount } = require('../controllers/account');
const { getAllProduct, getPopular, getDetailProduct } = require('../controllers/getProduct');
const { addProduct, updateProducct, deleteProduct } = require('../controllers/manageProduct');
const { addCart, getTotalCart, getCart, deleteCart } = require('../controllers/manageCart');
const { createOrder, getOrder, updateOrder, adminOrder } = require('../controllers/manageOrder');
const upload = require('../config/saveImage');

router.get('/acount', getAllAccount);

router.post('/login', getAccount);

router.post('/sign', signAccount);

router.get('/product', getAllProduct);

router.get('/popular', getPopular);

router.get('/product/:productId', getDetailProduct);

/*
router.post('/addproduct', upload.single('image'), async (req, res) => {
  try {
      const imageUrl = req.file ? `/imageproduct/${req.file.filename}` : null;

      await pool.connect();
      console.log(req.body);
      const request = pool.request();
      const result = await request
          .input('name', sql.NVarChar, req.body.productName)
          .input('price', sql.Int, parseInt(req.body.price))
          .input('quantity', sql.Int, parseInt(req.body.quantity))
          .input('imageUrl', sql.NVarChar, imageUrl)
          .input('category', sql.VarChar, req.body.category)
          .query('INSERT INTO Product (name, price, stock, imageUrl, category) VALUES (@name, @price, @quantity, @imageUrl, @category)');

      res.json({ success: true, message: 'Product added successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});
*/

router.post('/addproduct', upload.single('image'), addProduct);
/*
router.put('/products/:productId', upload.single('image'), async (req, res) => {
  const productId = req.params.productId;
  const { productName, price, quantity, category } = req.body;

  try {
    let imageUrl = null;

    // Nếu có file ảnh từ client, tải lên Cloudinary và nhận URL
    if (req.file) {
      const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path);
      imageUrl = cloudinaryResponse.secure_url;
    }

    await pool.connect();

    // Sửa thông tin sản phẩm trong SQL Server
    const request = pool.request();
    console.log(req.body);
    if(imageUrl){
      const result = await request
      .input('productId', sql.Int, parseInt(productId))
      .input('productName', sql.NVarChar, productName)
      .input('price', sql.Int, parseInt(price))
      .input('quantity', sql.Int, parseInt(quantity))
      .input('imageUrl', sql.NVarChar, imageUrl)
      .input('category', sql.VarChar, category)
      .query('UPDATE Product SET name = @productName, price = @price, stock = @quantity, imageUrl = @imageUrl, category = @category WHERE productID = @productId');
        
    }
    else{
      const result = await request
      .input('productId', sql.Int, parseInt(productId))
      .input('productName', sql.NVarChar, productName)
      .input('price', sql.Int, parseInt(price))
      .input('quantity', sql.Int, parseInt(quantity))
      .input('category', sql.VarChar, category)
      .query('UPDATE Product SET name = @productName, price = @price, stock = @quantity, category = @category WHERE productID = @productId');

    }

    res.json({ success: true, message: 'Product updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});
*/
router.put('/products/:productId', upload.single('image'), updateProducct);

router.delete('/deleteproduct/:productId', deleteProduct);

router.post('/cart', addCart);

router.post('/totalquantity', getTotalCart);

router.post('/getcart', getCart);

router.post('/deleteitem', deleteCart);

router.post('/createorder', createOrder);

router.post('/order', getOrder);

router.put('/order/:orderID', updateOrder);

router.get('/admin/orders', adminOrder);

module.exports = router
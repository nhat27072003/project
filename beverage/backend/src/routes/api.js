const express = require('express');
const router = express.Router();
const { getAllAccount, handleGetAccount, handleSignAccount } = require('../controllers/account');
const { handleGetDetailProduct, handleGetAllProduct, handleGetPopular } = require('../controllers/getProduct');
const { addProduct, updateProducct, deleteProduct } = require('../controllers/manageProduct');
const { handleAddCart, handleGetTotalCart, handleGetCart, handleDeleteCart } = require('../controllers/manageCart');
const { handleAdminOrder } = require('../controllers/manageOrder');
const { handleCreateOrder, handleGetOrder, handleUpdateOrder } = require('../controllers/userOrder');
const upload = require('../config/saveImage');

router.get('/acount', getAllAccount);

router.post('/login', handleGetAccount);

router.post('/sign', handleSignAccount);

router.get('/product', handleGetAllProduct);

router.get('/popular', handleGetPopular);

router.get('/product/:productId', handleGetDetailProduct);

router.post('/addproduct', upload.single('image'), addProduct);

router.put('/products/:productId', upload.single('image'), updateProducct);

router.delete('/deleteproduct/:productId', deleteProduct);

router.post('/cart', handleAddCart);

router.post('/totalquantity', handleGetTotalCart);

router.post('/getcart', handleGetCart);

router.post('/deleteitem', handleDeleteCart);

router.post('/createorder', handleCreateOrder);

router.post('/order', handleGetOrder);

router.put('/order/:orderID', handleUpdateOrder);

router.get('/admin/orders', handleAdminOrder);

module.exports = router
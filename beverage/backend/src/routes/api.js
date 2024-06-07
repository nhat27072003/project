const express = require('express');
const router = express.Router();
const { getAllAccount, handleGetAccount, handleSignAccount, getDetailUser, handleUpdateUser, handleDeleteUser } = require('../controllers/account');
const { handleGetDetailProduct, handleGetAllProduct, handleGetPopular } = require('../controllers/getProduct');
const { deleteProduct, handleUpdateProducct, handleAddProduct } = require('../controllers/manageProduct');
const { handleAddCart, handleGetTotalCart, handleGetCart, handleDeleteCart } = require('../controllers/manageCart');
const { handleAdminOrder } = require('../controllers/manageOrder');
const { handleCreateOrder, handleGetOrder, handleUpdateOrder } = require('../controllers/userOrder');
const { handleGetPage, handleGetUsers } = require('../controllers/manageUser');
const upload = require('../config/saveImage');

router.get('/acount', getAllAccount);

router.get('/detail-user/:userId', getDetailUser);

router.put('/update-user/:userId', handleUpdateUser);

router.delete('/delete-user/:userId', handleDeleteUser);

router.post('/login', handleGetAccount);

router.post('/sign', handleSignAccount);

router.get('/product', handleGetAllProduct);

router.get('/popular', handleGetPopular);

router.get('/product/:productId', handleGetDetailProduct);

router.post('/addproduct', upload.single('image'), handleAddProduct);

router.put('/products/:productId', upload.single('image'), handleUpdateProducct);

router.delete('/deleteproduct/:productId', deleteProduct);

router.post('/cart', handleAddCart);

router.get('/totalquantity', handleGetTotalCart);

router.get('/getcart', handleGetCart);

router.delete('/deleteitem', handleDeleteCart);

router.post('/createorder', handleCreateOrder);

router.get('/order', handleGetOrder);

router.put('/order/:orderID', handleUpdateOrder);

router.get('/admin/orders', handleAdminOrder);

router.get('/admin/getuser', handleGetUsers);

module.exports = router
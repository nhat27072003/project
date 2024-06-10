const express = require('express');
const router = express.Router();
const { handleSignAccount, handleLogin, handleGetCookie } = require('../controllers/account');
const { handleGetDetailProduct, handleGetAllProduct, handleGetPopular } = require('../controllers/getProduct');
const { deleteProduct, handleUpdateProducct, handleAddProduct } = require('../controllers/manageProduct');
const { handleAddCart, handleGetTotalCart, handleGetCart, handleDeleteCart } = require('../controllers/manageCart');
const { handleAdminOrder } = require('../controllers/manageOrder');
const { handleCreateOrder, handleGetOrder, handleUpdateOrder } = require('../controllers/userOrder');
const { handleGetUsers, getDetailUser, handleUpdateUser, handleDeleteUser, handleGetAllAccount } = require('../controllers/manageUser');
const upload = require('../config/saveImage');
const { authenicateUser } = require('../middleware/auth');

//authenicate user
router.all('*', authenicateUser);

router.get('/acount', handleGetAllAccount);

router.get('/detail-user/:userId', getDetailUser);

router.put('/update-user/:userId', handleUpdateUser);

router.delete('/delete-user/:userId', handleDeleteUser);

router.post('/login', handleLogin);

router.post('/sign', handleSignAccount);

router.get('/cookie', handleGetCookie);

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
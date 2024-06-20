const express = require('express');
const router = express.Router();
const { handleSignAccount, handleLogin, handleGetCookie } = require('../controllers/account');
const { handleGetDetailProduct, handleGetAllProduct, handleGetPopular } = require('../controllers/getProduct');
const { deleteProduct, handleUpdateProducct, handleAddProduct } = require('../controllers/manageProduct');
const { handleAddCart, handleGetTotalCart, handleGetCart, handleDeleteCart } = require('../controllers/manageCart');
const { handleManageOrder, handleStoreUpdateOrder } = require('../controllers/manageOrder');
const { handleCreateOrder, handleGetOrder, handleUpdateOrder } = require('../controllers/userOrder');
const { handleGetUsers, getDetailUser, handleUpdateUser, handleDeleteUser, handleGetAllAccount } = require('../controllers/manageUser');
const upload = require('../config/saveImage');
const { authenicateUser } = require('../middleware/auth');
const { handleCreateReview, handleGetReview } = require('../controllers/reviewProduct');
const { handleGetRevenue, handleGetRevenueMonth, handleAdminGetRevenue, handleAdminGetRevenueCategory, handleStoreGetRevenue, handleStoreGetRevenueCategory } = require('../controllers/revenue');

//authenicate user
router.all('*', authenicateUser);


//manage user
router.get('/acount', handleGetAllAccount);

router.get('/admin/getuser', handleGetUsers);

router.get('/detail-user/:userId', getDetailUser);

router.put('/update-user/:userId', handleUpdateUser);

router.delete('/delete-user/:userId', handleDeleteUser);



//handle authenicate
router.post('/login', handleLogin);

router.post('/sign', handleSignAccount);

router.get('/cookie', handleGetCookie);


//Information products
router.get('/product', handleGetAllProduct);

router.get('/popular', handleGetPopular);


//manage product
router.get('/product/:productId', handleGetDetailProduct);

router.post('/addproduct', upload.single('image'), handleAddProduct);

router.put('/products/:productId', upload.single('image'), handleUpdateProducct);

router.delete('/deleteproduct/:productId', deleteProduct);


//manage Cart
router.get('/getcart', handleGetCart);

router.post('/cart', handleAddCart);

router.get('/totalquantity', handleGetTotalCart);

router.delete('/deleteitem', handleDeleteCart);

//user order
router.get('/order', handleGetOrder);

//manage Order
router.post('/createorder', handleCreateOrder);

router.get('/order', handleGetOrder);

router.put('/order/:orderID', handleUpdateOrder);

router.put('/store/order/update', handleStoreUpdateOrder);

router.get('/store/orders', handleManageOrder);

//review product
router.get('/review', handleGetReview);

router.post('/user/review', handleCreateReview);


//admin revenue
router.post('/admin/revenue', handleAdminGetRevenue);

router.post('/admin/revenue/category', handleAdminGetRevenueCategory);

//store revenue
router.post('/store/revenue', handleStoreGetRevenue);

router.post('/store/revenue/category', handleStoreGetRevenueCategory);

module.exports = router
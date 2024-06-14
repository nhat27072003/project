import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import Login from './Pages/Login';
import Shop from './Pages/Shop';
import Footer from './Components/Footer/Footer';
import Signup from './Pages/Signup';
import OrderList from './Pages/Order';
import ManageOrder from './Pages/admin/ManageOrder/ManageOrder';
import ManageUsers from './Pages/admin/ManageUsers/manageUsers';
import UpdateUser from './Pages/admin/ManageUsers/updateUser';
import AddProduct from './Pages/store/AddProduct/AdProduct';
import CRUDProduct from './Pages/store/CRUDProduct/CRUDProduct';
import UpdateProduct from './Pages/store/UpdateProduct/UpdateProduct';


function App() {
  return (
    <div >
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/trasua' element={<ShopCategory category="tra-sua" />} />
          <Route path='/caphe' element={<ShopCategory category="cafe" />} />
          <Route path='/nuocgiaikhat' element={<ShopCategory category="nuoc-giai-khat" />} />
          <Route path='/order' element={<OrderList />} />
          <Route path='/admin/manageorder' element={<ManageOrder />} />
          <Route path='/store/crudproduct/addproduct' element={<AddProduct />} />
          <Route path='/store/manageproducts' element={< CRUDProduct />} />
          <Route path='/admin/manageusers' element={<ManageUsers />} />
          <Route path='admin/updateuser' element={<UpdateUser />}>
            <Route path=':userId' element={<UpdateUser />} />
          </Route>
          <Route path='/store/crudproduct/updateproduct' element={< UpdateProduct />}>
            <Route path=':productId' element={<UpdateProduct />} />
          </Route>
          <Route path='/product' element={<Product />}>
            <Route path=':productId' element={<Product />} />
          </Route>
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

const express = require('express');
const app = express();
const sql = require('mssql');
const path = require('path');
const cloudinary= require('cloudinary').v2;

const config = {
    user: 'project',         // Thay thông tin đăng nhập của tài khoản vừa tạo
    password: '123', // Password
    server: 'localhost',    // Ở đây mình đặt DB trên localhost
    database: 'beverage',    // Chổ này thay bằng DB name của bạn
    trustServerCertificate: true,
    options: {
        enableArithAbort: true,
        encrypt: true
    }
};
cloudinary.config({
    cloud_name: 'dx0tsobsq',
    api_key: '589787329286127',
    api_secret: 'X17Cu-50buVY_MWR9zsz_XpY9X0',
  });

const pool = new sql.ConnectionPool(config);

const {check, validationResult} = require('express-validator');
const multer = require('multer');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
  }));
const cors = require('cors');
const { fail } = require('assert');
app.use(cors());
var request = new sql.Request();
//app.use(express.json());
/*
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
*/
// Thiết lập Multer để lưu trữ ảnh trong thư mục 'imageproduct'
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'imageproduct/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });


app.get('/acount', async function (req, res) {
    var sqlstring = 'SELECT * FROM Users';
    try {
        await pool.connect();
        const result = await pool.request()  
        .query(sqlstring);

        //console.log(result);
        res.json(result);
      } catch (err) {
        //console.error('Error:', err);
        res.status(500).json({ message: 'Internal Server Error' });
      } finally {
        if(pool)
          await pool.close();
      }
});

app.post('/login', async function(req, res){
    var sqlstring = "SELECT * FROM Users WHERE username= @username AND password= @password";
    try {
      //console.log(req.body);
        await pool.connect();
        const result = await pool.request()
            .input('username', sql.VarChar, req.body.username)
            .input('password', sql.VarChar, req.body.password)
            .query(sqlstring);

        //console.log(result.recordset);

        const errors = validationResult(req);
      
        if (!errors.isEmpty()) {
          //console.log(errors);
           //Trả về lỗi kiểm tra validation
           res.json({success: false});
          }else {
            if (result.recordset.length > 0) {
                // Trả về thông báo thành công nếu có dữ liệu được trả về
                res.json({success: true});
            } else {
                // Trả về thông báo thất bại nếu không có dữ liệu được trả về
                res.json({success: false});
            }
          }
    } catch (err) {
        //console.error('Error:', err);
        // Xử lý lỗi và trả về thông báo lỗi chi tiết
        res.json({success: false});
    } finally {
      if(pool)
        await pool.close(); // Đóng kết nối trở lại pool
    }
});


app.post('/sign', async function (req, res) {
  try {
    var sqlstr = "SELECT * FROM Users WHERE username= @username";
    //console.log(req.body);
      await pool.connect();
      const result = await pool.request()
          .input('username', sql.VarChar, req.body.username)
          .query(sqlstr);
      //console.log(result.recordset);

      if(result.recordset.length <= 0){
        // var sqlstring = "INSERT INTO Users (username, email, password) VALUES (@username, @email, @password)";
        // await pool.connect();
        // const result = await pool.request()
        // .input('username',sql.VarChar, req.body.username)
        // .input('email',sql.VarChar, req.body.email)
        // .input('password',sql.VarChar, req.body.password)    
        // .query(sqlstring);
        // console.log(result);
        // res.json({success: true});

        //create cart
        const sqlstring = `DECLARE @InsertedData TABLE (UserID INT) 
        INSERT INTO Users (username, email, password) 
        OUTPUT INSERTED.UserID INTO @InsertedData
        VALUES (@username, @email, @password);
        
        DECLARE @UserID INT;
        SELECT @UserID = UserID FROM @InsertedData;

        INSERT INTO Cart (UserID, created)
        VALUES (@UserID, 1)`;

      const result = await pool.request()
        .input('username', sql.VarChar, req.body.username)
        .input('email', sql.VarChar, req.body.email)
        .input('password', sql.VarChar, req.body.password)
        .query(sqlstring);

      //console.log(result);
      res.json({ success: true });

      }else {
        res.json({success: false});
      }
  } catch (err) {
    //console.error('Error:', err);
    //res.status(500).json({ success: false });
  } finally {
    if(pool)
      await pool.close(); // Đóng kết nối trở lại pool
  }
    
});

app.get('/product', async function (req, res) {
  try {
    await pool.connect();
    const result = await pool.request().query('SELECT * FROM Product where available = 1');
    //console.log(result);
    res.json(result);
  } catch (err) {
    //console.error('Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    if(pool)
      await pool.close(); // Đóng kết nối trở lại pool
  }
});

app.get('/popular', async (req, res)=>{
  try{
    await pool.connect();
    const sqlstring = `SELECT TOP 10 op.productID,p.name, p.price,p.imageUrl,p.stock, sum(op.quantity) as appearance_count
    FROM OrderProduct op
    JOIN Product p ON op.productID = p.productID
    WHERE p.available = 1
    GROUP BY op.productID, p.name, p.price,p.stock, p.imageUrl
    ORDER BY appearance_count DESC;`;

    const result = await pool.request()
      .query(sqlstring);
    
    console.log(result);
    res.json(result);
    //await pool.close();
  }
  catch(err){
    console.log(err);
  }
  finally{
    if(pool)
      await pool.close();
  }
})

app.get('/product/:productId', async (req, res) => {
    try {
      const productId = req.params.productId;
      await pool.connect();
  
      const request = pool.request();
  
      const query = `SELECT name, price, stock, category, imageURL FROM Product WHERE productID = @productId`;
  
      const result = await request
        .input('productId', sql.Int, parseInt(productId))
        .query(query);
  
      if (result.recordset.length > 0) {
        const productData = result.recordset[0];
        res.json(productData);
      } else {
        res.status(404).json({ message: 'Product not found' });
      }
    } catch (err) {
      //console.error('Error fetching product data:', err);
      res.status(500).json({ message: 'Internal Server Error' });
    } finally {
      if(pool)
        await pool.close(); // Đóng kết nối trở lại pool
    }
  });

/*
app.post('/addproduct', upload.single('image'), async (req, res) => {
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

app.post('/addproduct', upload.single('image'), async (req, res) => {
    try {
        let imageUrl = null;
        //console.log(req.file);

        // Nếu có file ảnh từ client, tải lên Cloudinary và nhận URL
        if (req.file) {
            const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path);
            imageUrl = cloudinaryResponse.secure_url;
        }

        await pool.connect();

        // Chèn dữ liệu vào SQL Server với URL của ảnh (nếu có)
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
    finally{
      if(pool)
        await pool.close();
    }
});
/*
app.put('/products/:productId', upload.single('image'), async (req, res) => {
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
app.put('/products/:productId', upload.single('image'), async (req, res) => {
    const productId = req.params.productId;
    try {
      let imageUrl = null;
        console.log(req.file);
      // Nếu có file ảnh từ client, tải lên Cloudinary và nhận URL
      if (req.file) {
        const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path);
        imageUrl = cloudinaryResponse.secure_url;
      }
  
      await pool.connect();
  
      // Sửa thông tin sản phẩm trong SQL Server
      const request = pool.request();
  
      if (imageUrl) {
        await request
          .input('productId', sql.Int, parseInt(productId))
          .input('productName', sql.NVarChar, req.body.productName)
          .input('price', sql.Int, parseInt(req.body.price))
          .input('quantity', sql.Int, parseInt(req.body.quantity))
          .input('imageUrl', sql.NVarChar, imageUrl)
          .input('category', sql.VarChar, req.body.category)
          .query('UPDATE Product SET name = @productName, price = @price, stock = @quantity, imageUrl = @imageUrl, category = @category WHERE productID = @productId');
      } else {
        await request
          .input('productId', sql.Int, parseInt(productId))
          .input('productName', sql.NVarChar, req.body.productName)
          .input('price', sql.Int, parseInt(req.body.price))
          .input('quantity', sql.Int, parseInt(req.body.quantity))
          .input('category', sql.VarChar, req.body.category)
          .query('UPDATE Product SET name = @productName, price = @price, stock = @quantity, category = @category WHERE productID = @productId');
      }
  
      res.json({ success: true, message: 'Product updated successfully' });
    } catch (error) {
      //console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    } finally {
      if(pool)
        await pool.close(); // Đóng kết nối trở lại pool
    }
  });
  
  app.delete('/deleteproduct/:productId', async (req, res) => {
    try {
      const productId = req.params.productId;
      //console.log(productId);
      await pool.connect();
  
      // Check if the product exists
      const checkProduct = await pool.request()
        .input('productId', sql.Int, productId)
        .query('SELECT * FROM Product WHERE productID = @productId');
  
      if (checkProduct.recordset.length === 0) {
        return res.status(404).json({ success: false, message: 'Product not found' });
      }
  
      // Delete the product from SQL Server
      const deleteRequest = pool.request();
      await deleteRequest
        .input('productId', sql.Int, productId)
        .query('UPDATE Product SET available = 0 WHERE productID = @productId');
  
      res.json({ success: true, message: 'Product deleted successfully' });
    } catch (error) {
      //console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    } finally {
      if(pool)
        await pool.close();
    }
  });  
  
app.post('/cart', async (req, res)=>{
  try {
    //console.log(req.body);
    const username = req.body.userData;
    const productID = req.body.productID;
  
    const sqlstring = `
      SELECT cp.cartProductID FROM CartProduct cp
      JOIN Cart c ON c.cartID = cp.cartID
      JOIN Product p ON p.productID = cp.productID
      JOIN Users u ON u.userID = c.userID
      WHERE u.username = @username
      AND p.productID = @productID
    `;
  
    await pool.connect();
  
    const result = await pool.request()
      .input('username', sql.VarChar, username)
      .input('productID', sql.Int, productID)
      .query(sqlstring);
  
    //console.log(result.recordset);
    if (result.recordset.length > 0) {
      const cartProductID = result.recordset[0].cartProductID;
      await pool.request()
      .input('cartProductID', sql.Int, cartProductID)
      .query(`UPDATE CartProduct
              SET quantity = quantity + 1
              WHERE  CartProduct.cartProductID = @cartProductID;`);

    } else {
      const sqlstr = `
        INSERT INTO CartProduct (cartID, productID, quantity)
        VALUES (@cartID, @productID, 1);
      `;
  
      const cartIDResult = await pool.request()
        .input('username', sql.VarChar, username)
        .query('SELECT cartID FROM Cart WHERE userID = (SELECT userID FROM Users WHERE username = @username)');

      const cartID = cartIDResult.recordset[0].cartID;
  
      await pool.request()
        .input('cartID', sql.Int, cartID)
        .input('productID', sql.Int, productID)
        .query(sqlstr);
    }
  
    res.json({ success: true });
  } catch (err) {
    //console.log(err);
  } finally {
    if(pool)
      await pool.close();
  }
  
});

app.post('/totalquantity', async (req, res)=>{
  try{
    await pool.connect();
    const username = req.body.username;
    const sqlstring = `SELECT u.username,
                      SUM(cp.quantity) AS totalQuantity
                      FROM CartProduct cp
                        JOIN Cart c ON c.cartID = cp.cartID
                        JOIN Users u ON u.userID = c.userID
                      WHERE u.username = @username
                      GROUP BY u.username`;
    const result = await pool.request()
    .input('username', sql.VarChar, username)
    .query(sqlstring);
    console.log('totalquantity');
    if(result.recordset.length > 0){
      res.json({total: result.recordset[0].totalQuantity});
    }
    else {
      res.json({total: 0});
    }

  }
  catch(err){
    console.log(err);
  }
  finally{
    if(pool)
      await pool.close();
  }
});

app.post('/getcart', async (req, res)=>{
  try{
    await pool.connect();
    console.log("loi lay gio hang:", req.body.username);
      const sqlstring = `SELECT p.productID,p.imageUrl,p.name,p.price,cp.quantity,p.price*cp.quantity as sum
                        FROM
                          CartProduct cp
                          JOIN Cart c ON c.cartID = cp.cartID
                          JOIN Users u ON u.userID = c.userID
                          JOIN Product p on cp.productID=p.productID
                        WHERE
                          u.username = @username
                        GROUP BY
                          cp.quantity, p.name,p.price,p.imageUrl,p.productID`;
    
      const result = await pool.request()
      .input('username',sql.VarChar, req.body.username)
      .query(sqlstring);
      console.log(result.recordset);
      res.json(result.recordset);
  }
  catch(err){
    console.log(err);
  }
  finally{
    if(pool)
      await pool.close();
  }
});

app.post('/deleteitem', async (req, res)=>{
  try{
    const id = req.body.id;
    const username = req.body.username;
    console.log(req.body.id,req.body.username);
    const sqlstring = `select cp.cartProductID, cp.quantity from cartProduct cp
                      join Product p on p.productID = cp.productID
                      join Cart c on c.cartID = cp.cartID 
                      join Users u on u.userID = c.userID
                      where u.username = @username and p.productID = @id`;
    await pool.connect();
    const result = await pool.request()
    .input('username',sql.VarChar, username)
    .input('id', sql.Int, id)
    .query(sqlstring);

    if(result.recordset.length > 0){
      if(result.recordset[0].quantity > 1){
        const cartProductID = result.recordset[0].cartProductID;
        console.log(cartProductID);
        await pool.request()
        .input('cartProductID', sql.Int, cartProductID)
        .query(`UPDATE CartProduct
                SET quantity = quantity - 1
                WHERE  CartProduct.cartProductID = @cartProductID;`);
        
        res.json({success: true});
      }
      else{
          const cartProductID = result.recordset[0].cartProductID;
          await pool.request()
          .input('cartProductID', sql.Int, cartProductID)
          .query(`DELETE FROM CartProduct
          WHERE cartProductID = @cartProductID`);
          res.json({success:true});
      }
    }
    
  }
  catch(err){
    console.log(err);
    res.json({success: false});
  }
  finally{
    if(pool)
      await pool.close();
  }
});

app.post('/createorder', async (req, res)=>{
  try{
    console.log(req.body);
    await pool.connect();
    const user = await pool.request()
                      .input('username',sql.VarChar, req.body.username)
                      .query('select Users.userID from Users where Users.username = @username');
    if(user.recordset.length > 0){
      const userID = user.recordset[0].userID;
      const oder = await pool.request()
                        .input('userID',sql.Int, userID)
                        .input('total', sql.Int , req.body.total)
                        .input('address', sql.NVarChar, req.body.address)
                        .query(`insert into Orders (userID, status, sum, address) values(@userID,0,@total,@address)`);
      
      const orderProduct = await pool.request()
                                .input('userID', sql.Int, userID)
                                .query('select top 1 orderID from Orders where userID = @userID order by orderID desc');
       console.log(orderProduct.recordset);
       if(orderProduct.recordset.length > 0){
         const orderID = orderProduct.recordset[0].orderID;
         for (const product of req.body.products) {
          await pool.request()
            .input('orderID', sql.Int, orderID)
            .input('productID', sql.Int, product.productID)
            .input('quantity', sql.Int, product.quantity)
            .input('price', sql.Int, product.price)
            .query('insert into OrderProduct (orderID, productID, quantity, priceProduct) values(@orderID, @productID, @quantity, @price)');
        }

        const cart = await pool.request()
        .input('userID',sql.Int, userID)
        .query('select cartID from Cart where userID = @userID');
        
        const cartID = cart.recordset[0].cartID;
        await pool.request()
        .input('cartID',sql.Int, cartID)
        .query('delete from cartProduct where cartID = @cartID');
        res.json({success: true});

       }                 
    }
  }
  catch(err){
    console.log(err);
    res.json({success: false});
  }
  finally{
    if(pool)
      await pool.close();
  }
});

app.post('/order', async (req, res)=>{
  try{
    await pool.connect();
    const username = req.body.username;
    const sqlstring = `SELECT o.orderID, o.status, o.sum ,o.address,o.orderDate, op.oderProductID, op.quantity, op.priceProduct,p.*
                      FROM Orders o
                      JOIN Users u ON u.userID = o.userID
                      JOIN OrderProduct op ON o.orderID = op.orderID
                      Join Product p ON p.productID = op.productID
                      WHERE u.username = @username`

    const result = await pool.request()
                  .input('username', sql.VarChar, username)
                  .query(sqlstring);
    
    console.log(result);
    res.json(result.recordset);
          
  }
  catch(err){
    console.log(err);
    res.json(err);
  }
  finally{
    if(pool)
      await pool.close();
  }
})

app.put('/order/:orderID', async (req, res)=>{
  try{
    await pool.connect();
    const orderID = req.params.orderID;
    console.log(orderID);
    const result = await pool.request()
      .input('orderID', sql.Int, orderID)
      .query('update Orders SET status = 1 WHERE orderID = @orderID');
    res.json(result);
  }
  catch(err){
    console.log(err);
  }
  finally{
    if(pool)
      await pool.close();
  }
})
app.get('/admin/orders', async (req, res)=>{
  try{
    await pool.connect();
    const sqlstring = `SELECT u.username,o.orderID, o.status, o.sum,o.address,o.orderDate, op.oderProductID, op.quantity, op.priceProduct,p.*
                      FROM Orders o
                      JOIN Users u ON u.userID = o.userID
                      JOIN OrderProduct op ON o.orderID = op.orderID
                      Join Product p ON p.productID = op.productID`;
    const result = await pool.request()
                  .query(sqlstring);
    res.json(result.recordset);
    console.log(result.recordset);

  }
  catch(err){
    console.log(err);
  }
  finally{
    if(pool)
      await pool.close();
  }
})
app.listen(8081, () => console.log(`Server is starting at port 8081`));

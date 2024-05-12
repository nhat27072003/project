const cloudinary = require('../config/cloudinary');
const { pool, sql } = require('../config/database');
const upload = require('../config/saveImage');
const addProduct = async (req, res) => {
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
  finally {
    if (pool)
      await pool.close();
  }
};

const updateProducct = async (req, res) => {
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
    if (pool)
      await pool.close(); // Đóng kết nối trở lại pool
  }
};

const deleteProduct = async (req, res) => {
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
    if (pool)
      await pool.close();
  }
};

module.exports = {
  addProduct,
  updateProducct,
  deleteProduct
}
const { pool, sql } = require('../config/database')

const addProduct = async (values) => {
  try {
    await pool.connect();

    const request = pool.request();
    await request
      .input('name', sql.NVarChar, values.productName)
      .input('price', sql.Int, parseInt(values.price))
      .input('quantity', sql.Int, parseInt(values.quantity))
      .input('imageUrl', sql.NVarChar, values.imageUrl)
      .input('category', sql.VarChar, values.category)
      .query('INSERT INTO Product (name, price, stock, imageUrl, category) VALUES (@name, @price, @quantity, @imageUrl, @category)');

    return {
      EM: "OK",
      EC: 0,
      DT: []
    }
  }
  catch (error) {
    return {
      EC: 1,
      EM: "server error",
      DT: []
    }
  }
}

const updateProducct = async (values) => {
  try {
    await pool.connect();

    // Sửa thông tin sản phẩm trong SQL Server
    const request = pool.request();

    if (values.imageUrl) {
      await request
        .input('productId', sql.Int, parseInt(values.productId))
        .input('productName', sql.NVarChar, values.productName)
        .input('price', sql.Int, parseInt(values.price))
        .input('quantity', sql.Int, parseInt(values.quantity))
        .input('imageUrl', sql.NVarChar, values.imageUrl)
        .input('category', sql.VarChar, values.category)
        .query('UPDATE Product SET name = @productName, price = @price, stock = @quantity, imageUrl = @imageUrl, category = @category WHERE productID = @productId');
    } else {
      await request
        .input('productId', sql.Int, parseInt(values.productId))
        .input('productName', sql.NVarChar, values.productName)
        .input('price', sql.Int, parseInt(values.price))
        .input('quantity', sql.Int, parseInt(values.quantity))
        .input('category', sql.VarChar, values.category)
        .query('UPDATE Product SET name = @productName, price = @price, stock = @quantity, category = @category WHERE productID = @productId');
    }

    return {
      EM: "OK",
      EC: 0,
      DT: [],
    }
  } catch (error) {
    return {
      EM: "server error",
      EC: 1,
      Dt: []
    }
  }
};

const delProduct = async (productId) => {
  try {
    await pool.connect();

    // Check if the product exists
    const checkProduct = await pool.request()
      .input('productId', sql.Int, productId)
      .query('SELECT * FROM Product WHERE productID = @productId');

    if (checkProduct.recordset.length === 0) {
      return res.status(404).json({ EC: 2, EM: 'Product not found', DT: [] });
    }

    // Delete the product from SQL Server
    const deleteRequest = pool.request();
    await deleteRequest
      .input('productId', sql.Int, productId)
      .query('UPDATE Product SET available = 0 WHERE productID = @productId');

    return {
      EM: "Delete successfully",
      EC: 0,
      DT: []
    }
  } catch (error) {
    return {
      EM: "server error",
      EC: 1,
      DT: []
    }
  }
}

module.exports = {
  delProduct,
  addProduct,
  updateProducct
}
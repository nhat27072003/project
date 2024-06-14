const { pool, sql } = require('../config/database')

const addProduct = async (values) => {
  try {
    await pool.connect();

    const request = pool.request();
    await request
      .input('name', sql.NVarChar, values.productName)
      .input('price', sql.Int, parseInt(values.price))
      .input('description', sql.NVarChar, values.description)
      .input('imageUrl', sql.NVarChar, values.imageUrl)
      .input('category', sql.VarChar, values.category)
      .input('userId', sql.Int, values.userId)
      .query('INSERT INTO Product (name, price, description, imageUrl, category, userId) VALUES (@name, @price, @description, @imageUrl, @category, @userId)');

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
        .input('description', sql.NVarChar, values.description)
        .input('imageUrl', sql.NVarChar, values.imageUrl)
        .input('category', sql.VarChar, values.category)
        .query('UPDATE Product SET name = @productName, price = @price, description = @description, imageUrl = @imageUrl, category = @category WHERE productID = @productId');
    } else {
      await request
        .input('productId', sql.Int, parseInt(values.productId))
        .input('productName', sql.NVarChar, values.productName)
        .input('price', sql.Int, parseInt(values.price))
        .input('description', sql.NVarChar, values.description)
        .input('category', sql.VarChar, values.category)
        .query('UPDATE Product SET name = @productName, price = @price, description = @description, category = @category WHERE productID = @productId');
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
      DT: []
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
      return { EC: 2, EM: 'Product not found', DT: [] };
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
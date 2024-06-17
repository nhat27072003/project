const { pool, sql } = require('../config/database');

const getAllProduct = async () => {
  try {
    await pool.connect();
    const result = await pool.request().query('SELECT * FROM Product where available = 1');

    return {
      EM: 'OK',
      EC: 0,
      DT: result.recordset
    }
  }
  catch (error) {
    return {
      EM: 'server error',
      EC: 1,
      DT: []
    }
  }
}

const getPopular = async () => {
  try {
    await pool.connect();
    const sqlstring = `SELECT TOP 10 op.productID,p.name, p.price,p.imageUrl,p.stock, sum(op.quantity) as routerearance_count
    FROM OrderProduct op
    JOIN Product p ON op.productID = p.productID
    WHERE p.available = 1
    GROUP BY op.productID, p.name, p.price,p.stock, p.imageUrl
    ORDER BY routerearance_count DESC;`;

    const result = await pool.request()
      .query(sqlstring);

    return {
      EM: 'OK',
      EC: 0,
      DT: result.recordset
    }
  }
  catch (error) {
    return {
      EM: 'server error',
      EC: 1,
      DT: []
    }
  }
}

const getDetailProduct = async (productId) => {
  try {
    await pool.connect();
    const request = pool.request();

    const query = `SELECT p.* ,u.name as storeName FROM Product p 
                  JOIN Users u ON u.userID=p.userId 
                  WHERE productID = @productId`;

    const result = await request
      .input('productId', sql.Int, parseInt(productId))
      .query(query);

    return {
      EC: 0,
      EM: "OK",
      DT: result.recordset[0]
    };
  }
  catch (error) {
    return {
      EC: 1,
      EM: "server error",
      DT: []
    }
  }
}
module.exports = {
  getAllProduct,
  getPopular,
  getDetailProduct
}
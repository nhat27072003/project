const { pool, sql } = require('../config/database');

const getAllProduct = async () => {
  await pool.connect();
  const result = await pool.request().query('SELECT * FROM Product where available = 1');
  return result;
}

const getPopular = async () => {
  await pool.connect();
  const sqlstring = `SELECT TOP 10 op.productID,p.name, p.price,p.imageUrl,p.stock, sum(op.quantity) as routerearance_count
    FROM OrderProduct op
    JOIN Product p ON op.productID = p.productID
    WHERE p.available = 1
    GROUP BY op.productID, p.name, p.price,p.stock, p.imageUrl
    ORDER BY routerearance_count DESC;`;

  const result = await pool.request()
    .query(sqlstring);
  return result;
}

const getDetailProduct = async (productId) => {
  await pool.connect();
  const request = pool.request();

  const query = `SELECT name, price, stock, category, imageURL FROM Product WHERE productID = @productId`;

  const result = await request
    .input('productId', sql.Int, parseInt(productId))
    .query(query);

  return result;
}
module.exports = {
  getAllProduct,
  getPopular,
  getDetailProduct
}
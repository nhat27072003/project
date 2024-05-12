const { pool, sql } = require('../config/database');

const getAllProduct = async (req, res) => {
  try {
    await pool.connect();
    const result = await pool.request().query('SELECT * FROM Product where available = 1');
    //console.log(result);
    res.json(result);
  } catch (err) {
    //console.error('Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    if (pool);
    //await pool.close(); // Đóng kết nối trở lại pool
  }
};

const getPopular = async (req, res) => {
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
    res.json(result);
    //await pool.close();
  }
  catch (err) {
    console.log(err);
  }
  finally {
    if (pool)
      await pool.close();
  }
};

const getDetailProduct = async (req, res) => {
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
    if (pool)
      await pool.close(); // Đóng kết nối trở lại pool
  }
};

module.exports = {
  getAllProduct,
  getPopular,
  getDetailProduct
}
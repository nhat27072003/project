const { pool } = require('../config/database')

const adminOrder = async () => {
  await pool.connect();
  const sqlstring = `SELECT u.username,o.orderID, o.status, o.sum,o.address,o.orderDate, op.oderProductID, op.quantity, op.priceProduct,p.*
                    FROM Orders o
                    JOIN Users u ON u.userID = o.userID
                    JOIN OrderProduct op ON o.orderID = op.orderID
                    Join Product p ON p.productID = op.productID`;
  const result = await pool.request()
    .query(sqlstring);
  return result;
}

module.exports = {
  adminOrder
}
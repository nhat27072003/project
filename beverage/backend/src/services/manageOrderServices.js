const { pool, sql } = require('../config/database')

const getStoreOrder = async (storeId) => {
  try {
    await pool.connect();
    const sqlstring = `SELECT uu.username,o.orderID, o.status, o.sum,o.address, o.phone,o.orderDate, op.oderProductID, op.quantity, op.priceProduct,p.*
                    FROM Orders o
                    JOIN Users u ON u.userID = o.userID
                    JOIN OrderProduct op ON o.orderID = op.orderID
                    Join Product p ON p.productID = op.productID
                    JOIN Users uu on uu.userID=o.userID
                    where o.storeId =  @storeId`;
    const result = await pool.request()
      .input('storeId', sql.Int, storeId)
      .query(sqlstring);

    return {
      EC: 0,
      EM: "OK",
      DT: result.recordset
    }
  }
  catch (error) {
    console.log(error)
    return {
      EC: 1,
      EM: "server error",
      DT: []
    }
  }
}
const storeUpdateOrder = async (orderId, status) => {
  try {
    await pool.connect();

    const sqlstr = `update Orders SET status = @status WHERE orderID = @orderID`

    await pool.request()
      .input('status', sql.Int, status)
      .input('orderID', sql.Int, orderId)
      .query(sqlstr);

    return {
      EC: 0,
      EM: "OK",
      DT: []
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
  getStoreOrder,
  storeUpdateOrder
}
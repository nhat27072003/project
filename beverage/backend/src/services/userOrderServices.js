const { pool, sql } = require('../config/database')

const createOrder = async (userOrder) => {
  try {
    await pool.connect();
    const user = await pool.request()
      .input('username', sql.VarChar, userOrder.username)
      .query('select Users.userID from Users where Users.username = @username');

    if (user.recordset.length > 0) {
      const userID = user.recordset[0].userID;
      await pool.request()
        .input('userID', sql.Int, userID)
        .input('total', sql.Int, userOrder.total)
        .input('address', sql.NVarChar, userOrder.address)
        .query(`insert into Orders (userID, status, sum, address) values(@userID,0,@total,@address)`);

      const order = await pool.request()
        .input('userID', sql.Int, userID)
        .query('select top 1 orderID from Orders where userID = @userID order by orderID desc');

      if (order.recordset.length > 0) {
        const orderID = order.recordset[0].orderID;
        for (const product of userOrder.products) {
          await pool.request()
            .input('orderID', sql.Int, orderID)
            .input('productID', sql.Int, product.productID)
            .input('quantity', sql.Int, product.quantity)
            .input('price', sql.Int, product.price)
            .query('insert into OrderProduct (orderID, productID, quantity, priceProduct) values(@orderID, @productID, @quantity, @price)');
        }

        const cart = await pool.request()
          .input('userID', sql.Int, userID)
          .query('select cartID from Cart where userID = @userID');

        const cartID = cart.recordset[0].cartID;
        await pool.request()
          .input('cartID', sql.Int, cartID)
          .query('delete from cartProduct where cartID = @cartID');

        return {
          EC: 0,
          EM: "OK",
          DT: []
        };
      }
      else return {
        EC: 3,
        EM: "No order of user",
        DT: []
      };
    }
    else return {
      EC: 3,
      EM: "NO user",
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
const getOrder = async (username) => {
  try {
    await pool.connect();
    const sqlstring = `SELECT o.orderID, o.status, o.sum ,o.address,o.orderDate, op.oderProductID, op.quantity, op.priceProduct,p.*
                    FROM Orders o
                    JOIN Users u ON u.userID = o.userID
                    JOIN OrderProduct op ON o.orderID = op.orderID
                    Join Product p ON p.productID = op.productID
                    WHERE u.username = @username`

    const result = await pool.request()
      .input('username', sql.VarChar, username)
      .query(sqlstring)
    return {
      EM: "OK",
      EC: 0,
      DT: result.recordset
    }
  } catch (error) {
    return {
      EM: "server error",
      EC: 1,
      DT: []
    }
  }
}
const updateOrder = async (orderID) => {
  try {
    await pool.connect();
    const result = await pool.request()
      .input('orderID', sql.Int, orderID)
      .query('update Orders SET status = 1 WHERE orderID = @orderID');
    return {
      EC: 0,
      EM: "OK",
      DT: result.recordset
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
module.exports = {
  createOrder,
  getOrder,
  updateOrder
}
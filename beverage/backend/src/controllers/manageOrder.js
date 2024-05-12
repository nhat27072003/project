const { pool, sql } = require('../config/database')

const createOrder = async (req, res) => {
  try {
    console.log(req.body);
    await pool.connect();
    const user = await pool.request()
      .input('username', sql.VarChar, req.body.username)
      .query('select Users.userID from Users where Users.username = @username');
    if (user.recordset.length > 0) {
      const userID = user.recordset[0].userID;
      const oder = await pool.request()
        .input('userID', sql.Int, userID)
        .input('total', sql.Int, req.body.total)
        .input('address', sql.NVarChar, req.body.address)
        .query(`insert into Orders (userID, status, sum, address) values(@userID,0,@total,@address)`);

      const orderProduct = await pool.request()
        .input('userID', sql.Int, userID)
        .query('select top 1 orderID from Orders where userID = @userID order by orderID desc');
      console.log(orderProduct.recordset);
      if (orderProduct.recordset.length > 0) {
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
          .input('userID', sql.Int, userID)
          .query('select cartID from Cart where userID = @userID');

        const cartID = cart.recordset[0].cartID;
        await pool.request()
          .input('cartID', sql.Int, cartID)
          .query('delete from cartProduct where cartID = @cartID');
        res.json({ success: true });

      }
    }
  }
  catch (err) {
    console.log(err);
    res.json({ success: false });
  }
  finally {
    if (pool)
      await pool.close();
  }
}
const getOrder = async (req, res) => {
  try {
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
  catch (err) {
    console.log(err);
    res.json(err);
  }
  finally {
    if (pool)
      await pool.close();
  }
}
const updateOrder = async (req, res) => {
  try {
    await pool.connect();
    const orderID = req.params.orderID;
    console.log(orderID);
    const result = await pool.request()
      .input('orderID', sql.Int, orderID)
      .query('update Orders SET status = 1 WHERE orderID = @orderID');
    res.json(result);
  }
  catch (err) {
    console.log(err);
  }
  finally {
    if (pool)
      await pool.close();
  }
}
const adminOrder = async (req, res) => {
  try {
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
  catch (err) {
    console.log(err);
  }
  finally {
    if (pool)
      await pool.close();
  }
}

module.exports = {
  createOrder,
  getOrder,
  updateOrder,
  adminOrder
}
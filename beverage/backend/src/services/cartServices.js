const { pool, sql } = require('../config/database');

const addCart = async (username, productID) => {
  try {
    const sqlstring = `
    SELECT cp.cartProductID FROM CartProduct cp
    JOIN Cart c ON c.cartID = cp.cartID
    JOIN Product p ON p.productID = cp.productID
    JOIN Users u ON u.userID = c.userID
    WHERE u.username = @username
    AND p.productID = @productID
  `;

    await pool.connect();

    const result = await pool.request()
      .input('username', sql.VarChar, username)
      .input('productID', sql.Int, productID)
      .query(sqlstring);


    if (result.recordset.length > 0) {
      const cartProductID = result.recordset[0].cartProductID;
      await pool.request()
        .input('cartProductID', sql.Int, cartProductID)
        .query(`UPDATE CartProduct
            SET quantity = quantity + 1
            WHERE  CartProduct.cartProductID = @cartProductID;`);

    } else {
      const sqlstr = `
      INSERT INTO CartProduct (cartID, productID, quantity)
      VALUES (@cartID, @productID, 1);
    `;

      const cartIDResult = await pool.request()
        .input('username', sql.VarChar, username)
        .query('SELECT cartID FROM Cart WHERE userID = (SELECT userID FROM Users WHERE username = @username)');

      const cartID = cartIDResult.recordset[0].cartID;

      await pool.request()
        .input('cartID', sql.Int, cartID)
        .input('productID', sql.Int, productID)
        .query(sqlstr);

    }
    return {
      EC: 0,
      EM: "OK",
      DT: []
    }
  }
  catch (err) {
    return {
      EM: 'server error',
      EC: 1,
      DT: []
    }
  }
}

const getTotalCart = async (username) => {
  try {
    await pool.connect();
    const sqlstring = `SELECT u.username,
                    SUM(cp.quantity) AS totalQuantity
                    FROM CartProduct cp
                      JOIN Cart c ON c.cartID = cp.cartID
                      JOIN Users u ON u.userID = c.userID
                    WHERE u.username = @username
                    GROUP BY u.username`;
    const result = await pool.request()
      .input('username', sql.VarChar, username)
      .query(sqlstring);

    const total = result.recordset[0].totalQuantity;

    return {
      EM: "OK",
      EC: 0,
      DT: total
    }
  }
  catch (error) {
    return {
      EM: "server error",
      EC: 1,
      DT: 0
    }
  }
}

const getCart = async (username) => {
  try {
    await pool.connect();
    const sqlstring = `SELECT p.productID,p.imageUrl,p.name,p.price,cp.quantity,p.price*cp.quantity as sum
                      FROM
                        CartProduct cp
                        JOIN Cart c ON c.cartID = cp.cartID
                        JOIN Users u ON u.userID = c.userID
                        JOIN Product p on cp.productID=p.productID
                      WHERE
                        u.username = @username
                      GROUP BY
                        cp.quantity, p.name,p.price,p.imageUrl,p.productID`;

    const result = await pool.request()
      .input('username', sql.VarChar, username)
      .query(sqlstring);

    return {
      EM: "OK",
      EC: 0,
      DT: result.recordset
    };
  } catch (error) {
    return {
      EM: "server error",
      EC: 1,
      DT: []
    }
  }

}
const deleteCart = async (id, username) => {
  const sqlstring = `select cp.cartProductID, cp.quantity from cartProduct cp
                    join Product p on p.productID = cp.productID
                    join Cart c on c.cartID = cp.cartID 
                    join Users u on u.userID = c.userID
                    where u.username = @username and p.productID = @id`;

  await pool.connect();
  const result = await pool.request()
    .input('username', sql.VarChar, username)
    .input('id', sql.Int, id)
    .query(sqlstring);

  if (result.recordset.length > 0) {
    if (result.recordset[0].quantity > 1) {
      const cartProductID = result.recordset[0].cartProductID;
      await pool.request()
        .input('cartProductID', sql.Int, cartProductID)
        .query(`UPDATE CartProduct
                SET quantity = quantity - 1
                WHERE  CartProduct.cartProductID = @cartProductID;`);
    }
    else {
      const cartProductID = result.recordset[0].cartProductID;
      await pool.request()
        .input('cartProductID', sql.Int, cartProductID)
        .query(`DELETE FROM CartProduct
          WHERE cartProductID = @cartProductID`);
    }
    return true;
  }
  else return false;
}
module.exports = {
  addCart,
  getTotalCart,
  getCart,
  deleteCart
}
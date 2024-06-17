const { pool, sql } = require("../config/database");

const getReview = async (productId) => {
  try {
    const sqlstr = `SELECT u.username, u.name,r.rating, r.review
                    FROM review r 
                    JOIN Users u ON u.userID= r.userId
                    JOIN Product p ON p.productID=r.productId
                    WHERE p.productID = @productId`;

    await pool.connect();

    const result = await pool.request()
      .input('productId', sql.Int, productId)
      .query(sqlstr);

    return {
      EC: 0,
      EM: "OK",
      DT: result.recordset
    }
  }
  catch (error) {
    console.log(error);
    return {
      EC: 2,
      EM: "server error",
      DT: []
    }
  }
}

const createReview = async (values) => {
  try {
    const sqlstr = `INSERT INTO review (orderId, productId, rating, review, userId)
                    VALUES (@orderId, @productId, @rating, @review, @userId);`;

    await pool.connect(); // Connect to the database pool

    await pool.request()
      .input('orderId', sql.Int, values.orderId)
      .input('productId', sql.Int, values.productId)
      .input('rating', sql.Int, values.rating)
      .input('review', sql.NVarChar, values.review)
      .input('userId', sql.Int, values.userId)
      .query(sqlstr);


    return {
      EC: 0,
      EM: "OK",
      DT: []
    };
  } catch (error) {
    console.error("Error inserting review:", error.message);

    return {
      EC: 1,
      EM: "Server error",
      DT: []
    };
  } finally {
    await pool.close(); // Ensure to release the connection back to the pool
  }
};

module.exports = {
  getReview,
  createReview
};

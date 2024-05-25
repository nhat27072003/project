const { pool, sql } = require('../config/database')

const getAllAccount = async () => {
  try {
    var sqlstring = "select count(userID) as total from Users";
    await pool.connect();
    let data = await pool.request()
      .query(sqlstring);

    return data.recordset[0].total;
  }
  catch (error) {
    return 0;
  }
}

const getPage = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;

    let sqlString = `
    SELECT userID, username, email, address, phone FROM Users
    ORDER BY userID
    OFFSET @cur ROWS
    FETCH NEXT @limit ROWS ONLY
    `
    await pool.connect();
    let data = await pool.request()
      .input('cur', sql.Int, offset)
      .input('limit', sql.Int, limit)
      .query(sqlString);

    return {
      EM: "OK",
      EC: 0,
      DT: data.recordset
    }
  }
  catch (error) {
    console.log(error);
    return {
      EM: "server error",
      EC: 1,
      DT: []
    }
  }
}

module.exports = {
  getAllAccount,
  getPage
}
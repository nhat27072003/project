const { pool, sql } = require('../config/database')

const getAllAccount = async () => {
  try {
    var sqlstring = `SELECT u.userID, u.username, u.email, 
      u.address, u.phone, r.name as role , u.status 
      FROM Users u 
	    JOIN Role r ON r.id=u.role`;
    await pool.connect();
    let data = await pool.request()
      .query(sqlstring);

    return {
      EC: 0,
      EM: 'OK',
      DT: data.recordset
    };
  }
  catch (error) {
    console.log(error)
    return {
      EC: 2,
      EM: 'server error',
      DT: []
    }
  }
}

const getPage = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;

    let sqlString = `
    SELECT u.userID, u.username, u.email, u.address, u.phone, r.name as role, u.status FROM Users u
    JOIN Role r ON r.id = u.role
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
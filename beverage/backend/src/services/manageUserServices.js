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
    return {
      EC: 2,
      EM: 'server error',
      DT: []
    }
  }
}

const detailUser = async (userID) => {
  try {
    var sqlstr = `select u.userID, u.username, u.email, u.name, u.address, u.phone, r.name as role 
                from Users u join Role r on r.id=u.role
                where u.userID = @userID`;

    await pool.connect();
    const result = await pool.request()
      .input('userID', sql.Int, userID)
      .query(sqlstr);

    return {
      EC: 0,
      EM: "OK",
      DT: result.recordset[0]
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

const updateUser = async (values) => {
  try {
    await pool.connect();
    const role = await pool.request()
      .input('name', sql.VarChar, values.role)
      .query('select id from Role where name = @name')

    const roleId = role.recordset[0].id;
    if (role.recordset.length > 0) {
      let sqlstr = `UPDATE users
                    SET
                      address = @address,
                      email = @email,
                      name = @name,
                      phone = @phone,
                      role = @role
                    WHERE userID = @userId;`

      await pool.request()
        .input('address', sql.VarChar, values.address)
        .input('email', sql.VarChar, values.email)
        .input('name', sql.VarChar, values.name)
        .input('phone', sql.VarChar, values.phone)
        .input('role', sql.Int, +roleId)
        .input('userId', sql.Int, +values.userID)
        .query(sqlstr);

      return {
        EC: 0,
        EM: "OK",
        DT: []
      }
    }

  }
  catch (error) {
    return {
      EC: 2,
      EM: "server error",
      DT: []
    }
  }
}

const deleteUser = async (userId) => {
  try {
    const sqlstr = `UPDATE users
      SET status = 1
      WHERE userID = @userId;`

    await pool.connect();
    await pool.request()
      .input('userId', sql.Int, +userId)
      .query(sqlstr);

    return {
      EC: 0,
      EM: "ok",
      DT: []
    }
  }
  catch (error) {
    return {
      EC: 2,
      EM: "server error",
      DT: []
    }
  }
}

module.exports = {
  getAllAccount,
  detailUser,
  updateUser,
  deleteUser
}
const { pool, sql } = require('../config/database');
const bcrypt = require('bcrypt');
const saltRounds = 10;


const hassPassword = (password) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  console.log("hash:", hash);
  return hash;
}

const getAccount = async (username, password) => {
  try {
    var sqlstring = "SELECT password FROM Users WHERE username= @username ";
    await pool.connect();
    const result = await pool.request()
      .input('username', sql.VarChar, username)
      .query(sqlstring);

    console.log(result.recordset)
    if (result.recordset.length < 0) {
      return {
        EC: 3,
        EM: "fail login",
        DT: []
      };
    }
    else {
      if (bcrypt.compareSync(password, result.recordset[0].password))
        return {
          EC: 0,
          EM: 'OK',
          DT: []
        };
    }
  }
  catch (error) {
    return {
      EC: 3,
      EM: "fail login",
      DT: []
    }
  }
}

const signAccount = async (user) => {
  var sqlstr = "SELECT * FROM Users WHERE username= @username";

  await pool.connect();
  const checkUser = await pool.request()
    .input('username', sql.VarChar, user.username)
    .query(sqlstr);

  if (checkUser.recordset.length <= 0) {

    const sqlstring = `DECLARE @InsertedData TABLE (UserID INT) 
        INSERT INTO Users (username, email, password) 
        OUTPUT INSERTED.UserID INTO @InsertedData
        VALUES (@username, @email, @password);
        
        DECLARE @UserID INT;
        SELECT @UserID = UserID FROM @InsertedData;
  
        INSERT INTO Cart (UserID, created)
        VALUES (@UserID, 1)`;

    const hassPass = hassPassword(user.password);
    const result = await pool.request()
      .input('username', sql.VarChar, user.username)
      .input('email', sql.VarChar, user.email)
      .input('password', sql.VarChar, hassPass)
      .query(sqlstring);

    return true;
  }
  else return false;
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
    console.log(error);
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
    console.log(error)
    return {
      EC: 2,
      EM: "server error",
      DT: []
    }
  }
}
module.exports = {
  getAccount,
  signAccount,
  detailUser,
  updateUser,
  deleteUser
}
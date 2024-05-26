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

module.exports = {
  getAccount,
  signAccount,
}
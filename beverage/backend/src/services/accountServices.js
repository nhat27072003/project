const { pool, sql } = require('../config/database');

const getAccount = async (username, password) => {
  var sqlstring = "SELECT * FROM Users WHERE username= @username AND password= @password";
  await pool.connect();
  const result = await pool.request()
    .input('username', sql.VarChar, username)
    .input('password', sql.VarChar, password)
    .query(sqlstring);

  return result;
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

    const result = await pool.request()
      .input('username', sql.VarChar, user.username)
      .input('email', sql.VarChar, user.email)
      .input('password', sql.VarChar, user.password)
      .query(sqlstring);

    return true;
  }
  else return false;
}
module.exports = {
  getAccount,
  signAccount,
}
const { pool, sql } = require('../config/database');
const bcrypt = require('bcrypt');
const { createToken, verifyToken } = require('../middleware/JWTAction');
const saltRounds = 10;


const hassPassword = (password) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
}
const getRole = async (username) => {
  try {
    let sqlstr = `select r.name from Role r 
      join Users u on u.role=r.id
      where u.username=@username`;

    await pool.connect();
    const result = await pool.request()
      .input('username', sql.VarChar, username)
      .query(sqlstr)

    return result.recordset[0].name;
  }
  catch (error) {
    return ''
  }
}
const getUrl = async (username) => {
  try {
    let sqlstr = `select a.url from ApiUrl a 
      Join GroupRole r on r.UrlId=a.id
      Join Users u on u.role=r.roleId
      where u.username=@username`;

    await pool.connect();
    const result = await pool.request()
      .input('username', sql.VarChar, username)
      .query(sqlstr)

    return result.recordset;
  }
  catch (error) {

    return []
  }
}
const getAccount = async (username, password) => {
  try {
    var sqlstring = "SELECT email, password FROM Users WHERE username= @username ";
    await pool.connect();
    const result = await pool.request()
      .input('username', sql.VarChar, username)
      .query(sqlstring);

    if (result.recordset.length < 0) {
      return {
        EC: 3,
        EM: "fail login",
        DT: []
      };
    }
    else {
      if (bcrypt.compareSync(password, result.recordset[0].password)) {
        let role = await getRole(username);
        let url = await getUrl(username);
        let payload = {
          email: result.recordset[0].email,
          username: username,
          role: role,
          url
        }
        let token = createToken(payload);
        return {
          EC: 0,
          EM: 'OK',
          DT: {
            access_token: token,
            role
          }
        };
      }
      else {
        return {
          EC: 3,
          EM: "fail login",
          DT: []
        }
      }
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
    await pool.request()
      .input('username', sql.VarChar, user.username)
      .input('email', sql.VarChar, user.email)
      .input('password', sql.VarChar, hassPass)
      .query(sqlstring);

    return true;
  }
  else return false;
}
const getCookie = async (cookie) => {
  const decoded = await verifyToken(cookie);
  if (decoded) {
    return {
      EC: 0,
      EM: "OK",
      DT: {
        user: {
          username: decoded.username,
          role: decoded.role
        },
        isauthenicated: true
      }
    }
  }
  else {
    return {
      EC: 2,
      EM: "verify fail cookie",
      DT: {
        isauthenicated: false,
        user: {
          username: '',
          role: '',
        }
      }
    }
  }
}

module.exports = {
  getAccount,
  signAccount,
  getRole,
  getUrl,
  getCookie
}
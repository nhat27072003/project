const { pool, sql } = require('../config/database');
const { check, validationResult } = require('express-validator');
const getAllAccount = async (req, res) => {
  var sqlstring = 'SELECT * FROM Users';
  try {
    await pool.connect();
    const result = await pool.request()
      .query(sqlstring);

    //console.log(result);
    res.json(result);
  } catch (err) {
    //console.error('Error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  } finally {
    if (pool)
      await pool.close();
  }
};

const getAccount = async (req, res) => {
  var sqlstring = "SELECT * FROM Users WHERE username= @username AND password= @password";
  try {
    await pool.connect();
    const result = await pool.request()
      .input('username', sql.VarChar, req.body.username)
      .input('password', sql.VarChar, req.body.password)
      .query(sqlstring);

    console.log("day nay");

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      //console.log(errors);
      //Trả về lỗi kiểm tra validation
      res.json({ success: false });
    } else {
      if (result.recordset.length > 0) {
        // Trả về thông báo thành công nếu có dữ liệu được trả về
        res.json({ success: true });
      } else {
        // Trả về thông báo thất bại nếu không có dữ liệu được trả về
        res.json({ success: false });
      }
    }
  } catch (err) {
    //console.error('Error:', err);
    // Xử lý lỗi và trả về thông báo lỗi chi tiết
    console.log("co loi o day nay", err)
    res.json({ success: false });
  } finally {
    if (pool)
      await pool.close(); // Đóng kết nối trở lại pool
  }
};
const signAccount = async (req, res) => {
  try {
    var sqlstr = "SELECT * FROM Users WHERE username= @username";
    //console.log(req.body);
    await pool.connect();
    const result = await pool.request()
      .input('username', sql.VarChar, req.body.username)
      .query(sqlstr);
    //console.log(result.recordset);

    if (result.recordset.length <= 0) {
      // var sqlstring = "INSERT INTO Users (username, email, password) VALUES (@username, @email, @password)";
      // await pool.connect();
      // const result = await pool.request()
      // .input('username',sql.VarChar, req.body.username)
      // .input('email',sql.VarChar, req.body.email)
      // .input('password',sql.VarChar, req.body.password)    
      // .query(sqlstring);
      // console.log(result);
      // res.json({success: true});

      //create cart
      const sqlstring = `DECLARE @InsertedData TABLE (UserID INT) 
        INSERT INTO Users (username, email, password) 
        OUTPUT INSERTED.UserID INTO @InsertedData
        VALUES (@username, @email, @password);
        
        DECLARE @UserID INT;
        SELECT @UserID = UserID FROM @InsertedData;
  
        INSERT INTO Cart (UserID, created)
        VALUES (@UserID, 1)`;

      const result = await pool.request()
        .input('username', sql.VarChar, req.body.username)
        .input('email', sql.VarChar, req.body.email)
        .input('password', sql.VarChar, req.body.password)
        .query(sqlstring);

      //console.log(result);
      res.json({ success: true });

    } else {
      res.json({ success: false });
    }
  } catch (err) {
    //console.error('Error:', err);
    //res.status(500).json({ success: false });
  } finally {
    if (pool)
      await pool.close(); // Đóng kết nối trở lại pool
  }

};

module.exports = {
  getAccount,
  getAllAccount,
  signAccount,
}
const { pool, sql } = require('../config/database');
const { check, validationResult } = require('express-validator');
const { getAccount, signAccount } = require('../services/accountServices');

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

const handleGetAccount = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const result = await getAccount(username, password);

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
};
const handleSignAccount = async (req, res) => {
  const user = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  }
  if (signAccount(user)) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
};

module.exports = {
  handleGetAccount,
  getAllAccount,
  handleSignAccount,
}
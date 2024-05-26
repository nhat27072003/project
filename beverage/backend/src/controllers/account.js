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
  if (!req.body.username || !req.body.password) {
    return res.status(200).json({
      EC: 1,
      EM: "missleading information",
      DT: ""
    })
  }
  else {
    const username = req.body.username;
    const password = req.body.password;

    const result = await getAccount(username, password);

    res.status(200).json({
      EC: result.EC,
      EM: result.EM,
      DT: result.DT
    })
  }
};
const handleSignAccount = async (req, res) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    res.status(200).json({
      EC: 1,
      EM: "missleading information",
      DT: ""
    })
  }
  else {
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
  }
};

module.exports = {
  handleGetAccount,
  getAllAccount,
  handleSignAccount,
}
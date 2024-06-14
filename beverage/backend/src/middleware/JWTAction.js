const jwt = require('jsonwebtoken')
require('dotenv').config


const createToken = (payload) => {
  let token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.EXPIRE_IN });
  return token;
}
const verifyToken = (token) => {
  let decoded = null;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  }
  catch (error) {
    decoded = null;
  }
  return decoded;
}

module.exports = {
  createToken,
  verifyToken
}
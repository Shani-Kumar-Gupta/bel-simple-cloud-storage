const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  JWT_SECRET_KEY,
  JWT_ACCESS_TOKEN_EXPIRATION_TIME,
} = require('../config/env.config');

const generateHash = (val) => {
  return bcrypt.hashSync(val, 8);
};

const compareHash = (userPassword, savedPassword) => {
  return bcrypt.compareSync(userPassword, savedPassword);
};

const getAccessToken = (body) => {
  return jwt.sign(body, JWT_SECRET_KEY, {
    expiresIn: JWT_ACCESS_TOKEN_EXPIRATION_TIME,
  });
};

module.exports = {
  generateHash,
  compareHash,
  getAccessToken
};

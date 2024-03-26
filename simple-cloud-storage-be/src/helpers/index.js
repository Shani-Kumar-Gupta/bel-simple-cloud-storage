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

const verifyAuthToken = (req, res, next) => {
  let authToken = req.headers.authtoken;
  if (req.headers && authToken) {
    jwt.verify(authToken, JWT_SECRET_KEY, function (err, decode) {
      if (err) {
        req.userId = null;
        req.message =
          'Auth Token verification failed, some issue with the token';
        next();
      } else {
        req.userId = decode.userId;
        req.message = 'Auth token verification succeeded!';
        next();
      }
    });
  } else {
    req.userId = null;
    req.message = 'Auth token not found';
    next();
  }
};

module.exports = {
  generateHash,
  compareHash,
  getAccessToken,
  verifyAuthToken,
};

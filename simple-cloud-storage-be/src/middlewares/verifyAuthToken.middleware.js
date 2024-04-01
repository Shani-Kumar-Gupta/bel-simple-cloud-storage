const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../config/env.config');

const verifyAuthToken = (req, res, next) => {
  let authToken = req.headers.Authorization;
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

module.exports = verifyAuthToken;
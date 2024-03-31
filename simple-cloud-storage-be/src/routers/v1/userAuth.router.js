const express = require('express');
const { authController } = require('../../controllers');
const { verifyAuthTokenMiddleware } = require('../../middlewares');
const userAuth = express.Router();

userAuth.post('/login', authController.loginUserAuthController);

userAuth.post('/signup', authController.registerUserAuthController);

userAuth.get(
  '/fetchUsersList',
  verifyAuthTokenMiddleware,
  authController.fetchAllUserList
);

module.exports = userAuth;

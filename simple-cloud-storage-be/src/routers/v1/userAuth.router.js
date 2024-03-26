const express = require('express');
const { authController } = require('../../controllers');
const { verifyAuthToken } = require('../../helpers');
const userAuth = express.Router();

userAuth.post('/login', authController.loginUserAuthController);

userAuth.post('/signup', authController.registerUserAuthController);

userAuth.get('/fetchUsersList', verifyAuthToken, authController.fetchAllUserList);

module.exports = userAuth;

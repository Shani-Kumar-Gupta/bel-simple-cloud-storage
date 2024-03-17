const express = require('express');
const { authController } = require('../../controllers');
const userAuth = express.Router();

userAuth.get('/login', authController.loginUserAuthController);

userAuth.post('/signup', authController.registerUserAuthController);

module.exports = userAuth;

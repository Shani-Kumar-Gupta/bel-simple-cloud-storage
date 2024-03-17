const express = require('express');
const userAuth = express.Router();

userAuth.get('/login', (req, res, next) => {});

userAuth.post('/signup', (req, res, next) => {});

module.exports = userAuth;

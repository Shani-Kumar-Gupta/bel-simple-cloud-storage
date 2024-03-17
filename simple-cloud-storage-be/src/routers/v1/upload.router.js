const express = require('express');
const upload = express.Router();

upload.post('/uploadFiles', (req, res, next) => {});

upload.get('/fetchUploadedFiles', (req, res, next) => {});

module.exports = upload;

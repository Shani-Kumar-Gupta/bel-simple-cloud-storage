const express = require('express');
const { uploadController } = require('../../controllers');
const upload = express.Router();

upload.post('/uploadFiles', uploadController.fileUploadController);

upload.get('/fetchUploadedFiles', uploadController.fetchUploadedFilesController);

module.exports = upload;

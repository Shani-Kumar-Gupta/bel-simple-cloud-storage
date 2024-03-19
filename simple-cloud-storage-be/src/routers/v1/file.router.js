const express = require('express');
const { fileController } = require('../../controllers');
const file = express.Router();

file.post('/uploadFiles', fileController.fileUploadController);

file.get('/fetchUploadedFiles', fileController.fetchUploadedFilesController);

file.post('/download', fileController.downloadFileController);

module.exports = file;

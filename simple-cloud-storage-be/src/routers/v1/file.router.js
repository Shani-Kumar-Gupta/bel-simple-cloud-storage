const express = require('express');
const { fileController } = require('../../controllers');
const file = express.Router();
const { verifyAuthTokenMiddleware } = require('../../middlewares');
const { upload } = require('../../middlewares/multer.middleware');

file.post(
  '/uploadFiles',
  verifyAuthTokenMiddleware,
  upload().single('myFile'),
  fileController.fileUploadController
);

file.get(
  '/fetchUploadedFiles',
  verifyAuthTokenMiddleware,
  fileController.fetchUploadedFilesController
);

file.get(
  '/download',
  verifyAuthTokenMiddleware,
  fileController.downloadFileController
);

module.exports = file;

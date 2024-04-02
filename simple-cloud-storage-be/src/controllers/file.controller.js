const fileUploadController = async (req, res, next) => {
  if (req.userId) {
    if (req.file) {
      return res.status(200).json({
        statusCode: 200,
        message: 'File uploaded successfully!'
      });
    }
  } else {
    return res.status(403).json({
      statusCode: 403,
      message: req.message,
    });
  }
};

const fetchUploadedFilesController = (req, res, next) => {};

const downloadFileController = (req, res, next) => {};

module.exports = {
  fileUploadController,
  fetchUploadedFilesController,
  downloadFileController,
};

const fs = require('node:fs');
const path = require('node:path');
const multer = require('multer');

exports.upload = () => {
  return (fileUpload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        console.log("uploading", req.query);
        const folderName = req.query.bucketName;
        const path = `simpleCloudStorage/${folderName}`;
        fs.mkdirSync(path, { recursive: true });
        cb(null, path);
      },
      filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
      },
    }),
    limits: { fileSize: 10000000 },
    fileFilter: function (req, file, cb) {
      cb(null, true);
    },
  }));
};

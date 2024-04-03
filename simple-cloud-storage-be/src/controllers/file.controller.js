const { fileValidator } = require('../validators');
const UploadFileSchema = require('../models/file.model');
const fs = require('node:fs');

const fileUploadController = async (req, res, next) => {
  if (req.userId) {
    if (req.file && req.file.filename) {
      let params = req.query;
      let body = {
        fileName: req.file.filename,
        originalFileName: req.file.originalname,
        typeOfFile: req.file.mimetype,
        filePath: req.file.path,
        userId: req.userId,
        bucketName: params.bucketName,
        bucketId: params.bucketId,
        tags: params?.tags || [],
      };
      let validateUploadFileSchema =
        fileValidator.validateFileUploadSchema.validate(body);
      const { value, error } = validateUploadFileSchema;
      if (error) {
        res.status(400).json({
          statusCode: 400,
          message: error.message,
        });
      } else {
        let finalObj;
        let uploadFileData = {
          userId: body.userId,
          bucketName: body.bucketName,
          bucketId: body.bucketId,
          fileName: req.file.filename,
          originalFileName: req.file.originalname,
          typeOfFile: req.file.mimetype,
          filePath: req.file.path,
          tags: body.tags,
          prevVersionsDetails: [],
        };
        const uploadFileDetails = await UploadFileSchema.find({
          userId: body.userId,
          bucketId: body.bucketId,
          originalFileName: req.file.originalname,
        });
        if (uploadFileDetails?.length) {
          let previousVersionData = {
            fileName: uploadFileDetails[0]?.fileName,
            originalFileName: uploadFileDetails[0]?.originalFileName,
            typeOfFile: uploadFileDetails[0]?.typeOfFile,
            filePath: uploadFileDetails[0]?.filePath,
            fileVersion: uploadFileDetails[0]?.fileVersion,
          };
          let finalPrevData = [
            ...uploadFileDetails[0].prevVersionsDetails,
            previousVersionData,
          ];
          finalObj = {
            ...uploadFileData,
            fileVersion: uploadFileDetails[0].fileVersion + 1,
            prevVersionsDetails: finalPrevData,
          };
          try {
            const updateUploadedFile = await UploadFileSchema.updateOne(
              {
                userId: body.userId,
                bucketId: body.bucketId,
                originalFileName: req.file.originalname,
              },
              finalObj
            );
            return res.status(200).json({
              statusCode: 200,
              message: 'File uploaded successfully!',
            });
          } catch (error) {
            return res.status(400).json({
              statusCode: 400,
              message: error.message,
            });
          }
        } else {
          try {
            const uploadDetails = await UploadFileSchema.create(uploadFileData);
            return res.status(200).json({
              statusCode: 200,
              message: 'File uploaded successfully!',
            });
          } catch (error) {
            return res.status(400).json({
              statusCode: 400,
              message: error.message,
            });
          }
        }
      }
      return res.status(200).json({
        statusCode: 200,
        message: 'File uploaded successfully!',
      });
    } else {
      return res.status(400).json({
        statusCode: 400,
        message: 'Please attach a file to upload!',
      });
    }
  } else {
    return res.status(403).json({
      statusCode: 403,
      message: req.message,
    });
  }
};

const fetchUploadedFilesController = async (req, res, next) => {
  if (req.userId) {
    try {
      let body = req.query;
      let payload = {
        bucketName: body.bucketName,
        userId: req.userId,
        bucketId: body.bucketId,
      };
      const fetchUploadedFiles = await UploadFileSchema.find(payload);
      return res.status(200).json({
        statusCode: 200,
        message: 'Uploaded files fetched successfully!',
        uploadedFiles: fetchUploadedFiles,
      });
    } catch (error) {
      return res.status(400).json({
        statusCode: 400,
        message: error.message,
      });
    }
  } else {
    return res.status(403).json({
      statusCode: 403,
      message: req.message,
    });
  }
};

const downloadFileController = (req, res, next) => {
  if (req.userId) {
    try {
      let body = req.query;
      let folderName = body.bucketName;
      let fileName = body.fileName;
      let originalFileName = body.originalFileName;
      let contentType = body.contentType;
      const filePath = `simpleCloudStorage/${folderName}/${fileName}`;
      // res.setHeader(
      //   'Content-Disposition',
      //   `attachment; filename="${originalFileName}"`
      // );
      // res.setHeader('Content-Type', contentType);
      const fileStream = fs.readFileSync(filePath, 'base64');
      // const decodedString = new Buffer.from(fileStream, 'base64');
      // console.log("lelo mera file stream", decodedString)
      // const finalFile = fileStream.pipe(res);
      return res.status(200).json({
        statusCode: 200,
        message: 'Sucessfully download',
        data: fileStream,
      });
    } catch (error) {
      return res.status(400).json({
        statusCode: 400,
        message: error.message,
      });
    }
  } else {
    return res.status(403).json({
      statusCode: 403,
      message: req.message,
    });
  }
};

module.exports = {
  fileUploadController,
  fetchUploadedFilesController,
  downloadFileController,
};

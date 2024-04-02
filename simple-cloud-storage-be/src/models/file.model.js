const mongoose = require('mongoose');
const userModel = require('./user.model');
const bucketModel = require('./bucket.model');

const { Schema } = mongoose;

const fileSchema = new Schema(
  {
    userId: {
      type: String,
      ref: userModel.modelName,
      required: [true, 'User id is required'],
    },
    bucketId: {
      type: String,
      ref: bucketModel.modelName,
      required: [true, 'Bucket id is required'],
    },
    bucketName: {
      type: String,
      ref: bucketModel.modelName,
      required: [true, 'Bucket name is required'],
    },
    fileName: {
      type: String,
      required: [true, 'File name is required'],
    },
    originalFileName: {
      type: String,
      required: [true, 'Original file name is required'],
    },
    typeOfFile: {
      type: String,
      required: [true, 'File type is required'],
    },
    filePath: {
      type: String,
      required: [true, 'File path is required'],
    },
    fileVersion: {
      type: Number,
      default: 0
    },
    tags: [
      {
        type: String,
      },
    ],
    prevVersionsDetails: [
      {
        fileName: {
          type: String,
        },
        originalFileName: {
          type: String,
        },
        typeOfFile: {
          type: String,
        },
        filePath: {
          type: String,
        },
        fileVersion: {
          type: Number,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const fileModel = mongoose.model('file', fileSchema);

module.exports = fileModel;

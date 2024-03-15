const mongoose = require('mongoose');
const userModel = require('./user.model');
const bucketModel = require('./bucket.model');

const { Schema } = mongoose;

const uploadSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: userModel.modelName,
    },
    bucketId: {
      type: Schema.Types.ObjectId,
      ref: bucketModel.modelName,
    },
    fileName: {
      type: String,
      required: [true, 'File name is required'],
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
          required: true,
        },
        typeOfFile: {
          type: String,
          required: true,
        },
        filePath: {
          type: String,
          required: true,
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

const uploadModel = mongoose.model('upload', uploadSchema);

module.exports = uploadModel;

const mongoose = require('mongoose');
const userModel = require('./user.model');
const nanoid = require('nanoid');
const { Schema } = mongoose;

const bucketSchema = new Schema({
  // userObjectId: {
  //   type: Schema.Types.ObjectId,
  //   ref: userModel.modelName,
  // },
  userId: [{
    type: String,
    ref: userModel.modelName,
    required: [true, 'User id is required'],
    unique: [true, 'User id should be unique']
  }],
  bucketId: {
    type: String,
    default: () => 'BUCKET700' + nanoid(7),
    unique: true,
  },
  bucketName: {
    type: String,
    unique: [true, 'Bucket name should be unique'],
    required: [true, 'Bucket name is required'],
    trim: true,
  },
  bucketSize: {
    type: String,
    required: [true, 'Bucket size is required'],
  },
  tags: [
    {
      type: String,
    },
  ],
});

const bucketModel = mongoose.model('bucket', bucketSchema);
module.exports = bucketModel;

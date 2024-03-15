const mongoose = require('mongoose');
const userModel = require('./user.model');
const nanoid = require('nanoid');
const { Schema } = mongoose;

const bucketSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: userModel.modelName,
  },
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

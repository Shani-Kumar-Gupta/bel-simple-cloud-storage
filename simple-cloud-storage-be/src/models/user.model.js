const mongoose = require('mongoose');
const nanoid = require('nanoid');

const { Schema } = mongoose;
const userSchema = new Schema(
  {
    userId: {
      type: String,
      default: () => 'USER100' + nanoid(7),
      unique: true
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      trim: true,
      minlength: 8,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;

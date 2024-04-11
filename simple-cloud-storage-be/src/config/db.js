const mongoose = require('mongoose');
const {
  MONGODB_URI,
  MONGODB_USER_NAME,
  MONGODB_USER_PASSWORD,
} = require('./env.config');

const userName = encodeURIComponent(MONGODB_USER_NAME);
const userPassword = encodeURIComponent(MONGODB_USER_PASSWORD);

let conn = null

const dbConnect = async () => {
  if (conn === null) {
    conn = await mongoose
    .connect(
      `mongodb+srv://${userName}:${userPassword}@simple-cloud-storage.g5egxrh.mongodb.net/?retryWrites=true&w=majority&appName=simple-cloud-storage`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log('Mongodb Connected!');
    })
    .catch((err) => {
      console.log(err);
    });
  }
  return conn;
};

module.exports = dbConnect;

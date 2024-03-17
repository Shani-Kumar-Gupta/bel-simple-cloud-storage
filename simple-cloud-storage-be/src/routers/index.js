const userAuthRoutes = require('./v1/userAuth.router');
const bucketRoutes = require('./v1/bucket.router');
const uploadRoutes = require('./v1/upload.router');

module.exports = {
  userAuthRoutes,
  bucketRoutes,
  uploadRoutes
};
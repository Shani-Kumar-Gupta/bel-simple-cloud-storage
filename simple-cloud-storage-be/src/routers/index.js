const userAuthRoutes = require('./v1/userAuth.router');
const bucketRoutes = require('./v1/bucket.router');
const fileRoutes = require('./v1/file.router');

module.exports = {
  userAuthRoutes,
  bucketRoutes,
  fileRoutes
};
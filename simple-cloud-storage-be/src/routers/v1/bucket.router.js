const express = require('express');
const { bucketController } = require('../../controllers');
const { verifyAuthTokenMiddleware } = require('../../middlewares');
const bucket = express.Router();

bucket.post(
  '/createBucket',
  verifyAuthTokenMiddleware,
  bucketController.createBucketController
);

bucket.get(
  '/fetchBucketList',
  verifyAuthTokenMiddleware,
  bucketController.fetchBucketListController
);

bucket.get(
  '/fetchBucketById/:bucketId',
  verifyAuthTokenMiddleware,
  bucketController.fetchBucketByIdController
);

module.exports = bucket;

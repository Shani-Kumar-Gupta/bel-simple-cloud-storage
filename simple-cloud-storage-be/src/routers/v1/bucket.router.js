const express = require('express');
const { bucketController } = require('../../controllers');
const bucket = express.Router();

bucket.post('/createBucket', bucketController.createBucketController);

bucket.get('/fetchBucketList', bucketController.fetchBucketListController);

module.exports = bucket;

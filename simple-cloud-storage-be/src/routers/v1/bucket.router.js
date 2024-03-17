const express = require('express');
const bucket = express.Router();

bucket.post('/createBucket', (req, res, next) => {});

bucket.get('/fetchBucketList', (req, res, next) => {});

module.exports = bucket;

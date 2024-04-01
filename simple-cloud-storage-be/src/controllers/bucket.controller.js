const { bucketValidator } = require('../validators');
const BucketSchema = require('../models/bucket.model');

const createBucketController = async (req, res, next) => {
  let body = req.body;
  let bucketValidation =
    bucketValidator.validateBucketCreationSchema.validate(body);
  const { value, error } = bucketValidation;
  if (error) {
    res.status(400).json({
      statusCode: 400,
      message: error.message,
    });
  } else {
    try {
      let bucketDetails = {
        userId: body.userId,
        bucketName: body.bucketName,
        bucketSize: body.bucketSize,
        tags: body.tags || [],
      };
      const createBucket = await BucketSchema.create(bucketDetails);
      return res.status(200).json({
        statusCode: 200,
        message: 'Bucket created successfully!',
      });
    } catch (error) {
      return res.status(400).json({
        statusCode: 400,
        message: error.message,
      });
    }
  }
};

const fetchBucketListController = async (req, res, next) => {
  if (req.userId) {
    let bucketList = [];
    const bucketData = await BucketSchema.find();
    if (bucketData && bucketData.length > 0) {
      bucketData.forEach((bucket) => {
        let obj = {
          id: bucket.bucketId,
          bucketName: bucket.bucketName,
          bucketSize: bucket.bucketSize,
          tags: bucket.tags,
        };
        userList.push(obj);
      });
      return res.status(200).json({
        statusCode: 200,
        message: 'Users list was successfully fetched',
        bucketsList: bucketList,
      });
    } else {
      return res.status(404).json({
        statusCode: 404,
        message: 'Users list not found! Please try again!',
        usersList: [],
      });
    }
  } else {
    return res.status(403).json({
      statusCode: 403,
      message: req.message,
    });
  }
};

module.exports = {
  createBucketController,
  fetchBucketListController,
};

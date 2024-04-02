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
    const bucketData = await BucketSchema.find({ userId: req.userId });
    if (bucketData && bucketData.length > 0) {
      bucketData.forEach((bucket) => {
        let obj = {
          id: bucket.bucketId,
          bucketName: bucket.bucketName,
          bucketSize: bucket.bucketSize,
          tags: bucket.tags,
        };
        bucketList.push(obj);
      });
      return res.status(200).json({
        statusCode: 200,
        message: 'Buckets list was successfully fetched',
        bucketsList: bucketList,
      });
    } else {
      return res.status(404).json({
        statusCode: 404,
        message: 'Bucket list not found! Please try again!',
        bucketsList: [],
      });
    }
  } else {
    return res.status(403).json({
      statusCode: 403,
      message: req.message,
    });
  }
};

const fetchBucketByIdController = async (req, res, next) => {
  let bucketId = req.params.bucketId;
  let userId = req.userId;
  if (userId) {
    if (bucketId) {
      try {
        let bucketDetails = await BucketSchema.find({
          bucketId: { $eq: bucketId },
        });
        let result = {
          id: bucketDetails[0].bucketId,
          bucketName: bucketDetails[0].bucketName,
          bucketSize: bucketDetails[0].bucketSize,
          tags: bucketDetails[0].tags,
          userId: bucketDetails[0].userId,
        };
        return res.status(200).json({
          statusCode: 200,
          message: 'Bucket details fetched successfully!',
          bucketDetails: result,
        });
      } catch (error) {
        return res.status(404).json({
          statusCode: 404,
          message: 'Bucket details not found! Please try again!',
          bucketsList: [],
        });
      }
    } else {
      return res.status(404).json({
        statusCode: 404,
        message: 'Please provide bucket ID.',
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
  fetchBucketByIdController,
};

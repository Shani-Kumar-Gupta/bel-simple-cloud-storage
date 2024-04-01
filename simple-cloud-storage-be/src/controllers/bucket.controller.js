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

const fetchBucketListController = (req, res, next) => {};

module.exports = {
  createBucketController,
  fetchBucketListController,
};

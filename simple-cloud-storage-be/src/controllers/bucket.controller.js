const { bucketValidator } = require("../validators");

const createBucketController = (req, res, next) => {
  let body = req.body;
  let bucketValidation = bucketValidator.validateBucketCreationSchema.validate(body);
  const { value, error } = bucketValidation;
  if (error) {
    
  } else {
    
  }
  // userId, bucketName, bucketSize, tags
};

const fetchBucketListController = (req, res, next) => { };

module.exports = {
  createBucketController,
  fetchBucketListController
};
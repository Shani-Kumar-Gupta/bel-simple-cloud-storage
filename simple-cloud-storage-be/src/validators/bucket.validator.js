const Joi = require('joi');

const validateBucketCreationSchema = Joi.object().keys({
  userId: Joi.string().required().messages({
    'string.empty': 'User Id is required',
    'any.required': 'User Id is required',
  }),
  bucketName: Joi.string().required().messages({
    'string.empty': 'Bucket name is required',
    'any.required': 'Bucket name is required',
  }),
  bucketSize: Joi.string().required().messages({
    'string.empty': 'Bucket size is required',
    'any.required': 'Bucket size is required',
  }),
  tags: Joi.array().items().empty(Joi.array().length(0)),
});

module.exports = {
  validateBucketCreationSchema
}
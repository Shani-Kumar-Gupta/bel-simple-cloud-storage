const Joi = require('joi');

const validateFileUploadSchema = Joi.object().keys({
  userId: Joi.string().required().messages({
    'string.empty': 'User Id is required',
    'any.required': 'User Id is required',
  }),
  bucketId: Joi.string().required().messages({
    'string.empty': 'Bucket id is required',
    'any.required': 'Bucket id is required',
  }),
  bucketName: Joi.string().required().messages({
    'string.empty': 'Bucket name is required',
    'any.required': 'Bucket name is required',
  }),
  fileName: Joi.string().required().messages({
    'string.empty': 'File name is required',
    'any.required': 'File name is required',
  }),
  originalFileName: Joi.string().required().messages({
    'string.empty': 'Original File name is required',
    'any.required': 'Original File name is required',
  }),
  typeOfFile: Joi.string().required().messages({
    'string.empty': 'File type is required',
    'any.required': 'File type is required',
  }),
  filePath: Joi.string().required().messages({
    'string.empty': 'File path is required',
    'any.required': 'File path is required',
  }),
  tags: Joi.array().items().empty(Joi.array().length(0)),
});

module.exports = {
  validateFileUploadSchema,
};

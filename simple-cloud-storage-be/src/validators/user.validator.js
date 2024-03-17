const Joi = require('joi');

const userAuthValidationSchema = Joi.object().keys({
  name: Joi.string().alphanum().required().messages({
    'string.empty': 'Name is required',
    'any.required': 'Name is required',
    'string.alphanum': 'Name should be alphanumeric only', 
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Please enter a valid email address!',
    'string.empty': 'Email is required!',
    'any.required': 'Email is required'
  }),
  password: Joi.string().min(6).max(10).required().messages({
    'string.empty': "Password is required",
    'string.min': "Password must be at least 6 characters",
    'string.max': "Password must be at most 10 characters",
    'any.required': 'Password is required'
  }),
});

// const userAuthValidationSchema = '';

module.exports = {
  userAuthValidationSchema
}
const Joi = require('joi');
const { uservalidator } = require('../validators');
const { generateHash } = require('../helpers');
const UserSchema = require('../models/user.model');

const registerUserAuthController = async (req, res, next) => {
  const body = req.body;
  console.log('registerUserAuthController', body, req);
  const validateUserSchema =
    uservalidator.userAuthValidationSchema.validate(body);
  const { value, error } = validateUserSchema;
  if (error) {
    res.status(400).json({
      statusCode: 400,
      message: error.message,
    });
  } else {
    try {
      let userDetails = {
        name: body.name,
        email: body.email,
        password: generateHash(body.password),
      };
      const user = await UserSchema.create(userDetails);
      return res.status(200).json({
        statusCode: 200,
        message: 'User created successfully!',
      });
    } catch (error) {
      return res.status(400).json({
        statusCode: 400,
        message: error.message,
      });
    }
  }
};

const loginUserAuthController = (req, res, next) => {};

module.exports = {
  registerUserAuthController,
  loginUserAuthController,
};

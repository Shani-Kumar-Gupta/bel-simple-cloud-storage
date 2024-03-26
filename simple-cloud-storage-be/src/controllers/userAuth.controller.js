const Joi = require('joi');
const { uservalidator } = require('../validators');
const { generateHash, compareHash, getAccessToken } = require('../helpers');
const UserSchema = require('../models/user.model');

const registerUserAuthController = async (req, res, next) => {
  const body = req.body;
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

const loginUserAuthController = async (req, res, next) => {
  let body = req.body;
  let validateUserLoginSchema =
    uservalidator.userLoginValidationSchema.validate(body);
  const { value, error } = validateUserLoginSchema;
  if (error) {
    res.status(400).json({
      statusCode: 400,
      message: error.message,
    });
  } else {
    const userData = await UserSchema.findOne({ email: body.email });
    if (userData && compareHash(body.password, userData.password)) {
      let userDetails = {
        email: userData.email,
        name: userData.name,
        userId: userData.userId,
      };
      let accessToken = getAccessToken(userDetails);
      if (accessToken) {
        return res.status(200).json({
          statusCode: 200,
          message: 'Login Successfully!',
          userData: userDetails,
          accessToken: accessToken,
        });
      } else {
        return res.status(500).json({
          statusCode: 500,
          message: 'Access Token generation failed! Please try again!',
        });
      }
    } else {
      return res.status(404).json({
        statusCode: 404,
        message: 'Please enter valid email address and password',
      });
    }
  }
};

const fetchAllUserList = async (req, res, next) => {
  if (req.userId) {
    let userList = [];
    const usersData = await UserSchema.find();
    if (usersData && usersData.length > 0) {
      usersData.forEach((user) => {
        let obj = {
          name: user.name,
          email: user.email,
          userId: user.userId,
        };
        userList.push(obj);
      });
      return res.status(200).json({
        statusCode: 200,
        message: 'Users list was successfully fetched',
        usersList: userList,
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
  registerUserAuthController,
  loginUserAuthController,
  fetchAllUserList,
};

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const keys = require('../config/keys');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 55
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id }, keys.jwtSecret, {
    expiresIn: 360000
  });
  return token;
};

const User = mongoose.model('User', userSchema);

const validateUser = user => {
  const schema = {
    name: Joi.string()
      .min(2)
      .max(55)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  };
  return Joi.validate(user, schema);
};

exports.User = User;
exports.validate = validateUser;

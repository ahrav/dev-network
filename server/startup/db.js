const winston = require('winston');
const mongoose = require('mongoose');
const keys = require('../config/keys');

const mongoUri = keys.mongoUri;

module.exports = async () => {
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true
  });
  winston.info(`Connected to ${mongoUri}`);
};

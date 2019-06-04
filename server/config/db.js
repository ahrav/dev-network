const mongoose = require('mongoose');
const keys = require('./keys');

const url = `mongodb://${keys.mongoHost}:${keys.mongoPort}/${
  keys.mongoDatabase
}`;

const connectDB = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 500,
      connectTimeoutMS: 10000
    });

    console.log('MongoDB connected...');
  } catch (err) {
    console.log(err);
    // exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;

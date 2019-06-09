const mongoose = require('mongoose');
const express = require('express');
const keys = require('../config/keys');

const app = express();
const url = keys.mongoUri;

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

    const PORT = port || 5000;
    const server = await app.listen(PORT);
    const io = await require('../services/socket').init(server);
    io.on('connection', socket => {
      console.log('Client connected');
    });
  } catch (err) {
    console.log(err);
    // exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;

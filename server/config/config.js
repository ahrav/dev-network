// config.js
const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  host: process.env.MONGO_HOST,
  db: process.env.MONGO_DATABASE,
  dbPort: process.env.MONGO_PORT,
  jwtSecret: process.env.JWT_SECRET,
  githubClientId: process.env.GITHUB_CLIENT_ID,
  githubSecret: process.env.GITHUB_SECRET,
  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT,
  port: process.env.PORT
};

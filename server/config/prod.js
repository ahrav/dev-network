module.exports = {
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  githubClientId: process.env.GITHUB_CLIENT_ID,
  githubSecret: process.env.GITHUB_SECRET,
  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT
};

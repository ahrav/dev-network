const keys = require('../config/keys');

module.exports = () => {
  if (!keys.jwtSecret) {
    throw new Error('FATAL ERROR: jwtSecretKey is not defined');
  }
  if (!keys.githubClientId) {
    throw new Error('FATAL ERROR: githubClientId is not defined');
  }
  if (!keys.githubSecret) {
    throw new Error('FATAL ERROR: githubSecret is not defined');
  }
};

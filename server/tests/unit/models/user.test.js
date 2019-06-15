const { User } = require('../../../models/User');
const jwt = require('jsonwebtoken');
const keys = require('../../../config/keys');
const mongoose = require('mongoose');

describe('user.generateAuthtoken', () => {
  it('should return valid JWT', () => {
    const payload = {
      _id: mongoose.Types.ObjectId().toHexString()
    };
    const user = new User(payload);
    const token = user.generateAuthToken();
    const decoded = jwt.verify(token, keys.jwtSecret);
    expect(decoded).toMatchObject(payload);
  });
});

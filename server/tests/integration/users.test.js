const { User } = require('../../models/User');
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');

let server;

describe('/api/users', () => {
  beforeEach(() => {
    server = require('../../index');
  });
  afterEach(async () => {
    await User.deleteMany({});
    await server.close();
  });

  describe('GET /me', () => {
    let user;
    let token;

    const exec = async () => {
      return await request(server)
        .get('/api/users/me')
        .set('x-auth-token', token);
    };

    beforeEach(async () => {
      user = new User({
        name: 'test',
        email: 'test@test.com',
        password: 'password'
      });
      await user.save();
      token = user.generateAuthToken();
    });

    it('should return 401 if not signed in user tries to reach this route', async () => {
      token = '';

      const res = await exec();

      expect(res.status).toBe(401);
    });

    it('should return user with 200 status code on success', async () => {
      const res = await exec();

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('_id', user._id.toHexString());
    });
  });
});

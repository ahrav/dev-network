const { Post } = require('../../models/Post');
const { User } = require('../../models/User');
const request = require('supertest');

let server;

describe('auth middleware', () => {
  beforeEach(() => {
    server = require('../../index');
  });
  afterEach(async () => {
    await server.close();
    await Post.deleteMany({});
    await User.deleteMany({});
  });
  let token;
  let user;

  const exec = () => {
    return request(server)
      .post('/api/posts')
      .set('x-auth-token', token)
      .send({ text: 'some text' });
  };

  beforeEach(async () => {
    user = new User({
      name: 'testing',
      email: 'tester@test.com',
      password: 'password123'
    });
    await user.save();
    token = new User().generateAuthToken();
  });

  it('should return 401 if no token is provided', async () => {
    token = '';
    const res = await exec();

    expect(res.status).toBe(401);
  });

  it('should return 400 if the token is invalid', async () => {
    token = 'asb';
    const res = await exec();

    expect(res.status).toBe(400);
  });

  it('should return 200 if token is valid', async () => {
    token = user.generateAuthToken();
    const res = await exec();

    expect(res.status).toBe(200);
  });
});

describe('/api/auth', () => {
  beforeEach(async () => {
    server = await require('../../index');
  });

  afterEach(async () => {
    await server.close();
    await Post.deleteMany({});
    await User.deleteMany({});
  });
  describe('POST /', () => {
    let email;
    let password;
    let token;
    let user;

    const exec = async () => {
      return await request(server)
        .post('/api/auth')
        .send({ email, password });
    };

    beforeEach(async () => {
      user = {
        name: 'test',
        email: 'test@test.com',
        password: 'testpassword'
      };

      const res = await request(server)
        .post('/api/users')
        .send(user);

      token = res.header['x-auth-token'];
      email = user.email;
      password = user.password;
    });

    it('should return a 400 if email is not included', async () => {
      email = '';

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return a 400 if password is not included', async () => {
      password = '';

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return a 400 if user does not exist', async () => {
      email = 'go@go.com';

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return 400 if password is not valid', async () => {
      password = 'notpassword';

      const res = await exec();

      expect(res.status).toBe(400);
    });

    it('should return valid JWT token when login is successful', async () => {
      const res = await exec();

      expect(res.status).toBe(200);
      expect(res.body).toContain(token);
    });
  });
});

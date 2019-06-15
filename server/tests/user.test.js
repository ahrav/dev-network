// const request = require('supertest');
// const jwt = require('jsonwebtoken');
// const mongoose = require('mongoose');
// const app = require('../app');
// const User = require('../models/User');
// const { jwtSecret } = require('../config/config');

// const UserOneId = new mongoose.Types.ObjectId();
// // const userOne = {
// //   _id: UserOneId,
// //   name: 'jonny',
// //   email: 'aggarr@gone.com',
// //   password: 'niceepasss',
// //   tokens: [
// //     {
// //       token: jwt.sign({ _id: UserOneId }, jwtSecret)
// //     }
// //   ]
// // };

// let token;

// beforeAll(async () => {
//   try {
//     await request(app)
//       .post('/auth')
//       .send({
//         username: 'user',
//         password: 'pwww'
//       });
//   } catch (error) {
//     (err, response) => {
//       token = response.body.token; // save the token!
//       done();
//     };
//   }
// });

// beforeEach(async () => {
//   await User.deleteMany();
//   await request(app)
//     .post('/users')
//     .send({
//       email: 'ayo@go.com',
//       password: 'notaogood',
//       name: 'whats up'
//     })
//     .expect(200);
// });

// // afterEach(() => console.log('Pupeteer page close'));

// test('Should sign up a new user', async () => {
//   const response = await request(app)
//     .post('/users')
//     .send({
//       email: 'ahrav@tesstting.com',
//       password: 'notaogood',
//       name: 'ahrav dutta'
//     })
//     .expect(200);

//   expect(response.body.token).toBeTruthy();
// });

// test('Existing user should be able to login', async () => {
//   await request(app)
//     .post('/auth')
//     .send({
//       email: 'ayo@go.com',
//       password: 'notaogood'
//     })
//     .expect(200);
// });

// test('Should not login nonexistent user', async () => {
//   await request(app)
//     .post('/auth')
//     .send({
//       email: 'ayo@go.com',
//       password: 'notaogddddood'
//     })
//     .expect(400);
// });

// // test('Should get profile for user', async () => {
// //   await request(app)
// //     .get('/profile/me')
// //     .set('x-auth-token', `${token}`)
// //     .send()
// //     .expect(200);
// // });

// test('Should not get profile for unauthorized user', async () => {
//   await request(app)
//     .get('/profile/me')
//     .send()
//     .expect(401);
// });

// // test('Should delete account for user', async () => {
// //   await request(app)
// //     .delete('/profile')
// //     .set('x-auth-token', `${token}`)
// //     .send()
// //     .expect(200);
// // });

// test('Should not be able to delete user without priveleges', async () => {
//   await request(app)
//     .delete('/profile')
//     .send()
//     .expect(401);
// });

test('stuff', () => {});

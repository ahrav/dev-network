const bcrypt = require('bcryptjs');
const express = require('express');
const Joi = require('joi');
const router = express.Router();
const { User } = require('../models/User');

// @route    POST api/auth
// @desc     Authenticate user & get token/ Login
// @access   Public
router.post('/', async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user)
    return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword)
    return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });

  const token = user.generateAuthToken();
  res.json(token);
});

const validate = req => {
  const schema = {
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(255)
      .required()
  };
  return Joi.validate(req, schema);
};

module.exports = router;

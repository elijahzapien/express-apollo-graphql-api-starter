'use strict';

/**
 * Authentication controller.
 * @module
 */

const debug = require('debug')('Server:Controller:Authentication');
const express = require('express');
const { check, validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');

const { createToken } = require('../utils/jwtUtils');

const User = require('../database/models/user');

const AuthenticationRouter = express.Router();

const validate = [
  check('email')
    .exists()
    .trim()
    .escape()
    .isEmail().withMessage('must be an email')
    .normalizeEmail(),
  check('password')
    .exists()
    .trim()
    .escape()
    .isLength({ min: 5, max: 100 })
];

const handlePost = (req, res, next) => {
  const errors = validationResult(req);
  const bodyData = matchedData(req, { locations: ['body'] });

  if (!errors.isEmpty()) {
    return res
      .status(422)
      .json({ error: errors.mapped() });
  }

  User.authenticateUser(bodyData.email, bodyData.password)
    .then(({ id, email }) => {
      const token = createToken({ id, email });

      return res.json({ token });
    })
    .catch(error => {
      debug(error);

      if (
        typeof error === 'object' &&
        JSON.parse(error.message).type === 'APIError'
      ) {
        return res
          .status(JSON.parse(error.message).code)
          .json({ error: JSON.parse(error.message).message });
      } else {
        return res
          .status(500)
          .json({ error: error });
      }
    });
};

AuthenticationRouter.route('/authenticate')
  .post(validate, handlePost);

module.exports = AuthenticationRouter;

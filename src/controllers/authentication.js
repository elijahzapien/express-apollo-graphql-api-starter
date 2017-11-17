/**
 * Authentication controller module.
 * @module controllers/authentication
 */

import express from 'express';
import { check, validationResult } from 'express-validator/check';
import { matchedData, sanitize } from 'express-validator/filter';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/user.mock';

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

  User.findOne({ email: bodyData.email }, (dbErr, user) => {
    // check for db errors
    if (dbErr) {
      return res
        .status(400)
        .json({ error: dbErr });
    }

    // check if user exists
    if (!user) {
      return res
        .status(404)
        .json({ error: 'User not found.' });
    }

    bcrypt.compare(
      bodyData.password,
      user.password,
      (bcryptErr, bcryptVerified) => {
        // check for bcrypt errors
        if (bcryptErr) {
          return res
            .status(400)
            .json({ error: bcryptErr });
        }

        // check if password matches
        if (!bcryptVerified) {
          return res
            .status(401)
            .json({ error: 'Wrong password.' });
        }

        // exclude password
        const tempUser = {
          id: user.id,
          username: user.username,
          email: user.email
        };

        // create token
        const token = jwt.sign(
          tempUser,
          process.env.JWT_SECRET,
          { expiresIn: 3600 } // 1 hour
        );

        // return success and token
        res.json({
          message: 'Authentication succeded.',
          token
        });
      });
  });
};

AuthenticationRouter.route('/authenticate')
  .post(
    validate,
    handlePost
  );

export default AuthenticationRouter;

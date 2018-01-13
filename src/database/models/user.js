'use strict';

/**
 * User database model.
 * @module
 */

const debug = require('debug')('DB:Model:User');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');
const jwt = require('jsonwebtoken');

const { createErrorObject } = require('../../utils/errorUtils');

const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    validate: [
      {
        validator: str => validator.isUUID(str, 4),
        msg: 'invalid UUID'
      }
    ]
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [
      {
        validator: str => validator.isEmail(str),
        msg: 'invalid email'
      }
    ]
  },
  password: {
    type: String,
    required: true,
    validate: [
      {
        validator: str => validator.isLength(str, {min: 5, max: 100}),
        msg: 'invalid password - must be minimum 4, and max 100'
      }
    ]
  }
});

/**
 * Compute err message.
 * @param {Object} err - The mongo error object.
 * @return {string} The error message.
 */
UserSchema.statics.computeErrMessage = function(err = {}) {
  switch (err.code) {
    case 11000:
      return JSON.stringify(
        createErrorObject(409, 'user.email', 'User already exists.')
      );
    default:
      return createErrorObject(500);
  }
};

/**
 * Create User document.
 * @param {string} email - The email address.
 * @param {string} password - The password.
 * @return {Object} The user.
 */
UserSchema.statics.createUser = async function(email, password) {
  debug('creating');

  const userObject = {
    id: uuidv4(),
    email: validator.trim(validator.normalizeEmail(email)),
    password: await bcrypt.hash(password, 10)
  };
  let user = null;

  try {
    user = await this.init()
      .then(() => this.create(userObject));
  } catch(err) {
    debug(err);

    throw new Error(
      this.computeErrMessage(err)
    );
  }

  debug('created');
  return user;
};

/**
 * Authenticate user document.
 * @param {string} email - The user email.
 * @param {string} password - The user password.
 * @return {}
 */
UserSchema.statics.authenticateUser = async function(email, password) {
  debug('authenticating');

  const user = await this.findOne({email});

  if (!user) {
    debug('user not found');

    throw new Error(
      JSON.stringify(createErrorObject(404, 'user.email', 'User not found.'))
    );
  }

  const bcryptVerified = await bcrypt.compare(password, user.password);

  if (!bcryptVerified) {
    debug('wrong password');

    throw new Error(
      JSON.stringify(createErrorObject(401, 'user.password', 'Wrong password.'))
    );
  }

  debug('authenticated');

  return user;
};

module.exports = mongoose.model('User', UserSchema);

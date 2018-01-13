'use strict';

/**
 * NewUser model.
 * @module
 */

const debug = require('debug')('GraphQL:Model:NewUser');
const validator = require('validator');
const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');
const jwt = require('jsonwebtoken');

const { createToken } = require('../../utils/jwtUtils');

const User = require('../../database/models/user');

/**
 * NewUser Class
 * @class
 */
class NewUser {
  static async gen(viewer, user) {
    const { id, email } = await User.createUser(user.email, user.password);
    const token = createToken({id, email});

    return { token };
  }
}

module.exports = NewUser;

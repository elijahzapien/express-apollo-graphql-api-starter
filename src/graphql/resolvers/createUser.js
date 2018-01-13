'use strict';

/**
 * CreateUser resolver.
 * @module
 */

const validationUtils = require('../utils/validationUtils');
const NewUser = require('../models/NewUser');

const validate = (email, password) => {
  validationUtils.isNonEmpty(email, {path: 'user.email'});
  validationUtils.isEmail(email, {path: 'user.email'});

  validationUtils.isNonEmpty(password, {path: 'user.password'});
  validationUtils.isLength(
    password, {
      options: { min: 5, max: 100 },
      path: 'user.password',
      message: 'Must be a minimum of 5 characters and a max of 100 characters'
    }
  );
};

module.exports = async function createUserResolver(
  obj,
  { email, password },
  { user },
  info
) {
  validate(email, password);

  return NewUser.gen(user, {email, password});
};

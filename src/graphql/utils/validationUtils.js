'use strict';

/**
 * Valitation utils.
 * @module
 */

const validator = require('validator');

const { createStringifiedErrorObject } = require('../../utils/errorUtils');

/**
 * Check if string does not have a length of zero.
 */
const isNonEmpty = (
  str,
  {
    path,
    message = 'Must be a non empty string.'
  }
) => {
  const isValid = !validator.isEmpty(str);

  if (!isValid) {
    throw new Error(createStringifiedErrorObject(400, path, message));
  }

  return true;
};

/**
 * Check if string length falls in a range.
 */
const isLength = (
  str,
  {
    options = {},
    path,
    message = 'Must fall within a certain length range.'
  }
) => {
  const isValid = validator.isLength(str, options);

  if (!isValid) {
    throw new Error(createStringifiedErrorObject(400, path, message));
  }

  return true;
};

/**
 * Check if string is an email.
 */
const isEmail = (
  str,
  {
    options = {},
    path = 'email',
    message = 'Must be a valid email.'
  }
) => {
  const isValid = validator.isEmail(str, options);

  if (!isValid) {
    throw new Error(createStringifiedErrorObject(400, path, message));
  }

  return true;
};

module.exports = {
  isNonEmpty,
  isLength,
  isEmail,
};

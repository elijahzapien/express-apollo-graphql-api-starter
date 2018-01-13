'use strict';

/**
 * Validation utils.
 * @module
 */

const validator = require('validator');

/**
 * Sanitize a given string
 * @param {string} str - The string.
 * @return {string} The sanitized string.
 */
const sanitize = str => validator.trim(validator.escape(str));

module.exports = {
  sanitize
};

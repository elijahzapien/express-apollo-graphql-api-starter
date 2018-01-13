'use strict';

/**
 * JSON Web Token utils.
 * @module
 */

 const jwt = require('jsonwebtoken');

/**
 * Creates JSON Web Token
 * @param {Object} payload - The token payload
 * @param {Object} options - The token configuration options
 * @return {string} The token string
 */
const createToken = (payload, options = { expiresIn: 3600 }) => jwt.sign(
  payload,
  process.env.JWT_SECRET,
  options
);

module.exports = { createToken };

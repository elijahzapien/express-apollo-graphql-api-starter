'use strict';

/**
 * Authentication middleware.
 * @module
 */

const jwt = require('jsonwebtoken');

/**
 * Handle token verification response
 * @param {string} err - The verification error
 * @param {string} decoded - The decoded token
 * @return {string|null} The verification error or decoded token if no
 * errors exists
 */
const handleVerificationResponse = (error, decoded) => error ? null : decoded;

/**
 * Authenticate request contains a valid token.
 * @function
 * @param {object} req - The HTTP request.
 * @param {object} res - The HTTP response.
 * @param {function} next - The callback.
 * @returns {function} - The callback.
 */
const authenticationMiddleware = (req, res, next) => {
  const token = req.headers['x-access-token'];

  req.user = token ?
    jwt.verify(token, process.env.JWT_SECRET, handleVerificationResponse) :
    null;

  return next();
};

module.exports = authenticationMiddleware;

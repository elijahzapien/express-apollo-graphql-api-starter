'use strict';

/**
 * Error utils.
 * @module
 */

/**
 * Create error object.
 * @param {number} code - The error code.
 * @param {string} path - The error path.
 * @param {string} message - The error message.
 * @return {Object} The error object.
 */
const createErrorObject = (code, path, message) => ({
  type: 'APIError',
  code,
  path,
  message
});

/**
 * Create stringified version of error object.
 * @param {number} code - The error code.
 * @param {string} path - The error path.
 * @param {string} message - The error message.
 * @return {string} The stringified error object.
 */
const createStringifiedErrorObject = (code, path, message) => JSON.stringify(
  createErrorObject(code, path, message)
);

module.exports = {
  createErrorObject,
  createStringifiedErrorObject
};

'use strict';

/**
 * Viewer type.
 * @module
 */

const User = require('./user');

const Viewer = `
  type Viewer {
    me: User
  }
`;

module.exports = [User, Viewer];

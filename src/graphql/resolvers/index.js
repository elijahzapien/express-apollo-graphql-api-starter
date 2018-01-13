'use strict';

/**
 * Root resolver.
 * @module
 */

const me = require('./me');
const viewer = require('./viewer');
const createUser = require('./createUser');

module.exports = {
  Query: {
    viewer,
  },
  Mutation: {
    createUser,
  },
  Viewer: {
    me,
  }
};

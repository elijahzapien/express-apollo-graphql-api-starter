'use strict';

/**
 * GraphQL Schema.
 * @module
 */

const { makeExecutableSchema } = require('graphql-tools');

const typeDefs = require('./types');
const resolvers = require('./resolvers');

module.exports = makeExecutableSchema({
  typeDefs,
  resolvers,
});

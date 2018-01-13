'use strict';

/**
 * Root types.
 * @module
 */

const Viewer = require('./viewer');
const UserToken = require('./userToken');

const Query = `
  type Query {
    viewer: Viewer
  }
`;

const Mutation = `
  type Mutation {
    createUser(
      email: String!
      password: String!
    ) : UserToken
  }
`;

const SchemaDefinition = `
  schema {
    query: Query
    mutation: Mutation
  }
`;

module.exports = [
  ...Viewer,
  UserToken,
  Query,
  Mutation,
  SchemaDefinition
];


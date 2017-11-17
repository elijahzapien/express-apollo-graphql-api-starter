/**
 * Types module
 * @module types
 */

import Viewer from './viewer';

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
    ) : User
  }
`;

const SchemaDefinition = `
  schema {
    query: Query
    mutation: Mutation
  }
`;

export default [
  ...Viewer,
  Query,
  Mutation,
  SchemaDefinition
];


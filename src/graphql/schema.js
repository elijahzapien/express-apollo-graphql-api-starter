/**
 * GraphQL Schema
 * @module schema
 */

import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from './types';
import resolvers from './resolvers';

export default makeExecutableSchema({
  typeDefs,
  resolvers,
  //logger, // optional
  //allowUndefinedInResolve = false, // optional
  //resolverValidationOptions = {}, // optional
});

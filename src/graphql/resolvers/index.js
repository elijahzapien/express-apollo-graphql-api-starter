/**
 * Resolvers module
 * @module resolvers
 */

import * as queries from './queries';
import * as mutations from './mutations';

export default {
  Query: {
    viewer: queries.viewer,
  },
  Mutation: {
    createUser: mutations.createUser,
  },
  Viewer: {
    me: queries.me,
  }
};

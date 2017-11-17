/**
 * Viewer module
 * @module types/viewer
 */

import User from './user';

const Viewer = `
  type Viewer {
    me: User
  }
`;

export default [User, Viewer];

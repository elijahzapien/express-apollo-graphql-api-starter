/**
 * Me resolver module
 * @module resolvers/me
 */

export default function(obj, args, { user }) {
  return user;
};

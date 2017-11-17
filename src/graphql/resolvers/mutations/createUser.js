/**
 * Create user resolver mutation
 * @module resolvers/mutations/createUser
 */

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function(obj, args, context, info) {
  const password = await bcrypt.hash(args.password, 10);

  // throw new Error('User already exists');

  // const user = await User.createUser({
  //   email: args.email,
  //   password: password,
  // });

  // const userPayload = {
  //   id: user.id,
  //   email: user.email
  // };

  // const token = jwt.sign(
  //   userPayload,
  //   process.env.JWT_SECRET,
  //   { expiresIn: 3600 } // 1 hour
  // );

  return {
    id: 'hello'
  };
};

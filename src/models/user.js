import { Schema, model } from 'mongoose';
import {
  trim,
  escape,
  isUUID,
  isEmail
} from 'validator';

const sanitize = [
  { validator: escape },
  { validator: trim }
];

const UserSchema = new Schema({
  id: {
    type: String,
    validate: [
      ...sanitize,
      {
        validator: isUUID,
        msg: 'invalid UUID'
      }
    ]
  },
  username: String,
  email: {
    type: String,
    validate: [
      ...sanitize,
      {
        validator: isEmail,
        msg: 'invalid email'
      }
    ]
  },
  password: {
    type: String,
    validate: [
      ...sanitize,
      {
        validator: str => isLength(str, {min: 5, max: 100}),
        msg: 'invalid password - must be minimum 4, and max 100'
      }
    ]
  }
});

export default model('User', UserSchema);

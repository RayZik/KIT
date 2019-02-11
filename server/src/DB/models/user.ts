import crypto from 'crypto';
import { Schema, Model, Document, model } from 'mongoose';

import { dbService } from '../main';
import { IAuthInfo } from 'interface';
import { TokenApi } from '../api';
import { JWThelper } from '../../helpers/jwt.helper';

interface IUser {
  email: string;
  name?: string;
  avatar_url?: string;
  password: string;
  salt: string;
}

interface IUserSchema extends IUser, Schema {
  validatePassword(password: string): boolean;
  toAuthJSON(): void;
}

interface IUserModel extends IUser, Document {
  validatePassword(password: string): boolean;
  toAuthJSON(): void;
}

/**
 * User model
 */
const UserSchema: Schema<IUserSchema> = new Schema({
  email: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
  },
  avatar_url: {
    type: String,
    default: '',
  },
  password: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    // select: false
  },
});

UserSchema.methods.validatePassword = function(password: string): boolean {
  return this.password === hashPassword(password, this.salt);
};

UserSchema.methods.toAuthJSON = async function() {
  const user = {
    id: String(this._id),
    email: this.email,
    name: this.name,
    avatar_url: this.avatar_url,
  };

  return {
    auth: {
      token: JWThelper.issueToken(user),
      refresh_token: await TokenApi.issueAndSetRefreshToken(this._id),
    },
    user,
  } as IAuthInfo;
};

UserSchema.pre('save', function(next, doks) {
  const that = this as IUserModel;
  if (!this.isModified('password')) return next();

  that.salt = crypto.randomBytes(16).toString('hex');
  that.password = hashPassword(that.password, that.salt);

  next();
});

function hashPassword(password: string, salt: string) {
  return crypto
    .pbkdf2Sync(password, salt, 10000, 512, 'sha512')
    .toString('hex');
}

export const User: Model<IUserModel> = dbService.model('User', UserSchema);

// const user = new User({
//   email: '123',
//   name: '123',
//   avatar_url: 'rewrwe',
//   password: '123'
// })

// user.save()

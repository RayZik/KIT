import crypto from 'crypto';
import { Schema, Model, Document } from 'mongoose';

import { IAuthInfo } from 'interface';
import { JWTController } from '../controllers';
import { JWThelper } from '../../helpers/jwt.helper';
import { DB } from '../db.class';

interface IUser {
  email: string;
  name?: string;
  avatar_url?: string;
  password: string;
  salt: string;
}

interface IUserSchema extends IUser, Schema {
  validatePassword(password: string): boolean;
  toAuthJSON(): Promise<IAuthInfo>;
}

export interface IUserModel extends IUser, Document {
  validatePassword(password: string): boolean;
  toAuthJSON(): Promise<IAuthInfo>;
}

/**
 * User model
 */
const UserSchema: Schema<IUserSchema> = new Schema({
  email: {
    type: String,
    unique: true
  },
  name: {
    type: String
  },
  avatar_url: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    required: true
  },
  salt: {
    type: String
    // select: false
  }
});

UserSchema.methods.validatePassword = function(password: string): boolean {
  return this.password === hashPassword(password, this.salt);
};

UserSchema.methods.toAuthJSON = async function() {
  const user = {
    id: String(this._id),
    email: this.email,
    name: this.name,
    avatar_url: this.avatar_url
  };

  return {
    auth: {
      token: JWThelper.issueToken(this._id),
      refresh_token: await JWTController.issueAndSetRefreshToken({ user_id: this._id })
    },
    user
  };
};

UserSchema.pre('save', function(next, doks) {
  const that = this as IUserModel;
  if (!this.isModified('password')) return next();

  that.salt = crypto.randomBytes(16).toString('hex');
  that.password = hashPassword(that.password, that.salt);

  next();
});

/**
 * Funtion for hashing password
 * @param password - current password
 * @param salt - the salt for hashing password
 */
function hashPassword(password: string, salt: string) {
  return crypto
    .pbkdf2Sync(password, salt, 10000, 512, 'sha512')
    .toString('hex');
}

export const UserModel: Model<IUserModel> = DB.model('User', UserSchema);

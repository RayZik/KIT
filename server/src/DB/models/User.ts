import crypto from 'crypto';
import { Schema } from 'mongoose';

import { dbService } from '../main';
import { IAuthInfo } from 'interface';
import { TokenApi } from '../../DB/api';
import { JWThelper } from '../../helpers/jwt.helper';



export interface IUser {
  emial: string;
  avatar: string;
  password: string;
  roles: IUserRole[]
}

export interface IUserRole {
  role: number;
  description: string;
}



/**
 * User model
 */
const UserSchema = new Schema({
  email: {
    type: String,
    unique: true
  },
  name: {
    type: String
  },
  avatar: {
    type: String,
    default: ''
  },
  password: {
    type: String,
  },
  roles: [{
    role: {
      type: Number,
    },
    description: {
      type: String,
    },
  }],
  salt: String
});



UserSchema.methods.setPassword = function (password: string) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.password = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validatePassword = function (password: string): boolean {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.password === hash;
};

UserSchema.methods.toAuthJSON = async function () {
  const refreshToken = await TokenApi.issueAndSetRefreshToken(this._id);
  const user = {
    id: this._id,
    email: this.email
  };

  return {
    auth: {
      token: JWThelper.issueToken(user),
      refreshToken
    },
    user
  } as IAuthInfo;
}



export const User = dbService.model('User', UserSchema);

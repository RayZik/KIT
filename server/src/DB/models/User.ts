import crypto from 'crypto';
import { Schema } from 'mongoose';
import { sign, verify } from 'jsonwebtoken';

import { dbService } from '../main';
import { IAuthInfo } from 'interface';
import { TokenApi } from '../../DB/api';



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

UserSchema.methods.generateJWT = function () {
  return sign({
    email: this.email,
    id: this._id,
  }, 'secret', { expiresIn: '15m' });
}

UserSchema.methods.toAuthJSON = async function () {
  const refreshToken = await TokenApi.issueAndSetRefreshToken(this._id);

  return {
    auth: {
      token: this.generateJWT(),
      refreshToken
    },
    user: {
      id: this._id,
      email: this.email
    }
  } as IAuthInfo;
}

// UserSchema.methods.verifyJWT = function (jwtToken: string) {
//   verify(jwtToken, 'secret');
// }


export const User = dbService.model('User', UserSchema);

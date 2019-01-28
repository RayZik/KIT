import crypto from 'crypto';
import { Schema, Model } from 'mongoose';

import { dbService } from '../main';
import { IAuthInfo } from 'interface';
import { TokenApi } from '../../DB/api';
import { JWThelper } from '../../helpers/jwt.helper';



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
  const user = {
    id: String(this._id),
    email: this.email,
    name: this.name,
    avatar: this.avatar
  };

  return {
    auth: {
      token: JWThelper.issueToken(user),
      refresh_token: await TokenApi.issueAndSetRefreshToken(this._id)
    },
    user
  } as IAuthInfo;
}



export const User: Model<any> = dbService.model('User', UserSchema);
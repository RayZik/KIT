import { Schema } from 'mongoose';
import { dbService } from '../main';
import * as crypto from 'crypto';
import { sign, verify } from 'jsonwebtoken';

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



UserSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.password = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validatePassword = function (password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.password === hash;
};

UserSchema.methods.generateJWT = function () {
  return sign({
    email: this.email,
    id: this._id,
  }, 'secret', { expiresIn: '15m' });
}

UserSchema.methods.toAuthJSON = function () {
  return {
    id: this._id,
    email: this.email,
    token: this.generateJWT(),
  };
}

UserSchema.methods.verifyJWT = function (jwtToken) {
  verify(jwtToken, 'secret');
}

export const User = dbService.model('User', UserSchema);

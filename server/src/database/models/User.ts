import { Schema } from 'mongoose';
import { dbService } from '../main';
import * as crypto from 'crypto';
import * as jwt from 'jsonwebtoken';

export interface User {
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
  console.log('salt', this.salt);

  this.password = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UserSchema.methods.validatePassword = function (password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  console.log(this.password === hash);

  return this.password === hash;
};

UserSchema.methods.generateJWT = function () {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign({
    email: this.email,
    id: this._id,
    exp: parseInt(String(expirationDate.getTime() / 1000), 10),
  }, 'secret');
}

UserSchema.methods.toAuthJSON = function () {
  return {
    _id: this._id,
    email: this.email,
    token: this.generateJWT(),
  };
}

export const User = dbService.model('User', UserSchema);

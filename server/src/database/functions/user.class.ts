import _ from 'lodash';

import { User } from '../models/user';
import { DBError } from '../../api/error';

/**
 * Method for get user by params
 * @param params - params for search user
 */
async function GetUser(params: { [prop: string]: any }) {
  return UserClass.get(params);
}

/**
 * Method for set user param
 * @param id user id
 * @param params - params for search user
 * @@deprecated
 */
async function SetUser(id: string, params: { [prop: string]: any }) {
  return UserClass.set(id, params);
}

/**
 * Method for set user param
 * @param id user id
 * @param params - params for search user
 * @deprecated
 */
function CreateUser(params) {
  return UserClass.create(params);
}

export const UserFn = {
  GetUser,
  CreateUser,
  SetUser
};

export class UserClass {
  static create(params) {
    const newUser = new User(params);
    return new Promise((resolve, reject) => {
      newUser.save((error, data) => {
        if (error) {
          reject(
            new DBError({ message: 'User exist', name: 'user', type: 'exist' })
          );
        } else {
          resolve(data);
        }
      });
    });
  }

  static async set(id: string, params: { [prop: string]: any }) {
    try {
      const user = await User.findByIdAndUpdate(id, params, { new: true });

      if (!_.isNil(user)) {
        return user;
      } else {
        /** @todo заменить на общий механизм ошибок */
        throw new DBError({
          message: 'User not found',
          name: 'user',
          type: 'not_found'
        });
      }
    } catch (error) {
      throw new DBError(error);
    }
  }

  static async get(params: { [prop: string]: any }) {
    try {
      const user = await User.findOne(params);

      if (!_.isNil(user)) {
        return user;
      } else {
        /** @todo заменить на общий механизм ошибок */
        throw new DBError({
          message: 'User not found',
          name: 'user',
          type: 'not_found'
        });
      }
    } catch (error) {
      throw new DBError(error);
    }
  }
}

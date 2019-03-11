import _ from 'lodash';

import { User } from '../models/user';
import { DBError } from '../../api/error';

export class UserClass {
  static create({ params }: { params: any }) {
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

  static async set({
    id,
    params
  }: {
    id: string;
    params: { [prop: string]: any };
  }) {
    try {
      const user = await User.findOneAndUpdate(id, params, {
        new: true
      });

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

  static async get(params: { _id?: string; email?: string }) {
    try {
      let user = undefined;
      if (Object.keys(params).length > 0) {
        user = await User.findOne(params);
        if (!_.isNil(user)) {
          return user;
        }
      }

      /** @todo заменить на общий механизм ошибок */
      throw new DBError({
        message: 'User not found',
        name: 'user',
        type: 'not_found'
      });
    } catch (error) {
      throw new DBError(error);
    }
  }
}

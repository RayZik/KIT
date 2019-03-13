import _ from 'lodash';

import { UserModel } from '../models/user.model';
import { DBError } from '../../api/error';

export class User {
  static create({ params }: { params: any }) {
    const newUser = new UserModel(params);
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
      const user = await UserModel.findOneAndUpdate(id, params, {
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

  /**
   * Func to get user by params
   * @param params - params to find a user
   * @todo - https://github.com/mralexrabota/KIT/projects/1#card-18752391
   */
  static async get(params: { _id?: string; email?: string }) {
    try {
      let user = undefined;
      if (Object.keys(params).length > 0) {
        user = await UserModel.findOne(params);
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

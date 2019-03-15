import { UserModel, IUserModel } from '../models';
import { DBError } from '../../api/error';
import _ from 'lodash';

export async function GET_USER(params: { _id?: string; email?: string }) {
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

export async function SET_USER(id: string, params: { [prop: string]: any }) {
  try {
    const user = await UserModel.findOneAndUpdate(id, params, { new: true });

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
 *
 * @param param0
 * @todo https://github.com/mralexrabota/KIT/projects/1#card-18785751
 */
export async function CREATE_USER({
  params
}: {
  params: any;
}): Promise<IUserModel> {
  const newUser = new UserModel(params);
  try {
    const data = await newUser.save();
    return data;
  } catch (error) {
    throw new DBError({ message: 'User exist', name: 'user', type: 'exist' });
  }
}

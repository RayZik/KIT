import { UserModel, IUserModel } from '../models';
import _ from 'lodash';
import { SError } from '../error';

export async function GET_USER(params: {
  _id?: string;
  email?: string;
}): Promise<IUserModel> {
  try {
    let user = undefined;
    
    if (Object.keys(params).length > 0) {
      user = await UserModel.findOne(params);

      if (!_.isNil(user)) {
        return user;
      }
    }

    /** @todo заменить на общий механизм ошибок */
    throw new SError('User not found');
  } catch (error) {
    throw new SError(error);
  }
}

export async function SET_USER(
  id: string,
  params: { [prop: string]: any }
): Promise<IUserModel> {
  try {
    const user = await UserModel.findOneAndUpdate(id, params, { new: true });

    if (!_.isNil(user)) {
      return user;
    } else {
      /** @todo заменить на общий механизм ошибок */
      throw new SError('User not found');
    }
  } catch (error) {
    throw new SError(error);
  }
}

/**
 *
 * @param param0
 * @todo https://github.com/mralexrabota/KIT/projects/1#card-18785751
 */
export async function CREATE_USER(req: {
  email: string;
  password: string;
}): Promise<IUserModel> {
  const newUser = new UserModel(req);
  try {
    const data = await newUser.save();
    return data;
  } catch (error) {
    throw new SError('User exist');
  }
}

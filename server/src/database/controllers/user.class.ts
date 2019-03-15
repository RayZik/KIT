import _ from 'lodash';
import { AuthChecker } from '../decorators';
import { IAuthContext } from 'interface';
import { GET_USER, SET_USER } from '../functions';
import { getUserIdFromCtx } from '../../api/utils/tools';

export class User {
  /**
   * Method for setting params of user
   * @param req - params of user
   * @param ctx - auth context
   */
  @AuthChecker()
  static async set(
    req: { params: { [prop: string]: any } },
    ctx: IAuthContext
  ) {
    return SET_USER(getUserIdFromCtx(ctx), req.params);
  }

  /**
   * Controller for getting a user by params
   * @param params - params to find a user
   * @todo - https://github.com/mralexrabota/KIT/projects/1#card-18752391 serice option types
   */
  @AuthChecker()
  static async get(
    params: { _id?: string; email?: string },
    ctx: IAuthContext
  ): Promise<any> {
    // set id from ctx by default
    if (Object.keys(params).length === 0) {
      params._id = getUserIdFromCtx(ctx);
    }

    return GET_USER(params);
  }
}

import _ from 'lodash';
import { AuthChecker } from '../decorators';
import { IAuthContext } from 'interface';
import { GET_USER, SET_USER } from '../functions';
import { getUserIdFromCtx } from '../../api/utils/tools';

export class User {
  /**
   *
   * @param req
   * @param ctx
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
   * @todo - https://github.com/mralexrabota/KIT/projects/1#card-18752391
   */
  @AuthChecker()
  static async get(params: { _id?: string; email?: string }): Promise<any> {
    return GET_USER(params);
  }
}

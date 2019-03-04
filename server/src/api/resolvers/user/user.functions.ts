import { getUserIdFromCtx } from '../../utils/tools';
import { UserFn } from '../../../database';
import { IAuthContext } from 'interface';

/**
 * Get user
 * @param ctx - auth context
 */
export async function getUser(ctx: IAuthContext) {
  return await UserFn.GetUser({ _id: getUserIdFromCtx(ctx) });
}

/**
 * Set user
 * @param ctx - auth context
 * @param param - params for edit user
 */
export async function editUser(ctx: IAuthContext, param) {
  return await UserFn.SetUser(getUserIdFromCtx(ctx), param);
}

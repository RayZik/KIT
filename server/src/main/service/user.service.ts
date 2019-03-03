import { UserApi } from '../../DB/api';
import { getUserIdFromCtx } from '../utils';

/**
 * Get user
 * @param ctx - auth context
 */
async function getUser(ctx) {
  return await UserApi.GetUser({ _id: getUserIdFromCtx(ctx) });
}

/**
 * Set user
 * @param ctx - auth context
 * @param param - params for edit user
 */
async function editUser(ctx, param) {
  return await UserApi.SetUser(getUserIdFromCtx(ctx), param);
}

export const UserService = {
  getUser,
  editUser
};

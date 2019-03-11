import { getUserIdFromCtx } from '../../utils/tools';
import { IAuthContext } from 'interface';
import { service } from '../../service';

/**
 * Get user
 * @param ctx - auth context
 */
export function getUser(ctx: IAuthContext) {
  return service('UserClass', 'get', ctx, { _id: getUserIdFromCtx(ctx) });
}

/**
 * Set user
 * @param ctx - auth context
 * @param param - params for edit user
 */
export function editUser(ctx: IAuthContext, params) {
  return service('UserClass', 'set', ctx, {
    id: getUserIdFromCtx(ctx),
    params
  });
}

/**
 * Create user
 * @param ctx - auth context
 * @param param - params for create user
 */
export function createUser(ctx: IAuthContext, params) {
  return service('UserClass', 'create', ctx, { params });
}

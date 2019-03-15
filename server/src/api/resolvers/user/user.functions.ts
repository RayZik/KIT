import { getUserIdFromCtx } from '../../utils/tools';
import { IAuthContext } from 'interface';
import { service } from '../../service';

/**
 * Get user
 * @param ctx - auth context
 */
export function getUser(ctx: IAuthContext) {
  return service(ctx, 'User', 'get', { _id: getUserIdFromCtx(ctx) });
}

/**
 * Set user
 * @param ctx - auth context
 * @param param - params for edit user
 */
export function editUser(ctx: IAuthContext, params) {
  return service(ctx, 'User', 'set', {
    id: getUserIdFromCtx(ctx),
    params
  });
}

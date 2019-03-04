import { IAuthInfo } from 'interface';
import { getRegistration } from './access.functions';

/**
 * Login function
 * @param email - user email
 * @param password - user password
 */
export async function registration(ctx, params): Promise<IAuthInfo> {
  return await getRegistration(params);
}

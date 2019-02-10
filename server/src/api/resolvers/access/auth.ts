import { IAuthInfo } from "interface";
import { AuthService } from "../../../main/service";



/**
 * Login function
 * @param email - user email
 * @param password - user password
 */
export async function login(email: string, password: string): Promise<IAuthInfo> {
  return await AuthService.getLogin(email, password);
}


/**
 * Refresh token function
 * @param token - current token
 * @param refresh_token - refresh token
 */
export async function refreshToken(ctx, refresh_token: string): Promise<IAuthInfo> {
  const { token } = ctx.authInfo;
  return (await AuthService.issueNewTokenByRefresh(token, refresh_token));
}
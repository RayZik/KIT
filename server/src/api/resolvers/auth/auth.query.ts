import { IAuthInfo } from "interface";
import { AuthService } from "../../../main/service";



/**
 * Login function
 * @param email - user email
 * @param password - user password
 */
export async function login(email: string, password: string): Promise<IAuthInfo> {
  const user: any = await AuthService.getLogin(email, password);
  return user.toAuthJSON();
}


/**
 * Refresh token function
 * @param token - current token
 * @param refreshToken - refresh token
 */
export async function refreshToken(context, refreshToken: string): Promise<IAuthInfo> {
  const { token } = context.authInfo;

  const user: any = await AuthService.issueNewTokenByRefresh(token, refreshToken);

  return user.toAuthJSON();
}
import { IAuthInfo } from "interface";
import { AuthService } from "../service/auth.service";



export class AuthModule {
  private constructor() { }


  /**
   * Login function
   * @param email - user email
   * @param password - user password
   */
  static async  login(email: string, password: string): Promise<IAuthInfo> {
    const user: any = await AuthService.getLogin(email, password);
    return user.toAuthJSON();
  }


  /**
   * Refresh token function
   * @param token - current token
   * @param refreshToken - refresh token
   */
  static async  refreshToken(token: string, refreshToken: string): Promise<IAuthInfo> {
    const user: any = await AuthService.issueNewTokenByRefresh(token, refreshToken);

    return user.toAuthJSON();
  }
}
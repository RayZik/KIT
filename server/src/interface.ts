/**
 * Auth object
 */
export interface IAuthInfo {
  auth: {
    token: string;
    refreshToken: string;
  };
  user: {
    id: string
    email: string
    name: string
    avatar: string
  }
}
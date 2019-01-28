/**
 * Auth object
 */
export interface IAuthInfo {
  auth: {
    token: string;
    refresh_token: string;
  };
  user: {
    id: string
    email: string
    name: string
    avatar: string
  }
}
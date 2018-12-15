import { UserApi } from '../../DB/api';



/**
 * Get user
 * @param id - user id
 */
async function getUser(id: string) {
  return await UserApi.GetUser({ _id: id });
}


/**
 * Set user
 * @param id - user id
 */
async function editUser(id: string, param) {
  return await UserApi.SetUser(id, param);
}


export const UserService = {
  getUser,
  editUser
};
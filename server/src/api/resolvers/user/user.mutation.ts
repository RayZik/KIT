import { UserService } from "../../../main/service";



/**
 * Function for edit user params
 * @param ctx - context
 * @param user_param - edit params for user
 */
export async function editUser(ctx, { user_param }) {
  return await UserService.editUser(ctx, user_param);
}

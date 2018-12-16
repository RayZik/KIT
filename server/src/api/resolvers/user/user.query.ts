import { UserService } from "../../../main/service";



/**
 * Get user by user id. id get from context
 * @param ctx - context
 */
export async function getUser(ctx) {
  return await UserService.getUser(ctx);
}

import { UserQuery } from "./user";



/**
 * Queryes resolvers
 */
export const Query = {
  getUser(obj, params) { return UserQuery.getUser(params) }
}
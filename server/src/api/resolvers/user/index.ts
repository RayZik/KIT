import { getUser } from "./user.query";
import { editUser } from "./user.mutation";



export default {
  UserQuery: {
    get: (obj, args, ctx, info) => getUser(ctx)
  },
  UserMutation: {
    set: (obj, args, ctx, info) => editUser(ctx, args)
  }
};
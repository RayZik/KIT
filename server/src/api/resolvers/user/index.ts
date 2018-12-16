import { getUser } from "./user.query";
import { editUser } from "./user.mutation";



export default {
  Query: {
    user: (obj, args, ctx, info) => getUser(ctx)
  },
  Mutation: {
    user__set: (obj, args, ctx, info) => editUser(ctx, args)
  }
};
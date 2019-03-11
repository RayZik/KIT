import { getUser, editUser } from './user.functions';

export default {
  UserQuery: {
    get: (obj, args, ctx, info) => getUser(ctx)
  },
  UserMutation: {
    set: (obj, { user_param }, ctx, info) => editUser(ctx, user_param)
  }
};

import { UserService } from '../../../main/service';

export default {
  UserQuery: {
    get: (obj, args, ctx, info) => UserService.getUser(ctx),
  },
  UserMutation: {
    set: (obj, { user_param }, ctx, info) => {
      return UserService.editUser(ctx, user_param);
    },
  },
};

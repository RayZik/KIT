import { service } from '../../service';

export default {
  UserQuery: {
    get: (obj, args, ctx, info) => service(ctx, 'user', 'get', {})
  },
  UserMutation: {
    set: (obj, { user_param }, ctx, info) =>
      service(ctx, 'user', 'set', { params: user_param })
  }
};

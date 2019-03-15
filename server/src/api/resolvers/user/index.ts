import { service } from '../../service';
export default {
  UserQuery: {
    get: (obj, args, ctx, info) => service(ctx, 'User', 'get', {})
  },
  UserMutation: {
    set: (obj, { user_param }, ctx, info) =>
      service(ctx, 'User', 'set', { params: user_param })
  }
};

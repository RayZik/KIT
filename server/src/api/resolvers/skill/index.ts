import { service } from '../../service';

export default {
  UserQueries: {
    get: (obj, args, ctx, info) => service(ctx, 'user', 'get', {})
  },
  UserMutations: {
    set: (obj, { user_param }, ctx, info) =>
      service(ctx, 'user', 'set', { params: user_param })
  }
};

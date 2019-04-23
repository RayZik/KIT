import { service } from '../../../service';

export default {
  UserQueries: {
    get: (obj, args, ctx, info) => service(ctx, 'user', 'get', {})
  },
  UserMutations: {
    set: (obj, { userParam }, ctx, info) =>
      service(ctx, 'user', 'set', { params: userParam })
  }
};

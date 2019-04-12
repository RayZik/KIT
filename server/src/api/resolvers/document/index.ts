import { service } from '../../service';

export default {
  DocumentQueries: {
    get: (obj, args, ctx, info) => ({}) /*service(ctx, 'document', 'get', {})*/
  },
  DocumentMutations: {
    create: (obj, { param }, ctx, info) =>
      service(ctx, 'document', 'create', param)
  }
};

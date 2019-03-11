import * as db_func from '../database/functions';

export function service(object, action, ctx, params) {
  const dbService = db_func[object];
  return dbService[action].apply(null, Object.values(params));
}

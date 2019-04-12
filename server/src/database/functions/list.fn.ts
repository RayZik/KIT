import { Model, DocumentQuery } from 'mongoose';

export async function LIST(
  query: DocumentQuery<any, any>,
  { limit = 3, cursor = null }
) {
  let list: DocumentQuery<any, any, {}>;

  if (query) {
    if (!cursor) {
      list = query.limit(limit);
    } else {
      list = query.find({ _id: { $gt: cursor } }).limit(limit);
    }
  }

  return list;
}

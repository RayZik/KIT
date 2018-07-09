import { DB } from "common/db";
import { SQL } from "common/db/sql/sql.model";



/**
 * Queryes resolvers
 */
export const Query = {
  getUser(obj, { id }, context) {
    console.log(context);
    
    return DB.query(SQL.getUser, ['USER', 'id', id])
      .then(
        ({ result }) => result[0]
      )
      .catch(
        (error) => {
          console.log('err', error);
        }
      );
  },
}
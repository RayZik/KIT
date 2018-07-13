import { DB, SQLT } from "common/db";
import { SQL } from "common/db/sql/sql.model";



/**
 * Queryes resolvers
 */
export const Query = {
  // getUser(obj, { id }) {
  //   return DB.query(SQL.selectAllWhere, [SQLT.USERS, 'id', id])
  //     .then(({ result }) => result[0] ? result[0] : '');
  // }
  getUser(obj, { id }) {
    // const sql = `
    //   SELECT * 
    //   FROM ?? u
    //   INNER JOIN ?? r ON u.roles_id = r.id
    // `;
    const sql = `
    SELECT u.name, r.role, r.description
    FROM users_roles ur
    LEFT JOIN roles r ON ur.role_id = r.id
    LEFT JOIN users u ON ur.user_id = u.id
    WHERE ??=?
    `;

    return DB.query(sql, ['u.id', id])
      .then(({ result }) => {
        console.log(result);
        return {
          name: result[0].name,
          roles: result.map(el => {
            return {
              role: el.role,
              description: el.description
            }
          })
        }
      });
  }
}
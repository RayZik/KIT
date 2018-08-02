import { DB } from "../../../common/db";
import { IError, InputParamError, DatabaseError } from "../../error";



export class UserQuery {
  static getUser({ id }) {

    let errors: IError[] = [];

    if (!id) {
      errors.push({ name: 'id', message: 'param -id- not found', type: 'input' });
    }

    if (errors.length) throw new InputParamError(errors);

    const sql = `
      SELECT u.name, r.role, r.description
      FROM users_roles ur
      LEFT JOIN roles r ON ur.role_id = r.id
      LEFT JOIN users u ON ur.user_id = u.id
      WHERE ?? LIKE ?
    `;

    return DB.query(sql, ['u.id', id])
      .then(({ result }) => {
        let res: any = '';

        if (result.length) {
          res = {
            name: result[0].name,
            roles: result.map(el => { return { role: el.role, description: el.description } })
          }
        }

        return res;
      });
  }
}
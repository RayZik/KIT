// import { User } from "@api";
import _ from "lodash";

import { DBError } from "../../api/error/databaseError";
import { User } from "../../DB/models/User";



/**
 * Method for get user by params
 * @param params - params for search user
 */
function GetUser(params: { [prop: string]: any }) {
  return new Promise((resolve, reject) => {
    User.findOne(params)
      .then((user) => {
        if (!_.isNil(user)) {
          resolve(user)
        } else {
          /** @todo заменить на общий механизм ошибок */
          reject(new DBError({ message: 'User not found', name: 'user', type: 'not_found' }));
        }
      })
      .catch(error => reject({ error }));
  });
}



export const UserApi = {
  GetUser
};
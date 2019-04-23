import _ from 'lodash';

import {
  CREATE_DOCUMENT,
  ICreateDocumentParam,
  GET_USER,
  GET_LIST
} from '../functions';
import { AuthChecker } from '../decorators';
import { getUserIdFromCtx } from '../../api/utils/tools';
import { IAuthContext } from './../../interface';

export class DocumentController {
  @AuthChecker()
  static async create(req: ICreateDocumentParam, ctx: IAuthContext) {
    const user_id = getUserIdFromCtx(ctx);
    const user = await GET_USER({ _id: user_id });

    if (user) {
      return CREATE_DOCUMENT(req, user_id);
    }
  }

  @AuthChecker()
  static async list(
    req: { options: { limit: number; cursor: string } },
    ctx: IAuthContext
  ) {
    return GET_LIST(getUserIdFromCtx(ctx), req.options);
  }
}

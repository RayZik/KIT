import { UserModel, IUserModel } from '../models';
import _ from 'lodash';
import { SError } from '../error';
import { DocumentModel } from '../models/document.model';
import { LIST } from './list.fn';

export interface ICreateDocumentParam {
  name: string;
  description: string;
}

export async function GET_DOCUMENT(params) {}

export async function GET_LIST(
  user_id: string,
  options: { cursor?: string; limit?: number } = {}
) {
  const user = DocumentModel.find({ user_id });

  try {
    return LIST(user, options);
  } catch (err) {
    throw new SError(`[GET_LIST]: ${err}`);
  }

  // return list;
}

export async function CREATE_DOCUMENT(req: ICreateDocumentParam, id) {
  const newDocument = new DocumentModel({ ...req, user_id: id });
  try {
    return await newDocument.save();
  } catch (error) {
    throw new SError('Document exist');
  }
}

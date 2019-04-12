import { Schema, Model, Document } from 'mongoose';

import { DB } from '../db.class';

interface IUser {
  email: string;
  name?: string;
  avatar_url?: string;
  password: string;
  salt: string;
}

interface IDocumentSchema extends IUser, Schema {}
export interface IDocumentModel extends IUser, Document {}

/**
 * Document model
 */
const DocumentSchema: Schema<IDocumentSchema> = new Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  user_id: {
    type: Schema.Types.ObjectId,
    required: true
  }
});

export const DocumentModel: Model<IDocumentModel> = DB.model(
  'Document',
  DocumentSchema
);

import GQLBaseError from "./error-base";
import { IError } from "./error.model";

export class DatabaseError extends GQLBaseError {
  constructor(errors: IError | IError[], type = 'DATABASE_ERROR') {
    super(errors, type);
  }
}
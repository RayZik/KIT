import GQLBaseError from "./error-base";
import { IError } from "./error.model";

export class DBError extends GQLBaseError {
  constructor(errors: IError | IError[], type = 'DATABASE_ERROR') {
    super(errors, type);
  }
}
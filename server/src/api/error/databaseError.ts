import BaseError from "./error-base";
import { IError } from "./error.model";

export class DatabaseError extends BaseError {
  constructor(errors: IError | IError[], type = 'DATABASE_ERROR') {
    super(errors, type);
  }
}
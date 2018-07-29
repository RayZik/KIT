import BaseError from "./error-base";

export class DatabaseError extends BaseError {
  constructor(errors, type = 'DATABASE_ERROR') {
    super(errors, type);
  }
}
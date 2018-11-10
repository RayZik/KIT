import { GraphQLError } from "graphql";
import { IError } from "./error.model";


export default class GQLBaseError extends Error {
  errors: IError[] = [];

  constructor(errors: IError | IError[], type: string) {
    super(type);
    this.errors = Array.isArray(errors) ? errors : [errors];
  }
}

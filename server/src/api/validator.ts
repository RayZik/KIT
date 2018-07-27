import { GraphQLError } from "graphql/error/GraphQLError";
import { IError } from "../common/db";


export default class ValidatorError extends GraphQLError {
  constructor(errors: IError | IError[], type: string) {
    super(type);
    this.stack = (errors as any);
  }
}

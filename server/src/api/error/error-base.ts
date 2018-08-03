import { GraphQLError } from "graphql/error/GraphQLError";
import { IError } from "./error.model";


export default class BaseError extends Error implements GraphQLError {
  message: string;
  locations;
  path: ReadonlyArray<string | number>;
  nodes;
  source;
  positions: ReadonlyArray<number>;
  originalError: Error;
  extensions: void | { [key: string]: any; };
  name: string;
  stack?: string;
  errors: IError[] = [];

  constructor(errors: IError | IError[], type: string) {
    super(type);
    this.errors = Array.isArray(errors) ? errors : [errors];
  }
}

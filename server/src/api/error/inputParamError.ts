import GQLBaseError from "./error-base";

export class InputParamError extends GQLBaseError {
  constructor(errors, type = 'INPUT_PARAM_ERROR') {
    super(errors, type);
  }
}
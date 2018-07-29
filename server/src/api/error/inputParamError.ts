import BaseError from "./error-base";

export class InputParamError extends BaseError {
  constructor(errors, type = 'INPUT_PARAM_ERROR') {
    super(errors, type);
  }
}
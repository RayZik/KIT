import controllers from '../database/controllers';
import { IAuthContext } from './../interface';

/** type for getting type of params */
type TParams<T> = T extends (req: infer A, ctx: IAuthContext) => any
  ? A
  : never;
  /** type for getting a response type */
type TResponse<T> = T extends (...args: any) => infer A ? A : never;

/**
 * Base function for getting an any entity from database
 * @param ctx - auth context (contains infornation about an auth and a host)
 * @param object - name if entity
 * @param action -entity's method
 * @param params - params for requesting an entity
 */
export function service<
  T extends keyof typeof controllers,
  A extends keyof typeof controllers[T],
  P extends TParams<typeof controllers[T][A]>
>(
  ctx: IAuthContext,
  object: T,
  action: A,
  params: P
): TResponse<typeof controllers[T][A]> {
  const controller = controllers[object];
  return (controller[action] as any).apply(null, [params, ctx]);
}

import * as db_ctrls from '../database/controllers';
import { IAuthContext } from 'interface';

type TObjectKeys<T> = { [R in keyof T]: T[R] };
type TParams<T> = T extends (args: infer A) => any ? A : never;
type TResponse<T> = T extends (args: any) => infer A ? A : never;

export function service<
  T extends keyof TObjectKeys<typeof db_ctrls.default>,
  A extends keyof TObjectKeys<typeof db_ctrls.default[T]>,
  P extends TParams<typeof db_ctrls.default[T][A]>
>(
  object: T,
  action: A,
  ctx: IAuthContext,
  params: P
): TResponse<typeof db_ctrls.default[T][A]> {
  const dbService = db_ctrls[object];
  return (dbService[action] as any).apply(null, [params, ctx]);
}

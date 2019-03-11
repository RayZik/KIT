import * as db_func from '../database/functions';
import { IAuthContext } from 'interface';

type TObjectKeys<T> = { [R in keyof T]: T[R] };
type TParams<T> = T extends (args: infer A) => any ? A : never;
type TResponse<T> = T extends (args: any) => infer A ? A : never;

export function service<
  T extends keyof TObjectKeys<typeof db_func.default>,
  A extends keyof TObjectKeys<typeof db_func.default[T]>,
  P extends TParams<typeof db_func.default[T][A]>
>(
  object: T,
  action: A,
  ctx: IAuthContext,
  params: P
): TResponse<typeof db_func.default[T][A]> {
  const dbService = db_func[object];
  return (dbService[action] as any).apply(null, [params, ctx]);
}

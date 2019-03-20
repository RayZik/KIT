import { UserController } from './user.class';
import { JWTController } from './token.class';
import { AccessController } from './access.class';

export * from './user.class';
export * from './token.class';
export * from './access.class';

export default {
  user: UserController,
  jwt: JWTController,
  access: AccessController
};

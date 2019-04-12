import { UserController } from './user.contorller';
import { JWTController } from './token.contorller';
import { AccessController } from './access.contorller';
import { DocumentController } from './document.contorller';

export * from './user.contorller';
export * from './token.contorller';
export * from './access.contorller';
export * from './document.contorller';

export default {
  user: UserController,
  jwt: JWTController,
  access: AccessController,
  document: DocumentController
};

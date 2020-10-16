import { UserController } from '@data/user/controller';
import { Context } from './context';
import { container, TYPES } from './context.setup';

container.bind<Context>(TYPES.CONTEXT).to(Context);
container.bind<UserController>(TYPES.USER_CONTROLLER).to(UserController);

const injectedContainer = container;

export { injectedContainer };

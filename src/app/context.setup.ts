import { Container } from 'inversify';
import getDecorators from 'inversify-inject-decorators';

const container = new Container();
const { lazyInject } = getDecorators(container);

const TYPES = {
  CONTEXT: Symbol('CONTEXT'),
  USER_CONTROLLER: Symbol('USER_CONTROLLER')
};

export { container, TYPES, lazyInject };

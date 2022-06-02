import { container } from 'tsyringe';
import { CONTROLLER_TYPES } from './types.di';
import { UserControllerFactory } from './user.controller.factory';

export const initControllersDI = () => {
  container.register(CONTROLLER_TYPES.UserControllerFactory, UserControllerFactory);
};

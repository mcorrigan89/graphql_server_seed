import { container } from 'tsyringe';
import { REPOSITORY_TYPES } from './types.di';
import { userRepository } from './user.repository';

export const initRepositoriesDI = () => {
  container.registerInstance(REPOSITORY_TYPES.userRepository, userRepository);
};

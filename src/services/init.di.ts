import { container } from 'tsyringe';
import { SERVICE_TYPES } from './types.di';
import { UserService } from './user.service';

export const initServicesDI = () => {
  container.register(SERVICE_TYPES.UserService, UserService);
};

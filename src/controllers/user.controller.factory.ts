import { inject, injectable } from 'tsyringe';
import { Context } from '@app/context';
import { UserController } from '@controllers/user.controller';
import { SERVICE_TYPES } from '@services/types.di';
import { IUserService } from '@services/user.service';

@injectable()
export class UserControllerFactory {
  constructor(@inject(SERVICE_TYPES.UserService) private userService: IUserService) {}

  create(context: Context) {
    return new UserController(context, this.userService);
  }
}

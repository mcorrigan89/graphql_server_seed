import { CONTROLLER_TYPES } from '@controllers/types.di';
import { UserController } from '@controllers/user.controller';
import { UserControllerFactory } from '@controllers/user.controller.factory';
import { UserModel } from '@models/user.model';
import { SERVICE_TYPES } from '@services/types.di';
import { UserService } from '@services/user.service';
import { autoInjectable, inject } from 'tsyringe';

export class Context {
  public currentUser: UserModel | null;
  public userService: UserService;
  public userController: UserController;

  constructor(userService: UserService, userControllerFactory: UserControllerFactory) {
    this.userService = userService;
    this.userController = userControllerFactory.create(this);
  }

  public getCurrentUser = () => {
    return this.currentUser;
  };

  public setCurrentUser = async (id: string) => {
    this.currentUser = await this.userService.byId(id);
  };
}

@autoInjectable()
export class ContextFactory {

  constructor(
    @inject(SERVICE_TYPES.UserService) public userService: UserService,
    @inject(CONTROLLER_TYPES.UserControllerFactory) public userControllerFactory: UserControllerFactory,
  ) {}

  createContext() {
    return new Context(this.userService, this.userControllerFactory);
  }
}
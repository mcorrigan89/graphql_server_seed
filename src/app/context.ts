import { UserController } from '@data/user/controller';
import { UserView } from '@data/user/view';
import { injectable } from 'inversify';
import { TYPES, lazyInject } from './injection.setup';

@injectable()
export class Context {
  @lazyInject(TYPES.USER_CONTROLLER) public userController: UserController;
  private currentUser: UserView | null = null;

  public getCurrentUser = () => {
    return this.currentUser;
  };

  public setCurrentUser = async (id: string) => {
    this.currentUser = await this.userController.getUserById(id);
  };
}

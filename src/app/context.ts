import { UserController } from '@data/user/controller';
import { UserView } from '@data/user/view';

export class Context {
  public userController: UserController;
  private currentUser: UserView | null = null;

  constructor() {
    this.userController = new UserController(this);
  }

  public getCurrentUser = () => {
    return this.currentUser;
  };

  public setCurrentUser = async (id: string) => {
    this.currentUser = await this.userController.getUserById(id);
  };
}

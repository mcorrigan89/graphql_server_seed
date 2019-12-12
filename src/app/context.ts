import { UserController } from '@data/user/controller';
import { UserView } from '@data/user/view';

export class Context {
  public readonly userController: UserController;

  private currentUser: UserView | null = null;

  constructor() {
    this.userController = new UserController();
  }

  public getCurrentUser = () => {
    return this.currentUser;
  }

  public setCurrentUser = async (id: string) => {
    this.currentUser = await this.userController.getUserById(this, id);
  }
}
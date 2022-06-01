import { RolesController } from '@data/roles/controller'; 
import { UserController } from '@data/user/controller';
import { UserView } from '@data/user/view';

export class Context {
  public readonly rolesController: RolesController;
  public userController: UserController;
  private currentUser: UserView | null = null;

  constructor() {
    this.rolesController = new RolesController(this);
    this.userController = new UserController(this);
  }

  public getCurrentUser = () => {
    return this.currentUser;
  };

  public setCurrentUser = async (id: string) => {
    this.currentUser = await this.userController.getUserById(id);
  };
}

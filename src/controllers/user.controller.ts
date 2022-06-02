import { Context } from '@app/context';
import { UserView } from '@views/user.view';
import { CreateUserPayload, LoginPayload } from '@graphql/resolver.types';
import { IUserService } from '@services/user.service';

export interface IUserController {
  getUserById: (id: string) => Promise<UserView>;
  getUsersByIds: (ids: string[]) => Promise<UserView[]>;
  getUserByUsername: (username: string) => Promise<UserView>;
  createUser: (payload: CreateUserPayload) => Promise<UserView>;
  login: (payload: LoginPayload) => Promise<string>;
}

export class UserController implements IUserController {
  private context: Context;
  private userService: IUserService;
  constructor(context: Context, userService: IUserService) {
    this.context = context;
    this.userService = userService;
  }

  public getUserById = async (id: string) => {
    const user = await this.userService.byIdOrError(id);
    return new UserView(this.context, user);
  };

  public getUsersByIds = async (ids: Array<string>) => {
    const users = await this.userService.byIds(ids);
    return users.map(user => new UserView(this.context, user));
  };

  public getUserByUsername = async (username: string) => {
    const user = await this.userService.byUsername(username)
    return new UserView(this.context, user);
  };

  public createUser = async (payload: CreateUserPayload) => {
    const { username, password, firstName, lastName } = payload;
    const user = await this.userService.create({ username, password });
    return new UserView(this.context, user);
  };

  public login = async (payload: LoginPayload) => {
    const { username, password } = payload;
    return this.userService.login(username, password);
  };

}

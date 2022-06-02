import { Context } from '@app/context';
import { UserModel } from '@models/user.model';
import { UserResolvers } from '@graphql/resolver.types';

export class UserView implements UserResolvers {

  public data: UserModel;
  constructor(context: Context, user: UserModel) {
    this.data = user;
  }

  public id() {
    return this.data.id;
  }

  public username() {
    return this.data.username;
  }

  public firstName() {
    return this.data.firstName ?? null;
  }

  public lastName() {
    return this.data.lastName ?? null;
  }
}

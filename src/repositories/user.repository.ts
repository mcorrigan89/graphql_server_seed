import { datasource } from '@app/datasource';
import { UserModel } from '@models/user.model';

export interface IUserRepository {
  byIds: (ids: readonly string[]) => Promise<UserModel[]>;
  byUsername: (username: string) => Promise<UserModel | null>;
  createUser: (args: CreateUserArgs) => Promise<UserModel>;
}

export interface CreateUserArgs {
  username: string;
  password: string;
}

export const userRepository: IUserRepository = datasource.getRepository(UserModel).extend({
  byIds(ids: readonly string[]) {
    return this.createQueryBuilder('user').where('user.id in (:...ids)', { ids }).getMany();
  },
  byUsername(username: string) {
    return this.createQueryBuilder('user').where('user.username = :username', { username }).getOne();
  },
  async createUser(args: CreateUserArgs) {
    const { username, password } = args;
    const userToCreate = this.create();
    userToCreate.username = username;
    userToCreate.password = password;
    const user = await this.save(userToCreate);
    return user;
  }
});

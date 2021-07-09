import { ControllerTemplate } from '@utils/controller.template';
import { getManager, getRepository } from 'typeorm';
import { Context } from '@app/context';
import { BadRequestError } from '@utils/errors';
import { UserModel } from './model';
import { UserView } from './view';
import { DecodedAuthToken } from '@app/auth.middleware';
import { encrypt, compare } from '@app/password';
import { NotFoundError } from '@utils/errors';
import { createToken } from '@app/token';
import { CreateUserPayload, LoginPayload } from '@graphql/resolver.types';

type QueryType = 'UserById' | 'UserByUsername';

const query = () => getManager().createQueryBuilder(UserModel, 'user');

export class UserController extends ControllerTemplate<UserModel, QueryType> {
  constructor(context: Context) {
    super(context);
    this.loaders['UserById'] = this.wrapQueryInDataLoader(async (ids: ReadonlyArray<string>) => {
      const users = await query().where('user.id in (:...ids)', { ids }).getMany();
      return this.orderResultsByIds(ids, users);
    });
    this.loaders['UserByUsername'] = this.wrapQueryInDataLoader(async (usernames: ReadonlyArray<string>) => {
      const users = await query().where('user.username in (:...usernames)', { usernames }).getMany();
      return this.orderResultsByIds(usernames, users, 'username');
    });
  }

  public getUsers = async () => {
    const users = await query().orderBy('user.createdAt', 'DESC').getMany();
    return users.map(user => new UserView(this.context, user));
  };

  public getUserById = async (id: string) => {
    const user = await this.loaders['UserById'].load(id);
    if (user) {
      return new UserView(this.context, user);
    } else {
      throw new NotFoundError(`User ${id} not found`);
    }
  };

  public getUsersByIds = async (ids: Array<string>) => {
    const users = await this.loaders['UserById'].loadMany(ids);
    return users.map(userOrError => {
      if (userOrError instanceof Error) {
        throw new BadRequestError(userOrError.message);
      } else {
        return new UserView(this.context, userOrError);
      }
    });
  };

  public getUserByUsername = async (username: string) => {
    const user = await this.loaders['UserByUsername'].load(username);
    return user ? new UserView(this.context, user) : null;
  };

  public createUser = async (payload: CreateUserPayload) => {
    const { username, password, firstName, lastName } = payload;
    const passwordHash = await encrypt(password);
    const userToCreate = new UserModel();
    userToCreate.username = username;
    userToCreate.password = passwordHash;
    userToCreate.firstName = firstName ?? undefined;
    userToCreate.lastName = lastName ?? undefined;
    const createdUser = await getRepository(UserModel).save(userToCreate);
    return this.getUserById(createdUser.id);
  };

  public login = async (payload: LoginPayload) => {
    const { username, password } = payload;
    const user = await getRepository(UserModel).findOne({ username });
    if (user) {
      if (await compare(password, user.password)) {
        return createToken<DecodedAuthToken>({
          id: user.id
        });
      } else {
        throw new BadRequestError('Incorrect Password');
      }
    } else {
      throw new NotFoundError('User not found');
    }
  };
}

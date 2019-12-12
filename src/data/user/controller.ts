import { ControllerTemplate } from '@utils/controller.template';
import { getManager, getRepository } from 'typeorm';
import { Context } from '@src/app/context';
import { BadRequestError } from '@src/utils/errors';
import { UserModel } from './model';
import { UserView } from './view';
import { DecodedAuthToken } from '@app/auth.middleware';
import { encrypt, compare } from '@app/password';
import { NotFoundError } from '@app/errors';
import { createToken } from '@app/token';

export interface CreateUserPayload {
  username: string;
  password: string;
}

export interface LoginPayload {
  username: string;
  password: string;
}

type QueryType = 'UserById' | 'UserByUsername';

const query = () => 
  getManager()
    .createQueryBuilder(UserModel, 'user')

export class UserController extends ControllerTemplate<UserModel, QueryType> {
  constructor() {
    super();
    this.loaders['UserById'] = this.wrapQueryInDataLoader(
      async (ids: ReadonlyArray<string>) => {
        const users = await query()
          .where('user.id in (:...ids)', { ids })
          .getMany();
        return this.orderResultsByIds(ids, users);
      });
    this.loaders['UserByUsername'] = this.wrapQueryInDataLoader(
      async (usernames: ReadonlyArray<string>) => {
        const users = await query()
          .where('user.username in (:...usernames)', { usernames })
          .getMany();
        return this.orderResultsByIds(usernames, users, 'username');
      });
  }

  public getUserById = async (context: Context, id: string) => {
    const user = await this.loaders['UserById'].load(id);
    if(user) {
      return new UserView(context, user)
     } else {
       throw new NotFoundError(`User ${id} not found`);
     }
  }

  public getUsersByIds = async (context: Context, ids: Array<string>) => {
    const users = await this.loaders['UserById'].loadMany(ids);
    return users.map(userOrError => {
      if (userOrError instanceof Error) {
        throw new BadRequestError(userOrError.message)
      } else {
        return new UserView(context, userOrError)
      }
    });
  }

  public getUserByUsername = async (context: Context, username: string) => {
    const user = await this.loaders['UserByUsername'].load(username);
    return user ? new UserView(context, user) : null;
  }

  public createUser = async (context: Context, payload: CreateUserPayload) => {
    const { username, password } = payload;
    const passwordHash = await encrypt(password)
    const userToCreate = new UserModel();
    userToCreate.username = username;
    userToCreate.password = passwordHash;
    const createdUser = await getRepository(UserModel).save(userToCreate);
    return this.getUserById(context, createdUser.id);
  }

  public login = async (context: Context, payload: LoginPayload) => {
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
  }
}
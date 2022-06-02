import 'reflect-metadata';
import DataLoader from 'dataloader';
import { autoInjectable, inject } from 'tsyringe';
import { UserModel } from '@models/user.model';
import { IUserRepository } from '@repositories/user.repository';
import { REPOSITORY_TYPES } from '@repositories/types.di';
import { orderResultsByIds } from '@utils/order.by.ids';
import { BadRequestError, NotFoundError } from '@utils/errors';
import { compare } from 'bcrypt';
import { createToken } from '@app/token';
import { DecodedAuthToken } from '@app/auth.middleware';
import { encrypt } from '@app/password';

export interface IUserService {
  byId: (id: string) => Promise<UserModel | null>;
  byIdOrError: (id: string) => Promise<UserModel>;
  byIds: (ids: string[]) => Promise<Array<UserModel>>;
  byUsername: (username: string) => Promise<UserModel>;
  login: (username: string, password: string) => Promise<string>;
  create: (args: { username: string; password: string }) => Promise<UserModel>;
}

@autoInjectable()
export class UserService implements IUserService {
  private readonly userRepository: IUserRepository;
  private readonly byIdLoader: DataLoader<string, UserModel | null>;
  constructor(@inject(REPOSITORY_TYPES.userRepository) userRepository: IUserRepository) {
    this.userRepository = userRepository;
    this.byIdLoader = new DataLoader(async ids => orderResultsByIds<UserModel>(ids, await this.userRepository.byIds(ids)));
  }

  public byId = (id: string) => {
    return this.byIdLoader.load(id);
  };

  public byIdOrError = async (id: string) => {
    const user = await this.byIdLoader.load(id);
    if (user) {
      return user;
    } else {
      throw new NotFoundError(`User ${id} not found!`);
    }
  };

  public byIds = async (ids: string[]) => {
    const users = await this.byIdLoader.loadMany(ids);
    return users.map(userOrError => {
      if (userOrError instanceof Error) {
        throw userOrError;
      } else if (!userOrError) {
        throw new NotFoundError('User not found!');
      } else {
        return userOrError;
      }
    });
  };

  public byUsername = async (username: string) => {
    const user = await this.userRepository.byUsername(username);
    if (user) {
      return user;
    } else {
      throw new NotFoundError(`User ${username} not found!`);
    }
  };

  public login = async (username: string, password: string) => {
    const user = await this.byUsername(username);
    if (await compare(password, user.password)) {
      return createToken<DecodedAuthToken>({
        id: user.id
      });
    } else {
      throw new BadRequestError('Incorrect Password');
    }
  };

  public create = async (args: { username: string; password: string }) => {
    const { username, password } = args;
    const passwordHash = await encrypt(password);
    const userToCreate = new UserModel();
    userToCreate.username = username;
    userToCreate.password = passwordHash;
    const createdUser = await this.userRepository.createUser({
      username,
      password: passwordHash
    });
    return createdUser;
  };
}

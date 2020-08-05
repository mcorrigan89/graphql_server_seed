jest.mock('../../app/context');
import { Context } from '../../app/context';
import { UserController } from './controller';
import { connectionPostgres } from '../../app/setup.db';
import { getRepository } from 'typeorm';
import { UserModel } from './model';

describe('UserController', () => {
  beforeAll(async () => {
    await connectionPostgres.create('test');
  });
  afterAll(async () => {
    await connectionPostgres.close();
  });
  it('should get a user by ID', async () => {
    const contextMock = new Context();
    const userController = new UserController();
    const userToSave = new UserModel();
    userToSave.username = 'test-user';
    userToSave.password = 'test-password';
    const savedUser = await getRepository(UserModel).save(userToSave);
    const userView = await userController.getUserById(contextMock, savedUser.id);
    expect(userView.data).toEqual(savedUser);
  });
  it('should create a user', async () => {
    const contextMock = new Context();
    const userController = new UserController();
    const createdUser = await userController.createUser(contextMock, { username: 'eminem', firstName: 'Marshal', lastName: 'Mathers', password: 'therealslimshady' });
    expect(createdUser.username).toEqual('eminem');
    expect(createdUser.firstName).toEqual('Marshal');
    expect(createdUser.lastName).toEqual('Mathers');
  });
});

import { UserController } from './controller';
import { connectionPostgres } from '../../app/setup.db';
import { getRepository } from 'typeorm';
import { UserModel } from './model';
import { Context } from '@app/context';

describe('UserController', () => {
  beforeAll(async () => {
    await connectionPostgres.create('test');
  });
  afterAll(async () => {
    await connectionPostgres.close();
  });

  it('should get a user by ID', async () => {
    const contextMock = new Context();
    const userController = new UserController(contextMock);
    const userToSave = new UserModel();
    userToSave.username = 'test-user';
    userToSave.password = 'test-password';
    const savedUser = await getRepository(UserModel).save(userToSave);
    const userView = await userController.getUserById(savedUser.id);
    expect(userView.data).toEqual(savedUser);
  });

  it('should get a list of users by ids', async () => {
    const contextMock = new Context();
    const userController = new UserController(contextMock);
    // User 1
    const user1ToSave = new UserModel();
    user1ToSave.username = 'test-user-1';
    user1ToSave.password = 'test-password-1';
    const savedUser1 = await getRepository(UserModel).save(user1ToSave);
    // User 2
    const user2ToSave = new UserModel();
    user2ToSave.username = 'test-user-2';
    user2ToSave.password = 'test-password-2';
    const savedUser2 = await getRepository(UserModel).save(user2ToSave);
    const userViews = await userController.getUsersByIds([savedUser1.id, savedUser2.id]);
    expect(userViews[0].data).toEqual(savedUser1);
    expect(userViews[1].data).toEqual(savedUser2);
  });

  it('should get all users', async () => {
    const contextMock = new Context();
    const userController = new UserController(contextMock);
    // User 1
    const user1ToSave = new UserModel();
    user1ToSave.username = 'test-user-1';
    user1ToSave.password = 'test-password-1';
    const savedUser1 = await getRepository(UserModel).save(user1ToSave);
    // User 2
    const user2ToSave = new UserModel();
    user2ToSave.username = 'test-user-2';
    user2ToSave.password = 'test-password-2';
    const savedUser2 = await getRepository(UserModel).save(user2ToSave);
    // User 3
    const user3ToSave = new UserModel();
    user3ToSave.username = 'test-user-3';
    user3ToSave.password = 'test-password-3';
    const savedUser3 = await getRepository(UserModel).save(user3ToSave);
    const userViews = await userController.getUsers();
    expect(userViews[2].data).toEqual(savedUser1);
    expect(userViews[1].data).toEqual(savedUser2);
    expect(userViews[0].data).toEqual(savedUser3);
  });

  it('should get a user by username', async () => {
    const contextMock = new Context();
    const userController = new UserController(contextMock);
    const userToSave = new UserModel();
    userToSave.username = 'test-user-username';
    userToSave.password = 'test-password';
    const savedUser = await getRepository(UserModel).save(userToSave);
    const userView = await userController.getUserByUsername('test-user-username');
    expect(userView!.data).toEqual(savedUser);
  });

  it('should create a user', async () => {
    const contextMock = new Context();
    const userController = new UserController(contextMock);
    const createdUser = await userController.createUser({ username: 'eminem', firstName: 'Marshal', lastName: 'Mathers', password: 'therealslimshady' });
    expect(createdUser.username).toEqual('eminem');
    expect(createdUser.firstName).toEqual('Marshal');
    expect(createdUser.lastName).toEqual('Mathers');
  });
});

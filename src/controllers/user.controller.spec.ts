import sinon from 'sinon';
import { stubInterface } from 'ts-sinon';
import { UserController } from './user.controller';
import { UserModel } from '@models/user.model';
import { Context } from '@app/context';
import { UserService } from '@services/user.service';
import { UserControllerFactory } from './user.controller.factory';

const testSetup = () => {
  const userServiceMock = stubInterface<UserService>();
  const userControllerFactoryMock = stubInterface<UserControllerFactory>();
  const contextMock = new Context(userServiceMock, userControllerFactoryMock);
  const userController = new UserController(contextMock, userServiceMock);
  userControllerFactoryMock.create.returns(userController);
  return { contextMock, userServiceMock, userController };
};

describe('UserController', () => {
  it('should get a user by ID', async () => {
    const { userServiceMock, userController } = testSetup();
    const userToSave = new UserModel();
    userToSave.id = '1';
    userToSave.username = 'test-user';
    userToSave.password = 'test-password';
    userServiceMock.byIdOrError.returns(Promise.resolve(userToSave));
    const userView = await userController.getUserById('1');
    expect(sinon.assert.calledWith(userServiceMock.byIdOrError, '1'));
    expect(userView.data).toEqual(userToSave);
  });

  it('should get a list of users by ids', async () => {
    const { userServiceMock, userController } = testSetup();
    // User 1
    const user1ToSave = new UserModel();
    user1ToSave.id = '1';
    user1ToSave.username = 'test-user-1';
    user1ToSave.password = 'test-password-1';
    // User 2
    const user2ToSave = new UserModel();
    user2ToSave.id = '2';
    user2ToSave.username = 'test-user-2';
    user2ToSave.password = 'test-password-2';
    userServiceMock.byIds.returns(Promise.resolve([user1ToSave, user2ToSave]));
    const userViews = await userController.getUsersByIds([user1ToSave.id, user2ToSave.id]);
    expect(sinon.assert.calledWith(userServiceMock.byIds, ['1', '2']));
    expect(userViews[0].data).toEqual(user1ToSave);
    expect(userViews[1].data).toEqual(user2ToSave);
  });

  it('should get a user by username', async () => {
    const { userServiceMock, userController } = testSetup();
    const userToSave = new UserModel();
    userToSave.id = '1';
    userToSave.username = 'test-user-username';
    userToSave.password = 'test-password';
    userServiceMock.byUsername.returns(Promise.resolve(userToSave));
    const userView = await userController.getUserByUsername('test-user-username');
    expect(sinon.assert.calledWith(userServiceMock.byUsername, 'test-user-username'));
    expect(userView!.data).toEqual(userToSave);
  });

  it('should create a user', async () => {
    const { userServiceMock, userController } = testSetup();
    const newUser = new UserModel();
    newUser.username = 'eminem';
    newUser.password = 'hash';
    userServiceMock.create.returns(Promise.resolve(newUser));
    const createdUser = await userController.createUser({ username: 'eminem', firstName: 'Marshal', lastName: 'Mathers', password: 'therealslimshady' });
    expect(sinon.assert.calledWith(userServiceMock.create, { username: 'eminem', password: 'therealslimshady' }))
    expect(createdUser.username()).toEqual('eminem');
  });

  it('should call userservice to login', async () => {
    const { userServiceMock, userController } = testSetup();
    userServiceMock.login.returns(Promise.resolve('TOKEN'));
    const token = await userController.login({ username: 'eminem', password: 'therealslimshady' });
    expect(sinon.assert.calledWith(userServiceMock.login, 'eminem','therealslimshady'))
    expect(token).toEqual('TOKEN');
  });
});

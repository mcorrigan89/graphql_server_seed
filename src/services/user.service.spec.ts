import 'jest';
import sinon from 'sinon';
import { stubInterface } from 'ts-sinon';
import { Context } from '@app/context';
import { IUserRepository } from '@repositories/user.repository';
import { UserControllerFactory } from '@controllers/user.controller.factory';
import { UserService } from './user.service';
import { UserModel } from '@models/user.model';

const testSetup = () => {
    const userRepositoryMock = stubInterface<IUserRepository>();
    const userService = new UserService(userRepositoryMock);
    return { userService, userRepositoryMock };
  };

describe('UserService', () => {
    it('should get a user by id', async () => {
        const { userRepositoryMock, userService } = testSetup();
        const user = new UserModel();
        user.id = '1'
        userRepositoryMock.byIds.returns(Promise.resolve([user]));
        const res = await userService.byId('1');
        expect(sinon.assert.calledWith(userRepositoryMock.byIds, ['1']));
        expect(res?.id).toBe('1');
    })
})
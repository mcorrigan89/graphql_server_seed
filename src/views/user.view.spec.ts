import { UserView } from './user.view';
import { UserModel } from '@models/user.model';
import { Context } from '../app/context';
import { stubInterface } from 'ts-sinon';

const testSetup = () => {
  const contextMock = stubInterface<Context>();
  return { contextMock };
}

describe('UserView', () => {

  it('should have model properties exposed', () => {
    const { contextMock } = testSetup();
    const userModel = new UserModel();
    userModel.id = '1';
    userModel.firstName = 'Mike';
    userModel.lastName = 'Corrigan';
    userModel.username = 'mcorrigan89';
    const user = new UserView(contextMock, userModel);
    expect(user.id()).toBe('1');
    expect(user.firstName()).toBe('Mike');
    expect(user.lastName()).toBe('Corrigan');
    expect(user.username()).toBe('mcorrigan89');
  });

  it('should return undefined for undefined model properties', () => {
    const { contextMock } = testSetup();
    const userModel = new UserModel();
    userModel.id = '1';
    userModel.username = 'mcorrigan89';
    const user = new UserView(contextMock, userModel);
    expect(user.id()).toBe('1');
    expect(user.firstName()).toBeNull();
    expect(user.lastName()).toBeNull();
    expect(user.username()).toBe('mcorrigan89');
  });
});

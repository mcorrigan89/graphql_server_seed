import { UserView } from './view';
import { UserModel } from './model';
jest.mock('../../app/context');
import { Context } from '../../app/context';

describe('UserView', () => {
  it('should have model properties exposed', () => {
    const contextMock = new Context();
    const userModel = new UserModel();
    userModel.id = '1';
    userModel.firstName = 'Mike';
    userModel.lastName = 'Corrigan';
    userModel.username = 'mcorrigan89';
    const user = new UserView(contextMock, userModel);
    expect(user.id).toBe('1');
    expect(user.firstName).toBe('Mike');
    expect(user.lastName).toBe('Corrigan');
    expect(user.username).toBe('mcorrigan89');
  });

  it('should return undefined for undefined model properties', () => {
    const contextMock = new Context();
    const userModel = new UserModel();
    userModel.id = '1';
    userModel.username = 'mcorrigan89';
    const user = new UserView(contextMock, userModel);
    expect(user.id).toBe('1');
    expect(user.firstName).toBeUndefined();
    expect(user.lastName).toBeUndefined();
    expect(user.username).toBe('mcorrigan89');
  });
});

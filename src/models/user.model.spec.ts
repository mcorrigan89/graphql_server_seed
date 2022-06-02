import { UserModel } from './user.model';

describe('UserModel', () => {
  it('should have properties', () => {
    const userModel = new UserModel();
    userModel.id = '1';
    userModel.firstName = 'Mike';
    userModel.lastName = 'Corrigan';
    userModel.username = 'mcorrigan89';
    expect(userModel).toEqual({ id: '1', username: 'mcorrigan89', firstName: 'Mike', lastName: 'Corrigan' });
  });
});

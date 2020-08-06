import { UserModel } from './model';
import { connectionPostgres } from '../../app/setup.db';

describe('UserModel', () => {
  beforeAll(async () => {
    await connectionPostgres.create('test');
  });
  afterAll(async () => {
    await connectionPostgres.close();
  });

  it('should have properties', () => {
    const userModel = new UserModel();
    userModel.id = '1';
    userModel.firstName = 'Mike';
    userModel.lastName = 'Corrigan';
    userModel.username = 'mcorrigan89';
    expect(userModel).toEqual({ id: '1', username: 'mcorrigan89', firstName: 'Mike', lastName: 'Corrigan' });
  });
});

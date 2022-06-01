import { RolesModel } from './model';

describe('RolesModel', () => {
  it('should have properties', () => {
    const rolesModel = new RolesModel();
    rolesModel.id = '1';
    expect(rolesModel).toEqual({ id: '1' });
  });
});
